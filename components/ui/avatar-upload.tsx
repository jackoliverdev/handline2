import React, { useState, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useUser } from 'reactfire';
import { uploadAvatar, removeAvatar } from '@/lib/user-service';
import { ImagePlus, Trash, Loader2 } from 'lucide-react';

interface AvatarUploadProps {
  photoUrl: string | null;
  fallback: string;
  onAvatarChange: (url: string | null) => void;
}

export function AvatarUpload({ photoUrl, fallback, onAvatarChange }: AvatarUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: user } = useUser();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) {
      console.log("No file selected or user not authenticated");
      return;
    }

    console.log("File selected:", file.name, "type:", file.type, "size:", file.size);

    // Basic validation
    if (!file.type.startsWith('image/')) {
      console.error("Invalid file type:", file.type);
      toast({
        variant: 'destructive',
        title: 'Invalid file type',
        description: 'Please select an image file (JPEG, PNG, etc.)'
      });
      return;
    }

    // Size validation (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      console.error("File too large:", file.size);
      toast({
        variant: 'destructive',
        title: 'File too large',
        description: 'Avatar image must be less than 2MB'
      });
      return;
    }

    setIsUploading(true);
    console.log("Starting avatar upload for user:", user.uid);
    
    // Show loading toast
    const uploadingToast = toast({
      title: 'Uploading avatar...',
      description: 'Please wait while your image is being uploaded',
    });
    
    try {
      const updatedProfile = await uploadAvatar(user.uid, file);
      
      console.log("Upload complete, updated profile:", updatedProfile);
      
      if (updatedProfile?.photo_url) {
        onAvatarChange(updatedProfile.photo_url);
        toast({
          title: 'Avatar updated',
          description: 'Your profile picture has been updated successfully'
        });
      } else {
        console.warn("No photo_url in updated profile");
        toast({
          variant: 'destructive',
          title: 'Upload incomplete',
          description: 'Your avatar was uploaded but profile wasn\'t updated correctly'
        });
      }
    } catch (error) {
      // Extract and log the detailed error
      let errorMessage = 'Unknown error';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'object' && error !== null) {
        // Try to extract Supabase error details
        const supabaseError = error as any;
        if (supabaseError.message) {
          errorMessage = supabaseError.message;
        }
        if (supabaseError.error && supabaseError.error.message) {
          errorMessage = supabaseError.error.message;
        }
        
        // Log the full error object for debugging
        console.error('Full Supabase error object:', JSON.stringify(supabaseError, null, 2));
      }
      
      console.error('Error uploading avatar:', errorMessage);
      
      toast({
        variant: 'destructive',
        title: 'Upload failed',
        description: `Error: ${errorMessage}`
      });
    } finally {
      // Dismiss loading toast
      uploadingToast.dismiss?.();
      
      setIsUploading(false);
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveAvatar = async () => {
    if (!user || !photoUrl) return;

    try {
      setIsRemoving(true);
      await removeAvatar(user.uid, photoUrl);
      onAvatarChange(null);
      toast({
        title: 'Avatar removed',
        description: 'Your profile picture has been removed'
      });
    } catch (error) {
      console.error('Error removing avatar:', error);
      toast({
        variant: 'destructive',
        title: 'Remove failed',
        description: 'There was a problem removing your avatar'
      });
    } finally {
      setIsRemoving(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar className="h-24 w-24 cursor-pointer" onClick={triggerFileInput}>
        <AvatarImage src={photoUrl || ''} alt="Profile Avatar" />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
      
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={triggerFileInput}
          disabled={isUploading || isRemoving}
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <ImagePlus className="mr-2 h-4 w-4" />
              Change avatar
            </>
          )}
        </Button>
        
        {photoUrl && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleRemoveAvatar}
            disabled={isUploading || isRemoving}
          >
            {isRemoving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Removing...
              </>
            ) : (
              <>
                <Trash className="mr-2 h-4 w-4" />
                Remove
              </>
            )}
          </Button>
        )}
      </div>
      
      <input 
        type="file" 
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
} 