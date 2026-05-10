export type Client = {
  id: string;
  slug: string;
  name: string;
  brand_color: string | null;
  logo_url: string | null;
  app_icon_url: string | null;
  pricing_kickoff: number | null;
  pricing_monthly_fixed: number | null;
  pricing_per_active_user: number | null;
  currency: string;
  notes: string | null;
  created_at: string;
  created_by: string | null;
  archived_at: string | null;
};

export type PresentationLink = {
  id: string;
  client_id: string;
  token: string;
  recipient_name: string | null;
  recipient_email: string | null;
  notes: string | null;
  expires_at: string | null;
  revoked_at: string | null;
  created_at: string;
  created_by: string | null;
};

export type DeckSession = {
  id: string;
  link_id: string;
  visitor_id: string | null;
  visitor_name: string | null;
  user_agent: string | null;
  referrer: string | null;
  ip_country: string | null;
  ip_region: string | null;
  ip_city: string | null;
  started_at: string;
  last_seen_at: string;
  ended_at: string | null;
  total_duration_ms: number;
  max_slide_index: number;
};

export type SlideEvent = {
  id: number;
  session_id: string;
  slide_id: string;
  slide_index: number | null;
  entered_at: string;
  exited_at: string | null;
  duration_ms: number | null;
  interactions: unknown[];
};
