import { supabase } from './supabase';

export interface Coach {
  id: string;
  name: string;
  email?: string;
  bio?: string;
  avatar_url?: string | null;
  specialty?: string;
  years_experience?: number;
  hourly_rate?: number;
  rate_45min?: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Slot {
  id: string;
  coach_id: string;
  day_of_week: number; // 0-6: Sunday to Saturday
  start_time: string; // "HH:MM:SS"
  end_time: string; // "HH:MM:SS"
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Fetch all coaches from Supabase
 */
export async function getAllCoaches(): Promise<{ coaches: Coach[] }> {
  try {
    console.log('Fetching all coaches from Supabase...', new Date().toISOString());
    
    const { data, error } = await supabase
      .from('coaches')
      .select('*')
      .eq('is_active', true)
      .order('name', { ascending: true });
    
    if (error) {
      console.error('Error fetching coaches:', error);
      return { coaches: [] };
    }
    
    console.log(`Fetched ${data.length} coaches at ${new Date().toISOString()}`);
    return { coaches: data };
  } catch (error) {
    console.error('Error in getAllCoaches:', error);
    return { coaches: [] };
  }
}

/**
 * Fetch a single coach by ID
 */
export async function getCoachById(id: string): Promise<{ coach: Coach | null }> {
  try {
    console.log(`Fetching coach with ID: ${id}...`);
    
    const { data, error } = await supabase
      .from('coaches')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching coach with ID ${id}:`, error);
      return { coach: null };
    }
    
    console.log(`Fetched coach: ${data.name}`);
    return { coach: data };
  } catch (error) {
    console.error(`Error in getCoachById for ${id}:`, error);
    return { coach: null };
  }
}

/**
 * Fetch a single coach by slug (name converted to slug)
 */
export async function getCoachBySlug(slug: string): Promise<{ coach: Coach | null }> {
  try {
    console.log(`Fetching coach with slug: ${slug}...`);
    
    // Get all coaches and find the one with a name that matches the slug
    const { coaches } = await getAllCoaches();
    
    const coach = coaches.find(coach => {
      const coachSlug = coach.name.toLowerCase().replace(/\s+/g, '-');
      return coachSlug === slug;
    });
    
    if (!coach) {
      console.error(`Coach with slug ${slug} not found`);
      return { coach: null };
    }
    
    console.log(`Fetched coach: ${coach.name}`);
    return { coach };
  } catch (error) {
    console.error(`Error in getCoachBySlug for ${slug}:`, error);
    return { coach: null };
  }
}

/**
 * Create a new coach
 */
export async function createCoach(coachData: Partial<Coach>): Promise<{ coach: Coach | null }> {
  try {
    console.log('Creating new coach:', coachData.name);
    
    const { data, error } = await supabase
      .from('coaches')
      .insert([coachData])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating coach:', error);
      return { coach: null };
    }
    
    console.log(`Created coach: ${data.name} with ID: ${data.id}`);
    return { coach: data };
  } catch (error) {
    console.error('Error in createCoach:', error);
    return { coach: null };
  }
}

/**
 * Update an existing coach
 */
export async function updateCoach(id: string, updates: Partial<Coach>): Promise<{ coach: Coach | null }> {
  try {
    console.log(`Updating coach with ID: ${id}`);
    
    const { data, error } = await supabase
      .from('coaches')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Error updating coach with ID ${id}:`, error);
      return { coach: null };
    }
    
    console.log(`Updated coach: ${data.name}`);
    return { coach: data };
  } catch (error) {
    console.error(`Error in updateCoach for ${id}:`, error);
    return { coach: null };
  }
}

/**
 * Delete a coach
 */
export async function deleteCoach(id: string): Promise<{ success: boolean }> {
  try {
    console.log(`Deleting coach with ID: ${id}`);
    
    const { error } = await supabase
      .from('coaches')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Error deleting coach with ID ${id}:`, error);
      return { success: false };
    }
    
    console.log(`Successfully deleted coach with ID: ${id}`);
    return { success: true };
  } catch (error) {
    console.error(`Error in deleteCoach for ${id}:`, error);
    return { success: false };
  }
}

/**
 * Toggle a coach's active status
 */
export async function toggleCoachActive(id: string): Promise<{ coach: Coach | null }> {
  try {
    console.log(`Toggling active status for coach with ID: ${id}`);
    
    // First get the current active status
    const { coach: currentCoach } = await getCoachById(id);
    
    if (!currentCoach) {
      console.error(`Coach with ID ${id} not found`);
      return { coach: null };
    }
    
    // Toggle the active status
    const newActiveStatus = !currentCoach.is_active;
    
    const { data, error } = await supabase
      .from('coaches')
      .update({ is_active: newActiveStatus })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Error toggling active status for coach with ID ${id}:`, error);
      return { coach: null };
    }
    
    console.log(`Updated active status to ${newActiveStatus} for coach: ${data.name}`);
    return { coach: data };
  } catch (error) {
    console.error(`Error in toggleCoachActive for ${id}:`, error);
    return { coach: null };
  }
}

/**
 * Get all slots for a coach
 */
export async function getSlotsByCoachId(coachId: string): Promise<{ slots: Slot[] }> {
  try {
    console.log(`Fetching slots for coach with ID: ${coachId}...`);
    
    const { data, error } = await supabase
      .from('slots')
      .select('*')
      .eq('coach_id', coachId)
      .eq('is_active', true)
      .order('day_of_week', { ascending: true })
      .order('start_time', { ascending: true });
    
    if (error) {
      console.error(`Error fetching slots for coach with ID ${coachId}:`, error);
      return { slots: [] };
    }
    
    console.log(`Fetched ${data.length} slots for coach with ID: ${coachId}`);
    return { slots: data };
  } catch (error) {
    console.error(`Error in getSlotsByCoachId for ${coachId}:`, error);
    return { slots: [] };
  }
}

/**
 * Create a new slot for a coach
 */
export async function createSlot(slotData: Partial<Slot>): Promise<{ slot: Slot | null }> {
  try {
    console.log(`Creating new slot for coach with ID: ${slotData.coach_id}`);
    
    const { data, error } = await supabase
      .from('slots')
      .insert([slotData])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating slot:', error);
      return { slot: null };
    }
    
    console.log(`Created slot with ID: ${data.id}`);
    return { slot: data };
  } catch (error) {
    console.error('Error in createSlot:', error);
    return { slot: null };
  }
}

/**
 * Delete a slot
 */
export async function deleteSlot(id: string): Promise<{ success: boolean }> {
  try {
    console.log(`Deleting slot with ID: ${id}`);
    
    const { error } = await supabase
      .from('slots')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Error deleting slot with ID ${id}:`, error);
      return { success: false };
    }
    
    console.log(`Successfully deleted slot with ID: ${id}`);
    return { success: true };
  } catch (error) {
    console.error(`Error in deleteSlot for ${id}:`, error);
    return { success: false };
  }
} 