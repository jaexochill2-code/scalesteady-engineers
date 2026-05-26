-- ScaleSteady bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id              uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at      timestamptz DEFAULT now() NOT NULL,
  line_of_business text       NOT NULL,
  preferred_date  date        NOT NULL,
  preferred_time  text        NOT NULL,
  contact_name    text        NOT NULL,
  phone_or_email  text        NOT NULL,
  questions       text
);

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (form submissions without auth)
CREATE POLICY "allow_public_insert" ON bookings
  FOR INSERT TO anon
  WITH CHECK (true);
