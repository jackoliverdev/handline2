"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { getUserConversations, getUnreadCount } from "@/lib/messaging-service";
import { Plus, Search, AlertCircle, Mail, Shield, User } from "lucide-react";
import Link from "next/link";
import { useUser } from "reactfire";

// Define interfaces
interface Participant {
  user_id: string;
  display_name?: string;
  avatar_url?: string;
  email?: string;
  is_admin: boolean;
  unread_count: number;
}

interface Conversation {
  id: string;
  title?: string;
  created_at: string;
  last_message?: string;
  last_message_at?: string;
  unread_count: number;
  participants: Participant[];
}

export default function UserInboxPage() {
  const router = useRouter();
  const { data: firebaseUser, status } = useUser();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTab, setCurrentTab] = useState("all");
  const [error, setError] = useState<Error | null>(null);
  const [totalUnread, setTotalUnread] = useState(0);
  
  // Get user ID
  const userId = firebaseUser?.uid || "";

  // Load conversations on mount
  useEffect(() => {
    async function loadData() {
      if (!userId || status === 'loading') return;
      
      try {
        setLoading(true);
        const result = await getUserConversations(userId);
        if (result.error) {
          console.error("Error loading conversations:", result.error);
          setError(result.error as Error);
        } else {
          setConversations(result.conversations || []);
          
          // Calculate total unread
          const total = result.conversations.reduce(
            (sum, conv) => sum + (conv.unread_count || 0), 
            0
          );
          setTotalUnread(total);
        }
      } catch (err) {
        console.error("Error in loadData:", err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }
    
    if (status !== 'loading') {
      loadData();
    }
  }, [userId, status]);
  
  // Filter conversations based on search and tab
  const filteredConversations = conversations.filter(conv => {
    // Search in title, last message, and participant names
    const matchesSearch = (
      (conv.title?.toLowerCase().includes(searchTerm.toLowerCase())) || 
      (conv.last_message?.toLowerCase().includes(searchTerm.toLowerCase())) || 
      (conv.participants.some(p => 
        p.display_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.email?.toLowerCase().includes(searchTerm.toLowerCase())
      ))
    ) || false;
    
    if (currentTab === "all") return matchesSearch;
    if (currentTab === "unread") return matchesSearch && (conv.unread_count > 0);
    if (currentTab === "admin") {
      // Show conversations with platform admins
      return matchesSearch && conv.participants.some(p => p.is_admin);
    }
    
    return matchesSearch;
  });

  // Helper function to get other participants (not current user)
  const getOtherParticipants = (conversation: Conversation) => {
    return conversation.participants.filter(p => p.user_id !== userId);
  };

  // Helper function to format the conversation title
  const getConversationTitle = (conversation: Conversation) => {
    if (conversation.title && conversation.title !== 'New Conversation') {
      return conversation.title;
    }
    
    const otherParticipants = getOtherParticipants(conversation);
    if (otherParticipants.length > 0) {
      return otherParticipants
        .map(p => p.display_name || p.email?.split('@')[0] || 'Unknown User')
        .join(', ');
    }
    
    return 'New Conversation';
  };
  
  // Format relative time
  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <Mail className="mr-2 h-6 w-6" /> Inbox
              {totalUnread > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {totalUnread}
                </Badge>
              )}
            </h1>
            <p className="text-muted-foreground">
              Manage your conversations and messages
            </p>
          </div>
          <Link href="/dashboard/inbox/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Message
            </Button>
          </Link>
        </div>
        
        <div className="flex items-center space-x-2 bg-accent/50 p-2 rounded-md">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        
        <Tabs defaultValue="all" value={currentTab} onValueChange={setCurrentTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread" className="relative">
              Unread
              {totalUnread > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {totalUnread}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="admin">
              <Shield className="h-4 w-4 mr-1" /> Admin
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value={currentTab} className="mt-4">
            {error && (
              <Card className="mb-6 border-red-300 bg-red-50">
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                    <p className="text-red-600">
                      Error loading conversations: {error.message}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : filteredConversations.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Mail className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-2">No conversations found</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {searchTerm 
                      ? "Try a different search term" 
                      : "Start a new conversation to get started"}
                  </p>
                  <Link href="/dashboard/inbox/new">
                    <Button>Start a conversation</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {filteredConversations.map((conversation) => {
                  const otherParticipants = getOtherParticipants(conversation);
                  const hasAdmins = otherParticipants.some(p => p.is_admin);
                  
                  return (
                    <Link 
                      href={`/dashboard/inbox/${conversation.id}`} 
                      key={conversation.id}
                      className="block"
                    >
                      <Card className={`hover:bg-accent/50 transition-colors cursor-pointer ${
                        conversation.unread_count > 0 ? 'border-primary shadow-sm' : ''
                      }`}>
                        <CardContent className="p-4">
                          <div className="flex items-center">
                            <div className="flex -space-x-2 mr-4">
                              {otherParticipants.slice(0, 3).map((participant, i) => (
                                <Avatar key={i} className={`border-2 ${
                                  conversation.unread_count > 0 
                                    ? 'border-primary' 
                                    : 'border-background'
                                }`}>
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
                              {otherParticipants.length > 3 && (
                                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium border-2 border-background">
                                  +{otherParticipants.length - 3}
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h3 className={`font-medium ${
                                      conversation.unread_count > 0 ? 'font-semibold' : ''
                                    }`}>
                                      {getConversationTitle(conversation)}
                                    </h3>
                                    {hasAdmins && (
                                      <Badge variant="outline" className="h-5 flex items-center gap-1">
                                        <Shield className="h-3 w-3" />
                                        Admin
                                      </Badge>
                                    )}
                                  </div>
                                  <p className={`text-sm ${
                                    conversation.unread_count > 0 
                                      ? 'text-foreground font-medium' 
                                      : 'text-muted-foreground'
                                  } truncate max-w-xs`}>
                                    {conversation.last_message || 'No messages yet'}
                                  </p>
                                </div>
                                <div className="flex flex-col items-end">
                                  <span className="text-xs text-muted-foreground">
                                    {conversation.last_message_at 
                                      ? formatRelativeTime(conversation.last_message_at)
                                      : formatRelativeTime(conversation.created_at)
                                    }
                                  </span>
                                  {conversation.unread_count > 0 && (
                                    <Badge variant="default" className="mt-1">
                                      {conversation.unread_count}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 