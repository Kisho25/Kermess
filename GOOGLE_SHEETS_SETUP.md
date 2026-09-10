# Google Sheets automatic report setup

This connects spreadsheet `1hyHAxrLELHvrinB6Ao_UHGSytGLjcE5T1xMZZQCxePQ` to the existing Supabase sales database. The POS remains unchanged and offline sales continue to queue normally.

1. Open the Google Sheet.
2. Choose **Extensions → Apps Script**.
3. Delete the sample `myFunction` code.
4. Copy all of `google-sheets-sync.gs` into the editor.
5. In `saveSupabaseSettings`, replace `PASTE_YOUR_SB_PUBLISHABLE_KEY_HERE` with the `sb_publishable_...` value from `config.js`.
6. Click **Save**.
7. Select `saveSupabaseSettings` in the function menu and click **Run**. Approve Google's permissions.
8. Select `setupKermessSync` and click **Run** once.

The script creates **Sales Log** and **Item Report** tabs and refreshes them from Supabase approximately every minute. It rebuilds the tabs from sale UUIDs, so synchronization retries cannot duplicate data.

To download a computer copy, open the Google Sheet and choose **File → Download → Microsoft Excel (.xlsx)** or **Comma-separated values (.csv)**.

Do not paste a Supabase secret/service-role key into Apps Script. Use only the publishable key already used by the POS.
