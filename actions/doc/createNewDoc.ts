"use server";

import { adminDb } from "@/firebase-admin";
import { auth } from "@clerk/nextjs/server";

// Define parentDocRef as a string (it represents a document ID)
export async function createNewDoc(
  parentDocRef?: string | null
): Promise<{ docId: string }> {
  // console.log("auth:::", auth());
  // auth().protect();

  // Protect the route and retrieve session claims from Clerk's auth
  // const { sessionClaims } = auth();

  const sessionClaims = {
    email: "rohitsingh19032001@gmail.com",
  };

  // Ensure sessionClaims and sessionClaims.email exist
  if (!sessionClaims?.email) {
    throw new Error("User is not authenticated or email is missing.");
  }

  const docCollectionRef = adminDb.collection("documents");

  // Add a new document to the "documents" collection
  const docRef = await docCollectionRef.add({
    title: "New Doc",
    banner: "",
    icon: "",
    parent: parentDocRef || null,
    isArchived: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: sessionClaims.email,
  });

  // Add document information to the user's "rooms" collection
  await adminDb
    .collection("users")
    .doc(sessionClaims.email)
    .collection("rooms")
    .doc(docRef.id)
    .set({
      userId: sessionClaims.email,
      role: "owner",
      createdAt: new Date(),
      updatedAt: new Date(),
      roomId: docRef.id,
      parent: parentDocRef || null,
    });

  return { docId: docRef.id };
}
