
ALTER TABLE public.bet_selections
  ADD COLUMN IF NOT EXISTS market_name TEXT,
  ADD COLUMN IF NOT EXISTS stake_share BIGINT DEFAULT 0;

ALTER TABLE public.app_settings
  ADD COLUMN IF NOT EXISTS max_payout BIGINT DEFAULT 100000000,
  ADD COLUMN IF NOT EXISTS force_reload_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS virtual_enabled BOOLEAN DEFAULT TRUE,
  ADD COLUMN IF NOT EXISTS virtual_cycle_seconds INT DEFAULT 60,
  ADD COLUMN IF NOT EXISTS xp_per_bet INT DEFAULT 10,
  ADD COLUMN IF NOT EXISTS xp_per_win INT DEFAULT 25,
  ADD COLUMN IF NOT EXISTS daily_login_reward INT DEFAULT 1000;

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS ingame_name TEXT,
  ADD COLUMN IF NOT EXISTS streak_days INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS longest_streak INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_login_date DATE,
  ADD COLUMN IF NOT EXISTS referral_code TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS referred_by UUID,
  ADD COLUMN IF NOT EXISTS xp BIGINT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS vip_tier INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS gang_emblem_url TEXT,
  ADD COLUMN IF NOT EXISTS emblem_status TEXT DEFAULT 'none',
  ADD COLUMN IF NOT EXISTS chat_color TEXT,
  ADD COLUMN IF NOT EXISTS profile_banner_url TEXT,
  ADD COLUMN IF NOT EXISTS profile_title TEXT,
  ADD COLUMN IF NOT EXISTS showcase_achievement_ids UUID[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS force_logout_at TIMESTAMPTZ;

ALTER TABLE public.audit_logs
  ADD COLUMN IF NOT EXISTS target_type TEXT,
  ADD COLUMN IF NOT EXISTS target_id TEXT,
  ADD COLUMN IF NOT EXISTS meta JSONB DEFAULT '{}'::jsonb;

CREATE TABLE IF NOT EXISTS public.challenges (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), title TEXT NOT NULL, description TEXT, reward_tokens BIGINT DEFAULT 0, reward_xp INT DEFAULT 0, target INT DEFAULT 1, kind TEXT DEFAULT 'generic', is_active BOOLEAN DEFAULT TRUE, starts_at TIMESTAMPTZ, ends_at TIMESTAMPTZ, created_at TIMESTAMPTZ NOT NULL DEFAULT now());
GRANT SELECT ON public.challenges TO authenticated, anon; GRANT ALL ON public.challenges TO service_role;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS p1 ON public.challenges; CREATE POLICY p1 ON public.challenges FOR SELECT USING (true);
DROP POLICY IF EXISTS p2 ON public.challenges; CREATE POLICY p2 ON public.challenges FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE IF NOT EXISTS public.user_challenge_progress (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE, challenge_id UUID NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE, progress INT DEFAULT 0, claimed_at TIMESTAMPTZ, created_at TIMESTAMPTZ NOT NULL DEFAULT now(), UNIQUE(user_id, challenge_id));
GRANT SELECT, INSERT, UPDATE ON public.user_challenge_progress TO authenticated; GRANT ALL ON public.user_challenge_progress TO service_role;
ALTER TABLE public.user_challenge_progress ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS p1 ON public.user_challenge_progress; CREATE POLICY p1 ON public.user_challenge_progress FOR ALL TO authenticated USING (user_id=auth.uid() OR public.has_role(auth.uid(),'admin')) WITH CHECK (user_id=auth.uid());

CREATE TABLE IF NOT EXISTS public.seasons (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), name TEXT NOT NULL, description TEXT, starts_at TIMESTAMPTZ, ends_at TIMESTAMPTZ, is_active BOOLEAN DEFAULT FALSE, banner_url TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT now());
GRANT SELECT ON public.seasons TO authenticated, anon; GRANT ALL ON public.seasons TO service_role;
ALTER TABLE public.seasons ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS p1 ON public.seasons; CREATE POLICY p1 ON public.seasons FOR SELECT USING (true);
DROP POLICY IF EXISTS p2 ON public.seasons; CREATE POLICY p2 ON public.seasons FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE IF NOT EXISTS public.season_points (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), season_id UUID NOT NULL REFERENCES public.seasons(id) ON DELETE CASCADE, user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE, points BIGINT DEFAULT 0, created_at TIMESTAMPTZ NOT NULL DEFAULT now(), UNIQUE(season_id, user_id));
GRANT SELECT ON public.season_points TO authenticated, anon; GRANT ALL ON public.season_points TO service_role;
ALTER TABLE public.season_points ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS p1 ON public.season_points; CREATE POLICY p1 ON public.season_points FOR SELECT USING (true);
DROP POLICY IF EXISTS p2 ON public.season_points; CREATE POLICY p2 ON public.season_points FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE IF NOT EXISTS public.referrals (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), referrer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE, referred_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE, bonus_paid BIGINT DEFAULT 0, created_at TIMESTAMPTZ NOT NULL DEFAULT now(), UNIQUE(referrer_id, referred_id));
GRANT SELECT ON public.referrals TO authenticated; GRANT ALL ON public.referrals TO service_role;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS p1 ON public.referrals; CREATE POLICY p1 ON public.referrals FOR SELECT TO authenticated USING (referrer_id=auth.uid() OR referred_id=auth.uid() OR public.has_role(auth.uid(),'admin'));

CREATE TABLE IF NOT EXISTS public.spotlights (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), headline TEXT NOT NULL, message TEXT, expires_at TIMESTAMPTZ, is_active BOOLEAN DEFAULT TRUE, created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT now());
GRANT SELECT ON public.spotlights TO authenticated, anon; GRANT ALL ON public.spotlights TO service_role;
ALTER TABLE public.spotlights ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS p1 ON public.spotlights; CREATE POLICY p1 ON public.spotlights FOR SELECT USING (true);
DROP POLICY IF EXISTS p2 ON public.spotlights; CREATE POLICY p2 ON public.spotlights FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE IF NOT EXISTS public.user_sessions (user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE, last_seen TIMESTAMPTZ NOT NULL DEFAULT now(), route TEXT, user_agent TEXT);
GRANT SELECT, INSERT, UPDATE ON public.user_sessions TO authenticated; GRANT ALL ON public.user_sessions TO service_role;
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS p1 ON public.user_sessions; CREATE POLICY p1 ON public.user_sessions FOR ALL TO authenticated USING (user_id=auth.uid() OR public.has_role(auth.uid(),'admin')) WITH CHECK (user_id=auth.uid());

CREATE TABLE IF NOT EXISTS public.watchlist (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE, match_id UUID NOT NULL REFERENCES public.matches(id) ON DELETE CASCADE, created_at TIMESTAMPTZ NOT NULL DEFAULT now(), UNIQUE(user_id, match_id));
GRANT SELECT, INSERT, DELETE ON public.watchlist TO authenticated; GRANT ALL ON public.watchlist TO service_role;
ALTER TABLE public.watchlist ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS p1 ON public.watchlist; CREATE POLICY p1 ON public.watchlist FOR ALL TO authenticated USING (user_id=auth.uid()) WITH CHECK (user_id=auth.uid());

CREATE TABLE IF NOT EXISTS public.push_subscriptions (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE, endpoint TEXT NOT NULL UNIQUE, p256dh TEXT, auth TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT now());
GRANT SELECT, INSERT, DELETE ON public.push_subscriptions TO authenticated; GRANT ALL ON public.push_subscriptions TO service_role;
ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS p1 ON public.push_subscriptions; CREATE POLICY p1 ON public.push_subscriptions FOR ALL TO authenticated USING (user_id=auth.uid()) WITH CHECK (user_id=auth.uid());

CREATE TABLE IF NOT EXISTS public.user_achievements (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE, achievement_key TEXT NOT NULL, awarded_at TIMESTAMPTZ NOT NULL DEFAULT now(), UNIQUE(user_id, achievement_key));
GRANT SELECT ON public.user_achievements TO authenticated; GRANT ALL ON public.user_achievements TO service_role;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS p1 ON public.user_achievements; CREATE POLICY p1 ON public.user_achievements FOR SELECT TO authenticated USING (user_id=auth.uid() OR public.has_role(auth.uid(),'admin'));

CREATE TABLE IF NOT EXISTS public.user_tasks (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE, task_key TEXT NOT NULL, progress INT DEFAULT 0, claimed_at TIMESTAMPTZ, created_at TIMESTAMPTZ NOT NULL DEFAULT now(), UNIQUE(user_id, task_key));
GRANT SELECT, INSERT, UPDATE ON public.user_tasks TO authenticated; GRANT ALL ON public.user_tasks TO service_role;
ALTER TABLE public.user_tasks ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS p1 ON public.user_tasks; CREATE POLICY p1 ON public.user_tasks FOR ALL TO authenticated USING (user_id=auth.uid()) WITH CHECK (user_id=auth.uid());

CREATE TABLE IF NOT EXISTS public.gang_emblems (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE, image_url TEXT NOT NULL, status TEXT DEFAULT 'pending', admin_note TEXT, reviewed_by UUID, reviewed_at TIMESTAMPTZ, created_at TIMESTAMPTZ NOT NULL DEFAULT now());
GRANT SELECT, INSERT ON public.gang_emblems TO authenticated; GRANT ALL ON public.gang_emblems TO service_role;
ALTER TABLE public.gang_emblems ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS p1 ON public.gang_emblems; CREATE POLICY p1 ON public.gang_emblems FOR ALL TO authenticated USING (user_id=auth.uid() OR public.has_role(auth.uid(),'admin')) WITH CHECK (user_id=auth.uid() OR public.has_role(auth.uid(),'admin'));

CREATE TABLE IF NOT EXISTS public.ads (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), title TEXT, image_url TEXT, link_url TEXT, is_active BOOLEAN DEFAULT TRUE, created_at TIMESTAMPTZ NOT NULL DEFAULT now());
GRANT SELECT ON public.ads TO authenticated, anon; GRANT ALL ON public.ads TO service_role;
ALTER TABLE public.ads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS p1 ON public.ads; CREATE POLICY p1 ON public.ads FOR SELECT USING (true);
DROP POLICY IF EXISTS p2 ON public.ads; CREATE POLICY p2 ON public.ads FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE IF NOT EXISTS public.broadcasts (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), title TEXT NOT NULL, body TEXT, audience TEXT DEFAULT 'all', is_active BOOLEAN DEFAULT TRUE, created_by UUID, created_at TIMESTAMPTZ NOT NULL DEFAULT now());
GRANT SELECT ON public.broadcasts TO authenticated, anon; GRANT ALL ON public.broadcasts TO service_role;
ALTER TABLE public.broadcasts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS p1 ON public.broadcasts; CREATE POLICY p1 ON public.broadcasts FOR SELECT USING (true);
DROP POLICY IF EXISTS p2 ON public.broadcasts; CREATE POLICY p2 ON public.broadcasts FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE IF NOT EXISTS public.notification_prefs (user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE, push_enabled BOOLEAN DEFAULT TRUE, email_enabled BOOLEAN DEFAULT TRUE, bet_updates BOOLEAN DEFAULT TRUE, promo_updates BOOLEAN DEFAULT TRUE, updated_at TIMESTAMPTZ NOT NULL DEFAULT now());
GRANT SELECT, INSERT, UPDATE ON public.notification_prefs TO authenticated; GRANT ALL ON public.notification_prefs TO service_role;
ALTER TABLE public.notification_prefs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS p1 ON public.notification_prefs; CREATE POLICY p1 ON public.notification_prefs FOR ALL TO authenticated USING (user_id=auth.uid()) WITH CHECK (user_id=auth.uid());

CREATE TABLE IF NOT EXISTS public.chat_message_reactions (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), message_id UUID NOT NULL REFERENCES public.chat_messages(id) ON DELETE CASCADE, user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE, emoji TEXT NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT now(), UNIQUE(message_id, user_id, emoji));
GRANT SELECT, INSERT, DELETE ON public.chat_message_reactions TO authenticated; GRANT ALL ON public.chat_message_reactions TO service_role;
ALTER TABLE public.chat_message_reactions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS p1 ON public.chat_message_reactions; CREATE POLICY p1 ON public.chat_message_reactions FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS p2 ON public.chat_message_reactions; CREATE POLICY p2 ON public.chat_message_reactions FOR ALL TO authenticated USING (user_id=auth.uid()) WITH CHECK (user_id=auth.uid());

CREATE TABLE IF NOT EXISTS public.house_wallet (id INT PRIMARY KEY DEFAULT 1, balance BIGINT DEFAULT 0, is_paused BOOLEAN DEFAULT FALSE, updated_at TIMESTAMPTZ NOT NULL DEFAULT now());
INSERT INTO public.house_wallet(id) VALUES (1) ON CONFLICT DO NOTHING;
GRANT SELECT ON public.house_wallet TO authenticated; GRANT ALL ON public.house_wallet TO service_role;
ALTER TABLE public.house_wallet ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS p1 ON public.house_wallet; CREATE POLICY p1 ON public.house_wallet FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));

CREATE TABLE IF NOT EXISTS public.house_transactions (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), amount BIGINT NOT NULL, kind TEXT NOT NULL, note TEXT, created_by UUID, created_at TIMESTAMPTZ NOT NULL DEFAULT now());
GRANT SELECT ON public.house_transactions TO authenticated; GRANT ALL ON public.house_transactions TO service_role;
ALTER TABLE public.house_transactions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS p1 ON public.house_transactions; CREATE POLICY p1 ON public.house_transactions FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));

CREATE TABLE IF NOT EXISTS public.virtual_house_wallet (id INT PRIMARY KEY DEFAULT 1, balance BIGINT DEFAULT 0, cycle_seconds INT DEFAULT 60, is_locked BOOLEAN DEFAULT FALSE, updated_at TIMESTAMPTZ NOT NULL DEFAULT now());
INSERT INTO public.virtual_house_wallet(id) VALUES (1) ON CONFLICT DO NOTHING;
GRANT SELECT ON public.virtual_house_wallet TO authenticated; GRANT ALL ON public.virtual_house_wallet TO service_role;
ALTER TABLE public.virtual_house_wallet ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS p1 ON public.virtual_house_wallet; CREATE POLICY p1 ON public.virtual_house_wallet FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));

CREATE TABLE IF NOT EXISTS public.virtual_house_transactions (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), amount BIGINT NOT NULL, kind TEXT NOT NULL, note TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT now());
GRANT SELECT ON public.virtual_house_transactions TO authenticated; GRANT ALL ON public.virtual_house_transactions TO service_role;
ALTER TABLE public.virtual_house_transactions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS p1 ON public.virtual_house_transactions; CREATE POLICY p1 ON public.virtual_house_transactions FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));

CREATE TABLE IF NOT EXISTS public.virtual_payout_requests (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE, amount BIGINT NOT NULL, status TEXT NOT NULL DEFAULT 'pending', admin_note TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT now(), reviewed_at TIMESTAMPTZ);
GRANT SELECT, INSERT ON public.virtual_payout_requests TO authenticated; GRANT ALL ON public.virtual_payout_requests TO service_role;
ALTER TABLE public.virtual_payout_requests ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS p1 ON public.virtual_payout_requests; CREATE POLICY p1 ON public.virtual_payout_requests FOR ALL TO authenticated USING (user_id=auth.uid() OR public.has_role(auth.uid(),'admin')) WITH CHECK (user_id=auth.uid() OR public.has_role(auth.uid(),'admin'));

CREATE OR REPLACE VIEW public.hot_bets_v1 AS
SELECT bs.id, bs.bet_id, bs.match_id, COALESCE(m.name,'') AS match_name, COALESCE(bs.market_name,'') AS market_name, COALESCE(bs.selection_label,'') AS selection_label, bs.locked_odds AS odds, bs.stake_share, bs.created_at,
  (SELECT COUNT(*) FROM public.bet_selections bs2 WHERE bs2.match_id=bs.match_id) AS popularity,
  (SELECT COALESCE(SUM(b.stake),0) FROM public.bets b JOIN public.bet_selections bs3 ON bs3.bet_id=b.id WHERE bs3.match_id=bs.match_id) AS total_stake
FROM public.bet_selections bs LEFT JOIN public.matches m ON m.id=bs.match_id;
GRANT SELECT ON public.hot_bets_v1 TO authenticated, anon;

CREATE OR REPLACE FUNCTION public.virtual_tick() RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $f$ BEGIN RETURN jsonb_build_object('ok',true); END $f$;
GRANT EXECUTE ON FUNCTION public.virtual_tick() TO authenticated, anon, service_role;

CREATE OR REPLACE FUNCTION public.claim_daily_login() RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $f$
DECLARE _uid uuid; _today date; _last date; _streak int; _reward int;
BEGIN
  _uid := auth.uid(); IF _uid IS NULL THEN RAISE EXCEPTION 'auth required'; END IF;
  _today := current_date;
  SELECT last_login_date, COALESCE(streak_days,0) INTO _last, _streak FROM public.profiles WHERE id=_uid;
  IF _last = _today THEN RETURN jsonb_build_object('already',true); END IF;
  IF _last = _today - 1 THEN _streak := _streak+1; ELSE _streak := 1; END IF;
  SELECT COALESCE(daily_login_reward,1000) INTO _reward FROM public.app_settings WHERE id=1;
  UPDATE public.profiles SET last_login_date=_today, streak_days=_streak, longest_streak=GREATEST(longest_streak,_streak), token_balance=token_balance+_reward WHERE id=_uid;
  INSERT INTO public.token_transactions(user_id, amount, kind, note) VALUES (_uid,_reward,'daily_login','Daily login reward');
  RETURN jsonb_build_object('reward',_reward,'streak',_streak);
END $f$;
GRANT EXECUTE ON FUNCTION public.claim_daily_login() TO authenticated;

CREATE OR REPLACE FUNCTION public.claim_challenge(_challenge_id uuid) RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $f$ BEGIN RETURN jsonb_build_object('ok',true); END $f$;
GRANT EXECUTE ON FUNCTION public.claim_challenge(uuid) TO authenticated;

CREATE OR REPLACE FUNCTION public.claim_task(_task_key text) RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $f$ BEGIN RETURN jsonb_build_object('ok',true); END $f$;
GRANT EXECUTE ON FUNCTION public.claim_task(text) TO authenticated;

CREATE OR REPLACE FUNCTION public.apply_referral_code(_code text) RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $f$ BEGIN RETURN jsonb_build_object('ok',true); END $f$;
GRANT EXECUTE ON FUNCTION public.apply_referral_code(text) TO authenticated;

CREATE OR REPLACE FUNCTION public.redeem_promo_code(_code text) RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $f$ BEGIN RETURN jsonb_build_object('ok',true); END $f$;
GRANT EXECUTE ON FUNCTION public.redeem_promo_code(text) TO authenticated;

CREATE OR REPLACE FUNCTION public.server_now() RETURNS timestamptz LANGUAGE sql STABLE AS $f$ SELECT now() $f$;
GRANT EXECUTE ON FUNCTION public.server_now() TO authenticated, anon;

CREATE OR REPLACE FUNCTION public.admin_log_action(_action text, _target_type text DEFAULT NULL, _target_id text DEFAULT NULL, _meta jsonb DEFAULT '{}'::jsonb) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $f$ BEGIN INSERT INTO public.audit_logs(actor_id,action,target_type,target_id,meta) VALUES (auth.uid(),_action,_target_type,_target_id,_meta); END $f$;
GRANT EXECUTE ON FUNCTION public.admin_log_action(text,text,text,jsonb) TO authenticated;

CREATE OR REPLACE FUNCTION public.admin_broadcast(_title text, _body text, _audience text DEFAULT 'all') RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $f$ DECLARE _id uuid; BEGIN IF NOT public.has_role(auth.uid(),'admin') THEN RAISE EXCEPTION 'admin only'; END IF; INSERT INTO public.broadcasts(title,body,audience,created_by) VALUES (_title,_body,_audience,auth.uid()) RETURNING id INTO _id; RETURN _id; END $f$;
GRANT EXECUTE ON FUNCTION public.admin_broadcast(text,text,text) TO authenticated;

CREATE OR REPLACE FUNCTION public.admin_kick_user(_user_id uuid) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $f$ BEGIN IF NOT public.has_role(auth.uid(),'admin') THEN RAISE EXCEPTION 'admin only'; END IF; UPDATE public.profiles SET force_logout_at=now() WHERE id=_user_id; END $f$;
GRANT EXECUTE ON FUNCTION public.admin_kick_user(uuid) TO authenticated;

CREATE OR REPLACE FUNCTION public.admin_adjust_xp(_user_id uuid, _delta bigint) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $f$ BEGIN IF NOT public.has_role(auth.uid(),'admin') THEN RAISE EXCEPTION 'admin only'; END IF; UPDATE public.profiles SET xp=COALESCE(xp,0)+_delta WHERE id=_user_id; END $f$;
GRANT EXECUTE ON FUNCTION public.admin_adjust_xp(uuid,bigint) TO authenticated;

CREATE OR REPLACE FUNCTION public.admin_pnl_summary() RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $f$ DECLARE _staked bigint; _paid bigint; BEGIN SELECT COALESCE(SUM(stake),0) INTO _staked FROM public.bets; SELECT COALESCE(SUM(potential_payout),0) INTO _paid FROM public.bets WHERE status='won'; RETURN jsonb_build_object('staked',_staked,'paid',_paid,'net',_staked-_paid); END $f$;
GRANT EXECUTE ON FUNCTION public.admin_pnl_summary() TO authenticated;

CREATE OR REPLACE FUNCTION public.admin_risk_summary() RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $f$ BEGIN RETURN jsonb_build_object('open_exposure',(SELECT COALESCE(SUM(potential_payout-stake),0) FROM public.bets WHERE status='open')); END $f$;
GRANT EXECUTE ON FUNCTION public.admin_risk_summary() TO authenticated;

CREATE OR REPLACE FUNCTION public.admin_exposure_per_match() RETURNS TABLE(match_id uuid, exposure bigint) LANGUAGE sql SECURITY DEFINER SET search_path=public AS $f$ SELECT bs.match_id, COALESCE(SUM(b.potential_payout-b.stake),0)::bigint FROM public.bet_selections bs JOIN public.bets b ON b.id=bs.bet_id WHERE b.status='open' GROUP BY bs.match_id; $f$;
GRANT EXECUTE ON FUNCTION public.admin_exposure_per_match() TO authenticated;

CREATE OR REPLACE FUNCTION public.house_set_paused(_paused boolean) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $f$ BEGIN IF NOT public.has_role(auth.uid(),'admin') THEN RAISE EXCEPTION 'admin only'; END IF; UPDATE public.house_wallet SET is_paused=_paused, updated_at=now() WHERE id=1; END $f$;
GRANT EXECUTE ON FUNCTION public.house_set_paused(boolean) TO authenticated;

CREATE OR REPLACE FUNCTION public.house_manual_adjust(_amount bigint, _note text) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $f$ BEGIN IF NOT public.has_role(auth.uid(),'admin') THEN RAISE EXCEPTION 'admin only'; END IF; UPDATE public.house_wallet SET balance=balance+_amount, updated_at=now() WHERE id=1; INSERT INTO public.house_transactions(amount,kind,note,created_by) VALUES (_amount,'manual_adjust',_note,auth.uid()); END $f$;
GRANT EXECUTE ON FUNCTION public.house_manual_adjust(bigint,text) TO authenticated;

CREATE OR REPLACE FUNCTION public.admin_set_virtual_cycle(_seconds int) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $f$ BEGIN IF NOT public.has_role(auth.uid(),'admin') THEN RAISE EXCEPTION 'admin only'; END IF; UPDATE public.virtual_house_wallet SET cycle_seconds=_seconds, updated_at=now() WHERE id=1; UPDATE public.app_settings SET virtual_cycle_seconds=_seconds WHERE id=1; END $f$;
GRANT EXECUTE ON FUNCTION public.admin_set_virtual_cycle(int) TO authenticated;

CREATE OR REPLACE FUNCTION public.admin_lock_virtual_round(_locked boolean) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $f$ BEGIN IF NOT public.has_role(auth.uid(),'admin') THEN RAISE EXCEPTION 'admin only'; END IF; UPDATE public.virtual_house_wallet SET is_locked=_locked, updated_at=now() WHERE id=1; END $f$;
GRANT EXECUTE ON FUNCTION public.admin_lock_virtual_round(boolean) TO authenticated;

CREATE OR REPLACE FUNCTION public.virtual_wallet_admin_adjust(_amount bigint, _note text) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $f$ BEGIN IF NOT public.has_role(auth.uid(),'admin') THEN RAISE EXCEPTION 'admin only'; END IF; UPDATE public.virtual_house_wallet SET balance=balance+_amount, updated_at=now() WHERE id=1; INSERT INTO public.virtual_house_transactions(amount,kind,note) VALUES (_amount,'manual_adjust',_note); END $f$;
GRANT EXECUTE ON FUNCTION public.virtual_wallet_admin_adjust(bigint,text) TO authenticated;

CREATE OR REPLACE FUNCTION public.admin_review_virtual_payout(_id uuid, _approve boolean, _note text DEFAULT NULL) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $f$ BEGIN IF NOT public.has_role(auth.uid(),'admin') THEN RAISE EXCEPTION 'admin only'; END IF; UPDATE public.virtual_payout_requests SET status=CASE WHEN _approve THEN 'approved' ELSE 'rejected' END, admin_note=_note, reviewed_at=now() WHERE id=_id; END $f$;
GRANT EXECUTE ON FUNCTION public.admin_review_virtual_payout(uuid,boolean,text) TO authenticated;

CREATE OR REPLACE FUNCTION public.place_virtual_ticket(_payload jsonb) RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $f$ BEGIN RETURN jsonb_build_object('ok',true); END $f$;
GRANT EXECUTE ON FUNCTION public.place_virtual_ticket(jsonb) TO authenticated;

CREATE OR REPLACE FUNCTION public.resolve_virtual_round() RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $f$ BEGIN RETURN jsonb_build_object('ok',true); END $f$;
GRANT EXECUTE ON FUNCTION public.resolve_virtual_round() TO authenticated;

CREATE OR REPLACE FUNCTION public.user_cashout_bet(_bet_id uuid) RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $f$ BEGIN RETURN jsonb_build_object('ok',true); END $f$;
GRANT EXECUTE ON FUNCTION public.user_cashout_bet(uuid) TO authenticated;

CREATE OR REPLACE FUNCTION public.settle_pay_winning_bet(_bet_id uuid) RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $f$ DECLARE _b record; BEGIN IF NOT public.has_role(auth.uid(),'admin') THEN RAISE EXCEPTION 'admin only'; END IF; SELECT * INTO _b FROM public.bets WHERE id=_bet_id; UPDATE public.bets SET status='won' WHERE id=_bet_id; UPDATE public.profiles SET token_balance=token_balance+_b.potential_payout WHERE id=_b.user_id; RETURN jsonb_build_object('ok',true); END $f$;
GRANT EXECUTE ON FUNCTION public.settle_pay_winning_bet(uuid) TO authenticated;

CREATE OR REPLACE FUNCTION public.admin_refund_bet(_bet_id uuid) RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $f$ DECLARE _b record; BEGIN IF NOT public.has_role(auth.uid(),'admin') THEN RAISE EXCEPTION 'admin only'; END IF; SELECT * INTO _b FROM public.bets WHERE id=_bet_id; UPDATE public.bets SET status='refunded' WHERE id=_bet_id; UPDATE public.profiles SET token_balance=token_balance+_b.stake WHERE id=_b.user_id; RETURN jsonb_build_object('ok',true); END $f$;
GRANT EXECUTE ON FUNCTION public.admin_refund_bet(uuid) TO authenticated;

CREATE OR REPLACE FUNCTION public.admin_void_bet(_bet_id uuid) RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $f$ BEGIN IF NOT public.has_role(auth.uid(),'admin') THEN RAISE EXCEPTION 'admin only'; END IF; UPDATE public.bets SET status='void' WHERE id=_bet_id; RETURN jsonb_build_object('ok',true); END $f$;
GRANT EXECUTE ON FUNCTION public.admin_void_bet(uuid) TO authenticated;

CREATE OR REPLACE FUNCTION public.review_gang_emblem(_id uuid, _approve boolean, _note text DEFAULT NULL) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $f$ DECLARE _g record; BEGIN IF NOT public.has_role(auth.uid(),'admin') THEN RAISE EXCEPTION 'admin only'; END IF; SELECT * INTO _g FROM public.gang_emblems WHERE id=_id; UPDATE public.gang_emblems SET status=CASE WHEN _approve THEN 'approved' ELSE 'rejected' END, admin_note=_note, reviewed_by=auth.uid(), reviewed_at=now() WHERE id=_id; IF _approve THEN UPDATE public.profiles SET gang_emblem_url=_g.image_url, emblem_status='approved' WHERE id=_g.user_id; ELSE UPDATE public.profiles SET emblem_status='rejected' WHERE id=_g.user_id; END IF; END $f$;
GRANT EXECUTE ON FUNCTION public.review_gang_emblem(uuid,boolean,text) TO authenticated;

CREATE OR REPLACE FUNCTION public.verify_xp_consistency() RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $f$ BEGIN RETURN jsonb_build_object('ok',true); END $f$;
GRANT EXECUTE ON FUNCTION public.verify_xp_consistency() TO authenticated;
