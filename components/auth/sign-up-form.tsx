'use client';

import * as React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FC, useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuth } from "reactfire";
import { Eye, EyeOff, Check, X, AlertCircle, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUserProfile } from "@/lib/user-service";
import { saveUserToFirestore } from "@/lib/auth";
import { useLanguage } from '@/lib/context/language-context';

const passwordSchema = z.string()
  .min(8, { message: "Password must be at least 8 characters" })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })
  .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" });

const formSchema = z.object({
  email: z.string().email(),
  password: passwordSchema,
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

interface SignUpFormProps {
  onShowLogin: () => void;
  onSignUp?: () => void;
}

export const SignUpForm: FC<SignUpFormProps> = ({ onShowLogin, onSignUp }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  
  const [requirements, setRequirements] = useState({
    minLength: false,
    hasNumber: false,
    hasSpecial: false,
  });
  
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const auth = useAuth();
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    setRequirements({
      minLength: passwordValue.length >= 8,
      hasNumber: /[0-9]/.test(passwordValue),
      hasSpecial: /[^a-zA-Z0-9]/.test(passwordValue),
    });
    
    if (confirmPasswordValue) {
      setPasswordsMatch(passwordValue === confirmPasswordValue);
    }
  }, [passwordValue, confirmPasswordValue]);

  const signUp = async ({
    email,
    password,
  }: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      
      // Step 1: Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Step 2: Create user profile in Supabase (primary user storage)
      try {
        console.log("Firebase signup successful, creating Supabase profile for:", user.uid);
        
        // Ensure we have valid data before proceeding
        if (!user.uid) {
          throw new Error("Firebase user ID is missing");
        }
        
        const supabaseUser = await createUserProfile({
          firebase_uid: user.uid,
          email: user.email || email,
          display_name: user.displayName || null,
          photo_url: user.photoURL || null
        });
        
        console.log("User profile created in Supabase:", supabaseUser);
        
        toast({
          title: "Account created!",
          description: "You have been signed up and logged in.",
        });
        
        router.push('/dashboard');
      } catch (supabaseError) {
        console.error("Error creating Supabase profile:", supabaseError);
        // Make a second attempt with minimal data
        try {
          console.log("Attempting fallback with minimal data");
          await createUserProfile({
            firebase_uid: user.uid,
            email: email,
            display_name: null,
            photo_url: null
          });
          console.log("Fallback successful: User profile created with minimal data");
          
          toast({
            title: "Account created!",
            description: "You have been signed up and logged in.",
          });
          
          router.push('/dashboard');
        } catch (fallbackError) {
          console.error("User profile creation failed:", fallbackError);
          toast({ 
            title: "Profile Setup Issue", 
            description: "Your account was created but profile setup failed. Please try again.",
            variant: "destructive"
          });
        }
      }
    } catch (error: any) {
      if (error.code && error.code.includes("already")) {
        toast({ title: "User already exists" });
      } else {
        toast({ title: "Error signing up", description: `${error}` });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(signUp)}>
          <fieldset disabled={isLoading} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-foreground">{t('auth.email')}</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder={t('auth.emailPlaceholder')} 
                      {...field} 
                      className="bg-background"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-foreground">{t('auth.password')}</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        placeholder={t('auth.passwordPlaceholder')} 
                        {...field} 
                        onChange={(e) => {
                          field.onChange(e);
                          setPasswordValue(e.target.value);
                        }}
                        className="bg-background"
                      />
                    </FormControl>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {showPassword ? (t('auth.hidePassword') || 'Hide password') : (t('auth.showPassword') || 'Show password')}
                      </span>
                    </Button>
                  </div>
                  <div className="mt-2 space-y-1">
                    <PasswordRequirement 
                      met={requirements.minLength}
                      label={t('auth.passwordRequirement.minLength')}
                    />
                    <PasswordRequirement 
                      met={requirements.hasNumber}
                      label={t('auth.passwordRequirement.hasNumber')}
                    />
                    <PasswordRequirement 
                      met={requirements.hasSpecial}
                      label={t('auth.passwordRequirement.hasSpecial')}
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-foreground">{t('auth.confirmPassword')}</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input 
                        type={showConfirmPassword ? "text" : "password"} 
                        placeholder={t('auth.passwordPlaceholder')} 
                        {...field} 
                        onChange={(e) => {
                          field.onChange(e);
                          setConfirmPasswordValue(e.target.value);
                        }}
                        className="bg-background"
                      />
                    </FormControl>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {showConfirmPassword ? (t('auth.hidePassword') || 'Hide password') : (t('auth.showPassword') || 'Show password')}
                      </span>
                    </Button>
                  </div>
                  {confirmPasswordValue && (
                    <div className={cn(
                      "flex items-center mt-2 text-xs",
                      passwordsMatch ? "text-green-600" : "text-red-600"
                    )}>
                      {passwordsMatch ? (
                        <>
                          <Check className="w-3.5 h-3.5 mr-1.5" />
                          <span>{t('auth.passwordRequirement.match')}</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-3.5 h-3.5 mr-1.5" />
                          <span>{t('auth.passwordRequirement.noMatch')}</span>
                        </>
                      )}
                    </div>
                  )}
                  {!confirmPasswordValue && <FormMessage />}
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              size="lg" 
              className="w-full mt-2"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              {t('auth.createAccount')}
            </Button>
          </fieldset>
        </form>
      </Form>

      <div className="mt-6 text-center text-sm">
        <p className="text-muted-foreground">
          {t('auth.alreadyHaveAccount')} {" "}
          <Button 
            variant="link" 
            onClick={onShowLogin}
            className="p-0 font-semibold text-primary hover:text-primary/80"
          >
            {t('auth.signInInstead')}
          </Button>
        </p>
      </div>
    </>
  );
};

interface PasswordRequirementProps {
  met: boolean;
  label: string;
}

const PasswordRequirement: FC<PasswordRequirementProps> = ({ met, label }) => {
  return (
    <div className={cn(
      "flex items-center text-xs",
      met ? "text-green-600" : "text-muted-foreground"
    )}>
      {met ? (
        <Check className="w-3.5 h-3.5 mr-1.5" />
      ) : (
        <X className="w-3.5 h-3.5 mr-1.5" />
      )}
      {label}
    </div>
  );
};
