import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  QueryConstraint,
} from "firebase/firestore";
import { db } from "./config";

// Types
export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  discipline: string;
  description: string;
  imageURL: string;
  isPublished: boolean;
  createdAt: Timestamp;
}

export interface Result {
  id: string;
  eventId: string;
  year: number;
  pdfURL: string;
  publishedAt: Timestamp;
}

export interface News {
  id: string;
  title: string;
  content: string;
  imageURL: string;
  isPinned: boolean;
  publishedAt: Timestamp;
}

export interface Document {
  id: string;
  title: string;
  category: "Rules" | "Policies" | "Governance";
  pdfURL: string;
  updatedAt: Timestamp;
}

// Events
export async function getEvents(publishedOnly: boolean = true): Promise<Event[]> {
  const constraints: QueryConstraint[] = [orderBy("date", "desc")];
  if (publishedOnly) {
    constraints.push(where("isPublished", "==", true));
  }
  const q = query(collection(db, "events"), ...constraints);
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Event));
}

export async function getEvent(id: string): Promise<Event | null> {
  const docRef = doc(db, "events", id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...docSnap.data() } as Event;
}

export async function createEvent(data: Omit<Event, "id" | "createdAt">): Promise<string> {
  const docRef = await addDoc(collection(db, "events"), {
    ...data,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function updateEvent(id: string, data: Partial<Event>): Promise<void> {
  const docRef = doc(db, "events", id);
  await updateDoc(docRef, data);
}

export async function deleteEvent(id: string): Promise<void> {
  const docRef = doc(db, "events", id);
  await deleteDoc(docRef);
}

// Results
export async function getResults(): Promise<Result[]> {
  const q = query(collection(db, "results"), orderBy("publishedAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Result));
}

export async function createResult(data: Omit<Result, "id" | "publishedAt">): Promise<string> {
  const docRef = await addDoc(collection(db, "results"), {
    ...data,
    publishedAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function deleteResult(id: string): Promise<void> {
  const docRef = doc(db, "results", id);
  await deleteDoc(docRef);
}

// News
export async function getNews(limitCount?: number): Promise<News[]> {
  const constraints: QueryConstraint[] = [orderBy("publishedAt", "desc")];
  if (limitCount) {
    constraints.push(limit(limitCount));
  }
  const q = query(collection(db, "news"), ...constraints);
  const snapshot = await getDocs(q);
  const news = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as News));
  // Sort pinned items first
  return news.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });
}

export async function getNewsArticle(id: string): Promise<News | null> {
  const docRef = doc(db, "news", id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...docSnap.data() } as News;
}

export async function createNews(data: Omit<News, "id" | "publishedAt">): Promise<string> {
  const docRef = await addDoc(collection(db, "news"), {
    ...data,
    publishedAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function updateNews(id: string, data: Partial<News>): Promise<void> {
  const docRef = doc(db, "news", id);
  await updateDoc(docRef, data);
}

export async function deleteNews(id: string): Promise<void> {
  const docRef = doc(db, "news", id);
  await deleteDoc(docRef);
}

// Documents
export async function getDocuments(): Promise<Document[]> {
  const q = query(collection(db, "documents"), orderBy("updatedAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Document));
}

export async function createDocument(data: Omit<Document, "id" | "updatedAt">): Promise<string> {
  const docRef = await addDoc(collection(db, "documents"), {
    ...data,
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function updateDocument(id: string, data: Partial<Document>): Promise<void> {
  const docRef = doc(db, "documents", id);
  await updateDoc(docRef, { ...data, updatedAt: Timestamp.now() });
}

export async function deleteDocument(id: string): Promise<void> {
  const docRef = doc(db, "documents", id);
  await deleteDoc(docRef);
}
