"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { createConversation, sendMessage, getMessageableUsers } from "@/lib/messaging-service";
import { ArrowLeft, Search, Users, UserCheck, Shield } from "lucide-react";
import Link from "next/link";
import { useUser } from "reactfire";

interface User {
  id: string;
  display_name: string;
  email: string;
  avatar_url?: string;
}

export default function NewConversationPage() {
  const router = useRouter();
  const { data: firebaseUser, status } = useUser();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // Current user ID
  const userId = firebaseUser?.uid || "";
  
  // Load users
  useEffect(() => {
    async function loadUsers() {
      if (!userId || status === 'loading') return;
      
      try {
        setLoading(true);
        const result = await getMessageableUsers();
        if (result.users) {
          // Filter out the current user
          const otherUsers = result.users.filter(user => user.id !== userId);
          setUsers(otherUsers);
          setFilteredUsers(otherUsers);
        }
      } catch (error) {
        console.error("Error loading users:", error);
        toast({
          title: "Error",
          description: "Failed to load users. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    }
    
    if (status !== 'loading') {
      loadUsers();
    }
  }, [userId, status]);
  
  // Filter users when search term changes
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user => 
        user.display_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);
  
  // Handle toggling a user selection
  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId) 
        : [...prev, userId]
    );
  };
  
  // Handle form submission
  const handleSubmit = async () => {
    if (selectedUsers.length === 0) {
      toast({
        title: "No recipients selected",
        description: "Please select at least one recipient for your message.",
        variant: "destructive"
      });
      return;
    }
    
    if (!message.trim()) {
      toast({
        title: "Message is empty",
        description: "Please enter a message to send.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setSubmitting(true);
      
      // Create conversation
      const result = await createConversation({
        title: title || "New Conversation",
        creatorId: userId,
        participantIds: [...selectedUsers]
      });
      
      if (result.error) {
        throw result.error;
      }
      
      // Navigate to the new conversation
      if (result.conversation?.id) {
        // Send the first message
        await sendMessage({
          conversation_id: result.conversation.id,
          sender_id: userId,
          content: message
        });

        toast({
          title: "Conversation created",
          description: "Your message has been sent.",
        });
        
        router.push(`/dashboard/inbox/${result.conversation.id}`);
      }
    } catch (error) {
      console.error("Error creating conversation:", error);
      toast({
        title: "Error",
        description: "Failed to create conversation. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/inbox">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Inbox
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">New Message</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left side - Users */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Recipients
            </CardTitle>
            <CardDescription>
              Select users to message
            </CardDescription>
            <div className="flex items-center space-x-2 mt-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">
                No users found
              </div>
            ) : (
              <div className="h-[400px] overflow-y-auto pr-4">
                <div className="space-y-2">
                  {filteredUsers.map(user => (
                    <div 
                      key={user.id}
                      className={`flex items-center p-2 rounded-md cursor-pointer hover:bg-accent transition-colors ${
                        selectedUsers.includes(user.id) ? 'bg-accent' : ''
                      }`}
                      onClick={() => toggleUserSelection(user.id)}
                    >
                      <div className="flex-shrink-0 mr-3">
                        <Avatar>
                          <AvatarImage src={user.avatar_url || undefined} />
                          <AvatarFallback>
                            {user.display_name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center">
                          <p className="text-sm font-medium truncate">
                            {user.display_name}
                          </p>
                          {user.id.includes("admin") && (
                            <Badge variant="outline" className="ml-2">
                              <Shield className="h-3 w-3 mr-1" />
                              Admin
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                      <Checkbox 
                        checked={selectedUsers.includes(user.id)}
                        onCheckedChange={() => toggleUserSelection(user.id)}
                        className="ml-2"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <div className="w-full">
              <p className="text-sm mb-2">Selected: {selectedUsers.length} users</p>
              <div className="flex flex-wrap gap-2">
                {selectedUsers.map(selectedId => {
                  const user = users.find(u => u.id === selectedId);
                  return user ? (
                    <Badge key={selectedId} variant="secondary" className="flex items-center gap-1">
                      {user.display_name}
                      <button 
                        className="ml-1 hover:bg-accent rounded-full p-0.5"
                        onClick={() => toggleUserSelection(selectedId)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 6 6 18"></path>
                          <path d="m6 6 12 12"></path>
                        </svg>
                      </button>
                    </Badge>
                  ) : null;
                })}
              </div>
            </div>
          </CardFooter>
        </Card>
        
        {/* Right side - Message */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Compose Message</CardTitle>
            <CardDescription>
              Write your message to {selectedUsers.length} recipient{selectedUsers.length !== 1 ? 's' : ''}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Conversation Title (Optional)</Label>
              <Input 
                id="title" 
                placeholder="Enter a title for this conversation" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea 
                id="message" 
                placeholder="Type your message here..." 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[200px]"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/dashboard/inbox">Cancel</Link>
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={submitting || selectedUsers.length === 0 || !message.trim()}
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-current mr-2"></div>
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
} 