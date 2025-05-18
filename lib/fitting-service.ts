import { supabase } from './supabase';

export interface FittingSlot {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  max_bookings: number;
  current_bookings: number;
  is_active: boolean;
  notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface FittingBooking {
  id: string;
  slot_id: string;
  client_name: string;
  client_email: string;
  client_phone?: string | null;
  status: 'confirmed' | 'cancelled' | 'completed';
  notes?: string | null;
  date: string;
  start_time: string;
  end_time: string;
  created_at: string;
  updated_at: string;
  slot?: FittingSlot;
}

export interface FittingBookingFormData {
  slot_id: string;
  client_name: string;
  client_email: string;
  client_phone?: string | null;
  notes?: string | null;
  status: string;
  date: string;
  start_time: string;
  end_time: string;
}

/**
 * Fetch all fitting slots from Supabase
 */
export async function getAllFittingSlots(): Promise<{ slots: FittingSlot[] }> {
  try {
    console.log('Fetching all fitting slots from Supabase...', new Date().toISOString());
    
    const { data, error } = await supabase
      .from('fitting_slots')
      .select('*')
      .order('date', { ascending: true })
      .order('start_time', { ascending: true });
    
    if (error) {
      console.error('Error fetching fitting slots:', error);
      return { slots: [] };
    }
    
    console.log(`Fetched ${data.length} fitting slots at ${new Date().toISOString()}`);
    return { slots: data };
  } catch (error) {
    console.error('Error in getAllFittingSlots:', error);
    return { slots: [] };
  }
}

/**
 * Fetch active fitting slots from Supabase
 */
export async function getActiveFittingSlots(): Promise<{ slots: FittingSlot[] }> {
  try {
    console.log('Fetching active fitting slots from Supabase...', new Date().toISOString());
    
    const { data, error } = await supabase
      .from('fitting_slots')
      .select('*')
      .eq('is_active', true)
      .gte('date', new Date().toISOString().split('T')[0]) // Only future dates
      .order('date', { ascending: true })
      .order('start_time', { ascending: true });
    
    if (error) {
      console.error('Error fetching active fitting slots:', error);
      return { slots: [] };
    }
    
    console.log(`Fetched ${data.length} active fitting slots at ${new Date().toISOString()}`);
    return { slots: data };
  } catch (error) {
    console.error('Error in getActiveFittingSlots:', error);
    return { slots: [] };
  }
}

/**
 * Get available slots for a specific date
 */
export async function getAvailableSlotsForDate(date: string): Promise<{ slots: FittingSlot[] }> {
  try {
    console.log(`Fetching available slots for date: ${date}...`);
    
    const { data, error } = await supabase
      .from('fitting_slots')
      .select('*')
      .eq('date', date)
      .eq('is_active', true)
      .filter('current_bookings', 'lt', 'max_bookings')
      .order('start_time', { ascending: true });
    
    if (error) {
      console.error(`Error fetching available slots for date ${date}:`, error);
      return { slots: [] };
    }
    
    console.log(`Fetched ${data.length} available slots for date: ${date}`);
    return { slots: data };
  } catch (error) {
    console.error(`Error in getAvailableSlotsForDate for ${date}:`, error);
    return { slots: [] };
  }
}

/**
 * Fetch a single fitting slot by ID
 */
export async function getFittingSlotById(id: string): Promise<{ slot: FittingSlot | null }> {
  try {
    console.log(`Fetching fitting slot with ID: ${id}...`);
    
    const { data, error } = await supabase
      .from('fitting_slots')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching fitting slot with ID ${id}:`, error);
      return { slot: null };
    }
    
    console.log(`Fetched fitting slot for ${data.date} at ${data.start_time}`);
    return { slot: data };
  } catch (error) {
    console.error(`Error in getFittingSlotById for ${id}:`, error);
    return { slot: null };
  }
}

/**
 * Create a new fitting slot
 */
export async function createFittingSlot(slotData: Partial<FittingSlot>): Promise<{ slot: FittingSlot | null }> {
  try {
    console.log(`Creating new fitting slot for date: ${slotData.date}`);
    
    const { data, error } = await supabase
      .from('fitting_slots')
      .insert([slotData])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating fitting slot:', error);
      return { slot: null };
    }
    
    console.log(`Created fitting slot with ID: ${data.id}`);
    return { slot: data };
  } catch (error) {
    console.error('Error in createFittingSlot:', error);
    return { slot: null };
  }
}

/**
 * Update an existing fitting slot
 */
export async function updateFittingSlot(id: string, updates: Partial<FittingSlot>): Promise<{ slot: FittingSlot | null }> {
  try {
    console.log(`Updating fitting slot with ID: ${id}`);
    
    const { data, error } = await supabase
      .from('fitting_slots')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Error updating fitting slot with ID ${id}:`, error);
      return { slot: null };
    }
    
    console.log(`Updated fitting slot with ID: ${data.id}`);
    return { slot: data };
  } catch (error) {
    console.error(`Error in updateFittingSlot for ${id}:`, error);
    return { slot: null };
  }
}

/**
 * Delete a fitting slot
 */
export async function deleteFittingSlot(id: string): Promise<{ success: boolean }> {
  try {
    console.log(`Deleting fitting slot with ID: ${id}`);
    
    const { error } = await supabase
      .from('fitting_slots')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Error deleting fitting slot with ID ${id}:`, error);
      return { success: false };
    }
    
    console.log(`Successfully deleted fitting slot with ID: ${id}`);
    return { success: true };
  } catch (error) {
    console.error(`Error in deleteFittingSlot for ${id}:`, error);
    return { success: false };
  }
}

/**
 * Get all bookings for a fitting slot
 */
export async function getBookingsBySlotId(slotId: string): Promise<{ bookings: FittingBooking[] }> {
  try {
    console.log(`Fetching bookings for slot with ID: ${slotId}...`);
    
    const { data, error } = await supabase
      .from('fitting_bookings')
      .select('*')
      .eq('slot_id', slotId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error(`Error fetching bookings for slot with ID ${slotId}:`, error);
      return { bookings: [] };
    }
    
    console.log(`Fetched ${data.length} bookings for slot with ID: ${slotId}`);
    return { bookings: data };
  } catch (error) {
    console.error(`Error in getBookingsBySlotId for ${slotId}:`, error);
    return { bookings: [] };
  }
}

/**
 * Get a fitting booking by ID
 */
export async function getFittingBookingById(id: string): Promise<{ booking: FittingBooking | null }> {
  try {
    console.log(`Fetching fitting booking with ID: ${id}...`);
    
    const { data, error } = await supabase
      .from('fitting_bookings')
      .select('*, slot:slot_id(*)')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching fitting booking with ID ${id}:`, error);
      return { booking: null };
    }
    
    console.log(`Fetched fitting booking with ID: ${id}`);
    return { booking: data };
  } catch (error) {
    console.error(`Error in getFittingBookingById for ${id}:`, error);
    return { booking: null };
  }
}

/**
 * Create a new fitting booking
 */
export async function createFittingBooking(bookingData: FittingBookingFormData): Promise<{ booking: FittingBooking | null, error?: string }> {
  try {
    console.log(`Creating new fitting booking for slot with ID: ${bookingData.slot_id}`);
    
    if (!bookingData.slot_id) {
      return { booking: null, error: 'Slot ID is required' };
    }
    
    // First, check if the slot has available spaces
    const { slot } = await getFittingSlotById(bookingData.slot_id);
    
    if (!slot) {
      return { booking: null, error: 'Fitting slot not found' };
    }
    
    if (slot.current_bookings >= slot.max_bookings) {
      return { booking: null, error: 'This fitting slot is fully booked' };
    }
    
    // Begin a transaction to create booking and update slot
    const { data: bookingData_response, error: bookingError } = await supabase
      .from('fitting_bookings')
      .insert([bookingData])
      .select()
      .single();
    
    if (bookingError) {
      console.error('Error creating fitting booking:', bookingError);
      return { booking: null, error: bookingError.message };
    }
    
    // Increment the current_bookings count
    const updateResult = await updateFittingSlot(
      bookingData.slot_id, 
      { 
        current_bookings: slot.current_bookings + 1,
        updated_at: new Date().toISOString()
      }
    );
    
    if (!updateResult.slot) {
      console.error('Warning: Created booking but failed to update slot booking count');
    }
    
    console.log(`Created fitting booking with ID: ${bookingData_response.id}`);
    return { booking: bookingData_response };
  } catch (error: any) {
    console.error('Error in createFittingBooking:', error);
    return { booking: null, error: error.message || 'Failed to create fitting booking' };
  }
}

/**
 * Update an existing fitting booking
 */
export async function updateFittingBooking(id: string, updates: Partial<FittingBooking>): Promise<{ booking: FittingBooking | null, error?: string }> {
  try {
    console.log(`Updating fitting booking with ID: ${id}`);
    
    const { data, error } = await supabase
      .from('fitting_bookings')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Error updating fitting booking with ID ${id}:`, error);
      return { booking: null, error: error.message };
    }
    
    console.log(`Updated fitting booking with ID: ${data.id}`);
    return { booking: data };
  } catch (error: any) {
    console.error(`Error in updateFittingBooking for ${id}:`, error);
    return { booking: null, error: error.message || 'Failed to update fitting booking' };
  }
}

/**
 * Cancel a fitting booking
 */
export async function cancelFittingBooking(id: string): Promise<{ booking: FittingBooking | null, error?: string }> {
  try {
    console.log(`Cancelling fitting booking with ID: ${id}`);
    
    // First, get the booking to know which slot to update
    const { booking: existingBooking } = await getFittingBookingById(id);
    
    if (!existingBooking) {
      return { booking: null, error: 'Booking not found' };
    }
    
    // Update the booking status
    const { data, error } = await supabase
      .from('fitting_bookings')
      .update({ 
        status: 'cancelled', 
        updated_at: new Date().toISOString() 
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Error cancelling fitting booking with ID ${id}:`, error);
      return { booking: null, error: error.message };
    }
    
    // Decrement the current_bookings count for the slot
    const { slot } = await getFittingSlotById(existingBooking.slot_id);
    
    if (slot && slot.current_bookings > 0) {
      const updateResult = await updateFittingSlot(
        existingBooking.slot_id, 
        { 
          current_bookings: slot.current_bookings - 1,
          updated_at: new Date().toISOString()
        }
      );
      
      if (!updateResult.slot) {
        console.error('Warning: Cancelled booking but failed to update slot booking count');
      }
    }
    
    console.log(`Cancelled fitting booking with ID: ${data.id}`);
    return { booking: data };
  } catch (error: any) {
    console.error(`Error in cancelFittingBooking for ${id}:`, error);
    return { booking: null, error: error.message || 'Failed to cancel fitting booking' };
  }
}

/**
 * Get fitting bookings by email address
 */
export async function getFittingBookingsByEmail(email: string): Promise<{ bookings: FittingBooking[] }> {
  try {
    console.log(`Fetching fitting bookings for email: ${email}...`);
    
    const { data, error } = await supabase
      .from('fitting_bookings')
      .select('*, slot:slot_id(*)')
      .eq('client_email', email)
      .order('date', { ascending: false });
    
    if (error) {
      console.error(`Error fetching fitting bookings for email ${email}:`, error);
      return { bookings: [] };
    }
    
    console.log(`Fetched ${data.length} fitting bookings for email: ${email}`);
    return { bookings: data };
  } catch (error) {
    console.error(`Error in getFittingBookingsByEmail for ${email}:`, error);
    return { bookings: [] };
  }
}

/**
 * Get all fitting bookings
 */
export async function getAllFittingBookings(): Promise<{ bookings: FittingBooking[] }> {
  try {
    console.log('Fetching all fitting bookings...');
    
    const { data, error } = await supabase
      .from('fitting_bookings')
      .select('*, slot:slot_id(*)')
      .order('date', { ascending: false });
    
    if (error) {
      console.error('Error fetching all fitting bookings:', error);
      return { bookings: [] };
    }
    
    console.log(`Fetched ${data.length} fitting bookings`);
    return { bookings: data };
  } catch (error) {
    console.error('Error in getAllFittingBookings:', error);
    return { bookings: [] };
  }
} 