
-- app_settings: add missing tuning columns
ALTER TABLE public.app_settings
  ADD COLUMN IF NOT EXISTS xp_per_login integer NOT NULL DEFAULT 5,
  ADD COLUMN IF NOT EXISTS xp_per_referral integer NOT NULL DEFAULT 25,
  ADD COLUMN IF NOT EXISTS emblem_auto_approve boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS virtual_round_duration_seconds integer NOT NULL DEFAULT 180,
  ADD COLUMN IF NOT EXISTS virtual_concurrent_rounds integer NOT NULL DEFAULT 3,
  ADD COLUMN IF NOT EXISTS virtual_min_stake integer NOT NULL DEFAULT 1000,
  ADD COLUMN IF NOT EXISTS vapid_public_key text,
  ADD COLUMN IF NOT EXISTS vapid_private_key text,
  ADD COLUMN IF NOT EXISTS vapid_subject text;

-- matches: archive + virtual flags
ALTER TABLE public.matches
  ADD COLUMN IF NOT EXISTS is_archived boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS is_virtual boolean NOT NULL DEFAULT false;

-- leaderboard_overrides: hide flag
ALTER TABLE public.leaderboard_overrides
  ADD COLUMN IF NOT EXISTS is_hidden boolean NOT NULL DEFAULT false;

-- watchlists table (entity-style)
CREATE TABLE IF NOT EXISTS public.watchlists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  entity_type text NOT NULL,
  entity_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, entity_type, entity_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.watchlists TO authenticated;
GRANT ALL ON public.watchlists TO service_role;
ALTER TABLE public.watchlists ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='watchlists' AND policyname='watchlists_own') THEN
    CREATE POLICY watchlists_own ON public.watchlists
      FOR ALL TO authenticated
      USING (user_id = auth.uid())
      WITH CHECK (user_id = auth.uid());
  END IF;
END $$;
