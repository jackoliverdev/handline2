-- Secure multi-admin user management.
-- Run manually in the Supabase SQL editor after deploying the related application code.

ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS invited_by TEXT,
  ADD COLUMN IF NOT EXISTS invited_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS suspended_by TEXT,
  ADD COLUMN IF NOT EXISTS suspended_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMPTZ;

ALTER TABLE public.users
  DROP CONSTRAINT IF EXISTS users_role_check,
  ADD CONSTRAINT users_role_check CHECK (role IN ('admin', 'user')),
  DROP CONSTRAINT IF EXISTS users_status_check,
  ADD CONSTRAINT users_status_check CHECK (status IN ('invited', 'active', 'suspended'));

CREATE TABLE IF NOT EXISTS public.admin_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_firebase_uid TEXT NOT NULL,
  actor_email TEXT,
  action TEXT NOT NULL,
  target_firebase_uid TEXT,
  target_email TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS admin_audit_log_created_at_idx ON public.admin_audit_log (created_at DESC);
CREATE INDEX IF NOT EXISTS admin_audit_log_target_uid_idx ON public.admin_audit_log (target_firebase_uid);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow authenticated users to read all users" ON public.users;
DROP POLICY IF EXISTS "Allow users to update their own data" ON public.users;
DROP POLICY IF EXISTS "Allow users to update their own preferences" ON public.users;
DROP POLICY IF EXISTS "Allow public user creation" ON public.users;
DROP POLICY IF EXISTS "Allow service role to manage all users" ON public.users;

CREATE POLICY "Service role manages users"
  ON public.users
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role manages admin audit log"
  ON public.admin_audit_log
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

REVOKE ALL ON TABLE public.users FROM anon, authenticated;
REVOKE ALL ON TABLE public.admin_audit_log FROM anon, authenticated;

-- After deployment, bootstrap existing admin users so their Firebase custom claims
-- are synchronised by the new authenticated admin API on first use.
