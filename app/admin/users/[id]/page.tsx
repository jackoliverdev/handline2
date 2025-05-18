"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft, Loader2, Mail, Trash, Shield, Upload, User, Ban } from "lucide-react";
import Link from "next/link";
import { getUserProfile, updateUserProfile, deleteUser, uploadAvatar } from "@/lib/user-service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserEditPageProps {
  params: {
    id: string;
  };
}

export default function UserEditPage({ params }: UserEditPageProps) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [status, setStatus] = useState("active");
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isResetEmailDialogOpen, setIsResetEmailDialogOpen] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(0); // For resetting file input
  const [processingAction, setProcessingAction] = useState(false);
  
  // Load user data
  useEffect(() => {
    loadUser();
  }, [params.id]);
  
  const loadUser = async () => {
    try {
      setLoading(true);
      
      // First try to get the user by ID from Supabase
      const response = await fetch(`/api/admin/user/${params.id}`, {
        method: 'GET'
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      
      const { data: userData } = await response.json();
      
      if (!userData) {
        toast({
          title: "Error",
          description: "User not found.",
          variant: "destructive"
        });
        router.push('/admin/users');
        return;
      }
      
      // Set form state
      setUser(userData);
      setDisplayName(userData.display_name || "");
      setEmail(userData.email || "");
      setRole(userData.role || "user");
      setStatus(userData.status || "active");
      setDarkMode(userData.dark_mode || false);
      setNotifications(userData.notifications || false);
      setMarketingEmails(userData.marketing_emails || false);
    } catch (error) {
      console.error("Error loading user:", error);
      toast({
        title: "Error",
        description: "Failed to load user data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file (JPEG, PNG, etc.)",
        variant: "destructive"
      });
      return;
    }
    
    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image must be less than 5MB",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Upload avatar via user service function
      const updatedProfile = await uploadAvatar(user.firebase_uid, file);
      
      // Update local state
      setUser({ ...user, photo_url: updatedProfile.photo_url });
      
      toast({
        title: "Success",
        description: "Avatar uploaded successfully!"
      });
      
      // Reset file input
      setFileInputKey(prev => prev + 1);
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast({
        title: "Error",
        description: "Failed to upload avatar. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      const updates = {
        display_name: displayName,
        role,
        status,
        dark_mode: darkMode,
        notifications,
        marketing_emails: marketingEmails
      };
      
      const updatedProfile = await updateUserProfile(user.firebase_uid, updates);
      
      setUser({ ...user, ...updatedProfile });
      
      toast({
        title: "Success",
        description: "User updated successfully."
      });
    } catch (error) {
      console.error("Error updating user:", error);
      toast({
        title: "Error",
        description: "Failed to update user. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle reset password
  const handleResetPassword = async () => {
    if (!user) return;
    
    setProcessingAction(true);
    try {
      // We need to use Firebase Admin SDK via an API route
      const response = await fetch('/api/admin/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: user.email
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast({
          title: "Success",
          description: "Password reset email sent successfully."
        });
      } else {
        throw new Error(result.message || "Failed to send password reset email");
      }
    } catch (error) {
      console.error("Error sending password reset email:", error);
      toast({
        title: "Error",
        description: "Failed to send password reset email. Please try again.",
        variant: "destructive"
      });
    } finally {
      setProcessingAction(false);
      setIsResetEmailDialogOpen(false);
    }
  };
  
  // Handle user deletion
  const handleDeleteUser = async () => {
    if (!user) return;
    
    setProcessingAction(true);
    try {
      // First, try to delete from Supabase
      const { success, error } = await deleteUser(user.id);
      
      if (!success) {
        throw new Error(error ? String(error) : "Failed to delete user from database");
      }
      
      // Now try to delete from Firebase
      const response = await fetch('/api/admin/delete-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          firebaseUid: user.firebase_uid 
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast({
          title: "Success",
          description: "User deleted successfully."
        });
        
        // Redirect to user list
        router.push('/admin/users');
      } else {
        // If Firebase delete fails but Supabase succeeded
        toast({
          title: "Partial Success",
          description: "User removed from database but not from authentication system."
        });
        
        // Still redirect
        router.push('/admin/users');
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast({
        title: "Error",
        description: "Failed to delete user. Please try again.",
        variant: "destructive"
      });
    } finally {
      setProcessingAction(false);
      setIsDeleteDialogOpen(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" asChild className="mr-4">
          <Link href="/admin/users">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Users
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Edit User</h1>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2">Loading user data...</p>
        </div>
      ) : (
        <Tabs defaultValue="profile">
          <TabsList className="mb-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit}>
            <TabsContent value="profile">
              <div className="grid gap-6 md:grid-cols-6">
                {/* Main profile content - 4 columns */}
                <div className="md:col-span-4 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>User Information</CardTitle>
                      <CardDescription>
                        Edit the user's basic information.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="displayName">Display Name</Label>
                          <Input
                            id="displayName"
                            placeholder="Enter display name"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Email address"
                            value={email}
                            disabled
                          />
                        </div>
                      </div>
                      
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="role">Role</Label>
                          <Select value={role} onValueChange={setRole}>
                            <SelectTrigger id="role">
                              <SelectValue placeholder="Select user role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="moderator">Moderator</SelectItem>
                              <SelectItem value="user">User</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="status">Status</Label>
                          <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger id="status">
                              <SelectValue placeholder="Select user status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="suspended">Suspended</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Sidebar - 2 columns */}
                <div className="md:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>User Avatar</CardTitle>
                      <CardDescription>
                        Update the user's profile picture.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-col items-center space-y-4">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={user?.photo_url || undefined} alt={user?.display_name} />
                          <AvatarFallback>
                            {user?.display_name 
                              ? user.display_name.charAt(0).toUpperCase() 
                              : user?.email.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        
                        <input
                          key={fileInputKey}
                          type="file"
                          id="avatar"
                          className="hidden"
                          accept="image/*"
                          onChange={handleAvatarChange}
                        />
                        
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => document.getElementById('avatar')?.click()}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            <>
                              <Upload className="mr-2 h-4 w-4" />
                              Upload New Avatar
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Actions</CardTitle>
                      <CardDescription>
                        Manage user account actions.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => setIsResetEmailDialogOpen(true)}
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Send Password Reset
                      </Button>
                      
                      <Button
                        type="button"
                        variant="destructive"
                        className="w-full"
                        onClick={() => setIsDeleteDialogOpen(true)}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete User
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>User Preferences</CardTitle>
                  <CardDescription>
                    Manage user preferences and settings.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="darkMode">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable dark mode for this user.
                      </p>
                    </div>
                    <Switch
                      id="darkMode"
                      checked={darkMode}
                      onCheckedChange={setDarkMode}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notifications">Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow this user to receive notifications.
                      </p>
                    </div>
                    <Switch
                      id="notifications"
                      checked={notifications}
                      onCheckedChange={setNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="marketingEmails">Marketing Emails</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow this user to receive marketing emails.
                      </p>
                    </div>
                    <Switch
                      id="marketingEmails"
                      checked={marketingEmails}
                      onCheckedChange={setMarketingEmails}
                    />
                  </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                  <Button
                    type="submit"
                    className="ml-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </form>
        </Tabs>
      )}
      
      {/* Reset Password Dialog */}
      <AlertDialog open={isResetEmailDialogOpen} onOpenChange={setIsResetEmailDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Send Password Reset Email</AlertDialogTitle>
            <AlertDialogDescription>
              This will send a password reset email to {user?.email}. The link in the email will expire after some time.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={processingAction}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleResetPassword();
              }}
              disabled={processingAction}
            >
              {processingAction ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Reset Email"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the user {user?.email} and remove their account from both the database and authentication system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={processingAction}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleDeleteUser();
              }}
              disabled={processingAction}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {processingAction ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete User"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
} 