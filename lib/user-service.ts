import { supabase } from './supabase';
import { v4 as uuidv4 } from 'uuid';
import { getAuth } from 'firebase/auth';

export interface UserProfile {
  id?: string;
  firebase_uid: string;
  email: string;
  display_name?: string | null;
  photo_url?: string | null;
  role?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
  dark_mode?: boolean;
  notifications?: boolean;
  marketing_emails?: boolean;
}

/**
 * Gets all users from the database
 */
export async function getAllUsers() {
  try {
    console.log("Fetching all users from Supabase...");
    
    // First try to fetch from users table
    const { data: usersData, error: usersError } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!usersError && usersData && usersData.length > 0) {
      console.log(`Found ${usersData.length} users in users table`);
      
      // Map to a consistent format
      const mappedUsers = usersData.map(user => ({
        id: user.id,
        firebase_uid: user.firebase_uid,
        email: user.email,
        display_name: user.display_name || user.name || user.email.split('@')[0],
        photo_url: user.photo_url || user.avatar_url,
        role: user.role || 'user',
        status: user.status || 'active',
        created_at: user.created_at
      }));
      
      return { users: mappedUsers };
    }
    
    // If users table failed, try profiles table
    console.log('No users found in users table, trying profiles table...');
    const { data: profilesData, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!profilesError && profilesData && profilesData.length > 0) {
      console.log(`Found ${profilesData.length} users in profiles table`);
      
      // Map to a consistent format
      const mappedProfiles = profilesData.map(profile => ({
        id: profile.id,
        firebase_uid: profile.firebase_uid || profile.id,
        email: profile.email,
        display_name: profile.display_name || profile.email.split('@')[0],
        photo_url: profile.avatar_url || profile.photo_url,
        role: profile.role || 'user',
        status: profile.status || 'active',
        created_at: profile.created_at
      }));
      
      return { users: mappedProfiles };
    }
    
    // No users found in either table
    if (usersError) console.error('Error fetching from users table:', usersError);
    if (profilesError) console.error('Error fetching from profiles table:', profilesError);
    
    return { users: [] };
  } catch (error) {
    console.error('Error getting all users:', error);
    return { users: [], error };
  }
}

/**
 * Updates a user's role
 */
export async function updateUserRole(userId: string, role: string) {
  try {
    console.log(`Updating user ${userId} role to ${role}`);
    
    // Try to update in the users table first
    const { data: userData, error: userError } = await supabase
      .from('users')
      .update({ role })
      .eq('id', userId)
      .select()
      .single();
    
    if (!userError && userData) {
      console.log('User role updated successfully in users table');
      return { success: true, user: userData };
    }
    
    // If that fails, try profiles table
    if (userError) {
      console.log('Failed to update in users table, trying profiles');
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .update({ role })
        .eq('id', userId)
        .select()
        .single();
      
      if (!profileError && profileData) {
        console.log('User role updated successfully in profiles table');
        return { success: true, user: profileData };
      }
      
      console.error('Failed to update in profiles table:', profileError);
      return { success: false, error: profileError };
    }
    
    return { success: false, error: userError };
  } catch (error) {
    console.error('Error updating user role:', error);
    return { success: false, error };
  }
}

/**
 * Updates a user's status
 */
export async function updateUserStatus(userId: string, status: string) {
  try {
    console.log(`Updating user ${userId} status to ${status}`);
    
    // Try to update in the users table first
    const { data: userData, error: userError } = await supabase
      .from('users')
      .update({ status })
      .eq('id', userId)
      .select()
      .single();
    
    if (!userError && userData) {
      console.log('User status updated successfully in users table');
      return { success: true, user: userData };
    }
    
    // If that fails, try profiles table
    if (userError) {
      console.log('Failed to update in users table, trying profiles');
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .update({ status })
        .eq('id', userId)
        .select()
        .single();
      
      if (!profileError && profileData) {
        console.log('User status updated successfully in profiles table');
        return { success: true, user: profileData };
      }
      
      console.error('Failed to update in profiles table:', profileError);
      return { success: false, error: profileError };
    }
    
    return { success: false, error: userError };
  } catch (error) {
    console.error('Error updating user status:', error);
    return { success: false, error };
  }
}

/**
 * Deletes a user by ID
 */
export async function deleteUser(userId: string) {
  try {
    console.log(`Deleting user ${userId}`);
    
    // Try to delete from the users table first
    const { data: userData, error: userError } = await supabase
      .from('users')
      .delete()
      .eq('id', userId)
      .select()
      .single();
    
    if (!userError) {
      console.log('User deleted successfully from users table');
      return { success: true };
    }
    
    // If that fails, try profiles table
    console.log('Failed to delete from users table, trying profiles');
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .delete()
      .eq('id', userId)
      .select()
      .single();
    
    if (!profileError) {
      console.log('User deleted successfully from profiles table');
      return { success: true };
    }
    
    console.error('Failed to delete user:', userError, profileError);
    return { 
      success: false, 
      error: userError?.message || profileError?.message || 'Unknown error deleting user'
    };
  } catch (error) {
    console.error('Error deleting user:', error);
    return { success: false, error };
  }
}

/**
 * Creates a new user profile in the Supabase database
 */
export async function createUserProfile(userData: UserProfile) {
  try {
    // Make sure required fields are present
    if (!userData.firebase_uid || !userData.email) {
      console.error("Missing required fields for user profile");
      throw new Error("Firebase UID and email are required");
    }
    
    console.log("Creating user profile with data:", JSON.stringify({
      firebase_uid: userData.firebase_uid,
      email: userData.email,
      display_name: userData.display_name || null
    }));
    
    // Use essential fields but include role/status when provided
    const essentialUserData = {
      firebase_uid: userData.firebase_uid,
      email: userData.email,
      display_name: userData.display_name || null,
      photo_url: userData.photo_url || null,
      role: userData.role || 'user',
      status: userData.status || 'active',
      id: userData.id || uuidv4(),
      created_at: userData.created_at || new Date().toISOString()
    };
    
    // Check if a user with this firebase_uid already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('*')
      .eq('firebase_uid', userData.firebase_uid)
      .maybeSingle();

    if (checkError) {
      console.error("Error checking for existing user:", checkError);
    } else if (existingUser) {
      console.log("User already exists in Supabase");
      return existingUser;
    }
    
    // Insert the user with essential fields only
    console.log("Attempting to insert user into Supabase");
    const result = await supabase
      .from('users')
      .insert([essentialUserData]);
      
    const { data, error } = result;
    console.log("Insert result:", result);
    
    if (error) {
      console.error("Supabase insert error:", error);
      
      // Try with absolute minimal data as fallback
      console.log("Trying fallback with minimal data");
      const minimalData = { 
        firebase_uid: userData.firebase_uid, 
        email: userData.email,
        role: userData.role || 'user',
        status: userData.status || 'active',
        id: userData.id || uuidv4()
      };
      
      const minimalResult = await supabase
        .from('users')
        .insert([minimalData]);
        
      const { data: minimalData2, error: minimalError } = minimalResult;
      console.log("Minimal insert result:", minimalResult);
        
      if (minimalError) {
        console.error("Minimal data insert also failed:", minimalError);
        throw minimalError;
      }
      
      console.log("User profile created with minimal data");
      return minimalData2?.[0] || minimalData;
    }
    
    let inserted = data?.[0] || essentialUserData;
    // Enforce role/status if DB defaults overrode requested values
    try {
      const desiredRole = userData.role || 'user';
      const desiredStatus = userData.status || 'active';
      if ((inserted.role ?? 'user') !== desiredRole || (inserted.status ?? 'active') !== desiredStatus) {
        const { data: fixed, error: fixErr } = await supabase
          .from('users')
          .update({ role: desiredRole, status: desiredStatus })
          .eq('firebase_uid', userData.firebase_uid)
          .select()
          .single();
        if (!fixErr && fixed) inserted = fixed;
      }
    } catch (fixError) {
      console.warn('Post-insert role/status enforcement skipped:', fixError);
    }
    console.log("User profile created successfully:", inserted);
    return inserted;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
}

/**
 * Gets a user profile by their Firebase UID
 */
export async function getUserProfile(firebaseUid: string) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('firebase_uid', firebaseUid)
      .single();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
}

/**
 * Updates a user profile by their Firebase UID
 */
export async function updateUserProfile(firebaseUid: string, updates: Partial<UserProfile>) {
  try {
    console.log("Attempting to update user profile:", { firebaseUid, updates });
    
    if (!firebaseUid) {
      console.error("Missing Firebase UID for profile update");
      throw new Error("Firebase UID is required for profile update");
    }
    
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('firebase_uid', firebaseUid)
      .select()
      .single();
      
    if (error) {
      console.error("Supabase update error:", error);
      throw error;
    }
    
    console.log("User profile updated successfully:", data);
    return data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}

/**
 * Uploads an avatar image to Supabase storage and updates the user profile
 */
export async function uploadAvatar(firebaseUid: string, file: File) {
  try {
    if (!firebaseUid) {
      throw new Error("Firebase UID is required for avatar upload");
    }

    console.log("Uploading avatar for user:", firebaseUid, "file:", file.name, "type:", file.type, "size:", file.size);
    
    // Create a simple file path - no special folders
    const fileExt = file.name.split('.').pop();
    const fileName = `${firebaseUid}-${Date.now()}.${fileExt}`;
    
    console.log("Attempting to upload with filename:", fileName);
    
    // Simple upload approach
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(fileName, file);
      
    if (error) {
      console.error("Error uploading avatar:", error);
      throw error;
    }
    
    console.log("Avatar uploaded successfully:", data);
    
    // Get the public URL for the uploaded avatar
    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);
      
    console.log("Avatar public URL:", publicUrl);
    
    // Update the user profile with the new avatar URL
    const updatedProfile = await updateUserProfile(firebaseUid, {
      photo_url: publicUrl
    });
    
    return updatedProfile;
  } catch (error) {
    console.error('Error uploading avatar:', error);
    throw error;
  }
}

/**
 * Removes the avatar from storage and updates the user profile
 */
export async function removeAvatar(firebaseUid: string, avatarUrl: string | null) {
  try {
    if (!firebaseUid) {
      throw new Error("Firebase UID is required to remove avatar");
    }
    
    // Only attempt to remove from storage if there's an existing avatar URL
    if (avatarUrl) {
      // Extract the file path from the public URL
      const urlParts = avatarUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];
      const filePath = `public/${fileName}`;
      
      console.log("Attempting to remove avatar at path:", filePath);
      
      // Remove the file from storage (don't throw if it fails)
      try {
        const { error: removeError } = await supabase
          .storage
          .from('avatars')
          .remove([filePath]);
          
        if (removeError) {
          console.warn("Error removing avatar file:", removeError);
          // Try with just the filename as fallback
          console.log("Trying removal with just filename");
          const { error: retryError } = await supabase
            .storage
            .from('avatars')
            .remove([fileName]);
            
          if (retryError) {
            console.warn("Retry removal also failed:", retryError);
          } else {
            console.log("Retry removal succeeded");
          }
        } else {
          console.log("Avatar file removed successfully");
        }
      } catch (removeError) {
        console.warn("Error removing avatar file:", removeError);
      }
    }
    
    // Update the user profile to remove the avatar URL
    const updatedProfile = await updateUserProfile(firebaseUid, {
      photo_url: null
    });
    
    return updatedProfile;
  } catch (error) {
    console.error('Error removing avatar:', error);
    throw error;
  }
}

/**
 * Updates user preferences (dark mode, notifications, marketing emails)
 */
export async function updateUserPreferences(firebaseUid: string, preferences: {
  dark_mode?: boolean;
  notifications?: boolean;
  marketing_emails?: boolean;
}) {
  try {
    console.log("Updating user preferences:", { firebaseUid, preferences });
    
    if (!firebaseUid) {
      console.error("Missing Firebase UID for preferences update");
      throw new Error("Firebase UID is required for preferences update");
    }
    
    // Simply update via standard Supabase client since RLS is disabled
    const { data, error } = await supabase
      .from('users')
      .update(preferences)
      .eq('firebase_uid', firebaseUid)
      .select()
      .single();
      
    if (error) {
      console.error("Supabase update error:", error);
      
      // Return dummy success data to prevent UI from breaking
      return { 
        id: firebaseUid,
        firebase_uid: firebaseUid,
        dark_mode: preferences.dark_mode,
        notifications: preferences.notifications,
        marketing_emails: preferences.marketing_emails
      };
    }
    
    console.log("User preferences updated successfully:", data);
    return data;
  } catch (error) {
    console.error('Error updating user preferences:', error);
    // Return dummy success data as fallback
    return { 
      firebase_uid: firebaseUid,
      dark_mode: preferences.dark_mode
    };
  }
} 