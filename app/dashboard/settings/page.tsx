"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useUserProfile } from "@/hooks/use-user-profile";
import { updateUserProfile, updateUserPreferences } from "@/lib/user-service";
import { useUser } from "reactfire";
import { toast } from "@/components/ui/use-toast";
import { AvatarUpload } from "@/components/ui/avatar-upload";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { Sun, Moon } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  const { profile, loading, refreshProfile } = useUserProfile();
  const { data: firebaseUser } = useUser();
  const { darkMode, toggleDarkMode } = useDarkMode();
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [notifications, setNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPreferencesSaving, setIsPreferencesSaving] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);  // Track initial loading separately
  
  // Initialize form with profile data when loaded
  useEffect(() => {
    if (profile) {
      // Split display_name into first and last name if available
      if (profile.display_name) {
        const nameParts = profile.display_name.split(' ');
        setFirstName(nameParts[0] || "");
        setLastName(nameParts.slice(1).join(' ') || "");
      }
      setPhotoUrl(profile.photo_url || null); // Ensure null if undefined
      
      // Load preference states
      setNotifications(profile.notifications !== false); // Default to true if undefined
      setMarketingEmails(profile.marketing_emails || false);
      
      setInitialLoading(false);  // Set to false once we have the profile
    } else if (!loading) {
      setInitialLoading(false);  // Also set to false if profile is null but not loading
    }
  }, [profile, loading]);
  
  // Debug state for button
  useEffect(() => {
    console.log("Button state:", { initialLoading, loading, isSaving });
  }, [initialLoading, loading, isSaving]);
  
  const handleSaveProfile = async () => {
    console.log("Save profile clicked");
    if (!firebaseUser) {
      console.error("No Firebase user found");
      return;
    }
    
    try {
      setIsSaving(true);
      
      // Combine first and last name
      const displayName = `${firstName} ${lastName}`.trim();
      console.log("Updating display name to:", displayName);
      
      const updatedProfile = await updateUserProfile(firebaseUser.uid, {
        display_name: displayName || null
      });
      
      // Update the local state with the response from the server
      if (updatedProfile) {
        console.log("Profile updated successfully:", updatedProfile);
        // Refresh the profile data from the server
        if (refreshProfile) {
          await refreshProfile();
        } else {
          console.warn("refreshProfile function not available");
        }
      }
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved."
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarChange = (url: string | null) => {
    try {
      console.log("Avatar changed, new URL:", url);
      setPhotoUrl(url);
      
      if (refreshProfile) {
        console.log("Refreshing profile after avatar change");
        refreshProfile().catch(err => {
          console.error("Error refreshing profile after avatar change:", err);
        });
      } else {
        console.warn("refreshProfile function not available");
      }
    } catch (error) {
      console.error("Error in handleAvatarChange:", error);
    }
  };
  
  const handlePreferenceChange = async (
    preference: "notifications" | "marketing_emails", 
    value: boolean
  ) => {
    if (!firebaseUser) {
      console.error("No Firebase user found");
      return;
    }
    
    try {
      setIsPreferencesSaving(true);
      
      // Set local state immediately for better UX
      switch(preference) {
        case "notifications":
          setNotifications(value);
          break;
        case "marketing_emails":
          setMarketingEmails(value);
          break;
      }
      
      // Update preference in database
      const preferences = { [preference]: value };
      console.log("Updating preference:", preferences);
      
      await updateUserPreferences(firebaseUser.uid, preferences);
      
      // Success toast
      toast({
        title: "Preference updated",
        description: `Your preference has been saved.`
      });
      
      // Refresh profile to ensure we have the latest data
      if (refreshProfile) {
        await refreshProfile();
      }
    } catch (error) {
      console.error(`Error updating ${preference}:`, error);
      
      // Revert local state on error
      switch(preference) {
        case "notifications":
          setNotifications(profile?.notifications !== false);
          break;
        case "marketing_emails":
          setMarketingEmails(profile?.marketing_emails || false);
          break;
      }
      
      toast({
        title: "Error",
        description: "Failed to update preference. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsPreferencesSaving(false);
    }
  };
  
  // Handle dark mode toggle using our custom hook
  const handleDarkModeToggle = async () => {
    await toggleDarkMode();
  };
  
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Update your profile information and avatar.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex flex-col items-center justify-center gap-4 md:flex-row md:justify-start">
              <AvatarUpload 
                photoUrl={photoUrl} 
                fallback={firebaseUser?.email?.charAt(0).toUpperCase() || "U"}
                onAvatarChange={handleAvatarChange}
              />
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input 
                    id="firstName" 
                    placeholder="John" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input 
                    id="lastName" 
                    placeholder="Doe" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="john.doe@example.com" 
                  value={profile?.email || firebaseUser?.email || ""}
                  disabled
                />
                <p className="text-xs text-muted-foreground">Email cannot be changed</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button 
              onClick={handleSaveProfile} 
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save changes"}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Configure how you receive notifications.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="emailNotifications" className="block font-medium">
                  Email notifications
                </Label>
                <p className="text-sm text-muted-foreground">Receive notifications via email.</p>
              </div>
              <Checkbox 
                id="emailNotifications" 
                checked={notifications} 
                disabled={isPreferencesSaving}
                onCheckedChange={(checked) => handlePreferenceChange("notifications", checked === true)} 
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="marketingEmails" className="block font-medium">
                  Marketing emails
                </Label>
                <p className="text-sm text-muted-foreground">Receive emails about new features and updates.</p>
              </div>
              <Checkbox 
                id="marketingEmails" 
                checked={marketingEmails} 
                disabled={isPreferencesSaving}
                onCheckedChange={(checked) => handlePreferenceChange("marketing_emails", checked === true)} 
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize the appearance of the app.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 rounded-full bg-muted">
                  {darkMode ? <Moon className="h-5 w-5 text-blue-500" /> : <Sun className="h-5 w-5 text-yellow-500" />}
                </div>
                <div>
                  <Label htmlFor="darkMode" className="block font-medium">
                    {darkMode ? "Dark mode" : "Light mode"}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {darkMode 
                      ? "The application is currently using dark mode." 
                      : "The application is currently using light mode."}
                  </p>
                </div>
              </div>
              <Switch 
                id="darkMode" 
                checked={darkMode} 
                onCheckedChange={handleDarkModeToggle}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Danger Zone</CardTitle>
            <CardDescription>Irreversible and destructive actions.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <h4 className="font-medium">Delete account</h4>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="destructive">Delete account</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
} 