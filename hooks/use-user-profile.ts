import { useState, useEffect, useCallback } from 'react';
import { useUser } from 'reactfire';
import { getUserProfile, UserProfile } from '@/lib/user-service';
import { supabase } from '@/lib/supabase';

export function useUserProfile() {
  const { data: firebaseUser } = useUser();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Function to load the user profile
  const loadProfile = useCallback(async () => {
    if (!firebaseUser) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const profileData = await getUserProfile(firebaseUser.uid);
      console.log('User profile loaded:', profileData);
      setProfile(profileData || null);
      setError(null);
    } catch (err) {
      console.error('Error loading user profile:', err);
      setError(err instanceof Error ? err : new Error('Failed to load user profile'));
    } finally {
      setLoading(false);
    }
  }, [firebaseUser]);

  // Load profile on initial mount and when firebaseUser changes
  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  // Set up a subscription to real-time changes for the user's profile
  useEffect(() => {
    if (!firebaseUser?.uid) return;

    // Subscribe to changes in the user profile
    const subscription = supabase
      .channel('user-profile-changes')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'users',
        filter: `firebase_uid=eq.${firebaseUser.uid}`,
      }, (payload) => {
        console.log('User profile updated in real-time:', payload);
        setProfile(payload.new as UserProfile);
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [firebaseUser]);

  // Function to manually refresh the profile
  const refreshProfile = useCallback(async () => {
    return loadProfile();
  }, [loadProfile]);

  return { profile, loading, error, refreshProfile };
} 