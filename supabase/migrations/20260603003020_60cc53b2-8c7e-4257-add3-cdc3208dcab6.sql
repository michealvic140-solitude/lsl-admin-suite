
-- Ensure every profile has a referral_code (generate for existing rows)
UPDATE public.profiles
SET referral_code = upper(substr(replace(gen_random_uuid()::text,'-',''),1,8))
WHERE referral_code IS NULL OR referral_code = '';

-- Update handle_new_user to assign a referral_code at signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, phone, discord_username, country, server, gang_name, gang_type, referral_code)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email,'@',1)),
    NEW.email,
    NEW.raw_user_meta_data->>'phone',
    NEW.raw_user_meta_data->>'discord_username',
    NEW.raw_user_meta_data->>'country',
    COALESCE(NEW.raw_user_meta_data->>'server','LOMITA AFR'),
    NEW.raw_user_meta_data->>'gang_name',
    NULLIF(NEW.raw_user_meta_data->>'gang_type','')::public.gang_type,
    upper(substr(replace(gen_random_uuid()::text,'-',''),1,8))
  );
  IF NEW.email = 'lomitashootersleague@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  ELSE
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'viewer');
  END IF;
  RETURN NEW;
END;
$function$;

-- Implement apply_referral_code for real
CREATE OR REPLACE FUNCTION public.apply_referral_code(_code text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  _uid uuid := auth.uid();
  _referrer uuid;
  _enabled boolean;
  _bonus_referrer bigint;
  _bonus_referee bigint;
  _existing uuid;
BEGIN
  IF _uid IS NULL THEN RAISE EXCEPTION 'auth required'; END IF;
  IF _code IS NULL OR length(trim(_code)) = 0 THEN RETURN jsonb_build_object('ok',false,'reason','empty'); END IF;

  SELECT COALESCE(referral_enabled,true),
         COALESCE(referral_bonus_referrer,0),
         COALESCE(referral_bonus_referee,0)
  INTO _enabled, _bonus_referrer, _bonus_referee
  FROM public.app_settings WHERE id=1;

  IF NOT COALESCE(_enabled,true) THEN
    RETURN jsonb_build_object('ok',false,'reason','disabled');
  END IF;

  SELECT id INTO _referrer FROM public.profiles WHERE upper(referral_code) = upper(trim(_code)) LIMIT 1;
  IF _referrer IS NULL THEN RETURN jsonb_build_object('ok',false,'reason','invalid_code'); END IF;
  IF _referrer = _uid THEN RETURN jsonb_build_object('ok',false,'reason','self'); END IF;

  SELECT referred_by INTO _existing FROM public.profiles WHERE id=_uid;
  IF _existing IS NOT NULL THEN RETURN jsonb_build_object('ok',false,'reason','already_referred'); END IF;

  UPDATE public.profiles SET referred_by = _referrer WHERE id = _uid;

  INSERT INTO public.referrals(referrer_id, referred_id, bonus_paid)
  VALUES (_referrer, _uid, COALESCE(_bonus_referrer,0))
  ON CONFLICT (referrer_id, referred_id) DO NOTHING;

  IF COALESCE(_bonus_referrer,0) > 0 THEN
    UPDATE public.profiles SET token_balance = token_balance + _bonus_referrer WHERE id = _referrer;
    INSERT INTO public.token_transactions(user_id, amount, kind, note)
    VALUES (_referrer, _bonus_referrer, 'referral_bonus', 'Referral bonus for inviting a new user');
    INSERT INTO public.notifications(user_id, title, body)
    VALUES (_referrer, 'Referral bonus', 'You received '||_bonus_referrer||' tokens for inviting a new user.');
  END IF;

  IF COALESCE(_bonus_referee,0) > 0 THEN
    UPDATE public.profiles SET token_balance = token_balance + _bonus_referee WHERE id = _uid;
    INSERT INTO public.token_transactions(user_id, amount, kind, note)
    VALUES (_uid, _bonus_referee, 'referral_signup_bonus', 'Welcome bonus for using a referral code');
  END IF;

  RETURN jsonb_build_object('ok',true,'referrer',_referrer,'bonus_referrer',_bonus_referrer,'bonus_referee',_bonus_referee);
END $function$;

GRANT EXECUTE ON FUNCTION public.apply_referral_code(text) TO authenticated;
