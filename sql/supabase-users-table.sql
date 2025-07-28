-- Create the users table for HandLine Company user management
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    firebase_uid TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    display_name TEXT,
    photo_url TEXT,
    role TEXT DEFAULT 'user',
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    dark_mode BOOLEAN DEFAULT FALSE,
    notifications BOOLEAN DEFAULT TRUE,
    marketing_emails BOOLEAN DEFAULT FALSE,
    
    CONSTRAINT users_firebase_uid_key UNIQUE (firebase_uid)
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policies for Row Level Security
-- Allow authenticated users to read all users
CREATE POLICY "Allow authenticated users to read all users"
    ON public.users
    FOR SELECT
    TO authenticated
    USING (true);

-- Allow users to update their own data
CREATE POLICY "Allow users to update their own data"
    ON public.users
    FOR UPDATE
    TO authenticated
    USING (firebase_uid = auth.uid()::text);

-- Allow service role to manage all users
CREATE POLICY "Allow service role to manage all users"
    ON public.users
    FOR ALL
    TO service_role
    USING (true);

-- Create trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create index on firebase_uid for faster lookups
CREATE INDEX IF NOT EXISTS users_firebase_uid_idx ON public.users(firebase_uid);
CREATE INDEX IF NOT EXISTS users_email_idx ON public.users(email); 