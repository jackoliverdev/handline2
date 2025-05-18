"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowUp, ChevronDown, Shield, User, Loader2 } from "lucide-react";
import { useUser } from "reactfire";
import {
  getConversationWithMessages,
  sendMessage,
  markMessagesAsRead,
} from "@/lib/messaging-service";
import Link from "next/link";
import { format } from "date-fns";

interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  sender?: {
    display_name?: string;
    avatar_url?: string;
    email?: string;
    is_admin?: boolean;
  };
}

interface Participant {
  user_id: string;
  display_name?: string;
  avatar_url?: string;
  email?: string;
  is_admin: boolean;
}

interface Conversation {
  id: string;
  title?: string;
  created_at: string;
  participants: Participant[];
}

export default function ConversationPage() {
  const params = useParams();
  const router = useRouter();
  const { data: firebaseUser, status } = useUser();
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const userId = firebaseUser?.uid || "";
  const conversationId = params?.id ? (typeof params.id === 'string' ? params.id : params.id[0]) : "";
  
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      // Use a more reliable scroll method
      const container = document.querySelector('.messages-container');
      if (container) {
        container.scrollTop = container.scrollHeight;
      } else {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }
  };

  const loadData = async () => {
    if (!userId || status === 'loading') return;
    
    try {
      setLoading(true);
      
      // Get conversation and messages
      const result = await getConversationWithMessages(conversationId);
      if (result.error) {
        setError(result.error as Error);
        return;
      }
      
      setConversation(result.conversation);
      setMessages(result.messages || []);
      
      // Mark messages as read
      if (conversationId) {
        // Filter unread messages that aren't from the current user
        const unreadMessageIds = result.messages
          .filter(message => !message.is_read && message.sender_id !== userId)
          .map(message => message.id);
          
        if (unreadMessageIds.length > 0) {
          await markMessagesAsRead(unreadMessageIds, userId);
        }
      }
      
    } catch (err) {
      console.error("Error loading conversation:", err);
      setError(err as Error);
    } finally {
      setLoading(false);
      // Ensure proper scroll position after loading
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  };

  useEffect(() => {
    if (status !== 'loading') {
      loadData();
    }
  }, [userId, conversationId, status]);

  useEffect(() => {
    // Delay scrolling to ensure DOM is fully updated
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 200);
    return () => clearTimeout(timer);
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !userId || !conversationId) return;
    
    try {
      setSending(true);
      
      const result = await sendMessage({
        conversation_id: conversationId,
        sender_id: userId,
        content: newMessage.trim(),
      });
      
      if (result.error) {
        console.error("Error sending message:", result.error);
        return;
      }
      
      // Add new message to the list
      if (result.message) {
        const messageWithSender = {
          ...result.message,
          sender: {
            display_name: firebaseUser?.displayName || "",
            avatar_url: firebaseUser?.photoURL || "",
            email: firebaseUser?.email || "",
          },
        };
        setMessages([...messages, messageWithSender]);
      }
      
      // Clear input
      setNewMessage("");
      
    } catch (err) {
      console.error("Error in send message:", err);
    } finally {
      setSending(false);
    }
  };

  // Helper to get conversation title
  const getConversationTitle = () => {
    if (!conversation) return "Loading...";
    
    if (conversation.title && conversation.title !== 'New Conversation') {
      return conversation.title;
    }
    
    const otherParticipants = conversation.participants.filter(
      p => p.user_id !== userId
    );
    
    if (otherParticipants.length > 0) {
      return otherParticipants
        .map(p => p.display_name || p.email?.split('@')[0] || 'Unknown User')
        .join(', ');
    }
    
    return 'Conversation';
  };

  // Format message time
  const formatMessageTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    
    // If today, show time only
    if (date.toDateString() === now.toDateString()) {
      return format(date, 'h:mm a');
    }
    
    // If this year, show month and day
    if (date.getFullYear() === now.getFullYear()) {
      return format(date, 'MMM d, h:mm a');
    }
    
    // Otherwise show full date
    return format(date, 'MMM d, yyyy, h:mm a');
  };

  // Group messages by date
  const groupedMessages = messages.reduce((groups, message) => {
    const date = new Date(message.created_at).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {} as Record<string, Message[]>);

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col h-[calc(100vh-8.5rem)] max-h-[calc(100vh-8.5rem)]">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Link href="/dashboard/inbox" className="mr-4">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">{getConversationTitle()}</h1>
              {conversation && (
                <p className="text-sm text-muted-foreground">
                  {conversation.participants.length} participants
                </p>
              )}
            </div>
          </div>
          <div className="flex -space-x-2">
            {conversation?.participants.map((participant, i) => (
              <Avatar key={i} className="border-2 border-background">
                <AvatarImage 
                  src={participant.avatar_url || ''} 
                  alt={participant.display_name || ''} 
                />
                <AvatarFallback className={participant.is_admin ? 'bg-red-100' : ''}>
                  {participant.is_admin ? (
                    <Shield className="h-4 w-4" />
                  ) : (
                    participant.display_name?.substring(0, 2) || 
                    participant.email?.substring(0, 2) || 
                    <User className="h-4 w-4" />
                  )}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>

        {/* Messages */}
        <Card className="flex-1 overflow-hidden">
          <CardContent className="pt-6 px-4 pb-4 overflow-y-auto h-full messages-container">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : error ? (
              <div className="flex justify-center items-center h-full text-destructive">
                <p>Error loading conversation: {error.message}</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col justify-center items-center h-full text-muted-foreground">
                <p className="mb-2">No messages yet</p>
                <p className="text-sm">Start the conversation by sending a message below</p>
              </div>
            ) : (
              <div className="space-y-6 pb-4">
                {Object.keys(groupedMessages).map(date => (
                  <div key={date} className="space-y-4">
                    <div className="flex justify-center sticky top-0 z-10 py-1">
                      <Badge variant="outline" className="text-xs text-muted-foreground bg-card/80 backdrop-blur-sm py-1 px-3">
                        {new Date(date).toLocaleDateString(undefined, {
                          weekday: 'long',
                          month: 'short',
                          day: 'numeric',
                          year: new Date(date).getFullYear() !== new Date().getFullYear() 
                            ? 'numeric' 
                            : undefined
                        })}
                      </Badge>
                    </div>
                    
                    {groupedMessages[date].map((message, index) => {
                      const isSender = message.sender_id === userId;
                      const sender = message.sender || {
                        display_name: "Unknown",
                        avatar_url: "",
                        is_admin: false,
                      };
                      
                      return (
                        <div 
                          key={message.id}
                          className={`flex ${isSender ? 'justify-end' : 'justify-start'} ${index === 0 ? 'mt-3' : 'mt-2'}`}
                        >
                          <div className={`flex max-w-[80%] ${isSender ? 'flex-row-reverse' : 'flex-row'}`}>
                            <Avatar className={`h-8 w-8 ${isSender ? 'ml-2' : 'mr-2'} flex-shrink-0`}>
                              <AvatarImage 
                                src={sender.avatar_url || ''} 
                                alt={sender.display_name || ''} 
                              />
                              <AvatarFallback className={sender.is_admin ? 'bg-red-100' : ''}>
                                {sender.is_admin ? (
                                  <Shield className="h-4 w-4" />
                                ) : (
                                  sender.display_name?.substring(0, 2) || 
                                  sender.email?.substring(0, 2) || 
                                  <User className="h-4 w-4" />
                                )}
                              </AvatarFallback>
                            </Avatar>
                            
                            <div className={`
                              p-3 rounded-lg shadow-sm
                              ${isSender
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                              }
                            `}>
                              <div className="flex justify-between items-center mb-1">
                                <span className={`text-xs font-medium ${
                                  isSender ? 'text-primary-foreground/80' : 'text-muted-foreground'
                                }`}>
                                  {isSender ? 'You' : sender.display_name || sender.email?.split('@')[0] || 'Unknown'}
                                  {sender.is_admin && (
                                    <Badge variant={isSender ? 'outline' : 'secondary'} className="ml-1 h-4 text-[10px]">
                                      Admin
                                    </Badge>
                                  )}
                                </span>
                                <span className={`text-xs ${
                                  isSender ? 'text-primary-foreground/70' : 'text-muted-foreground'
                                }`}>
                                  {formatMessageTime(message.created_at)}
                                </span>
                              </div>
                              <p className="whitespace-pre-wrap break-words">
                                {message.content}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </CardContent>
          
          {/* Message Input */}
          <CardFooter className="p-4 border-t bg-white dark:bg-card sticky bottom-0 shadow-md">
            <form onSubmit={handleSendMessage} className="flex w-full space-x-2">
              <Textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 min-h-[50px] max-h-32 border-gray-300 focus:border-primary shadow-sm resize-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
              />
              <Button 
                type="submit" 
                disabled={!newMessage.trim() || sending || loading}
                className="h-10 px-4"
                size="default"
              >
                {sending ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <>
                    <ArrowUp className="h-4 w-4 mr-2" />
                    Send
                  </>
                )}
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
} 