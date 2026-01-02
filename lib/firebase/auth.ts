import { signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { auth } from "./config";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./config";

export async function loginAdmin(email: string, password: string): Promise<User> {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Check if user is in admin allowlist
  const adminDoc = await getDoc(doc(db, "admins", user.email || ""));
  if (!adminDoc.exists()) {
    await signOut(auth);
    throw new Error("Access denied. Admin privileges required.");
  }

  return user;
}

export async function logoutAdmin(): Promise<void> {
  await signOut(auth);
}

export async function isAdminUser(email: string): Promise<boolean> {
  const adminDoc = await getDoc(doc(db, "admins", email));
  return adminDoc.exists();
}
