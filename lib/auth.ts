import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { User } from "firebase/auth";
import { getUserProfile } from "./user-service";

export type UserRole = "user" | "admin";

export interface UserData {
  uid: string;
  email: string;
  role: UserRole;
}

export async function getUserRole(user: User): Promise<UserRole> {
  if (!user) return "user";

  try {
    // Primary source of truth: Supabase users table
    const profile = await getUserProfile(user.uid);
    const roleFromDb = (profile?.role as string | undefined)?.toLowerCase();
    if (roleFromDb === "admin") {
      return "admin";
    }
  } catch (e) {
    // Non-fatal: fall back to email check below
    console.warn("Failed to load role from Supabase, falling back to email check", e);
  }

  // Legacy fallback: allow your admin email
  if (user.email === "jackoliverdev@gmail.com") {
    return "admin";
  }

  return "user";
}

/**
 * Save user data to Firestore
 * This creates or updates a user document in Firestore
 */
export async function saveUserToFirestore(user: User): Promise<void> {
  if (!user) return;

  try {
    const firestore = getFirestore();
    const userRef = doc(firestore, "users", user.uid);
    
    // Define user data to save
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || null,
      photoURL: user.photoURL || null,
      createdAt: user.metadata.creationTime || new Date().toISOString(),
      lastLoginAt: user.metadata.lastSignInTime || new Date().toISOString(),
      role: await getUserRole(user),
    };

    // Save to Firestore
    await setDoc(userRef, userData, { merge: true });
    console.log("User data saved to Firestore:", user.uid);
  } catch (error) {
    console.error("Error saving user to Firestore:", error);
    throw error;
  }
} 