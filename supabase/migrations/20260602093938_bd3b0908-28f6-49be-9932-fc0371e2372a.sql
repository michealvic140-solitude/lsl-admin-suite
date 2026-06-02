-- Add referral configuration columns used by the admin referral panel
ALTER TABLE public.app_settings
  ADD COLUMN IF NOT EXISTS referral_enabled boolean NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS referral_bonus_referrer bigint NOT NULL DEFAULT 5000,
  ADD COLUMN IF NOT EXISTS referral_bonus_referee bigint NOT NULL DEFAULT 2500;