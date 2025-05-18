import { Coach } from "../lib/coaches-service";

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