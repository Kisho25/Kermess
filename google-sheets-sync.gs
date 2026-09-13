/**
 * Kermess POS → Google Sheets synchronization
 * Spreadsheet: 1hyHAxrLELHvrinB6Ao_UHGSytGLjcE5T1xxMQCxePQ
 *
 * Follow GOOGLE_SHEETS_SETUP.md. Do not add this file to the website itself.
 */

const SPREADSHEET_ID = '1hyHAxrLELHvrinB6Ao_UHGSytGLjcE5T1xMZZQCxePQ';
const SUPABASE_URL = 'https://pzxjdmcuqguhtrqnjlpp.supabase.co';

// [name, provider unit cost, provider, contact]. null cost = percentage still pending.
const PRODUCTS = {
  1:['Shawarma Lahme',600000,'Michelle','03 922 561'], 2:['Tawouk',500000,'Michelle','03 922 561'],
  3:['Kafta',550000,'Michelle','03 922 561'], 4:['Lahme Khanzir',600000,'Michelle','03 922 561'],
  5:['Frisco Tropical',200000,'Elie Lteif (Frisco)','03 502 849'],
  6:['Zaatar',50000,'Saj Akhawiye','71 760 741 (Samia Lteif)'],
  7:['Jebne',200000,'Saj Akhawiye','71 760 741 (Samia Lteif)'],
  8:['Keshk',200000,'Saj Akhawiye','71 760 741 (Samia Lteif)'],
  9:['Nutella',400000,'Crepetna','76 656 367'], 10:['Nutella Banana',450000,'Crepetna','76 656 367'],
  11:['Nutella Kinder',500000,'Crepetna','76 656 367'], 12:['Nutella Oreo',500000,'Crepetna','76 656 367'],
  13:['Nutella Banana Nuts',500000,'Crepetna','76 656 367'], 14:['Nutella Lotus',550000,'Crepetna','76 656 367'],
  15:['Nutella Kinder Oreo',600000,'Crepetna','76 656 367'], 16:['Brownies',450000,'Orianne','79 306 256'],
  17:['Merry Cream',200000,'Marcelino Mikhael','71 540 832'],
  18:['Limonade',200000,'Elie Lteif (Frisco)','03 502 849'],
  19:['Soft Drink',0,'Akhawiyat','03 773 860'], 20:['Water Small',0,'Akhawiyat','03 773 860'],
  21:['Ice Tea',0,'Akhawiyat','03 773 860'], 22:['Beer',0,'Akhawiyat','03 773 860'],
  23:['Beer Rosée',0,'Akhawiyat','03 773 860'], 24:['Carbonated Beer',0,'Akhawiyat','03 773 860'],
  25:['XXL',0,'Akhawiyat','03 773 860'], 26:['Arguile',500000,'Hammoura','81 067 970'],
  27:['Cotton Candy',100000,'Joceline','03 773 860'], 28:['Bzourat',0,'Akhawiyat','03 773 860'],
  29:['Popcorn Wasat',100000,'Chady Azar','70 895 345'], 30:['Popcorn Kbir',200000,'Chady Azar','70 895 345'],
  31:['Gonflables',0,'AC Inflatables',''], 32:['Trampoline',0,'Sahel Alma',''],
  33:['Play Station · 15 min',0,'Anthony Chidiac','81 030 873'],
  34:['Face Painting',0,'Akhawiyat','03 773 860'],
  35:['Mini Games',15000,'Play Aura','70 938 434'],
  36:['Box · per hit',35000,'Play Aura','70 938 434'],
  37:['VR',360000,'Jack Chewan','70 161 814'],
  38:['Gonflable Offre',0,'AC Inflatables','']
};

/** Paste the same sb_publishable_ key used in config.js, then run this once. */
function saveSupabaseSettings() {
  const publishableKey = 'PASTE_YOUR_SB_PUBLISHABLE_KEY_HERE';
  if (publishableKey.indexOf('PASTE_') === 0) throw new Error('Paste your Supabase publishable key first.');
  PropertiesService.getScriptProperties().setProperty('SUPABASE_PUBLISHABLE_KEY', publishableKey);
}

/** Run once after saveSupabaseSettings(). Creates both tabs and the one-minute trigger. */
function setupKermessSync() {
  ScriptApp.getProjectTriggers()
    .filter(trigger => trigger.getHandlerFunction() === 'syncKermessSales')
    .forEach(trigger => ScriptApp.deleteTrigger(trigger));
  ScriptApp.newTrigger('syncKermessSales').timeBased().everyMinutes(1).create();
  syncKermessSales();
}

/** Downloads all Supabase orders and safely rebuilds both sheets without duplicates. */
function syncKermessSales() {
  const key = PropertiesService.getScriptProperties().getProperty('SUPABASE_PUBLISHABLE_KEY');
  if (!key) throw new Error('Run saveSupabaseSettings() first.');

  const orders = fetchAllOrders_(key);
  const rawRows = [];
  const dailyTotals = {};
  const allTotals = {};

  orders.filter(order => !order.deleted_at).forEach(order => {
    const eventDay = order.event_day || Utilities.formatDate(new Date(order.completed_at), 'Asia/Beirut', 'yyyy-MM-dd');
    (order.items || []).forEach(item => {
      const product = PRODUCTS[item.id] || [`Item ${item.id}`,null,'Pending',''];
      const quantity = Number(item.quantity) || 0;
      const price = Number(item.price) || 0;
      rawRows.push([eventDay, order.order_number, order.local_order_number, new Date(order.completed_at), order.terminal_id, order.id, product[0], quantity, price]);
      if (!dailyTotals[eventDay]) dailyTotals[eventDay] = {};
      addToTotals_(dailyTotals[eventDay], item.id, quantity, price);
      addToTotals_(allTotals, item.id, quantity, price);
    });
  });

  const dailyReportRows = [];
  Object.keys(dailyTotals).sort().forEach(day => {
    buildReportRows_(dailyTotals[day]).forEach(row => dailyReportRows.push([day].concat(row)));
  });
  const allReportRows = buildReportRows_(allTotals);

  writeSheet_('Sales Log', ['Sales Day','Global Order','Local Order','Completed At','Terminal ID','Sale UUID','Item','Quantity','Sale Price LBP'], rawRows, [9]);
  writeSheet_('Item Report', ['Sales Day','Item','Provider','Contact','Items Sold','Sale Price LBP','Provider / Item LBP','Profit / Item LBP','Total to Provider LBP','Total Profit LBP'], dailyReportRows, [6,7,8,9,10]);
  writeSheet_('All Days Report', ['Item','Provider','Contact','Items Sold','Sale Price LBP','Provider / Item LBP','Profit / Item LBP','Total to Provider LBP','Total Profit LBP'], allReportRows, [5,6,7,8,9]);
  PropertiesService.getScriptProperties().setProperty('LAST_SUCCESSFUL_SYNC', new Date().toISOString());
}

function addToTotals_(totals, id, quantity, price) {
  if (!totals[id]) totals[id] = { quantity:0, revenue:0, latestPrice:price };
  totals[id].quantity += quantity;
  totals[id].revenue += quantity * price;
  totals[id].latestPrice = price;
}

function buildReportRows_(totals) {
  return Object.keys(totals).sort((a,b) => Number(a)-Number(b)).map(id => {
    const product = PRODUCTS[id] || [`Item ${id}`,null,'Pending',''];
    const total = totals[id];
    const providerPayment = product[1] === null ? 'Pending' : product[1] * total.quantity;
    const profit = product[1] === null ? 'Pending' : total.revenue - providerPayment;
    const profitPerItem = product[1] === null ? 'Pending' : total.latestPrice - product[1];
    return [product[0], product[2], product[3], total.quantity, total.latestPrice, product[1] === null ? 'Pending' : product[1], profitPerItem, providerPayment, profit];
  });
}

function fetchAllOrders_(key) {
  const all = [];
  const pageSize = 1000;
  for (let offset = 0; ; offset += pageSize) {
    const url = `${SUPABASE_URL}/rest/v1/sales_orders?select=id,order_number,local_order_number,terminal_id,event_day,completed_at,items,deleted_at&order=completed_at.asc&limit=${pageSize}&offset=${offset}`;
    const response = UrlFetchApp.fetch(url, { headers:{ apikey:key, Authorization:`Bearer ${key}` }, muteHttpExceptions:true });
    if (response.getResponseCode() !== 200) throw new Error(`Supabase returned ${response.getResponseCode()}: ${response.getContentText()}`);
    const page = JSON.parse(response.getContentText());
    all.push.apply(all, page);
    if (page.length < pageSize) break;
  }
  return all;
}

function writeSheet_(name, headers, rows, moneyColumns) {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(name) || spreadsheet.insertSheet(name);
  sheet.clearContents();
  sheet.clearFormats();
  sheet.getRange(1,1,1,headers.length).setValues([headers]).setBackground('#174f3a').setFontColor('#ffffff').setFontWeight('bold');
  if (rows.length) sheet.getRange(2,1,rows.length,headers.length).setValues(rows);
  moneyColumns.forEach(column => { if (rows.length) sheet.getRange(2,column,rows.length,1).setNumberFormat('#,##0 "LBP"'); });
  sheet.setFrozenRows(1);
  sheet.getDataRange().setVerticalAlignment('middle');
  sheet.autoResizeColumns(1, headers.length);
  sheet.setColumnWidth(4, Math.max(sheet.getColumnWidth(4), 100));
}
