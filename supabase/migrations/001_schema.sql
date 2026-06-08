-- Portal de Serviços de Limpeza - Database Schema
-- Run this SQL in your Supabase SQL Editor to create all required tables.

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- PROFESSIONALS TABLE
-- Stores cleaning professional profiles
-- ============================================================
CREATE TABLE IF NOT EXISTS professionals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  avatar TEXT NOT NULL DEFAULT '',
  bio TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  rating NUMERIC(3,2) NOT NULL DEFAULT 5.0,
  completed_jobs INTEGER NOT NULL DEFAULT 0,
  hourly_rate NUMERIC(10,2) NOT NULL DEFAULT 35,
  cleaning_types TEXT[] NOT NULL DEFAULT '{}',
  location TEXT NOT NULL DEFAULT '',
  experience_years INTEGER NOT NULL DEFAULT 0,
  availability TEXT[] NOT NULL DEFAULT '{}',
  gender TEXT NOT NULL DEFAULT 'Outro',
  is_verified BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- PROFESSIONAL REVIEWS TABLE
-- Stores reviews left by clients on professionals
-- ============================================================
CREATE TABLE IF NOT EXISTS professional_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  professional_id UUID NOT NULL REFERENCES professionals(id) ON DELETE CASCADE,
  reviewer_name TEXT NOT NULL DEFAULT '',
  rating NUMERIC(3,2) NOT NULL DEFAULT 5.0,
  comment TEXT NOT NULL DEFAULT '',
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_professional_reviews_professional_id ON professional_reviews(professional_id);

-- ============================================================
-- JOBS TABLE
-- Stores cleaning job postings
-- ============================================================
CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  client_name TEXT NOT NULL DEFAULT '',
  client_type TEXT NOT NULL DEFAULT 'residencial',
  phone TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  cleaning_type TEXT NOT NULL DEFAULT 'residencial',
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  time TEXT NOT NULL DEFAULT '08:00',
  duration_hours NUMERIC(5,1) NOT NULL DEFAULT 4,
  address TEXT NOT NULL DEFAULT '',
  size_sqm NUMERIC(8,2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'aberto',
  applicants TEXT[] NOT NULL DEFAULT '{}',
  assigned_to TEXT,
  extras TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- CHAT MESSAGES TABLE
-- Stores chat messages per job
-- ============================================================
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  sender TEXT NOT NULL DEFAULT 'client',
  sender_name TEXT NOT NULL DEFAULT '',
  text TEXT NOT NULL DEFAULT '',
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chat_messages_job_id ON chat_messages(job_id);

-- ============================================================
-- CLIENT REVIEWS TABLE
-- Stores reviews left by cleaners on clients
-- ============================================================
CREATE TABLE IF NOT EXISTS client_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name TEXT NOT NULL DEFAULT '',
  reviewer_name TEXT NOT NULL DEFAULT '',
  rating NUMERIC(3,2) NOT NULL DEFAULT 5.0,
  comment TEXT NOT NULL DEFAULT '',
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- ENABLE ROW LEVEL SECURITY (optional, for multi-tenant)
-- ============================================================
ALTER TABLE professionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE professional_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_reviews ENABLE ROW LEVEL SECURITY;

-- Open access policies (public read/write for this portal phase)
CREATE POLICY "Public access - professionals" ON professionals FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public access - professional_reviews" ON professional_reviews FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public access - jobs" ON jobs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public access - chat_messages" ON chat_messages FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public access - client_reviews" ON client_reviews FOR ALL USING (true) WITH CHECK (true);
