-- Add missing match columns used across virtual/admin code
ALTER TABLE public.matches
  ADD COLUMN IF NOT EXISTS lock_time timestamptz,
  ADD COLUMN IF NOT EXISTS locked_at timestamptz,
  ADD COLUMN IF NOT EXISTS locked_by uuid,
  ADD COLUMN IF NOT EXISTS settled_at timestamptz,
  ADD COLUMN IF NOT EXISTS settled_by uuid,
  ADD COLUMN IF NOT EXISTS virtual_round_batch_id uuid,
  ADD COLUMN IF NOT EXISTS virtual_first_blood_team_id uuid;

-- Recreate hot_bets_v1 as an aggregated trending-bets view
DROP VIEW IF EXISTS public.hot_bets_v1;

CREATE VIEW public.hot_bets_v1
WITH (security_invoker = true)
AS
SELECT
  bs.match_id,
  COALESCE(m.name, '') AS match_name,
  COALESCE(bs.market_name, '') AS market_name,
  COALESCE(bs.selection_label, '') AS selection_label,
  AVG(bs.locked_odds)::numeric AS avg_odds,
  COUNT(DISTINCT b.user_id) AS users_count,
  COUNT(*) AS bets_count,
  COALESCE(SUM(b.stake), 0)::numeric AS total_stake
FROM public.bet_selections bs
JOIN public.bets b ON b.id = bs.bet_id
LEFT JOIN public.matches m ON m.id = bs.match_id
GROUP BY bs.match_id, m.name, bs.market_name, bs.selection_label;

GRANT SELECT ON public.hot_bets_v1 TO anon, authenticated;
GRANT ALL ON public.hot_bets_v1 TO service_role;