
-- Leaderboard banner (admin-managed)
ALTER TABLE public.app_settings
  ADD COLUMN IF NOT EXISTS leaderboard_banner_url text,
  ADD COLUMN IF NOT EXISTS leaderboard_banner_description text,
  ADD COLUMN IF NOT EXISTS leaderboard_banner_link text;

-- Extend user_sessions for richer login info (one row per user)
ALTER TABLE public.user_sessions
  ADD COLUMN IF NOT EXISTS device text,
  ADD COLUMN IF NOT EXISTS browser text,
  ADD COLUMN IF NOT EXISTS login_at timestamptz NOT NULL DEFAULT now(),
  ADD COLUMN IF NOT EXISTS ip_address text;

-- Ensure one row per user (latest-only model)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'user_sessions_user_id_key'
  ) THEN
    -- Deduplicate before adding the unique constraint
    DELETE FROM public.user_sessions a
    USING public.user_sessions b
    WHERE a.ctid < b.ctid AND a.user_id = b.user_id;
    ALTER TABLE public.user_sessions ADD CONSTRAINT user_sessions_user_id_key UNIQUE (user_id);
  END IF;
END$$;
