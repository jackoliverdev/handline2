"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
// Removed delete user confirmation as deletion is disabled for now
import { toast } from "@/components/ui/use-toast";
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Shield, 
  User as UserIcon,
  Mail,
  Trash,
  Loader2,
  Edit,
  Ban,
  CheckCircle
} from "lucide-react";
import Link from "next/link";
import { getAllUsers, updateUserRole, updateUserStatus } from "@/lib/user-service";

interface User {
  id: string;
  firebase_uid: string;
  email: string;
  display_name?: string;
  photo_url?: string;
  role?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [isResetPasswordDialogOpen, setIsResetPasswordDialogOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [processingAction, setProcessingAction] = useState(false);
  const [openMenuForUserId, setOpenMenuForUserId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  useEffect(() => {
    loadUsers();
  }, []);
  
  // Apply filters and search
  useEffect(() => {
    let result = [...users];
    
    // Apply search filter
    if (searchQuery.trim() !== "") {
      result = result.filter(user => 
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (user.display_name && user.display_name.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Apply role filter
    if (roleFilter) {
      result = result.filter(user => user.role === roleFilter);
    }
    
    // Apply status filter
    if (statusFilter) {
      result = result.filter(user => user.status === statusFilter);
    }
    
    setFilteredUsers(result);
  }, [searchQuery, roleFilter, statusFilter, users]);
  
  async function loadUsers() {
    try {
      setLoading(true);
      const { users: loadedUsers } = await getAllUsers();
      setUsers(loadedUsers);
      setFilteredUsers(loadedUsers);
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
  
  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  // Handle role change
  const handleRoleChange = async (role: string) => {
    if (!selectedUser) return;
    
    setProcessingAction(true);
    try {
      const { success, error } = await updateUserRole(selectedUser.id, role);
      
      if (success) {
        // Update the local state
        const updatedUsers = users.map(user => 
          user.id === selectedUser.id ? { ...user, role } : user
        );
        setUsers(updatedUsers);
        
        toast({
          title: "Success",
          description: `User role updated to ${role}.`
        });
      } else {
        throw new Error(error ? String(error) : "Failed to update user role");
      }
    } catch (error) {
      console.error("Error updating user role:", error);
      toast({
        title: "Error",
        description: "Failed to update user role. Please try again.",
        variant: "destructive"
      });
    } finally {
      setProcessingAction(false);
      setIsRoleDialogOpen(false);
    }
  };
  
  // Handle status change
  const handleStatusChange = async (status: string) => {
    if (!selectedUser) return;
    
    setProcessingAction(true);
    try {
      const { success, error } = await updateUserStatus(selectedUser.id, status);
      
      if (success) {
        // Update the local state
        const updatedUsers = users.map(user => 
          user.id === selectedUser.id ? { ...user, status } : user
        );
        setUsers(updatedUsers);
        
        toast({
          title: "Success",
          description: `User status updated to ${status}.`
        });
      } else {
        throw new Error(error ? String(error) : "Failed to update user status");
      }
    } catch (error) {
      console.error("Error updating user status:", error);
      toast({
        title: "Error",
        description: "Failed to update user status. Please try again.",
        variant: "destructive"
      });
    } finally {
      setProcessingAction(false);
      setIsStatusDialogOpen(false);
    }
  };
  
  // Handle password reset
  const handlePasswordReset = async () => {
    if (!selectedUser) return;
    
    setProcessingAction(true);
    try {
      // We need to use Firebase Admin SDK for this
      // Since this is client-side, we'll need to call a server API
      const { getAuth } = await import('firebase/auth');
      const adminToken = await getAuth().currentUser?.getIdToken(true);
      const response = await fetch('/api/admin/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(adminToken ? { 'Authorization': `Bearer ${adminToken}` } : {})
        },
        body: JSON.stringify({ 
          email: selectedUser.email
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        if (result.link) {
          try {
            await navigator.clipboard.writeText(result.link as string);
            toast({
              title: "Password reset link generated",
              description: "Link copied to clipboard. Paste it into an email or browser.",
            });
          } catch {
            toast({
              title: "Password reset link generated",
              description: "Copy the link from the Network response if it wasn't copied.",
            });
          }
        } else {
          toast({
            title: "Success",
            description: "Password reset email sent successfully.",
          });
        }
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
      setIsResetPasswordDialogOpen(false);
    }
  };
  
  // Handle user deletion (Supabase + Firebase)
  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    setProcessingAction(true);
    try {
      const { getAuth } = await import('firebase/auth');
      const adminToken = await getAuth().currentUser?.getIdToken(true);
      const response = await fetch('/api/admin/delete-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(adminToken ? { 'Authorization': `Bearer ${adminToken}` } : {})
        },
        body: JSON.stringify({ firebaseUid: selectedUser.firebase_uid, supabaseId: selectedUser.id })
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || 'Failed to delete user');

      setUsers(prev => prev.filter(u => u.id !== selectedUser.id));
      setFilteredUsers(prev => prev.filter(u => u.id !== selectedUser.id));
      toast({ title: 'User deleted', description: `${selectedUser.email} was removed.` });
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({ title: 'Error', description: 'Failed to delete user.', variant: 'destructive' });
    } finally {
      setProcessingAction(false);
      setIsDeleteDialogOpen(false);
    }
  };
  
  // Get role badge variant
  const getRoleBadgeVariant = (role?: string) => {
    switch (role) {
      case 'admin':
        return 'default';
      case 'moderator':
        return 'secondary';
      default:
        return 'outline';
    }
  };
  
  // Get status badge variant
  const getStatusBadgeVariant = (status?: string) => {
    switch (status) {
      case 'active':
        return 'secondary';
      case 'suspended':
        return 'destructive';
      case 'pending':
        return 'outline';
      default:
        return 'outline';
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Header and Add User button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
        <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/admin/users/create">
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            Manage users, roles, and permissions for your application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters and search */}
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:space-y-0 sm:space-x-3">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-8 text-xs sm:text-sm h-8 sm:h-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:space-x-2 w-full sm:w-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-auto text-xs sm:text-sm h-8 sm:h-10">
                    {roleFilter ? `Role: ${roleFilter}` : "All Roles"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setRoleFilter(null)}>
                    All Roles
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setRoleFilter("admin")}>Admin</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRoleFilter("moderator")}>Moderator</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRoleFilter("user")}>User</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-auto text-xs sm:text-sm h-8 sm:h-10">
                    {statusFilter ? `Status: ${statusFilter}` : "All Statuses"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                    All Statuses
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setStatusFilter("active")}>Active</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("pending")}>Pending</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("suspended")}>Suspended</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          {/* User list/table */}
          <div className="rounded-md border">
            {/* Desktop table header */}
            <div className="hidden sm:grid grid-cols-12 gap-4 border-b px-4 py-3 font-medium text-xs sm:text-sm">
              <div className="col-span-5 sm:col-span-4">User</div>
              <div className="col-span-3 sm:col-span-2">Role</div>
              <div className="col-span-3 sm:col-span-2">Status</div>
              <div className="hidden sm:block sm:col-span-3">Created</div>
              <div className="col-span-1">Actions</div>
            </div>
            {/* Mobile card/list view */}
            <div className="sm:hidden divide-y">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="mt-4 text-muted-foreground">Loading users...</p>
                </div>
              ) : filteredUsers.length === 0 ? (
                <div className="px-4 py-12 text-center text-muted-foreground">
                  {searchQuery || roleFilter || statusFilter ? 
                    "No users match your filters." : 
                    "No users found. Add your first user."}
                </div>
              ) : (
                filteredUsers.map((user) => (
                  <div key={user.id} className="flex flex-col gap-2 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.photo_url || undefined} alt={user.display_name} />
                        <AvatarFallback>
                          {user.display_name 
                            ? user.display_name.charAt(0).toUpperCase() 
                            : user.email.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col overflow-hidden">
                        <span className="font-medium truncate text-sm">{user.display_name || user.email.split('@')[0]}</span>
                        <span className="text-xs text-muted-foreground truncate">{user.email}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-1">
                      <Badge variant={getRoleBadgeVariant(user.role)} className="capitalize text-xs px-2 py-0.5">{user.role || "user"}</Badge>
                      <Badge variant={getStatusBadgeVariant(user.status)} className="capitalize text-xs px-2 py-0.5">{user.status || "active"}</Badge>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button asChild variant="ghost" size="icon" className="h-7 w-7 p-0">
                        <Link href={`/admin/users/${user.id}`}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 p-0" onClick={() => { setSelectedUser(user); setIsRoleDialogOpen(true); }}>
                        <Shield className="h-4 w-4" />
                        <span className="sr-only">Change Role</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 p-0" onClick={() => { setSelectedUser(user); setIsStatusDialogOpen(true); }}>
                        {user.status === "suspended" ? <CheckCircle className="h-4 w-4" /> : <Ban className="h-4 w-4" />}
                        <span className="sr-only">Change Status</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 p-0" onClick={() => { setSelectedUser(user); setIsResetPasswordDialogOpen(true); }}>
                        <Mail className="h-4 w-4" />
                        <span className="sr-only">Reset Password</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 p-0 text-destructive" onClick={() => { setSelectedUser(user); setIsDeleteDialogOpen(true); }}>
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
            {/* Desktop table view */}
            <div className="hidden sm:divide-y sm:block">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="mt-4 text-muted-foreground">Loading users...</p>
                </div>
              ) : filteredUsers.length === 0 ? (
                <div className="px-4 py-12 text-center text-muted-foreground">
                  {searchQuery || roleFilter || statusFilter ? 
                    "No users match your filters." : 
                    "No users found. Add your first user."}
                </div>
              ) : (
                filteredUsers.map((user) => (
                  <div 
                    key={user.id} 
                    className="grid grid-cols-12 gap-4 items-center px-4 py-3 text-sm"
                  >
                    <div className="col-span-5 sm:col-span-4 flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.photo_url || undefined} alt={user.display_name} />
                        <AvatarFallback>
                          {user.display_name 
                            ? user.display_name.charAt(0).toUpperCase() 
                            : user.email.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col overflow-hidden">
                        <span className="font-medium truncate">
                          {user.display_name || user.email.split('@')[0]}
                        </span>
                        <span className="text-xs text-muted-foreground truncate">
                          {user.email}
                        </span>
                      </div>
                    </div>
                    <div className="col-span-3 sm:col-span-2">
                      <Badge variant={getRoleBadgeVariant(user.role)} className="capitalize">
                        {user.role || "user"}
                      </Badge>
                    </div>
                    <div className="col-span-3 sm:col-span-2">
                      <Badge variant={getStatusBadgeVariant(user.status)} className="capitalize">
                        {user.status || "active"}
                      </Badge>
                    </div>
                    <div className="hidden sm:block sm:col-span-3 text-muted-foreground">
                      {formatDate(user.created_at)}
                    </div>
                    <div className="col-span-1 text-right">
                      <DropdownMenu open={openMenuForUserId === user.id} onOpenChange={(open) => setOpenMenuForUserId(open ? user.id : null)}>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/users/${user.id}`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit User
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={() => {
                              setOpenMenuForUserId(null);
                              setSelectedUser(user);
                              setIsRoleDialogOpen(true);
                            }}
                          >
                            <Shield className="mr-2 h-4 w-4" />
                            Change Role
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={() => {
                              setOpenMenuForUserId(null);
                              setSelectedUser(user);
                              setIsStatusDialogOpen(true);
                            }}
                          >
                            {user.status === "suspended" ? (
                              <CheckCircle className="mr-2 h-4 w-4" />
                            ) : (
                              <Ban className="mr-2 h-4 w-4" />
                            )}
                            Change Status
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onSelect={() => {
                              setOpenMenuForUserId(null);
                              setSelectedUser(user);
                              setIsResetPasswordDialogOpen(true);
                            }}
                          >
                            <Mail className="mr-2 h-4 w-4" />
                            Reset Password
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onSelect={() => {
                              setOpenMenuForUserId(null);
                              setSelectedUser(user);
                              setIsDeleteDialogOpen(true);
                            }}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Role Dialog */}
      <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change User Role</DialogTitle>
            <DialogDescription>
              Update the role for user {selectedUser?.email}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <Button 
                variant="outline" 
                onClick={() => handleRoleChange("admin")}
                disabled={processingAction}
              >
                <Shield className="mr-2 h-4 w-4" />
                Admin
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleRoleChange("moderator")}
                disabled={processingAction}
              >
                <Shield className="mr-2 h-4 w-4" />
                Moderator
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleRoleChange("user")}
                disabled={processingAction}
              >
                <UserIcon className="mr-2 h-4 w-4" />
                Regular User
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsRoleDialogOpen(false)} disabled={processingAction}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Status Dialog */}
      <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change User Status</DialogTitle>
            <DialogDescription>
              Update the status for user {selectedUser?.email}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <Button 
                variant="outline" 
                onClick={() => handleStatusChange("active")}
                disabled={processingAction}
                className="border-green-200 bg-green-50 hover:bg-green-100 text-green-900"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Active
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleStatusChange("pending")}
                disabled={processingAction}
                className="border-yellow-200 bg-yellow-50 hover:bg-yellow-100 text-yellow-900"
              >
                <UserIcon className="mr-2 h-4 w-4" />
                Pending
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleStatusChange("suspended")}
                disabled={processingAction}
                className="border-red-200 bg-red-50 hover:bg-red-100 text-red-900"
              >
                <Ban className="mr-2 h-4 w-4" />
                Suspended
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsStatusDialogOpen(false)} disabled={processingAction}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Reset Password Dialog */}
      <Dialog open={isResetPasswordDialogOpen} onOpenChange={setIsResetPasswordDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Password Reset Email</DialogTitle>
            <DialogDescription>
              Send a password reset email to {selectedUser?.email}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              This will send a password reset email to the user. The link in the email will expire after some time.
            </p>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsResetPasswordDialogOpen(false)} disabled={processingAction}>
              Cancel
            </Button>
            <Button onClick={handlePasswordReset} disabled={processingAction}>
              {processingAction ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Send Reset Email
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete user?</DialogTitle>
            <DialogDescription>
              This removes {selectedUser?.email} from Firebase Auth and your Supabase users table.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsDeleteDialogOpen(false)} disabled={processingAction}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteUser} disabled={processingAction}>
              {processingAction ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Deleting...</>) : (<>Delete User</>)}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 