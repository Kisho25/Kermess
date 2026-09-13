# Kermess POS

A simple, offline-friendly point-of-sale website for the village festival.

## Run locally

Open `index.html` directly in a browser, or from this folder run:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

The menu and prices are stored near the top of `app.js`. Customer prices use the **Kermess Price** column and provider payments use the **Person Price** column. The USD equivalent uses a fixed exchange rate of 90,000 LBP per USD.

Completed sales are saved in the browser's local storage. Open **Sales report** to see quantity sold, cash collected, provider payment and profit for every item, or export the results as CSV.

Invoices use soft deletion. In **Invoices**, choose **Deleted invoices** from the Status filter to review or restore archived invoices. Deleted invoices do not contribute to website or Google Sheets calculations.

The POS is offline-first. It saves every completed sale on the current device immediately and, when configured, synchronizes it with a shared Supabase database. Follow [SUPABASE_SETUP.md](SUPABASE_SETUP.md) before using multiple devices.
