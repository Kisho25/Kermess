const EXCHANGE_RATE = 90000;
const activitiesOnly = Boolean(window.KERMESS_ACTIVITIES_ONLY) || /\/games(?:\/index\.html)?\/?$/.test(window.location.pathname);

const products = [
  { id: 1, name: "Shawarma Lahme", price: 600000, category: "Food", icon: "🥙" },
  { id: 2, name: "Tawouk", price: 500000, category: "Food", icon: "🍢" },
  { id: 3, name: "Kafta", price: 550000, category: "Food", icon: "🥩" },
  { id: 4, name: "Lahme Khanzir", price: 600000, category: "Food", icon: "🍖" },
  { id: 5, name: "Frisco Tropical", price: 200000, category: "Drinks", icon: "🥪" },
  { id: 6, name: "Zaatar", price: 50000, category: "Food", icon: "🫓" },
  { id: 7, name: "Jebne", price: 200000, category: "Food", icon: "🧀" },
  { id: 8, name: "Keshk", price: 200000, category: "Food", icon: "🥣" },
  { id: 9, name: "Nutella", price: 400000, category: "Sweets", icon: "🍫" },
  { id: 10, name: "Nutella Banana", price: 450000, category: "Sweets", icon: "🍌" },
  { id: 11, name: "Nutella Kinder", price: 500000, category: "Sweets", icon: "🍫" },
  { id: 12, name: "Nutella Oreo", price: 500000, category: "Sweets", icon: "🍪" },
  { id: 13, name: "Nutella Banana Nuts", price: 500000, category: "Sweets", icon: "🥜" },
  { id: 14, name: "Nutella Lotus", price: 500000, category: "Sweets", icon: "🧇" },
  { id: 15, name: "Nutella Kinder Oreo", price: 700000, category: "Sweets", icon: "🍫" },
  { id: 16, name: "Brownies", price: 450000, category: "Sweets", icon: "🟫" },
  { id: 17, name: "Merry Cream", price: 200000, category: "Sweets", icon: "🍦" },
  { id: 18, name: "Limonade", price: 200000, category: "Drinks", icon: "🍋" },
  { id: 19, name: "Soft Drink", price: 50000, category: "Drinks", icon: "🥤" },
  { id: 20, name: "Water Small", price: 10000, category: "Drinks", icon: "💧" },
  { id: 21, name: "Ice Tea", price: 60000, category: "Drinks", icon: "🧋" },
  { id: 22, name: "Beer", price: 75000, category: "Drinks", icon: "🍺" },
  { id: 23, name: "Beer Rosée", price: 75000, category: "Drinks", icon: "🍻" },
  { id: 24, name: "Carbonated Beer", price: 50000, category: "Drinks", icon: "🥂" },
  { id: 25, name: "XXL", price: 195000, category: "Drinks", icon: "⚡" },
  { id: 26, name: "Arguile", price: 500000, category: "Snacks", icon: "💨" },
  { id: 27, name: "Cotton Candy", price: 100000, category: "Sweets", icon: "🍭" },
  { id: 28, name: "Bzourat", price: 25000, category: "Snacks", icon: "🌻" },
  { id: 29, name: "Popcorn Wasat", price: 100000, category: "Snacks", icon: "🍿" },
  { id: 30, name: "Popcorn Kbir", price: 200000, category: "Snacks", icon: "🍿" },
  { id: 31, name: "Gonflables", price: 300000, category: "Activities", icon: "🏰" },
  { id: 32, name: "Trampoline", price: 200000, category: "Activities", icon: "🤸" },
  { id: 33, name: "Play Station · 15 min", price: 450000, category: "Activities", icon: "🎮" },
  { id: 34, name: "Face Painting", price: 50000, category: "Activities", icon: "🎨" },
  { id: 35, name: "Bon Jeu", price: 50000, category: "Activities", icon: "🎯" },
  { id: 36, name: "Box · per hit", price: 50000, category: "Activities", icon: "🥊" },
  { id: 37, name: "VR", price: 500000, category: "Activities", icon: "🥽" }
];

// [Kermess sale price, provider/person price, provider, contact]
const foodFinancials = {
  1: [800000, 600000, "Michel Rahmeh", "03 922 561"],
  2: [650000, 500000, "Michel Rahmeh", "03 922 561"],
  3: [700000, 550000, "Michel Rahmeh", "03 922 561"],
  4: [800000, 600000, "Michel Rahmeh", "03 922 561"],
  5: [300000, 200000, "Elie Lteif (Frisco)", "03 502 849"],
  6: [100000, 50000, "Saj Akhawiye", "71 760 741 (Samia Lteif)"],
  7: [250000, 200000, "Saj Akhawiye", "71 760 741 (Samia Lteif)"],
  8: [250000, 200000, "Saj Akhawiye", "71 760 741 (Samia Lteif)"],
  9: [500000, 400000, "Crepetna", "76 656 367"],
  10: [550000, 450000, "Crepetna", "76 656 367"],
  11: [600000, 500000, "Crepetna", "76 656 367"],
  12: [600000, 500000, "Crepetna", "76 656 367"],
  13: [600000, 500000, "Crepetna", "76 656 367"],
  14: [650000, 550000, "Crepetna", "76 656 367"],
  15: [700000, 600000, "Crepetna", "76 656 367"],
  16: [500000, 450000, "Orianne", "79 306 256"],
  17: [300000, 200000, "Marcelino Mikhael", "71 540 832"],
  18: [300000, 200000, "Elie Lteif (Frisco)", "03 502 849"],
  19: [100000, 0, "Akhawiyat", "03 773 860"],
  20: [50000, 0, "Akhawiyat", "03 773 860"],
  21: [150000, 0, "Akhawiyat", "03 773 860"],
  22: [300000, 0, "Akhawiyat", "03 773 860"],
  23: [350000, 0, "Akhawiyat", "03 773 860"],
  24: [350000, 0, "Akhawiyat", "03 773 860"],
  25: [300000, 0, "Akhawiyat", "03 773 860"],
  26: [800000, 500000, "Hammoura", "81 067 970"],
  27: [200000, 100000, "Joceline", "03 773 860"],
  28: [50000, 0, "Akhawiyat", "03 773 860"],
  29: [200000, 100000, "Chady Azar", "70 895 345"],
  30: [300000, 200000, "Chady Azar", "70 895 345"],
  31: [300000, 0, "AC Inflatables", ""],
  32: [200000, 0, "Sahel Alma", ""],
  33: [450000, 0, "Anthony Chidiac", "81 030 873"],
  34: [50000, 0, "Akhawiyat", "03 773 860"],
  35: [50000, 15000, "Play Aura", "70 938 434"],
  36: [50000, 35000, "Play Aura", "70 938 434"],
  37: [500000, 360000, "Jack Chewan", "70 161 814"]
};

products.forEach(product => {
  const financials = foodFinancials[product.id];
  if (!financials) { product.cost = null; return; }
  product.price = financials[0];
  product.cost = financials[1];
  product.provider = financials[2] || "—";
  product.contact = financials[3] || "";
});

const accents = { Food: "#f7dfcb", Sweets: "#f2dce5", Drinks: "#dcecf2", Snacks: "#eee4ca", Activities: "#dce9df" };
const categories = activitiesOnly ? [] : ["All", "Food", "Sweets", "Drinks", "Snacks"];
let activeCategory = activitiesOnly ? "Activities" : "All";
let cart = {};
let completedCart = null;
const ORDER_RESET_VERSION = "2026-09-10-001";
if (localStorage.getItem("kermessOrderResetVersion") !== ORDER_RESET_VERSION) {
  localStorage.setItem("kermessOrderNumber", "1");
  localStorage.setItem("kermessOrderResetVersion", ORDER_RESET_VERSION);
}
let orderNumber = Number(localStorage.getItem("kermessOrderNumber")) || 1;
let sales = JSON.parse(localStorage.getItem("kermessSales") || "[]");
let currentSaleRecorded = false;
let currentSaleId = null;
let lastReportSales = sales;
let invoiceData = [];
let editingSale = null;
let syncInProgress = false;
const cloud = window.KERMESS_CONFIG || {};
const cloudEnabled = Boolean(cloud.supabaseUrl && cloud.supabaseAnonKey);
const makeId = () => crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
const terminalId = localStorage.getItem("kermessTerminalId") || makeId();
localStorage.setItem("kermessTerminalId", terminalId);

// Upgrade sales created by earlier versions so they can safely synchronize once.
sales = sales.map(sale => ({ ...sale, id: sale.id || makeId(), synced: sale.synced === true }));
localStorage.setItem("kermessSales", JSON.stringify(sales));

const $ = (selector) => document.querySelector(selector);
const formatLbp = (amount) => `${new Intl.NumberFormat("en-US").format(amount)} LBP`;
const formatUsd = (amount) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount / EXCHANGE_RATE);

function renderTabs() {
  $("#categoryTabs").innerHTML = categories.map(category =>
    `<button class="category-button ${category === activeCategory ? "active" : ""}" data-category="${category}" type="button">${category}</button>`
  ).join("");
}

function filteredProducts() {
  const term = $("#searchInput").value.trim().toLowerCase();
  return products.filter(item => {
    const belongsToPage = activitiesOnly ? item.category === "Activities" : item.category !== "Activities";
    return belongsToPage && (activeCategory === "All" || item.category === activeCategory) && item.name.toLowerCase().includes(term);
  });
}

function renderProducts() {
  const visible = filteredProducts();
  $("#resultCount").textContent = `${visible.length} ${visible.length === 1 ? "item" : "items"}`;
  $("#emptyProducts").hidden = visible.length !== 0;
  $("#productGrid").innerHTML = visible.map(item => `
    <button class="product-card" data-id="${item.id}" style="--card-accent:${accents[item.category]}" type="button" aria-label="Add ${item.name}">
      <span class="product-icon">${item.icon}</span>
      <h3>${item.name}</h3>
      <span class="product-price">${formatLbp(item.price)}</span>
      <span class="add-badge">+</span>
      ${cart[item.id] ? `<span class="product-quantity">${cart[item.id]}</span>` : ""}
    </button>
  `).join("");
}

function cartDetails(source = cart) {
  return products.filter(item => source[item.id]).map(item => ({ ...item, quantity: source[item.id] }));
}

function productBelongsToPage(productId) {
  const product = products.find(candidate => candidate.id === Number(productId));
  return Boolean(product && (activitiesOnly ? product.category === "Activities" : product.category !== "Activities"));
}

function renderCart() {
  const items = cartDetails();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  $("#orderNumber").textContent = editingSale ? `· Editing #${String(editingSale.displayNumber).padStart(3, "0")}` : `#${String(orderNumber).padStart(3, "0")}`;
  $("#emptyCart").hidden = items.length > 0;
  $("#cartItems").hidden = items.length === 0;
  $("#clearOrder").disabled = items.length === 0 && !editingSale;
  $("#clearOrder").textContent = editingSale ? "Cancel edit" : "Clear";
  $("#completeSale").disabled = items.length === 0;
  $("#itemCount").textContent = itemCount;
  $("#totalLbp").textContent = formatLbp(total);
  $("#totalUsd").textContent = formatUsd(total);
  $("#cartItems").innerHTML = items.map(item => `
    <article class="cart-row">
      <div class="cart-info">
        <h3>${item.name}</h3>
        <p>${formatLbp(item.price)} each</p>
      </div>
      <div class="cart-right">
        <div class="quantity-control">
          <button data-action="decrease" data-id="${item.id}" aria-label="Remove one ${item.name}">−</button>
          <span>${item.quantity}</span>
          <button data-action="increase" data-id="${item.id}" aria-label="Add one ${item.name}">+</button>
        </div>
        <span class="line-total">${new Intl.NumberFormat("en-US").format(item.price * item.quantity)}</span>
      </div>
    </article>
  `).join("");
  renderProducts();
}

function changeQuantity(id, amount) {
  currentSaleRecorded = false;
  cart[id] = (cart[id] || 0) + amount;
  if (cart[id] <= 0) delete cart[id];
  renderCart();
}

function showCompletedSale() {
  const items = cartDetails();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  completedCart = { items, count, total, orderNumber: editingSale?.displayNumber || orderNumber };
  $("#saleTitle").textContent = editingSale ? "Confirm invoice changes" : "Enter customer payment";
  $("#newOrder").textContent = editingSale ? "Save changes" : "Confirm sale & new order";
  $("#modalSummary").innerHTML = `${editingSale ? "Updating" : "Order"} #${String(completedCart.orderNumber).padStart(3, "0")} · ${count} ${count === 1 ? "item" : "items"}<br><strong>${formatLbp(total)} · ${formatUsd(total)}</strong>`;
  $("#paymentAmount").value = "";
  $("#detectedCurrency").textContent = "—";
  $("#changeResult").hidden = true;
  $("#newOrder").disabled = true;
  $("#saleModal").hidden = false;
  setTimeout(() => $("#paymentAmount").focus(), 50);
}

function closeSale() { $("#saleModal").hidden = true; }

function startNewOrder() {
  const payment = calculateChange();
  if (!completedCart || !payment || payment.changeLbp < 0) return;
  if (!currentSaleRecorded) {
    currentSaleId ||= makeId();
    const hiddenItems = editingSale ? editingSale.originalItems.filter(item => !productBelongsToPage(item.id)) : [];
    const updatedItems = [...hiddenItems, ...completedCart.items.map(({ id, quantity, price }) => ({ id, quantity, price }))];
    sales = sales.filter(sale => sale.id !== currentSaleId);
    sales.push({ id: currentSaleId, orderNumber: editingSale?.localOrderNumber || orderNumber, terminalId: editingSale?.terminalId || terminalId, synced: false, completedAt: editingSale?.completedAt || new Date().toISOString(), payment, items: updatedItems });
    localStorage.setItem("kermessSales", JSON.stringify(sales));
    currentSaleRecorded = true;
    syncPendingSales();
  }
  cart = {};
  if (!editingSale) {
    orderNumber += 1;
    localStorage.setItem("kermessOrderNumber", orderNumber);
  }
  editingSale = null;
  currentSaleRecorded = false;
  currentSaleId = null;
  completedCart = null;
  closeSale();
  renderCart();
}

function calculateChange() {
  const raw = $("#paymentAmount").value.replace(/,/g, "").replace(/\s/g, "");
  const amount = Number(raw);
  if (!raw || !Number.isFinite(amount) || amount < 0) {
    $("#detectedCurrency").textContent = "—";
    $("#changeResult").hidden = true;
    $("#newOrder").disabled = true;
    return null;
  }
  const currency = amount <= 999 ? "USD" : "LBP";
  const tenderedLbp = currency === "USD" ? Math.round(amount * EXCHANGE_RATE) : Math.round(amount);
  const changeLbp = tenderedLbp - completedCart.total;
  const enough = changeLbp >= 0;
  $("#detectedCurrency").textContent = currency;
  $("#changeResult").hidden = false;
  $("#changeResult").classList.toggle("insufficient", !enough);
  $("#changeLabel").textContent = enough ? "Change to return" : "Amount still due";
  $("#changeLbp").textContent = formatLbp(Math.abs(changeLbp));
  $("#changeUsd").textContent = formatUsd(Math.abs(changeLbp));
  $("#newOrder").disabled = !enough;
  return { enteredAmount: amount, enteredCurrency: currency, tenderedLbp, changeLbp };
}

function formatPaymentAmount() {
  const input = $("#paymentAmount");
  const cleaned = input.value.replace(/,/g, "").replace(/[^0-9.]/g, "");
  const parts = cleaned.split(".");
  let whole = parts.shift() || "";
  const decimal = parts.join("").slice(0, 2);
  whole = whole.replace(/^0+(?=\d)/, "");
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  input.value = grouped + (cleaned.includes(".") ? `.${decimal}` : "");
  calculateChange();
}

function reportData(source = sales) {
  const totals = {};
  source.forEach(sale => sale.items.forEach(item => {
    totals[item.id] ||= { quantity: 0, revenue: 0 };
    totals[item.id].quantity += item.quantity;
    totals[item.id].revenue += item.price * item.quantity;
  }));
  return products.filter(item => totals[item.id]).map(item => {
    const { quantity, revenue } = totals[item.id];
    const payment = item.cost == null ? null : item.cost * quantity;
    return { ...item, quantity, revenue, payment, profit: payment == null ? null : revenue - payment };
  });
}

function renderReport(source = sales) {
  const relevantSales = source
    .map(sale => ({ ...sale, items: sale.items.filter(item => productBelongsToPage(item.id)) }))
    .filter(sale => sale.items.length);
  lastReportSales = relevantSales;
  const rows = reportData(relevantSales);
  const sold = rows.reduce((sum, row) => sum + row.quantity, 0);
  const revenue = rows.reduce((sum, row) => sum + row.revenue, 0);
  const payment = rows.reduce((sum, row) => sum + (row.payment || 0), 0);
  const profit = rows.reduce((sum, row) => sum + (row.profit || 0), 0);
  const pending = rows.some(row => row.payment == null);
  $("#reportTimestamp").textContent = `Updated ${new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short" }).format(new Date())} · ${relevantSales.length} completed orders`;
  $("#reportStats").innerHTML = `<div class="stat-card"><span>Items sold</span><strong>${sold}</strong></div><div class="stat-card"><span>Pay providers</span><strong>${formatLbp(payment)}${pending ? "*" : ""}</strong></div><div class="stat-card profit"><span>Profit</span><strong>${formatLbp(profit)}${pending ? "*" : ""}</strong></div><div class="stat-card cashier"><span>Cashier total</span><strong>${formatLbp(revenue)}</strong><small>${formatUsd(revenue)}</small></div>`;
  $("#emptyReport").hidden = rows.length !== 0;
  $("#reportRows").innerHTML = rows.map(row => `<tr><td>${row.name}</td><td title="${row.contact || ""}">${row.provider || "Pending"}</td><td>${row.quantity}</td><td>${formatLbp(row.price)}</td><td>${row.cost == null ? '<span class="pending-value">Pending</span>' : formatLbp(row.cost)}</td><td>${row.cost == null ? '<span class="pending-value">Pending</span>' : formatLbp(row.price - row.cost)}</td><td>${row.payment == null ? '<span class="pending-value">Pending</span>' : formatLbp(row.payment)}</td><td>${row.profit == null ? '<span class="pending-value">Pending</span>' : formatLbp(row.profit)}</td></tr>`).join("");
  $("#reportTotals").innerHTML = rows.length ? `<tr><td colspan="2">TOTAL</td><td>${sold}</td><td>—</td><td>—</td><td>—</td><td>${formatLbp(payment)}${pending ? "*" : ""}</td><td>${formatLbp(profit)}${pending ? "*" : ""}</td></tr>` : "";
}

async function openReport() {
  $("#reportModal").hidden = false;
  $("#reportSyncStatus").textContent = cloudEnabled ? "Loading combined report…" : "Local device report";
  renderReport(sales);
  const combined = await loadCombinedSales();
  renderReport(combined);
  const queued = sales.filter(sale => !sale.synced).length;
  $("#reportSyncStatus").textContent = cloudEnabled ? (queued ? `${queued} sale${queued === 1 ? "" : "s"} waiting to sync` : "All devices synchronized") : "Cloud not configured · local report only";
}
function closeReport() { $("#reportModal").hidden = true; }

function exportReport() {
  const heading = ["Item", "Provider", "Contact", "Items sold", "Sale price LBP", "Provider per item LBP", "Profit per item LBP", "Total to provider LBP", "Total profit LBP"];
  const body = reportData(lastReportSales).map(row => [row.name, row.provider || "Pending", row.contact || "", row.quantity, row.price, row.cost ?? "Pending", row.cost == null ? "Pending" : row.price - row.cost, row.payment ?? "Pending", row.profit ?? "Pending"]);
  const csv = [heading, ...body].map(row => row.map(value => `"${String(value).replaceAll('"', '""')}"`).join(",")).join("\n");
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  link.download = `kermess-sales-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}

function renderInvoices() {
  const term = $("#invoiceSearch").value.trim().toLowerCase();
  const visible = invoiceData.filter(sale => {
    const pageItems = sale.items.filter(item => productBelongsToPage(item.id));
    const names = pageItems.map(item => products.find(product => product.id === Number(item.id))?.name || "").join(" ");
    return pageItems.length && `${sale.orderNumber} ${sale.localOrderNumber || ""} ${names}`.toLowerCase().includes(term);
  }).sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
  $("#emptyInvoices").hidden = visible.length !== 0;
  $("#invoiceList").innerHTML = visible.map(sale => {
    const pageItems = sale.items.filter(item => productBelongsToPage(item.id));
    const count = pageItems.reduce((sum, item) => sum + item.quantity, 0);
    const total = pageItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemText = pageItems.map(item => `${item.quantity} × ${products.find(product => product.id === Number(item.id))?.name || `Item ${item.id}`}`).join(" · ");
    const date = new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short" }).format(new Date(sale.completedAt));
    return `<article class="invoice-entry"><div class="invoice-reference"><strong>Order #${String(sale.orderNumber).padStart(3, "0")}</strong><span>${date}</span></div><div class="invoice-items"><p>${itemText}</p><small>${count} ${count === 1 ? "item" : "items"}</small></div><div class="invoice-actions"><strong>${formatLbp(total)}</strong><button class="edit-invoice-button" data-edit-invoice="${sale.id}" type="button">Edit invoice</button></div></article>`;
  }).join("");
}

async function openInvoices() {
  $("#invoicesModal").hidden = false;
  $("#invoiceSearch").value = "";
  $("#invoicesStatus").textContent = cloudEnabled ? "Loading invoices from all devices…" : "Showing invoices saved on this device";
  invoiceData = await loadCombinedSales();
  renderInvoices();
  const count = invoiceData.filter(sale => sale.items.some(item => productBelongsToPage(item.id))).length;
  $("#invoicesStatus").textContent = `${count} completed ${count === 1 ? "invoice" : "invoices"} · ${cloudEnabled && navigator.onLine ? "All devices" : "This device"}`;
}

function closeInvoices() { $("#invoicesModal").hidden = true; }

function editInvoice(saleId) {
  const sale = invoiceData.find(candidate => candidate.id === saleId);
  if (!sale) return;
  cart = {};
  sale.items.filter(item => productBelongsToPage(item.id)).forEach(item => { cart[item.id] = item.quantity; });
  editingSale = { id: sale.id, displayNumber: sale.orderNumber, localOrderNumber: sale.localOrderNumber || sale.orderNumber, terminalId: sale.terminalId, completedAt: sale.completedAt, originalItems: sale.items };
  currentSaleId = sale.id;
  currentSaleRecorded = false;
  completedCart = null;
  closeInvoices();
  renderCart();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function clearOrCancelOrder() {
  cart = {};
  currentSaleRecorded = false;
  currentSaleId = null;
  editingSale = null;
  completedCart = null;
  renderCart();
}

function setSyncStatus(state, text) {
  $("#syncDot").className = `status-dot ${state}`.trim();
  $("#syncStatus").textContent = text;
}

  async function supabaseRequest(path, options = {}) {
  const response = await fetch(`${cloud.supabaseUrl.replace(/\/$/, "")}/rest/v1/${path}`, {
    ...options,
    headers: { apikey: cloud.supabaseAnonKey, Authorization: `Bearer ${cloud.supabaseAnonKey}`, "Content-Type": "application/json", ...(options.headers || {}) }
  });
  if (!response.ok) throw new Error(`Cloud request failed (${response.status})`);
  const body = await response.text();
  return body ? JSON.parse(body) : null;
}

async function syncPendingSales() {
  if (!cloudEnabled) { setSyncStatus("offline", "Cloud not configured"); return; }
  if (!navigator.onLine) { setSyncStatus("offline", "Offline · sales queued"); return; }
  if (syncInProgress) return;
  const pending = sales.filter(sale => !sale.synced);
  if (!pending.length) { setSyncStatus("", "All sales synced"); return; }
  syncInProgress = true;
  setSyncStatus("syncing", `Syncing ${pending.length} sale${pending.length === 1 ? "" : "s"}…`);
  try {
    const payload = pending.map(sale => ({ id: sale.id, terminal_id: sale.terminalId || terminalId, local_order_number: sale.orderNumber, completed_at: sale.completedAt, items: sale.items }));
    await supabaseRequest("sales_orders?on_conflict=id", { method: "POST", headers: { Prefer: "resolution=merge-duplicates,return=minimal" }, body: JSON.stringify(payload) });
    const ids = new Set(pending.map(sale => sale.id));
    sales = sales.map(sale => ids.has(sale.id) ? { ...sale, synced: true } : sale);
    localStorage.setItem("kermessSales", JSON.stringify(sales));
    setSyncStatus("", "All sales synced");
  } catch (error) {
    setSyncStatus("offline", "Saved offline · sync pending");
    console.warn(error);
  } finally { syncInProgress = false; }
}

async function loadCombinedSales() {
  if (!cloudEnabled || !navigator.onLine) return sales;
  await syncPendingSales();
  try {
    const remote = [];
    const pageSize = 1000;
    for (let offset = 0; ; offset += pageSize) {
      const page = await supabaseRequest(`sales_orders?select=id,order_number,local_order_number,terminal_id,completed_at,items&order=completed_at.asc&limit=${pageSize}&offset=${offset}`);
      remote.push(...page);
      if (page.length < pageSize) break;
    }
    const serverSales = remote.map(row => ({ id: row.id, orderNumber: row.order_number, localOrderNumber: row.local_order_number, terminalId: row.terminal_id, completedAt: row.completed_at, items: row.items, synced: true }));
    const pending = sales.filter(sale => !sale.synced);
    const pendingIds = new Set(pending.map(sale => sale.id));
    return [...serverSales.filter(sale => !pendingIds.has(sale.id)), ...pending];
  } catch (error) {
    console.warn(error);
    return sales;
  }
}

function updateConnectionStatus() {
  if (!cloudEnabled) setSyncStatus("offline", "Cloud not configured");
  else if (!navigator.onLine) setSyncStatus("offline", "Offline · sales queued");
  else syncPendingSales();
}


$("#categoryTabs").addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  renderTabs();
  renderProducts();
});
$("#productGrid").addEventListener("click", event => {
  const card = event.target.closest("[data-id]");
  if (card) changeQuantity(card.dataset.id, 1);
});
$("#cartItems").addEventListener("click", event => {
  const button = event.target.closest("[data-action]");
  if (button) changeQuantity(button.dataset.id, button.dataset.action === "increase" ? 1 : -1);
});
$("#searchInput").addEventListener("input", renderProducts);
$("#clearOrder").addEventListener("click", clearOrCancelOrder);
$("#completeSale").addEventListener("click", showCompletedSale);
$("#closeModal").addEventListener("click", closeSale);
$(".modal-backdrop").addEventListener("click", closeSale);
$("#newOrder").addEventListener("click", startNewOrder);
$("#paymentAmount").addEventListener("input", formatPaymentAmount);
$("#paymentAmount").addEventListener("keydown", event => { if (event.key === "Enter" && !$("#newOrder").disabled) startNewOrder(); });
$("#openReport").addEventListener("click", openReport);
$("#closeReport").addEventListener("click", closeReport);
$("#reportModal .modal-backdrop").addEventListener("click", closeReport);
$("#exportReport").addEventListener("click", exportReport);
$("#openInvoices").addEventListener("click", openInvoices);
$("#closeInvoices").addEventListener("click", closeInvoices);
$("#invoicesModal .modal-backdrop").addEventListener("click", closeInvoices);
$("#invoiceSearch").addEventListener("input", renderInvoices);
$("#invoiceList").addEventListener("click", event => {
  const button = event.target.closest("[data-edit-invoice]");
  if (button) editInvoice(button.dataset.editInvoice);
});
document.addEventListener("keydown", event => {
  if (event.key === "/" && document.activeElement !== $("#searchInput")) { event.preventDefault(); $("#searchInput").focus(); }
  if (event.key === "Escape") { closeSale(); closeReport(); closeInvoices(); }
});

function updateClock() {
  $("#clock").textContent = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit" }).format(new Date());
}

renderTabs();
renderCart();
if (activitiesOnly) {
  document.title = "Kermess Games POS";
  $(".catalog-heading h1").textContent = "Choose an activity";
}
updateClock();
setInterval(updateClock, 30000);
window.addEventListener("online", syncPendingSales);
window.addEventListener("offline", updateConnectionStatus);
updateConnectionStatus();
setInterval(syncPendingSales, 15000);
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  navigator.serviceWorker.register("./sw.js?v=21", { updateViaCache: "none" }).catch(error => console.warn("Offline cache unavailable", error));
}
