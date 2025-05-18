import { supabase } from './supabase';

export type LessonType = 'regular' | 'one_off' | 'multiple_days';
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'all_levels';

export interface Lesson {
  id: string;
  title: string;
  description?: string;
  slug: string;
  type: LessonType;
  min_age?: number;
  max_age?: number;
  skill_level: SkillLevel;
  duration: number;
  max_participants: number;
  price: number;
  coach_id?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  image_url?: string;
  learning_objectives?: string;
  display_order?: number;
  registration_required?: boolean;
  registration_url?: string;
  default_start_time?: string;
  default_days_of_week?: number[];
  booking_lead_time_hours?: number;
  booking_close_time_hours?: number;
  available_dates?: string[];
  multiple_day_settings?: MultipleDaySettings[];
}

// Updated interface for multiple day settings to use specific dates
export interface MultipleDaySettings {
  date: string; // ISO date string format (YYYY-MM-DD)
  start_time: string; // HH:MM format
  enabled: boolean;
}

export interface LessonSchedule {
  id: string;
  lesson_id: string;
  start_date: string;
  end_date?: string;
  start_time: string;
  end_time: string;
  day_of_week?: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  recurrence_type?: 'once' | 'daily' | 'weekly' | 'biweekly' | 'monthly';
  max_bookings?: number;
  current_bookings?: number;
  location?: string;
  notes?: string;
  cancelled?: boolean;
  colour?: string;
}

export interface LessonBooking {
  id: string;
  lesson_id: string;
  schedule_id?: string | null;
  client_name: string;
  client_email: string;
  client_phone?: string | null;
  status: 'confirmed' | 'cancelled' | 'completed';
  notes?: string | null;
  created_at: string;
  updated_at: string;
  date: string;
  start_time: string;
  end_time: string;
  coach_id?: string | null;
  lesson?: Lesson;
}

export interface BookingFormData {
  lesson_id: string | null;
  schedule_id?: string | null;
  client_name: string;
  client_email: string;
  client_phone?: string | null;
  notes?: string | null;
  status: string;
  date: string;
  start_time: string;
  end_time: string;
  coach_id?: string | null;
}

/**
 * Fetch all lessons from Supabase
 */
export async function getAllLessons(): Promise<{ lessons: Lesson[] }> {
  try {
    console.log('Fetching all lessons from Supabase...', new Date().toISOString());
    
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching lessons:', error);
      return { lessons: [] };
    }
    
    console.log(`Fetched ${data.length} lessons at ${new Date().toISOString()}`);
    return { lessons: data };
  } catch (error) {
    console.error('Error in getAllLessons:', error);
    return { lessons: [] };
  }
}

/**
 * Fetch a single lesson by ID
 */
export async function getLessonById(id: string): Promise<{ lesson: Lesson | null }> {
  try {
    console.log(`Fetching lesson with ID: ${id}...`);
    
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching lesson with ID ${id}:`, error);
      return { lesson: null };
    }
    
    console.log(`Fetched lesson: ${data.title}`);
    return { lesson: data };
  } catch (error) {
    console.error(`Error in getLessonById for ${id}:`, error);
    return { lesson: null };
  }
}

/**
 * Fetch a single lesson by slug
 */
export async function getLessonBySlug(slug: string): Promise<{ lesson: Lesson | null }> {
  try {
    console.log(`Fetching lesson with slug: ${slug}...`);
    
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) {
      console.error(`Error fetching lesson with slug ${slug}:`, error);
      return { lesson: null };
    }
    
    console.log(`Fetched lesson: ${data.title}`);
    return { lesson: data };
  } catch (error) {
    console.error(`Error in getLessonBySlug for ${slug}:`, error);
    return { lesson: null };
  }
}

/**
 * Create a new lesson
 */
export async function createLesson(lessonData: Partial<Lesson>): Promise<{ lesson: Lesson | null }> {
  try {
    console.log('Creating new lesson:', lessonData.title);
    
    const { data, error } = await supabase
      .from('lessons')
      .insert([lessonData])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating lesson:', error);
      return { lesson: null };
    }
    
    console.log(`Created lesson: ${data.title} with ID: ${data.id}`);
    return { lesson: data };
  } catch (error) {
    console.error('Error in createLesson:', error);
    return { lesson: null };
  }
}

/**
 * Update an existing lesson
 */
export async function updateLesson(id: string, updates: Partial<Lesson>): Promise<{ lesson: Lesson | null }> {
  try {
    console.log(`Updating lesson with ID: ${id}`);
    
    const { data, error } = await supabase
      .from('lessons')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Error updating lesson with ID ${id}:`, error);
      return { lesson: null };
    }
    
    console.log(`Updated lesson: ${data.title}`);
    return { lesson: data };
  } catch (error) {
    console.error(`Error in updateLesson for ${id}:`, error);
    return { lesson: null };
  }
}

/**
 * Delete a lesson
 */
export async function deleteLesson(id: string): Promise<{ success: boolean }> {
  try {
    console.log(`Deleting lesson with ID: ${id}`);
    
    const { error } = await supabase
      .from('lessons')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Error deleting lesson with ID ${id}:`, error);
      return { success: false };
    }
    
    console.log(`Successfully deleted lesson with ID: ${id}`);
    return { success: true };
  } catch (error) {
    console.error(`Error in deleteLesson for ${id}:`, error);
    return { success: false };
  }
}

/**
 * Get a single schedule by ID
 */
export async function getScheduleById(id: string): Promise<{ schedule: LessonSchedule | null }> {
  try {
    console.log(`Fetching schedule with ID: ${id}...`);
    
    const { data, error } = await supabase
      .from('lesson_schedules')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching schedule with ID ${id}:`, error);
      return { schedule: null };
    }
    
    console.log(`Fetched schedule with ID: ${data.id}`);
    return { schedule: data };
  } catch (error) {
    console.error(`Error in getScheduleById for ${id}:`, error);
    return { schedule: null };
  }
}

/**
 * Get all schedules for a lesson
 */
export async function getSchedulesByLessonId(lessonId: string): Promise<{ schedules: LessonSchedule[] }> {
  try {
    console.log(`Fetching schedules for lesson with ID: ${lessonId}...`);
    
    const { data, error } = await supabase
      .from('lesson_schedules')
      .select('*')
      .eq('lesson_id', lessonId)
      .eq('is_active', true)
      .order('start_date', { ascending: true })
      .order('start_time', { ascending: true });
    
    if (error) {
      console.error(`Error fetching schedules for lesson with ID ${lessonId}:`, error);
      return { schedules: [] };
    }
    
    console.log(`Fetched ${data.length} schedules for lesson with ID: ${lessonId}`);
    return { schedules: data };
  } catch (error) {
    console.error(`Error in getSchedulesByLessonId for ${lessonId}:`, error);
    return { schedules: [] };
  }
}

/**
 * Create a new schedule for a lesson
 */
export async function createSchedule(scheduleData: Partial<LessonSchedule>): Promise<{ schedule: LessonSchedule | null }> {
  try {
    console.log(`Creating new schedule for lesson with ID: ${scheduleData.lesson_id}`);
    
    const { data, error } = await supabase
      .from('lesson_schedules')
      .insert([scheduleData])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating schedule:', error);
      return { schedule: null };
    }
    
    console.log(`Created schedule with ID: ${data.id}`);
    return { schedule: data };
  } catch (error) {
    console.error('Error in createSchedule:', error);
    return { schedule: null };
  }
}

/**
 * Update an existing schedule
 */
export async function updateSchedule(id: string, updates: Partial<LessonSchedule>): Promise<{ schedule: LessonSchedule | null }> {
  try {
    console.log(`Updating schedule with ID: ${id}`);
    
    const { data, error } = await supabase
      .from('lesson_schedules')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Error updating schedule with ID ${id}:`, error);
      return { schedule: null };
    }
    
    console.log(`Updated schedule with ID: ${data.id}`);
    return { schedule: data };
  } catch (error) {
    console.error(`Error in updateSchedule for ${id}:`, error);
    return { schedule: null };
  }
}

/**
 * Delete a schedule
 */
export async function deleteSchedule(id: string): Promise<{ success: boolean }> {
  try {
    console.log(`Deleting schedule with ID: ${id}`);
    
    const { error } = await supabase
      .from('lesson_schedules')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Error deleting schedule with ID ${id}:`, error);
      return { success: false };
    }
    
    console.log(`Successfully deleted schedule with ID: ${id}`);
    return { success: true };
  } catch (error) {
    console.error(`Error in deleteSchedule for ${id}:`, error);
    return { success: false };
  }
}

/**
 * Get all bookings for a lesson
 */
export async function getBookingsByLessonId(lessonId: string): Promise<{ bookings: LessonBooking[] }> {
  try {
    console.log(`Fetching bookings for lesson with ID: ${lessonId}...`);
    
    const { data, error } = await supabase
      .from('lesson_bookings')
      .select('*')
      .eq('lesson_id', lessonId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error(`Error fetching bookings for lesson with ID ${lessonId}:`, error);
      return { bookings: [] };
    }
    
    console.log(`Fetched ${data.length} bookings for lesson with ID: ${lessonId}`);
    return { bookings: data };
  } catch (error) {
    console.error(`Error in getBookingsByLessonId for ${lessonId}:`, error);
    return { bookings: [] };
  }
}

/**
 * Get a booking by ID
 */
export async function getBookingById(id: string): Promise<{ booking: LessonBooking | null }> {
  try {
    console.log(`Fetching booking with ID: ${id}...`);
    
    const { data, error } = await supabase
      .from('lesson_bookings')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching booking with ID ${id}:`, error);
      return { booking: null };
    }
    
    console.log(`Fetched booking with ID: ${id}`);
    return { booking: data };
  } catch (error) {
    console.error(`Error in getBookingById for ${id}:`, error);
    return { booking: null };
  }
}

/**
 * Create a new booking for a lesson
 */
export async function createBooking(bookingData: BookingFormData): Promise<{ booking: LessonBooking | null, error?: string }> {
  try {
    console.log(`Creating new booking for lesson with ID: ${bookingData.lesson_id}`);
    
    if (!bookingData.lesson_id) {
      return { booking: null, error: 'Lesson ID is required' };
    }
    
    const { data, error } = await supabase
      .from('lesson_bookings')
      .insert([bookingData])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating booking:', error);
      return { booking: null, error: error.message };
    }
    
    console.log(`Created booking with ID: ${data.id}`);
    return { booking: data };
  } catch (error: any) {
    console.error('Error in createBooking:', error);
    return { booking: null, error: error.message || 'Failed to create booking' };
  }
}

/**
 * Update an existing booking
 */
export async function updateBooking(id: string, updates: Partial<LessonBooking>): Promise<{ booking: LessonBooking | null, error?: string }> {
  try {
    console.log(`Updating booking with ID: ${id}`);
    
    const { data, error } = await supabase
      .from('lesson_bookings')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Error updating booking with ID ${id}:`, error);
      return { booking: null, error: error.message };
    }
    
    console.log(`Updated booking with ID: ${data.id}`);
    return { booking: data };
  } catch (error: any) {
    console.error(`Error in updateBooking for ${id}:`, error);
    return { booking: null, error: error.message || 'Failed to update booking' };
  }
}

/**
 * Cancel a booking
 */
export async function cancelBooking(id: string): Promise<{ booking: LessonBooking | null, error?: string }> {
  try {
    console.log(`Cancelling booking with ID: ${id}`);
    
    const { data, error } = await supabase
      .from('lesson_bookings')
      .update({ status: 'cancelled', updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Error cancelling booking with ID ${id}:`, error);
      return { booking: null, error: error.message };
    }
    
    console.log(`Cancelled booking with ID: ${data.id}`);
    return { booking: data };
  } catch (error: any) {
    console.error(`Error in cancelBooking for ${id}:`, error);
    return { booking: null, error: error.message || 'Failed to cancel booking' };
  }
}

/**
 * Get bookings by email address
 */
export async function getLessonBookingsByEmail(email: string): Promise<{ bookings: LessonBooking[] }> {
  try {
    console.log(`Fetching lesson bookings for email: ${email}...`);
    
    const { data, error } = await supabase
      .from('lesson_bookings')
      .select('*, lesson:lessons(*)')
      .eq('client_email', email)
      .order('date', { ascending: false });
    
    if (error) {
      console.error(`Error fetching lesson bookings for email ${email}:`, error);
      return { bookings: [] };
    }
    
    console.log(`Fetched ${data.length} lesson bookings for email: ${email}`);
    console.log('Booking data sample:', data.length > 0 ? data[0] : 'No bookings found');
    return { bookings: data };
  } catch (error) {
    console.error(`Error in getLessonBookingsByEmail for ${email}:`, error);
    return { bookings: [] };
  }
}

/**
 * Get booking count for a lesson on a specific date
 */
export async function getBookingCountForLessonDate(lessonId: string, date: string): Promise<{ count: number, error?: string }> {
  try {
    console.log(`Fetching booking count for lesson ID ${lessonId} on date ${date}...`);
    
    // Get all confirmed bookings for this lesson on this date
    const { data, error, count } = await supabase
      .from('lesson_bookings')
      .select('*', { count: 'exact' })
      .eq('lesson_id', lessonId)
      .eq('date', date)
      .eq('status', 'confirmed');
    
    if (error) {
      console.error(`Error fetching booking count for lesson ${lessonId} on date ${date}:`, error);
      return { count: 0, error: error.message };
    }
    
    console.log(`Found ${count} bookings for lesson ${lessonId} on date ${date}`);
    return { count: count || 0 };
  } catch (error: any) {
    console.error(`Error in getBookingCountForLessonDate:`, error);
    return { count: 0, error: error.message || 'Failed to get booking count' };
  }
} 