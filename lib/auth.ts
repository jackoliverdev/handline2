import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { User } from "firebase/auth";

export type UserRole = "user" | "admin";

export interface UserData {
  uid: string;
  email: string;
  role: UserRole;
}

export async function getUserRole(user: User): Promise<UserRole> {
  if (!user) return "user";
  
  // Check if this is your admin email - exact match only
  if (user.email === "jackoliverdev@gmail.com") {
    return "admin";
  }
  
  // All other users are regular users
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