import { supabase } from './supabase';
import { v4 as uuidv4 } from 'uuid';

// Types for our messaging system
export interface Conversation {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  participants?: ParticipantWithDetails[];
  last_message?: string;
  last_message_at?: string;
  unread_count?: number;
}

export interface Participant {
  conversation_id: string;
  user_id: string;
  unread_count: number;
  is_admin: boolean;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
  sender_name?: string;
  sender_avatar?: string;
}

export interface User {
  id: string;
  firebase_uid?: string;
  display_name?: string;
  email: string;
  avatar_url?: string;
  photo_url?: string;
  is_admin?: boolean;
}

// Define a type for participant with user details
export interface ParticipantWithDetails {
  user_id: string;
  is_admin: boolean;
  display_name?: string;
  avatar_url?: string;
  email?: string;
  unread_count: number;
}

/**
 * Get all conversations for a specific user
 */
export async function getUserConversations(userId: string) {
  try {
    console.log(`Getting conversations for user: ${userId}`);
    
    // Get conversations the user is part of
    const { data: userConversations, error: userConvError } = await supabase
      .from('user_conversations')
      .select('conversation_id, unread_count, is_admin')
      .eq('user_id', userId);
      
    if (userConvError) {
      console.error("Error fetching user conversations:", userConvError);
      throw userConvError;
    }
    
    if (!userConversations || userConversations.length === 0) {
      console.log("No conversations found for user");
      return { conversations: [] };
    }
    
    console.log(`Found ${userConversations.length} conversations`, userConversations);
    const conversationIds = userConversations.map(uc => uc.conversation_id);
    
    // Get the conversation details
    const { data: conversations, error: convsError } = await supabase
      .from('conversations')
      .select('*')
      .in('id', conversationIds)
      .order('updated_at', { ascending: false });
    
    if (convsError) {
      console.error("Error fetching conversations:", convsError);
      throw convsError;
    }
    
    console.log(`Fetched ${conversations.length} conversation details`);
    
    // Get full details for each conversation
    const conversationsWithDetails = await Promise.all(
      conversations.map(async (conv) => {
        // Get last message
        const { data: messages, error: messagesError } = await supabase
          .from('messages')
          .select('*')
          .eq('conversation_id', conv.id)
          .order('created_at', { ascending: false })
          .limit(1);
          
        if (messagesError) {
          console.error(`Error fetching messages for conversation ${conv.id}:`, messagesError);
        }
        
        const lastMessage = messages && messages.length > 0 ? messages[0] : null;
        
        // Get all participants
        const { data: participants, error: participantsError } = await supabase
          .from('user_conversations')
          .select('user_id, is_admin, unread_count')
          .eq('conversation_id', conv.id);
          
        if (participantsError) {
          console.error(`Error fetching participants for conversation ${conv.id}:`, participantsError);
        }
        
        // Get user details for participants
        let participantsWithDetails: ParticipantWithDetails[] = [];
        if (participants && participants.length > 0) {
          const userIds = participants.map(p => p.user_id);
          
          // Try to get user details from users table first
          const { data: userProfiles, error: userProfilesError } = await supabase
            .from('users')
            .select('id, firebase_uid, display_name, email, photo_url')
            .in('firebase_uid', userIds);
            
          if (userProfilesError) {
            console.error(`Error fetching user profiles for conversation ${conv.id}:`, userProfilesError);
          }
          
          participantsWithDetails = participants.map(p => {
            // Find user profile - match either on id or firebase_uid
            const userProfile = userProfiles?.find(up => 
              up.firebase_uid === p.user_id || up.id === p.user_id
            );
            
            return {
              user_id: p.user_id,
              is_admin: p.is_admin,
              unread_count: p.unread_count,
              display_name: userProfile?.display_name || p.user_id,
              avatar_url: userProfile?.photo_url,
              email: userProfile?.email
            };
          });
        }
        
        // Get unread count for this user
        const userConv = userConversations.find(uc => uc.conversation_id === conv.id);
        
        return {
          ...conv,
          last_message: lastMessage?.content || null,
          last_message_at: lastMessage?.created_at || conv.updated_at,
          participants: participantsWithDetails,
          unread_count: userConv?.unread_count || 0
        };
      })
    );
    
    console.log(`Returning ${conversationsWithDetails.length} conversations with details`);
    return { conversations: conversationsWithDetails };
  } catch (error) {
    console.error('Error getting user conversations:', error);
    return { conversations: [], error };
  }
}

/**
 * Get a specific conversation with its messages
 */
export async function getConversationWithMessages(conversationId: string) {
  try {
    console.log(`Getting conversation with ID: ${conversationId}`);
    
    // Get conversation details
    const { data: conversation, error: convError } = await supabase
      .from('conversations')
      .select('*')
      .eq('id', conversationId)
      .single();
    
    if (convError) {
      console.error(`Error fetching conversation ${conversationId}:`, convError);
      throw convError;
    }
    
    // Get messages for this conversation
    const { data: messages, error: msgsError } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });
    
    if (msgsError) {
      console.error(`Error fetching messages for conversation ${conversationId}:`, msgsError);
      throw msgsError;
    }
    
    // Get participants
    const { data: participants, error: partsError } = await supabase
      .from('user_conversations')
      .select('user_id, is_admin, unread_count')
      .eq('conversation_id', conversationId);
    
    if (partsError) {
      console.error(`Error fetching participants for conversation ${conversationId}:`, partsError);
      throw partsError;
    }
    
    // Get user details for participants
    let participantsWithDetails: ParticipantWithDetails[] = [];
    
    if (participants && participants.length > 0) {
      const userIds = participants.map(p => p.user_id);
      
      // Get details from users table
      const { data: userProfiles, error: profilesError } = await supabase
        .from('users')
        .select('firebase_uid, display_name, email, photo_url')
        .in('firebase_uid', userIds);
      
      if (profilesError) {
        console.error(`Error fetching user profiles for conversation ${conversationId}:`, profilesError);
      }
      
      // Enhance messages with sender details
      const enhancedMessages = messages?.map(message => {
        const senderProfile = userProfiles?.find(up => up.firebase_uid === message.sender_id);
        return {
          ...message,
          sender_name: senderProfile?.display_name || message.sender_id,
          sender_avatar: senderProfile?.photo_url
        };
      }) || [];
      
      // Enhance participants with user details
      participantsWithDetails = participants.map(p => {
        const userProfile = userProfiles?.find(up => up.firebase_uid === p.user_id);
        return {
          user_id: p.user_id,
          is_admin: p.is_admin,
          unread_count: p.unread_count,
          display_name: userProfile?.display_name || '',
          avatar_url: userProfile?.photo_url,
          email: userProfile?.email
        };
      });
      
      return {
        conversation: {
          ...conversation,
          participants: participantsWithDetails
        },
        messages: enhancedMessages
      };
    }
    
    return {
      conversation: {
        ...conversation,
        participants: []
      },
      messages: messages || []
    };
  } catch (error) {
    console.error('Error getting conversation with messages:', error);
    return { conversation: null, messages: [], error };
  }
}

/**
 * Create a new conversation
 */
export async function createConversation(params: {
  title: string;
  creatorId: string;
  participantIds: string[];
}) {
  try {
    const { title, creatorId, participantIds } = params;
    
    // Ensure creator is included in participants
    const allParticipantIds = Array.from(new Set([...participantIds, creatorId]));
    
    console.log(`Creating conversation with title "${title}" and ${allParticipantIds.length} participants`);
    
    const conversationId = uuidv4();
    
    // Create the conversation
    const { data: conversation, error: convError } = await supabase
      .from('conversations')
      .insert([
        { 
          id: conversationId, 
          title,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ])
      .select()
      .single();
    
    if (convError) {
      console.error("Error creating conversation:", convError);
      throw convError;
    }
    
    console.log(`Created conversation with ID: ${conversationId}`);
    
    // Check if creator is an admin
    const isCreatorAdmin = creatorId.includes('admin');
    
    // Add participants
    const participantEntries = allParticipantIds.map(userId => ({
      conversation_id: conversationId,
      user_id: userId,
      // Use is_admin effectively - either the user ID contains "admin" or the creator is an admin
      is_admin: userId.includes('admin') || (userId === creatorId && isCreatorAdmin),
      unread_count: 0
    }));
    
    const { error: partError } = await supabase
      .from('user_conversations')
      .insert(participantEntries);
    
    if (partError) {
      console.error("Error adding participants:", partError);
      throw partError;
    }
    
    console.log(`Added ${participantEntries.length} participants`);
    
    return { conversation, participants: participantEntries };
  } catch (error) {
    console.error('Error creating conversation:', error);
    return { error };
  }
}

/**
 * Send a message in a conversation
 */
export async function sendMessage({
  conversation_id,
  sender_id,
  content
}: {
  conversation_id: string;
  sender_id: string;
  content: string;
}) {
  try {
    console.log(`Sending message in conversation ${conversation_id} from user ${sender_id}`);
    
    const messageId = uuidv4();
    const timestamp = new Date().toISOString();
    
    // Insert the message
    const { data, error: msgError } = await supabase
      .from('messages')
      .insert([
        {
          id: messageId,
          conversation_id,
          sender_id,
          content,
          is_read: false,
          created_at: timestamp
        }
      ])
      .select()
      .single();
    
    if (msgError) {
      console.error("Error sending message:", msgError);
      throw msgError;
    }
    
    console.log(`Message sent with ID: ${messageId}`);
    
    // Update conversation's updated_at timestamp
    const { error: updateConvError } = await supabase
      .from('conversations')
      .update({ updated_at: timestamp })
      .eq('id', conversation_id);
    
    if (updateConvError) {
      console.error("Error updating conversation timestamp:", updateConvError);
      throw updateConvError;
    }
    
    // Get the sender's user profile for the response
    const { data: senderProfile } = await supabase
      .from('users')
      .select('display_name, photo_url')
      .eq('firebase_uid', sender_id)
      .maybeSingle();
    
    // Increment unread count for all participants except sender
    try {
      // Get current participants
      const { data: participants } = await supabase
        .from('user_conversations')
        .select('user_id, unread_count')
        .eq('conversation_id', conversation_id)
        .neq('user_id', sender_id);
      
      // Update each participant's unread count
      if (participants && participants.length > 0) {
        console.log(`Incrementing unread count for ${participants.length} participants`);
        
        for (const participant of participants) {
          await supabase
            .from('user_conversations')
            .update({ unread_count: (participant.unread_count || 0) + 1 })
            .eq('conversation_id', conversation_id)
            .eq('user_id', participant.user_id);
        }
      }
    } catch (countError) {
      console.error("Error updating unread counts:", countError);
    }
    
    // Return the message with sender info
    return { 
      message: {
        ...data,
        sender_name: senderProfile?.display_name || sender_id,
        sender_avatar: senderProfile?.photo_url
      } 
    };
  } catch (error) {
    console.error('Error sending message:', error);
    return { error };
  }
}

/**
 * Get all users that can be messaged
 */
export async function getMessageableUsers() {
  try {
    console.log('Fetching messageable users');
    
    // Get all users from the users table
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, firebase_uid, display_name, email, photo_url');
    
    if (usersError) {
      console.error("Error fetching users:", usersError);
      throw usersError;
    }
    
    if (!users || users.length === 0) {
      console.log("No users found");
      return { users: [] };
    }
    
    console.log(`Found ${users.length} users`);
    
    // Map user data to a consistent format
    const formattedUsers = users.map(user => ({
      id: user.firebase_uid || user.id,
      display_name: user.display_name || user.email.split('@')[0],
      email: user.email,
      avatar_url: user.photo_url,
      is_admin: (user.firebase_uid && user.firebase_uid.includes('admin')) || false
    }));
    
    return { users: formattedUsers };
  } catch (error) {
    console.error('Error fetching messageable users:', error);
    return { users: [], error };
  }
}

/**
 * Get all admin conversations
 */
export async function getAdminConversations() {
  try {
    console.log('Fetching admin conversations');
    
    // Get all conversation IDs where admins are participants
    const { data: adminConversations, error: adminError } = await supabase
      .from('user_conversations')
      .select('conversation_id')
      .eq('is_admin', true);
      
    if (adminError) {
      console.error("Error fetching admin conversations:", adminError);
      throw adminError;
    }
    
    if (!adminConversations || adminConversations.length === 0) {
      console.log("No admin conversations found");
      return { conversations: [] };
    }
    
    console.log(`Found ${adminConversations.length} admin conversations`);
    
    const conversationIds = Array.from(new Set(adminConversations.map(ac => ac.conversation_id)));
    
    // Get conversation details
    const { data: conversations, error: convsError } = await supabase
      .from('conversations')
      .select('*')
      .in('id', conversationIds)
      .order('updated_at', { ascending: false });
    
    if (convsError) {
      console.error("Error fetching conversation details:", convsError);
      throw convsError;
    }
    
    // Get additional details for each conversation
    const conversationsWithDetails = await Promise.all(
      conversations.map(async (conv) => {
        // Get last message
        const { data: messages, error: messagesError } = await supabase
          .from('messages')
          .select('*')
          .eq('conversation_id', conv.id)
          .order('created_at', { ascending: false })
          .limit(1);
        
        if (messagesError) {
          console.error(`Error fetching messages for conversation ${conv.id}:`, messagesError);
        }
        
        const lastMessage = messages && messages.length > 0 ? messages[0] : null;
        
        // Get participants
        const { data: participants, error: participantsError } = await supabase
          .from('user_conversations')
          .select('user_id, is_admin, unread_count')
          .eq('conversation_id', conv.id);
        
        if (participantsError) {
          console.error(`Error fetching participants for conversation ${conv.id}:`, participantsError);
        }
        
        // Get user details for participants
        let participantsWithDetails: ParticipantWithDetails[] = [];
        
        if (participants && participants.length > 0) {
          const userIds = participants.map(p => p.user_id);
          
          // Get details from users table
          const { data: userProfiles, error: profilesError } = await supabase
            .from('users')
            .select('firebase_uid, display_name, email, photo_url')
            .in('firebase_uid', userIds);
          
          if (profilesError) {
            console.error(`Error fetching user profiles for conversation ${conv.id}:`, profilesError);
          }
          
          participantsWithDetails = participants.map(p => {
            const userProfile = userProfiles?.find(up => up.firebase_uid === p.user_id);
            return {
              user_id: p.user_id,
              is_admin: p.is_admin,
              unread_count: p.unread_count,
              display_name: userProfile?.display_name || p.user_id,
              avatar_url: userProfile?.photo_url,
              email: userProfile?.email
            };
          });
        }
        
        // Calculate total unread for admin display
        const adminUnreadCount = participants
          ?.filter(p => p.is_admin)
          .reduce((sum, p) => sum + (p.unread_count || 0), 0) || 0;
        
        return {
          ...conv,
          last_message: lastMessage?.content || null,
          last_message_at: lastMessage?.created_at || conv.updated_at,
          participants: participantsWithDetails,
          unread_count: adminUnreadCount
        };
      })
    );
    
    return { conversations: conversationsWithDetails };
  } catch (error) {
    console.error('Error getting admin conversations:', error);
    return { conversations: [], error };
  }
}

/**
 * Mark messages as read
 */
export async function markMessagesAsRead(messageIds: string[], userId: string) {
  try {
    console.log(`Marking ${messageIds.length} messages as read for user ${userId}`);
    
    if (!messageIds.length) return { success: true };
    
    // Mark messages as read
    const { error: msgError } = await supabase
      .from('messages')
      .update({ is_read: true })
      .in('id', messageIds);
    
    if (msgError) {
      console.error("Error marking messages as read:", msgError);
      throw msgError;
    }
    
    // Get the conversation IDs for these messages
    const { data: messagesData } = await supabase
      .from('messages')
      .select('conversation_id')
      .in('id', messageIds);
    
    if (messagesData && messagesData.length > 0) {
      // Get unique conversation IDs
      const conversationIds = Array.from(new Set(messagesData.map(m => m.conversation_id)));
      
      // Reset unread count for this user in these conversations
      for (const convId of conversationIds) {
        await supabase
          .from('user_conversations')
          .update({ unread_count: 0 })
          .eq('conversation_id', convId)
          .eq('user_id', userId);
      }
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error marking messages as read:', error);
    return { success: false, error };
  }
}

/**
 * Get total unread message count for a user
 */
export async function getUnreadCount(userId: string) {
  try {
    console.log(`Getting total unread count for user ${userId}`);
    
    const { data, error } = await supabase
      .from('user_conversations')
      .select('unread_count')
      .eq('user_id', userId);
    
    if (error) {
      console.error("Error fetching unread counts:", error);
      throw error;
    }
    
    const total = data?.reduce((sum, item) => sum + (item.unread_count || 0), 0) || 0;
    console.log(`Total unread count: ${total}`);
    
    return total;
  } catch (error) {
    console.error('Error getting unread count:', error);
    return 0;
  }
}

/**
 * Debug function to check and log the Supabase tables
 */
export async function debugSupabaseTables() {
  try {
    console.log('Checking Supabase database schema...');
    
    // List all tables in the public schema
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public');
    
    if (tablesError) {
      console.error('Error fetching tables:', tablesError);
      return;
    }
    
    console.log('Available tables:', tables?.map(t => t.table_name));
    
    // Check profiles table
    try {
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .limit(1);
      
      if (profilesError) {
        console.error('Error querying profiles table:', profilesError);
      } else {
        console.log('Profiles table schema:', profilesData?.length > 0 ? Object.keys(profilesData[0]) : 'No records');
      }
    } catch (e) {
      console.log('Profiles table not available:', e);
    }
    
    // Check users table
    try {
      const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select('*')
        .limit(1);
      
      if (usersError) {
        console.error('Error querying users table:', usersError);
      } else {
        console.log('Users table schema:', usersData?.length > 0 ? Object.keys(usersData[0]) : 'No records');
      }
    } catch (e) {
      console.log('Users table not available:', e);
    }
    
  } catch (error) {
    console.error('Error debugging Supabase tables:', error);
  }
} 