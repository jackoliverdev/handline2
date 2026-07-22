import { NextRequest, NextResponse } from 'next/server';
import { requireAuthenticatedUser } from '@/lib/server/admin-auth';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function POST(request: NextRequest) {
  try {
    const decoded = await requireAuthenticatedUser(request.headers.get('authorization') || undefined);
    const body = await request.json();
    const { firebaseUid, dark_mode, notifications, marketing_emails } = body;
    
    if (!firebaseUid) {
      return NextResponse.json({ 
        success: false, 
        message: 'Firebase UID is required' 
      }, { status: 400 });
    }

    if (firebaseUid !== decoded.uid) {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }
    
    console.log(`Updating user preferences for ${firebaseUid}:`, { dark_mode, notifications, marketing_emails });
    
    // Create the preferences object with only defined values
    const preferences: Record<string, boolean> = {};
    if (dark_mode !== undefined) preferences.dark_mode = dark_mode;
    if (notifications !== undefined) preferences.notifications = notifications;
    if (marketing_emails !== undefined) preferences.marketing_emails = marketing_emails;
    
    const { data, error } = await supabaseAdmin
      .from('users')
      .update(preferences)
      .eq('firebase_uid', firebaseUid)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating user preferences:', error);
      return NextResponse.json({ success: false, message: 'Failed to update preferences' }, { status: 500 });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'User preferences updated successfully',
      data
    });
  } catch (error) {
    console.error('Error in user preferences update:', error);
    const message = error instanceof Error ? error.message : 'Failed to update user preferences';
    const status = message === 'UNAUTHENTICATED' ? 401 : 500;
    return NextResponse.json({
      success: false,
      message
    }, { status });
  }
}