export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      ads: {
        Row: {
          created_at: string
          id: string
          image_url: string | null
          is_active: boolean | null
          link_url: string | null
          title: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          link_url?: string | null
          title?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          link_url?: string | null
          title?: string | null
        }
        Relationships: []
      }
      advertisements: {
        Row: {
          created_at: string
          id: string
          image_url: string | null
          is_active: boolean
          link_url: string | null
          title: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          link_url?: string | null
          title: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          link_url?: string | null
          title?: string
        }
        Relationships: []
      }
      announcements: {
        Row: {
          body: string | null
          created_at: string
          id: string
          image_url: string | null
          is_active: boolean
          title: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          title: string
        }
        Update: {
          body?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          title?: string
        }
        Relationships: []
      }
      app_settings: {
        Row: {
          about_us: string | null
          contact_email: string | null
          contact_phone: string | null
          contact_whatsapp: string | null
          daily_login_reward: number | null
          emblem_auto_approve: boolean
          force_reload_at: string | null
          hall_of_fame_reset_at: string | null
          hero_tagline: string | null
          id: number
          leaderboard_gangs_reset_at: string | null
          leaderboard_shooters_reset_at: string | null
          maintenance_message: string | null
          maintenance_mode: boolean
          max_payout: number | null
          min_stake: number
          popup_ad_active: boolean
          popup_ad_image: string | null
          popup_ad_link: string | null
          popup_ad_size: string
          popup_ad_text: string | null
          referral_bonus_referee: number
          referral_bonus_referrer: number
          referral_enabled: boolean
          terms_content: string | null
          updated_at: string
          vapid_private_key: string | null
          vapid_public_key: string | null
          vapid_subject: string | null
          virtual_concurrent_rounds: number
          virtual_cycle_seconds: number | null
          virtual_enabled: boolean | null
          virtual_max_payout: number
          virtual_min_stake: number
          virtual_round_duration_seconds: number
          why_trust_us: string | null
          xp_per_bet: number | null
          xp_per_login: number
          xp_per_referral: number
          xp_per_win: number | null
        }
        Insert: {
          about_us?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          contact_whatsapp?: string | null
          daily_login_reward?: number | null
          emblem_auto_approve?: boolean
          force_reload_at?: string | null
          hall_of_fame_reset_at?: string | null
          hero_tagline?: string | null
          id?: number
          leaderboard_gangs_reset_at?: string | null
          leaderboard_shooters_reset_at?: string | null
          maintenance_message?: string | null
          maintenance_mode?: boolean
          max_payout?: number | null
          min_stake?: number
          popup_ad_active?: boolean
          popup_ad_image?: string | null
          popup_ad_link?: string | null
          popup_ad_size?: string
          popup_ad_text?: string | null
          referral_bonus_referee?: number
          referral_bonus_referrer?: number
          referral_enabled?: boolean
          terms_content?: string | null
          updated_at?: string
          vapid_private_key?: string | null
          vapid_public_key?: string | null
          vapid_subject?: string | null
          virtual_concurrent_rounds?: number
          virtual_cycle_seconds?: number | null
          virtual_enabled?: boolean | null
          virtual_max_payout?: number
          virtual_min_stake?: number
          virtual_round_duration_seconds?: number
          why_trust_us?: string | null
          xp_per_bet?: number | null
          xp_per_login?: number
          xp_per_referral?: number
          xp_per_win?: number | null
        }
        Update: {
          about_us?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          contact_whatsapp?: string | null
          daily_login_reward?: number | null
          emblem_auto_approve?: boolean
          force_reload_at?: string | null
          hall_of_fame_reset_at?: string | null
          hero_tagline?: string | null
          id?: number
          leaderboard_gangs_reset_at?: string | null
          leaderboard_shooters_reset_at?: string | null
          maintenance_message?: string | null
          maintenance_mode?: boolean
          max_payout?: number | null
          min_stake?: number
          popup_ad_active?: boolean
          popup_ad_image?: string | null
          popup_ad_link?: string | null
          popup_ad_size?: string
          popup_ad_text?: string | null
          referral_bonus_referee?: number
          referral_bonus_referrer?: number
          referral_enabled?: boolean
          terms_content?: string | null
          updated_at?: string
          vapid_private_key?: string | null
          vapid_public_key?: string | null
          vapid_subject?: string | null
          virtual_concurrent_rounds?: number
          virtual_cycle_seconds?: number | null
          virtual_enabled?: boolean | null
          virtual_max_payout?: number
          virtual_min_stake?: number
          virtual_round_duration_seconds?: number
          why_trust_us?: string | null
          xp_per_bet?: number | null
          xp_per_login?: number
          xp_per_referral?: number
          xp_per_win?: number | null
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          actor_id: string | null
          created_at: string
          id: string
          meta: Json | null
          metadata: Json | null
          target_id: string | null
          target_type: string | null
        }
        Insert: {
          action: string
          actor_id?: string | null
          created_at?: string
          id?: string
          meta?: Json | null
          metadata?: Json | null
          target_id?: string | null
          target_type?: string | null
        }
        Update: {
          action?: string
          actor_id?: string | null
          created_at?: string
          id?: string
          meta?: Json | null
          metadata?: Json | null
          target_id?: string | null
          target_type?: string | null
        }
        Relationships: []
      }
      ban_appeals: {
        Row: {
          admin_response: string | null
          created_at: string
          id: string
          message: string
          reviewed_at: string | null
          status: string
          user_id: string
        }
        Insert: {
          admin_response?: string | null
          created_at?: string
          id?: string
          message: string
          reviewed_at?: string | null
          status?: string
          user_id: string
        }
        Update: {
          admin_response?: string | null
          created_at?: string
          id?: string
          message?: string
          reviewed_at?: string | null
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      bet_selections: {
        Row: {
          bet_id: string
          created_at: string
          id: string
          locked_odds: number
          market_id: string
          market_name: string | null
          match_id: string | null
          odd_id: string
          result: string | null
          selection_label: string
          stake_share: number | null
        }
        Insert: {
          bet_id: string
          created_at?: string
          id?: string
          locked_odds: number
          market_id: string
          market_name?: string | null
          match_id?: string | null
          odd_id: string
          result?: string | null
          selection_label: string
          stake_share?: number | null
        }
        Update: {
          bet_id?: string
          created_at?: string
          id?: string
          locked_odds?: number
          market_id?: string
          market_name?: string | null
          match_id?: string | null
          odd_id?: string
          result?: string | null
          selection_label?: string
          stake_share?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "bet_selections_bet_id_fkey"
            columns: ["bet_id"]
            isOneToOne: false
            referencedRelation: "bets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bet_selections_market_id_fkey"
            columns: ["market_id"]
            isOneToOne: false
            referencedRelation: "markets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bet_selections_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bet_selections_odd_id_fkey"
            columns: ["odd_id"]
            isOneToOne: false
            referencedRelation: "odds"
            referencedColumns: ["id"]
          },
        ]
      }
      bets: {
        Row: {
          booking_code: string
          cashed_out_at: string | null
          cashout_amount: number | null
          created_at: string
          id: string
          potential_payout: number
          settled_at: string | null
          stake: number
          status: Database["public"]["Enums"]["bet_status"]
          total_odds: number
          tracking_id: string
          user_id: string
        }
        Insert: {
          booking_code?: string
          cashed_out_at?: string | null
          cashout_amount?: number | null
          created_at?: string
          id?: string
          potential_payout: number
          settled_at?: string | null
          stake: number
          status?: Database["public"]["Enums"]["bet_status"]
          total_odds: number
          tracking_id?: string
          user_id: string
        }
        Update: {
          booking_code?: string
          cashed_out_at?: string | null
          cashout_amount?: number | null
          created_at?: string
          id?: string
          potential_payout?: number
          settled_at?: string | null
          stake?: number
          status?: Database["public"]["Enums"]["bet_status"]
          total_odds?: number
          tracking_id?: string
          user_id?: string
        }
        Relationships: []
      }
      broadcasts: {
        Row: {
          audience: string | null
          body: string | null
          created_at: string
          created_by: string | null
          id: string
          is_active: boolean | null
          title: string
        }
        Insert: {
          audience?: string | null
          body?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          title: string
        }
        Update: {
          audience?: string | null
          body?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          title?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          icon: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          icon?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          icon?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      challenges: {
        Row: {
          created_at: string
          description: string | null
          ends_at: string | null
          id: string
          is_active: boolean | null
          kind: string | null
          reward_tokens: number | null
          reward_xp: number | null
          starts_at: string | null
          target: number | null
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          ends_at?: string | null
          id?: string
          is_active?: boolean | null
          kind?: string | null
          reward_tokens?: number | null
          reward_xp?: number | null
          starts_at?: string | null
          target?: number | null
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          ends_at?: string | null
          id?: string
          is_active?: boolean | null
          kind?: string | null
          reward_tokens?: number | null
          reward_xp?: number | null
          starts_at?: string | null
          target?: number | null
          title?: string
        }
        Relationships: []
      }
      chat_message_reactions: {
        Row: {
          created_at: string
          emoji: string
          id: string
          message_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          emoji: string
          id?: string
          message_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          emoji?: string
          id?: string
          message_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_message_reactions_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "chat_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          content: string | null
          created_at: string
          deleted_at: string | null
          deleted_by: string | null
          id: string
          image_url: string | null
          room: Database["public"]["Enums"]["chat_room"]
          user_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          image_url?: string | null
          room: Database["public"]["Enums"]["chat_room"]
          user_id: string
        }
        Update: {
          content?: string | null
          created_at?: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          image_url?: string | null
          room?: Database["public"]["Enums"]["chat_room"]
          user_id?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          banner_url: string | null
          created_at: string
          created_by: string | null
          description: string | null
          ends_at: string
          id: string
          is_active: boolean
          starts_at: string | null
          title: string
        }
        Insert: {
          banner_url?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          ends_at: string
          id?: string
          is_active?: boolean
          starts_at?: string | null
          title: string
        }
        Update: {
          banner_url?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          ends_at?: string
          id?: string
          is_active?: boolean
          starts_at?: string | null
          title?: string
        }
        Relationships: []
      }
      gang_emblems: {
        Row: {
          admin_note: string | null
          created_at: string
          id: string
          image_url: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          admin_note?: string | null
          created_at?: string
          id?: string
          image_url: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          admin_note?: string | null
          created_at?: string
          id?: string
          image_url?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: []
      }
      highlights: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          media_type: string
          media_url: string
          title: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          media_type?: string
          media_url: string
          title: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          media_type?: string
          media_url?: string
          title?: string
        }
        Relationships: []
      }
      house_transactions: {
        Row: {
          amount: number
          created_at: string
          created_by: string | null
          id: string
          kind: string
          note: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          created_by?: string | null
          id?: string
          kind: string
          note?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          created_by?: string | null
          id?: string
          kind?: string
          note?: string | null
        }
        Relationships: []
      }
      house_wallet: {
        Row: {
          balance: number | null
          id: number
          is_paused: boolean | null
          updated_at: string
        }
        Insert: {
          balance?: number | null
          id?: number
          is_paused?: boolean | null
          updated_at?: string
        }
        Update: {
          balance?: number | null
          id?: number
          is_paused?: boolean | null
          updated_at?: string
        }
        Relationships: []
      }
      leaderboard_overrides: {
        Row: {
          draws: number
          id: string
          is_hidden: boolean
          kind: string
          losses: number
          manual_rank: number | null
          name: string
          played: number
          points: number
          top_player: string | null
          updated_at: string
          wins: number
        }
        Insert: {
          draws?: number
          id?: string
          is_hidden?: boolean
          kind: string
          losses?: number
          manual_rank?: number | null
          name: string
          played?: number
          points?: number
          top_player?: string | null
          updated_at?: string
          wins?: number
        }
        Update: {
          draws?: number
          id?: string
          is_hidden?: boolean
          kind?: string
          losses?: number
          manual_rank?: number | null
          name?: string
          played?: number
          points?: number
          top_player?: string | null
          updated_at?: string
          wins?: number
        }
        Relationships: []
      }
      markets: {
        Row: {
          created_at: string
          id: string
          is_locked: boolean
          is_open: boolean
          match_id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_locked?: boolean
          is_open?: boolean
          match_id: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          is_locked?: boolean
          is_open?: boolean
          match_id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "markets_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
        ]
      }
      matches: {
        Row: {
          away_score: number
          away_team_id: string
          category_id: string | null
          created_at: string
          created_by: string | null
          home_score: number
          home_team_id: string
          id: string
          is_archived: boolean
          is_featured: boolean
          is_virtual: boolean
          location: string | null
          lock_time: string | null
          locked_at: string | null
          locked_by: string | null
          name: string
          settled_at: string | null
          settled_by: string | null
          start_time: string
          status: Database["public"]["Enums"]["match_status"]
          updated_at: string
          virtual_first_blood_team_id: string | null
          virtual_round_batch_id: string | null
          winner_team_id: string | null
        }
        Insert: {
          away_score?: number
          away_team_id: string
          category_id?: string | null
          created_at?: string
          created_by?: string | null
          home_score?: number
          home_team_id: string
          id?: string
          is_archived?: boolean
          is_featured?: boolean
          is_virtual?: boolean
          location?: string | null
          lock_time?: string | null
          locked_at?: string | null
          locked_by?: string | null
          name: string
          settled_at?: string | null
          settled_by?: string | null
          start_time: string
          status?: Database["public"]["Enums"]["match_status"]
          updated_at?: string
          virtual_first_blood_team_id?: string | null
          virtual_round_batch_id?: string | null
          winner_team_id?: string | null
        }
        Update: {
          away_score?: number
          away_team_id?: string
          category_id?: string | null
          created_at?: string
          created_by?: string | null
          home_score?: number
          home_team_id?: string
          id?: string
          is_archived?: boolean
          is_featured?: boolean
          is_virtual?: boolean
          location?: string | null
          lock_time?: string | null
          locked_at?: string | null
          locked_by?: string | null
          name?: string
          settled_at?: string | null
          settled_by?: string | null
          start_time?: string
          status?: Database["public"]["Enums"]["match_status"]
          updated_at?: string
          virtual_first_blood_team_id?: string | null
          virtual_round_batch_id?: string | null
          winner_team_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "matches_away_team_id_fkey"
            columns: ["away_team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_home_team_id_fkey"
            columns: ["home_team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_winner_team_id_fkey"
            columns: ["winner_team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_prefs: {
        Row: {
          bet_updates: boolean | null
          email_enabled: boolean | null
          promo_updates: boolean | null
          push_enabled: boolean | null
          updated_at: string
          user_id: string
        }
        Insert: {
          bet_updates?: boolean | null
          email_enabled?: boolean | null
          promo_updates?: boolean | null
          push_enabled?: boolean | null
          updated_at?: string
          user_id: string
        }
        Update: {
          bet_updates?: boolean | null
          email_enabled?: boolean | null
          promo_updates?: boolean | null
          push_enabled?: boolean | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string
          id: string
          is_read: boolean
          link: string | null
          title: string
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          id?: string
          is_read?: boolean
          link?: string | null
          title: string
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string
          id?: string
          is_read?: boolean
          link?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      odds: {
        Row: {
          id: string
          is_winner: boolean | null
          label: string
          market_id: string
          updated_at: string
          value: number
        }
        Insert: {
          id?: string
          is_winner?: boolean | null
          label: string
          market_id: string
          updated_at?: string
          value: number
        }
        Update: {
          id?: string
          is_winner?: boolean | null
          label?: string
          market_id?: string
          updated_at?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "odds_market_id_fkey"
            columns: ["market_id"]
            isOneToOne: false
            referencedRelation: "markets"
            referencedColumns: ["id"]
          },
        ]
      }
      players: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: string
          is_substitute: boolean
          name: string
          position: string | null
          team_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          is_substitute?: boolean
          name: string
          position?: string | null
          team_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          is_substitute?: boolean
          name?: string
          position?: string | null
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "players_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          accepted_terms: boolean
          avatar_url: string | null
          ban_reason: string | null
          chat_color: string | null
          country: string | null
          created_at: string
          discord_username: string | null
          email: string
          emblem_status: string | null
          force_logout_at: string | null
          full_name: string
          gang_emblem_url: string | null
          gang_name: string | null
          gang_type: Database["public"]["Enums"]["gang_type"] | null
          id: string
          ingame_name: string | null
          is_banned: boolean
          is_muted: boolean
          is_restricted: boolean
          last_login_date: string | null
          longest_streak: number | null
          mute_reason: string | null
          phone: string | null
          profile_banner_url: string | null
          profile_title: string | null
          referral_code: string | null
          referred_by: string | null
          restrict_reason: string | null
          server: string | null
          showcase_achievement_ids: string[] | null
          streak_days: number | null
          token_balance: number
          updated_at: string
          vip_tier: number | null
          xp: number | null
        }
        Insert: {
          accepted_terms?: boolean
          avatar_url?: string | null
          ban_reason?: string | null
          chat_color?: string | null
          country?: string | null
          created_at?: string
          discord_username?: string | null
          email: string
          emblem_status?: string | null
          force_logout_at?: string | null
          full_name: string
          gang_emblem_url?: string | null
          gang_name?: string | null
          gang_type?: Database["public"]["Enums"]["gang_type"] | null
          id: string
          ingame_name?: string | null
          is_banned?: boolean
          is_muted?: boolean
          is_restricted?: boolean
          last_login_date?: string | null
          longest_streak?: number | null
          mute_reason?: string | null
          phone?: string | null
          profile_banner_url?: string | null
          profile_title?: string | null
          referral_code?: string | null
          referred_by?: string | null
          restrict_reason?: string | null
          server?: string | null
          showcase_achievement_ids?: string[] | null
          streak_days?: number | null
          token_balance?: number
          updated_at?: string
          vip_tier?: number | null
          xp?: number | null
        }
        Update: {
          accepted_terms?: boolean
          avatar_url?: string | null
          ban_reason?: string | null
          chat_color?: string | null
          country?: string | null
          created_at?: string
          discord_username?: string | null
          email?: string
          emblem_status?: string | null
          force_logout_at?: string | null
          full_name?: string
          gang_emblem_url?: string | null
          gang_name?: string | null
          gang_type?: Database["public"]["Enums"]["gang_type"] | null
          id?: string
          ingame_name?: string | null
          is_banned?: boolean
          is_muted?: boolean
          is_restricted?: boolean
          last_login_date?: string | null
          longest_streak?: number | null
          mute_reason?: string | null
          phone?: string | null
          profile_banner_url?: string | null
          profile_title?: string | null
          referral_code?: string | null
          referred_by?: string | null
          restrict_reason?: string | null
          server?: string | null
          showcase_achievement_ids?: string[] | null
          streak_days?: number | null
          token_balance?: number
          updated_at?: string
          vip_tier?: number | null
          xp?: number | null
        }
        Relationships: []
      }
      promo_code_requests: {
        Row: {
          admin_note: string | null
          amount: number
          created_at: string
          generated_code: string | null
          id: string
          promo_id: string | null
          reason: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          usage_limit: number
          user_id: string
        }
        Insert: {
          admin_note?: string | null
          amount: number
          created_at?: string
          generated_code?: string | null
          id?: string
          promo_id?: string | null
          reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          usage_limit?: number
          user_id: string
        }
        Update: {
          admin_note?: string | null
          amount?: number
          created_at?: string
          generated_code?: string | null
          id?: string
          promo_id?: string | null
          reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          usage_limit?: number
          user_id?: string
        }
        Relationships: []
      }
      promo_codes: {
        Row: {
          amount: number
          code: string
          created_at: string
          created_by: string | null
          expires_at: string | null
          id: string
          is_active: boolean
          usage_limit: number
          used_count: number
        }
        Insert: {
          amount: number
          code: string
          created_at?: string
          created_by?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean
          usage_limit?: number
          used_count?: number
        }
        Update: {
          amount?: number
          code?: string
          created_at?: string
          created_by?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean
          usage_limit?: number
          used_count?: number
        }
        Relationships: []
      }
      promo_redemptions: {
        Row: {
          amount: number
          created_at: string
          id: string
          promo_id: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          promo_id: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          promo_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "promo_redemptions_promo_id_fkey"
            columns: ["promo_id"]
            isOneToOne: false
            referencedRelation: "promo_codes"
            referencedColumns: ["id"]
          },
        ]
      }
      push_subscriptions: {
        Row: {
          auth: string | null
          created_at: string
          enabled: boolean
          endpoint: string
          id: string
          p256dh: string | null
          user_id: string
        }
        Insert: {
          auth?: string | null
          created_at?: string
          enabled?: boolean
          endpoint: string
          id?: string
          p256dh?: string | null
          user_id: string
        }
        Update: {
          auth?: string | null
          created_at?: string
          enabled?: boolean
          endpoint?: string
          id?: string
          p256dh?: string | null
          user_id?: string
        }
        Relationships: []
      }
      referrals: {
        Row: {
          bonus_paid: number | null
          created_at: string
          id: string
          referred_id: string
          referrer_id: string
        }
        Insert: {
          bonus_paid?: number | null
          created_at?: string
          id?: string
          referred_id: string
          referrer_id: string
        }
        Update: {
          bonus_paid?: number | null
          created_at?: string
          id?: string
          referred_id?: string
          referrer_id?: string
        }
        Relationships: []
      }
      season_points: {
        Row: {
          created_at: string
          id: string
          points: number | null
          season_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          points?: number | null
          season_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          points?: number | null
          season_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "season_points_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
        ]
      }
      seasons: {
        Row: {
          banner_url: string | null
          created_at: string
          description: string | null
          ends_at: string | null
          id: string
          is_active: boolean | null
          name: string
          starts_at: string | null
        }
        Insert: {
          banner_url?: string | null
          created_at?: string
          description?: string | null
          ends_at?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          starts_at?: string | null
        }
        Update: {
          banner_url?: string | null
          created_at?: string
          description?: string | null
          ends_at?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          starts_at?: string | null
        }
        Relationships: []
      }
      spotlights: {
        Row: {
          created_at: string
          created_by: string | null
          expires_at: string | null
          headline: string
          id: string
          is_active: boolean | null
          message: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          expires_at?: string | null
          headline: string
          id?: string
          is_active?: boolean | null
          message?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          expires_at?: string | null
          headline?: string
          id?: string
          is_active?: boolean | null
          message?: string | null
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          assigned_to: string | null
          created_at: string
          id: string
          status: Database["public"]["Enums"]["ticket_status"]
          subject: string
          updated_at: string
          user_id: string
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string
          id?: string
          status?: Database["public"]["Enums"]["ticket_status"]
          subject: string
          updated_at?: string
          user_id: string
        }
        Update: {
          assigned_to?: string | null
          created_at?: string
          id?: string
          status?: Database["public"]["Enums"]["ticket_status"]
          subject?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      teams: {
        Row: {
          created_at: string
          gang_type: Database["public"]["Enums"]["gang_type"] | null
          id: string
          logo_url: string | null
          name: string
        }
        Insert: {
          created_at?: string
          gang_type?: Database["public"]["Enums"]["gang_type"] | null
          id?: string
          logo_url?: string | null
          name: string
        }
        Update: {
          created_at?: string
          gang_type?: Database["public"]["Enums"]["gang_type"] | null
          id?: string
          logo_url?: string | null
          name?: string
        }
        Relationships: []
      }
      ticket_messages: {
        Row: {
          content: string | null
          created_at: string
          id: string
          image_url: string | null
          is_ai: boolean
          ticket_id: string
          user_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          is_ai?: boolean
          ticket_id: string
          user_id: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          is_ai?: boolean
          ticket_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_messages_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      token_requests: {
        Row: {
          amount: number
          created_at: string
          id: string
          note: string | null
          proof_image_url: string | null
          review_note: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["token_request_status"]
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          note?: string | null
          proof_image_url?: string | null
          review_note?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["token_request_status"]
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          note?: string | null
          proof_image_url?: string | null
          review_note?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["token_request_status"]
          user_id?: string
        }
        Relationships: []
      }
      token_transactions: {
        Row: {
          amount: number
          balance_after: number
          created_at: string
          description: string | null
          id: string
          kind: string
          metadata: Json | null
          user_id: string
        }
        Insert: {
          amount: number
          balance_after: number
          created_at?: string
          description?: string | null
          id?: string
          kind: string
          metadata?: Json | null
          user_id: string
        }
        Update: {
          amount?: number
          balance_after?: number
          created_at?: string
          description?: string | null
          id?: string
          kind?: string
          metadata?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_key: string
          awarded_at: string
          code: string | null
          id: string
          user_id: string
        }
        Insert: {
          achievement_key: string
          awarded_at?: string
          code?: string | null
          id?: string
          user_id: string
        }
        Update: {
          achievement_key?: string
          awarded_at?: string
          code?: string | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      user_challenge_progress: {
        Row: {
          challenge_id: string
          claimed_at: string | null
          created_at: string
          id: string
          progress: number | null
          user_id: string
        }
        Insert: {
          challenge_id: string
          claimed_at?: string | null
          created_at?: string
          id?: string
          progress?: number | null
          user_id: string
        }
        Update: {
          challenge_id?: string
          claimed_at?: string | null
          created_at?: string
          id?: string
          progress?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_challenge_progress_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          assigned_by: string | null
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          assigned_by?: string | null
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          assigned_by?: string | null
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_sessions: {
        Row: {
          last_seen: string
          route: string | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          last_seen?: string
          route?: string | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          last_seen?: string
          route?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_tasks: {
        Row: {
          claimed_at: string | null
          created_at: string
          id: string
          progress: number | null
          status: string
          task_key: string
          title: string | null
          user_id: string
        }
        Insert: {
          claimed_at?: string | null
          created_at?: string
          id?: string
          progress?: number | null
          status?: string
          task_key: string
          title?: string | null
          user_id: string
        }
        Update: {
          claimed_at?: string | null
          created_at?: string
          id?: string
          progress?: number | null
          status?: string
          task_key?: string
          title?: string | null
          user_id?: string
        }
        Relationships: []
      }
      virtual_house_transactions: {
        Row: {
          amount: number
          created_at: string
          id: string
          kind: string
          note: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          kind: string
          note?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          kind?: string
          note?: string | null
        }
        Relationships: []
      }
      virtual_house_wallet: {
        Row: {
          balance: number | null
          cycle_seconds: number | null
          id: number
          is_locked: boolean | null
          updated_at: string
        }
        Insert: {
          balance?: number | null
          cycle_seconds?: number | null
          id?: number
          is_locked?: boolean | null
          updated_at?: string
        }
        Update: {
          balance?: number | null
          cycle_seconds?: number | null
          id?: number
          is_locked?: boolean | null
          updated_at?: string
        }
        Relationships: []
      }
      virtual_payout_requests: {
        Row: {
          admin_note: string | null
          amount: number
          created_at: string
          id: string
          reviewed_at: string | null
          status: string
          user_id: string
        }
        Insert: {
          admin_note?: string | null
          amount: number
          created_at?: string
          id?: string
          reviewed_at?: string | null
          status?: string
          user_id: string
        }
        Update: {
          admin_note?: string | null
          amount?: number
          created_at?: string
          id?: string
          reviewed_at?: string | null
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      watchlist: {
        Row: {
          created_at: string
          entity_id: string | null
          entity_type: string | null
          id: string
          match_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          match_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          match_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "watchlist_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
        ]
      }
      watchlists: {
        Row: {
          created_at: string
          entity_id: string
          entity_type: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          entity_id: string
          entity_type: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          entity_id?: string
          entity_type?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      withdrawal_requests: {
        Row: {
          admin_note: string | null
          amount: number
          created_at: string
          gang_name: string
          id: string
          ingame_name: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["withdrawal_status"]
          ticket_ref: string | null
          user_id: string
        }
        Insert: {
          admin_note?: string | null
          amount: number
          created_at?: string
          gang_name: string
          id?: string
          ingame_name: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["withdrawal_status"]
          ticket_ref?: string | null
          user_id: string
        }
        Update: {
          admin_note?: string | null
          amount?: number
          created_at?: string
          gang_name?: string
          id?: string
          ingame_name?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["withdrawal_status"]
          ticket_ref?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      hot_bets_v1: {
        Row: {
          avg_odds: number | null
          bets_count: number | null
          market_name: string | null
          match_id: string | null
          match_name: string | null
          selection_label: string | null
          total_stake: number | null
          users_count: number | null
        }
        Relationships: [
          {
            foreignKeyName: "bet_selections_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      admin_adjust_xp: {
        Args: { _delta: number; _user_id: string }
        Returns: undefined
      }
      admin_broadcast: {
        Args: { _audience?: string; _body: string; _title: string }
        Returns: string
      }
      admin_delete_bet: {
        Args: { _bet_id: string; _reason?: string; _refund?: boolean }
        Returns: undefined
      }
      admin_exposure_per_match: {
        Args: never
        Returns: {
          exposure: number
          match_id: string
        }[]
      }
      admin_kick_user: { Args: { _user_id: string }; Returns: undefined }
      admin_lock_virtual_round: {
        Args: { _locked: boolean }
        Returns: undefined
      }
      admin_log_action: {
        Args: {
          _action: string
          _meta?: Json
          _target_id?: string
          _target_type?: string
        }
        Returns: undefined
      }
      admin_pnl_summary: { Args: never; Returns: Json }
      admin_refund_bet: { Args: { _bet_id: string }; Returns: Json }
      admin_review_virtual_payout: {
        Args: { _approve: boolean; _id: string; _note?: string }
        Returns: undefined
      }
      admin_risk_summary: { Args: never; Returns: Json }
      admin_set_virtual_cycle: {
        Args: { _seconds: number }
        Returns: undefined
      }
      admin_suspend_bet: {
        Args: { _bet_id: string; _reason?: string }
        Returns: undefined
      }
      admin_unsuspend_bet: { Args: { _bet_id: string }; Returns: undefined }
      admin_void_bet: { Args: { _bet_id: string }; Returns: Json }
      apply_referral_code: { Args: { _code: string }; Returns: Json }
      approve_promo_request: {
        Args: { _id: string; _note?: string }
        Returns: string
      }
      can_use_gang_chat: { Args: { _user_id: string }; Returns: boolean }
      claim_challenge: { Args: { _challenge_id: string }; Returns: Json }
      claim_daily_login: { Args: never; Returns: Json }
      claim_task: { Args: { _task_key: string }; Returns: Json }
      create_withdrawal_request: {
        Args: {
          _amount: number
          _gang: string
          _ingame: string
          _ticket?: string
        }
        Returns: string
      }
      decline_promo_request: {
        Args: { _id: string; _note?: string }
        Returns: undefined
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      house_manual_adjust: {
        Args: { _amount: number; _note: string }
        Returns: undefined
      }
      house_set_paused: { Args: { _paused: boolean }; Returns: undefined }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
      is_mod_or_admin: { Args: { _user_id: string }; Returns: boolean }
      place_virtual_ticket: { Args: { _payload: Json }; Returns: Json }
      redeem_promo_code: { Args: { _code: string }; Returns: Json }
      resolve_virtual_round: { Args: never; Returns: Json }
      review_gang_emblem: {
        Args: { _approve: boolean; _id: string; _note?: string }
        Returns: undefined
      }
      review_withdrawal_request: {
        Args: { _approve: boolean; _id: string; _note?: string }
        Returns: undefined
      }
      server_now: { Args: never; Returns: string }
      settle_pay_winning_bet: { Args: { _bet_id: string }; Returns: Json }
      toggle_market_lock: {
        Args: { _locked?: boolean; _match_id?: string }
        Returns: undefined
      }
      user_cashout_bet: { Args: { _bet_id: string }; Returns: Json }
      verify_xp_consistency: { Args: never; Returns: Json }
      virtual_tick: { Args: never; Returns: Json }
      virtual_wallet_admin_adjust: {
        Args: { _amount: number; _note: string }
        Returns: undefined
      }
      wipe_all_tokens: { Args: never; Returns: undefined }
    }
    Enums: {
      app_role:
        | "viewer"
        | "shooter"
        | "gang_leader"
        | "registered"
        | "moderator"
        | "admin"
        | "sponsor"
      bet_status: "open" | "won" | "lost" | "cashed_out" | "void" | "suspended"
      chat_room: "general" | "gang" | "moderator"
      gang_type: "G" | "F"
      match_status: "scheduled" | "live" | "ended" | "cancelled"
      ticket_status: "open" | "pending" | "resolved" | "closed"
      token_request_status: "pending" | "approved" | "denied"
      withdrawal_status: "pending" | "approved" | "declined"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "viewer",
        "shooter",
        "gang_leader",
        "registered",
        "moderator",
        "admin",
        "sponsor",
      ],
      bet_status: ["open", "won", "lost", "cashed_out", "void", "suspended"],
      chat_room: ["general", "gang", "moderator"],
      gang_type: ["G", "F"],
      match_status: ["scheduled", "live", "ended", "cancelled"],
      ticket_status: ["open", "pending", "resolved", "closed"],
      token_request_status: ["pending", "approved", "denied"],
      withdrawal_status: ["pending", "approved", "declined"],
    },
  },
} as const
