# Connect the POS to Supabase

1. Create a Supabase project at <https://supabase.com/dashboard>.
2. Open **SQL Editor**, paste the contents of `supabase-setup.sql`, and run it once.
3. In **Project Settings → API**, copy the Project URL and publishable/anon key.
4. Paste those two values into `config.js`.
5. Upload the complete website folder to your web host.

Every device must open the same hosted website. Completed sales are written locally first, so the cashier can immediately continue. The POS synchronizes automatically at startup, when connectivity returns, and periodically while online.

The browser's publishable key is expected to be visible. Database access is controlled by the Row Level Security policies in `supabase-setup.sql`; never put a Supabase service-role key in `config.js`.
