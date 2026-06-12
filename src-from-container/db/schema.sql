CREATE SCHEMA IF NOT EXISTS main;

CREATE TABLE IF NOT EXISTS main.target (
  id SMALLINT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  amount NUMERIC(14, 2) NOT NULL CHECK (amount > 0),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS main.donors (
  id TEXT PRIMARY KEY,
  donor_name TEXT NOT NULL DEFAULT 'Anonymous',
  transaction_ref TEXT,
  amount NUMERIC(14, 2) NOT NULL CHECK (amount > 0),
  date_time TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_donors_created_at ON main.donors(created_at DESC);
CREATE UNIQUE INDEX IF NOT EXISTS idx_donors_transaction_ref
  ON main.donors(transaction_ref)
  WHERE transaction_ref IS NOT NULL;

CREATE TABLE IF NOT EXISTS main.sync_state (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
