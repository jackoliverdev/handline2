"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { z } from "zod";

// Validation schema for user creation
const createUserSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  displayName: z.string().min(2, "Display name must be at least 2 characters"),
  role: z.enum(["admin", "user"]),
});

export default function CreateUserPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState("user");
  const [notifications, setNotifications] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    try {
      createUserSchema.parse({
        email,
        password,
        displayName,
        role,
      });
      
      // Clear any previous errors
      setFormErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Convert Zod errors to record
        const errors: Record<string, string> = {};
        error.errors.forEach(err => {
          const field = err.path[0] as string;
          errors[field] = err.message;
        });
        setFormErrors(errors);
        return;
      }
    }
    
    setIsSubmitting(true);
    
    try {
      // The server creates the account and emails the administrator-set credentials.
      const { getAuth } = await import('firebase/auth');
      const adminToken = await getAuth().currentUser?.getIdToken(true);
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(adminToken ? { 'Authorization': `Bearer ${adminToken}` } : {})
        },
        body: JSON.stringify({
          email,
          password,
          displayName,
          role,
          preferences: {
            notifications,
          }
        })
      });
      const result = await response.json();
      console.log('[admin/users/create] create-user response', result);
      if (!response.ok || !result.success) throw new Error(result.message || 'Failed to create user');
      
      toast({ title: "User created", description: "The user has been emailed their account credentials." });
      
      // Redirect to user list
      router.push('/admin/users');
    } catch (error) {
      console.error("Error creating user:", error);
      toast({
        title: "Error",
        description: (error as Error).message || "Failed to create user. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
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
        <h1 className="text-2xl font-bold tracking-tight">Create New User</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="max-w-3xl">
            <Card>
              <CardHeader>
                <CardTitle>User Information</CardTitle>
                <CardDescription>
                  Enter the details for the new user.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    {formErrors.email && (
                      <p className="text-xs text-destructive mt-1">{formErrors.email}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      placeholder="Enter display name"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      required
                    />
                    {formErrors.displayName && (
                      <p className="text-xs text-destructive mt-1">{formErrors.displayName}</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Temporary Password</Label>
                  <div className="relative">
                    <Input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required className="pr-10" />
                    <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2" onClick={() => setShowPassword((visible) => !visible)}>
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">This password will be included in the account email. The user can reset it later from the login page.</p>
                  {formErrors.password && <p className="text-xs text-destructive">{formErrors.password}</p>}
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
                        <SelectItem value="user">User</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notifications">Email Notifications</Label>
                    <div className="flex items-center gap-3 rounded-md border px-3 py-2">
                      <input id="notifications" type="checkbox" checked={notifications} onChange={(e) => setNotifications(e.target.checked)} className="h-4 w-4 accent-brand-primary" />
                      <span className="text-sm">Receive future account alerts and emails</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating User...
                    </>
                  ) : (
                    "Create User"
                  )}
                </Button>
              </CardFooter>
            </Card>
      </form>
    </div>
  );
} 