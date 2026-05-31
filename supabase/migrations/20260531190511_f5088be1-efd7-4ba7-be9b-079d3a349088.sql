
ALTER TABLE public.markets ADD COLUMN IF NOT EXISTS is_locked boolean NOT NULL DEFAULT false;

CREATE OR REPLACE FUNCTION public.toggle_market_lock(_match_id uuid DEFAULT NULL, _locked boolean DEFAULT true)
RETURNS void LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  UPDATE public.markets SET is_locked = _locked WHERE _match_id IS NULL OR match_id = _match_id;
$$;
GRANT EXECUTE ON FUNCTION public.toggle_market_lock(uuid, boolean) TO authenticated;
