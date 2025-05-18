"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, UserPlus, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useUser } from "reactfire";
import { supabase } from "@/lib/supabase";

interface TeamMember {
  id: string;
  email: string;
  display_name?: string;
  photo_url?: string;
  role?: string;
  created_at?: string;
  firebase_uid?: string;
}

export default function TeamPage() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<TeamMember[]>([]);
  const { data: user } = useUser();
  
  // Load users from Supabase
  useEffect(() => {
    async function loadTeamMembers() {
      try {
        setLoading(true);
        
        // Fetch all users - in a real team implementation, you would filter by team ID
        const { data, error } = await supabase
          .from('users')
          .select('*');
        
        if (error) {
          throw error;
        }
        
        if (data && data.length > 0) {
          console.log("Loaded team members:", data);
          setTeamMembers(data);
          setFilteredMembers(data);
        } else {
          console.log("No team members found");
          setTeamMembers([]);
          setFilteredMembers([]);
        }
      } catch (error) {
        console.error("Error loading team members:", error);
        toast({
          title: "Error",
          description: "Failed to load team members. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    }
    
    loadTeamMembers();
  }, []);
  
  // Filter members when search query changes
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredMembers(teamMembers);
    } else {
      const filtered = teamMembers.filter(member => 
        (member.display_name?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMembers(filtered);
    }
  }, [searchQuery, teamMembers]);
  
  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };
  
  // Get initials for avatar fallback
  const getInitials = (name?: string, email?: string) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    }
    if (email) {
      return email.substring(0, 2).toUpperCase();
    }
    return "TM";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Team Management</CardTitle>
              <CardDescription>View and manage your team members</CardDescription>
            </div>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Invite Member
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search team members..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="rounded-md border">
            <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
              <div className="col-span-5">Member</div>
              <div className="col-span-3">Role</div>
              <div className="col-span-4">Joined</div>
            </div>
            
            {loading ? (
              <div className="py-12 text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                <p className="mt-4 text-muted-foreground">Loading team members...</p>
              </div>
            ) : (
              <div className="divide-y">
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member) => (
                    <div key={member.id} className="grid grid-cols-12 items-center px-4 py-3">
                      <div className="col-span-5 flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={member.photo_url || undefined} alt={member.display_name} />
                          <AvatarFallback>{getInitials(member.display_name, member.email)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{member.display_name || member.email.split('@')[0]}</div>
                          <div className="text-sm text-muted-foreground">{member.email}</div>
                        </div>
                      </div>
                      <div className="col-span-3">
                        <Badge variant={member.role === "owner" ? "default" : "secondary"}>
                          {member.role === "owner" ? "Owner" : member.role || "Member"}
                        </Badge>
                      </div>
                      <div className="col-span-4 text-sm text-muted-foreground">
                        {formatDate(member.created_at)}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-6 text-center text-muted-foreground">
                    No team members found matching your search.
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Your team currently has {teamMembers.length} {teamMembers.length === 1 ? 'member' : 'members'}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
} 