-- Missing column on app_settings
ALTER TABLE public.app_settings
  ADD COLUMN IF NOT EXISTS virtual_max_payout bigint NOT NULL DEFAULT 50000000;

-- Missing columns on chat_messages (soft delete)
ALTER TABLE public.chat_messages
  ADD COLUMN IF NOT EXISTS deleted_at timestamptz,
  ADD COLUMN IF NOT EXISTS deleted_by uuid;

-- Missing columns on push_subscriptions
ALTER TABLE public.push_subscriptions
  ADD COLUMN IF NOT EXISTS enabled boolean NOT NULL DEFAULT true;

-- Missing columns on user_tasks
ALTER TABLE public.user_tasks
  ADD COLUMN IF NOT EXISTS title text,
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'pending';

-- Missing column on user_achievements
ALTER TABLE public.user_achievements
  ADD COLUMN IF NOT EXISTS code text;

-- Generic watchlist with entity_type/entity_id (the old single match_id stays)
ALTER TABLE public.watchlist
  ADD COLUMN IF NOT EXISTS entity_type text,
  ADD COLUMN IF NOT EXISTS entity_id uuid;