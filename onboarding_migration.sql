-- ScaleSteady Onboarding Submissions Table
CREATE TABLE IF NOT EXISTS onboarding_submissions (
  id                  uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at          timestamptz DEFAULT now() NOT NULL,
  company_name        text        NOT NULL,
  contact_name        text        NOT NULL,
  contact_details     text        NOT NULL,
  email_names         text[]      NOT NULL, -- Array of exactly 5 email names
  icp_description     text        NOT NULL,
  brand_signature     text        NOT NULL,
  campaign_offer      text        NOT NULL,
  core_deal_value     text        NOT NULL,
  geographic_target   text        NOT NULL,
  routing_destination text        NOT NULL
);

-- Enable Row Level Security (RLS) to safeguard database access
ALTER TABLE onboarding_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (enabling our public onboarding form to submit payloads seamlessly)
CREATE POLICY "allow_public_onboarding_insert" ON onboarding_submissions
  FOR INSERT TO anon
  WITH CHECK (true);
