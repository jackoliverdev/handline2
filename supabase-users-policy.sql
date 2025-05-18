-- Add the necessary policy to allow users to update their own preferences
CREATE POLICY "Allow users to update their own preferences"
    ON public.users
    FOR UPDATE
    TO authenticated
    USING (firebase_uid = auth.uid()::text)
    WITH CHECK (firebase_uid = auth.uid()::text AND (
        -- Only allow updating these specific columns
        (cardinality(akeys(to_jsonb(NEW) - to_jsonb(OLD))) = 0) OR
        (cardinality(akeys(to_jsonb(NEW) - to_jsonb(OLD))) = 1 AND 
            akeys(to_jsonb(NEW) - to_jsonb(OLD))[1] IN ('dark_mode', 'notifications', 'marketing_emails', 'photo_url', 'display_name'))
    ));

-- Allow public INSERT policy for new user creation
CREATE POLICY "Allow public user creation"
    ON public.users
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Check current policies
SELECT *
FROM pg_policies
WHERE tablename = 'users'; 