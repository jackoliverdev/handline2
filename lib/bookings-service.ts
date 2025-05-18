import { supabase } from './supabase';
import { Coach } from './coaches-service';

export interface Booking {
  id: string;
  coach_id: string;
  client_name: string;
  client_email: string;
  client_phone?: string;
  date: string; // "YYYY-MM-DD"
  start_time: string; // "HH:MM:SS"
  end_time: string; // "HH:MM:SS"
  status: 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  created_at: string;
  updated_at: string;
  coach?: Coach; // For joined queries
}

export interface TimeSlot {
  date: Date;
  startTime: string; // "HH:MM:SS"
  endTime: string; // "HH:MM:SS"
  isAvailable: boolean;
}

export interface BookingFormData {
  coach_id: string;
  client_name: string;
  client_email: string;
  client_phone?: string;
  date: string;
  start_time: string;
  end_time: string;
  notes?: string;
}

/**
 * Get all bookings
 */
export async function getAllBookings(): Promise<{ bookings: Booking[] }> {
  try {
    console.log('Fetching all bookings from Supabase...');
    
    const { data, error } = await supabase
      .from('bookings')
      .select('*, coach:coaches(*)')
      .order('date', { ascending: true })
      .order('start_time', { ascending: true });
    
    if (error) {
      console.error('Error fetching bookings:', error);
      return { bookings: [] };
    }
    
    console.log(`Fetched ${data.length} bookings`);
    return { bookings: data };
  } catch (error) {
    console.error('Error in getAllBookings:', error);
    return { bookings: [] };
  }
}

/**
 * Get a booking by ID
 */
export async function getBookingById(id: string): Promise<{ booking: Booking | null }> {
  try {
    console.log(`Fetching booking with ID: ${id}...`);
    
    const { data, error } = await supabase
      .from('bookings')
      .select('*, coach:coaches(*)')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching booking with ID ${id}:`, error);
      return { booking: null };
    }
    
    console.log(`Fetched booking with ID: ${data.id}`);
    return { booking: data };
  } catch (error) {
    console.error(`Error in getBookingById for ${id}:`, error);
    return { booking: null };
  }
}

/**
 * Get bookings for a specific coach
 */
export async function getBookingsByCoach(coachId: string): Promise<{ bookings: Booking[] }> {
  try {
    console.log(`Fetching bookings for coach with ID: ${coachId}...`);
    
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('coach_id', coachId)
      .order('date', { ascending: true })
      .order('start_time', { ascending: true });
    
    if (error) {
      console.error(`Error fetching bookings for coach with ID ${coachId}:`, error);
      return { bookings: [] };
    }
    
    console.log(`Fetched ${data.length} bookings for coach with ID: ${coachId}`);
    return { bookings: data };
  } catch (error) {
    console.error(`Error in getBookingsByCoach for ${coachId}:`, error);
    return { bookings: [] };
  }
}

/**
 * Get bookings for a date range
 */
export async function getBookingsByDateRange(startDate: string, endDate: string): Promise<{ bookings: Booking[] }> {
  try {
    console.log(`Fetching bookings from ${startDate} to ${endDate}...`);
    
    const { data, error } = await supabase
      .from('bookings')
      .select('*, coach:coaches(*)')
      .gte('date', startDate)
      .lte('date', endDate)
      .order('date', { ascending: true })
      .order('start_time', { ascending: true });
    
    if (error) {
      console.error(`Error fetching bookings from ${startDate} to ${endDate}:`, error);
      return { bookings: [] };
    }
    
    console.log(`Fetched ${data.length} bookings from ${startDate} to ${endDate}`);
    return { bookings: data };
  } catch (error) {
    console.error(`Error in getBookingsByDateRange:`, error);
    return { bookings: [] };
  }
}

/**
 * Create a new booking
 */
export async function createBooking(bookingData: BookingFormData): Promise<{ booking: Booking | null }> {
  try {
    console.log('Creating new booking for client:', bookingData.client_name);
    
    // Check if the time slot is available
    const { isAvailable } = await checkTimeSlotAvailability(
      bookingData.coach_id,
      bookingData.date,
      bookingData.start_time
    );
    
    if (!isAvailable) {
      console.error('Time slot is not available');
      return { booking: null };
    }
    
    const { data, error } = await supabase
      .from('bookings')
      .insert([{
        ...bookingData,
        status: 'confirmed'
      }])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating booking:', error);
      return { booking: null };
    }
    
    console.log(`Created booking with ID: ${data.id}`);
    return { booking: data };
  } catch (error) {
    console.error('Error in createBooking:', error);
    return { booking: null };
  }
}

/**
 * Update a booking
 */
export async function updateBooking(id: string, updates: Partial<Booking>): Promise<{ booking: Booking | null }> {
  try {
    console.log(`Updating booking with ID: ${id}`);
    
    const { data, error } = await supabase
      .from('bookings')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Error updating booking with ID ${id}:`, error);
      return { booking: null };
    }
    
    console.log(`Updated booking with ID: ${data.id}`);
    return { booking: data };
  } catch (error) {
    console.error(`Error in updateBooking for ${id}:`, error);
    return { booking: null };
  }
}

/**
 * Cancel a booking
 */
export async function cancelBooking(id: string): Promise<{ booking: Booking | null }> {
  try {
    console.log(`Cancelling booking with ID: ${id}`);
    
    const { data, error } = await supabase
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Error cancelling booking with ID ${id}:`, error);
      return { booking: null };
    }
    
    console.log(`Cancelled booking with ID: ${data.id}`);
    return { booking: data };
  } catch (error) {
    console.error(`Error in cancelBooking for ${id}:`, error);
    return { booking: null };
  }
}

/**
 * Check if a time slot is available
 */
export async function checkTimeSlotAvailability(
  coachId: string, 
  date: string, 
  startTime: string
): Promise<{ isAvailable: boolean }> {
  try {
    console.log(`Checking availability for coach ${coachId} on ${date} at ${startTime}`);
    
    // Check if there's already a booking for this coach at this time
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('coach_id', coachId)
      .eq('date', date)
      .eq('start_time', startTime)
      .eq('status', 'confirmed')
      .limit(1);
    
    if (error) {
      console.error('Error checking time slot availability:', error);
      return { isAvailable: false };
    }
    
    // If data has length > 0, the slot is already booked
    const isAvailable = data.length === 0;
    console.log(`Time slot is ${isAvailable ? 'available' : 'not available'}`);
    
    return { isAvailable };
  } catch (error) {
    console.error('Error in checkTimeSlotAvailability:', error);
    return { isAvailable: false };
  }
}

/**
 * Get available time slots for a coach on a specific date
 */
export async function getAvailableTimeSlots(
  coachId: string, 
  date: string
): Promise<{ timeSlots: TimeSlot[] }> {
  try {
    console.log(`Fetching available time slots for coach ${coachId} on ${date}`);
    
    // 1. Get the day of week for the requested date
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    // 2. Get all slots for this coach on this day of week
    const { data: slotData, error: slotError } = await supabase
      .from('slots')
      .select('*')
      .eq('coach_id', coachId)
      .eq('day_of_week', dayOfWeek)
      .eq('is_active', true)
      .order('start_time', { ascending: true });
    
    if (slotError) {
      console.error('Error fetching slots:', slotError);
      return { timeSlots: [] };
    }
    
    if (slotData.length === 0) {
      console.log(`No slots configured for coach ${coachId} on day ${dayOfWeek}`);
      return { timeSlots: [] };
    }
    
    // 3. Get all bookings for this coach on this date
    const { data: bookingData, error: bookingError } = await supabase
      .from('bookings')
      .select('*')
      .eq('coach_id', coachId)
      .eq('date', date)
      .eq('status', 'confirmed');
    
    if (bookingError) {
      console.error('Error fetching bookings:', bookingError);
      return { timeSlots: [] };
    }
    
    // 4. For each slot, create a time slot and mark it as unavailable if there's a booking
    const timeSlots = slotData.map(slot => {
      const isBooked = bookingData.some(booking => 
        booking.start_time === slot.start_time
      );
      
      return {
        date: dateObj,
        startTime: slot.start_time,
        endTime: slot.end_time,
        isAvailable: !isBooked
      };
    });
    
    console.log(`Found ${timeSlots.length} time slots, ${timeSlots.filter(slot => slot.isAvailable).length} available`);
    return { timeSlots };
  } catch (error) {
    console.error('Error in getAvailableTimeSlots:', error);
    return { timeSlots: [] };
  }
}

/**
 * Get bookings by client email address
 */
export async function getBookingsByEmail(email: string): Promise<{ bookings: Booking[] }> {
  try {
    console.log(`Fetching bookings for client email: ${email}...`);
    
    const { data, error } = await supabase
      .from('bookings')
      .select('*, coach:coaches(*)')
      .eq('client_email', email)
      .order('date', { ascending: false })
      .order('start_time', { ascending: true });
    
    if (error) {
      console.error(`Error fetching bookings for email ${email}:`, error);
      return { bookings: [] };
    }
    
    console.log(`Fetched ${data.length} bookings for email: ${email}`);
    return { bookings: data };
  } catch (error) {
    console.error(`Error in getBookingsByEmail for ${email}:`, error);
    return { bookings: [] };
  }
} 