"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { FC, useState } from "react";
import { useAuth } from "reactfire";
import { createUserProfile, getUserProfile } from "@/lib/user-service";
import { saveUserToFirestore } from "@/lib/auth";
import { useLanguage } from '@/lib/context/language-context';

interface Props {
  onSignIn?: () => void;
}

export const ProviderLoginButtons: FC<Props> = ({ onSignIn }) => {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();

  const doProviderSignIn = async (provider: GoogleAuthProvider) => {
    try {
      setIsLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Save user to Firestore
      try {
        console.log("Saving user to Firestore:", user.uid);
        await saveUserToFirestore(user);
        console.log("User saved to Firestore successfully");
      } catch (firestoreError) {
        console.error("Error saving user to Firestore:", firestoreError);
      }
      
      console.log("Google auth successful, checking/creating Supabase profile");
      
      // Check if user exists in Supabase, create if not found
      let profileCreated = false;
      try {
        try {
          // Try to get existing profile first
          await getUserProfile(user.uid);
          console.log("Existing user found in Supabase");
          profileCreated = true;
        } catch (err) {
          // If user doesn't exist, create profile
          console.log("User not found in Supabase, creating new profile");
          
          if (!user.uid) {
            throw new Error("Firebase user ID is missing");
          }
          
          await createUserProfile({
            firebase_uid: user.uid,
            email: user.email || '',
            display_name: user.displayName || null,
            photo_url: user.photoURL || null
          });
          console.log("New user profile created in Supabase");
          profileCreated = true;
        }
      } catch (supabaseError) {
        console.error("Error with Supabase profile:", supabaseError);
        
        // Last attempt with minimal data if previous attempts failed
        if (!profileCreated) {
          try {
            console.log("Making final attempt with minimal data");
            await createUserProfile({
              firebase_uid: user.uid,
              email: user.email || `user_${Date.now()}@example.com`, // Fallback email if none available
              display_name: null,
              photo_url: null
            });
            console.log("Final attempt successful");
          } catch (finalError) {
            console.error("Final attempt failed:", finalError);
            toast({ 
              title: t('auth.profileSetupIssue'),
              variant: "destructive"
            });
          }
        }
      }
      
      toast({ title: t('auth.successSignIn') });
      onSignIn?.();
    } catch (err: any) {
      console.error(err);
      toast({ title: t('auth.errorSignIn'), description: `${err}` });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-3">
      <Button
        variant="outline"
        className="w-full border-slate-300 bg-white px-6 py-6 text-slate-900 hover:bg-gray-50 flex items-center justify-center relative shadow-sm transition-all"
        disabled={isLoading}
        onClick={async () => {
          const provider = new GoogleAuthProvider();
          await doProviderSignIn(provider);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-5 w-5 mr-2"
          style={{ color: 'inherit' }}
        >
          <path
            fill="#EA4335"
            d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
          />
          <path
            fill="#34A853"
            d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2970142 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
          />
          <path
            fill="#4A90E2"
            d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
          />
          <path
            fill="#FBBC05"
            d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
          />
        </svg>
        <span className="font-medium">{t('auth.continueWithGoogle')}</span>
      </Button>
    </div>
  );
};
