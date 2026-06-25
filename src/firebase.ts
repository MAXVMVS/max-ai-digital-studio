import { initializeApp, getApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, getDocFromServer, type Firestore } from "firebase/firestore";
import firebaseConfig from "../firebase-applet-config.json";
import type { LeadFormInput } from "./types";

// Tipos de error conformes a la especificación de Firebase del agente
export enum OperationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LIST = "list",
  GET = "get",
  WRITE = "write",
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
  };
}

/**
 * Manejador estándar de errores para Firestore que arroja el formato JSON requerido
 */
function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: null,
      email: null,
      emailVerified: null,
    },
    operationType,
    path,
  };
  console.error("Firestore Error: ", JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

let appInstance: FirebaseApp | null = null;
let dbInstance: Firestore | null = null;

/**
 * Inicialización Lazy de Firebase para prevenir fallos antes de que el usuario lo configure
 */
export function getFirebaseApp(): FirebaseApp {
  if (!appInstance) {
    const isPlaceholder = 
      !firebaseConfig.apiKey || 
      firebaseConfig.apiKey.includes("PLACEHOLDER") ||
      firebaseConfig.projectId.includes("PLACEHOLDER");
      
    if (isPlaceholder) {
      throw new Error("Firebase no está configurado aún. Por favor configure sus credenciales.");
    }
    
    if (getApps().length === 0) {
      appInstance = initializeApp(firebaseConfig);
    } else {
      appInstance = getApp();
    }
  }
  return appInstance;
}

/**
 * Obtiene la instancia de Firestore de forma lazy
 */
export function getDb(): Firestore {
  if (!dbInstance) {
    const app = getFirebaseApp();
    dbInstance = getFirestore(app, firebaseConfig.firestoreDatabaseId);
  }
  return dbInstance;
}

/**
 * Valida la conexión con Firestore realizando un "getFromServer" según los requisitos de Firebase
 */
export async function testConnection(): Promise<boolean> {
  try {
    const db = getDb();
    await getDocFromServer(doc(db, "test", "connection"));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes("the client is offline")) {
      console.warn("El cliente está offline. Por favor verifique la configuración.");
    }
    return false;
  }
}

/**
 * Guarda los datos de lead de Onboarding de MAX AI en Firestore
 * Si Firebase no está configurado, guardará en localStorage y retornará un indicador
 */
export async function saveLead(leadData: LeadFormInput): Promise<{ success: boolean; isDemo: boolean }> {
  try {
    // Intentar inicializar Firebase de manera perezosa
    const db = getDb();
    const collectionPath = "leads";
    
    // Preparar el documento limpio conforme a firebase-blueprint.json
    const cleanLead = {
      fullName: leadData.fullName,
      email: leadData.email,
      companyName: leadData.companyName,
      selectedPainPoints: leadData.selectedPainPoints,
      selectedServices: leadData.selectedServices,
      extraDetails: leadData.extraDetails || "",
      createdAt: new Date().toISOString(), // Usado como string ISO o stamp
    };

    try {
      // guardado real en Firestore usando addDoc
      await addDoc(collection(db, collectionPath), cleanLead);
      return { success: true, isDemo: false };
    } catch (dbError) {
      handleFirestoreError(dbError, OperationType.CREATE, collectionPath);
      return { success: false, isDemo: false };
    }

  } catch (configError) {
    // PERSISTENCIA LOCAL FALLBACK:
    // Si Firebase no está configurado, guardamos localmente para no romper la experiencia de usuario
    console.warn("Usando guardado local alternativo de demostración:", configError);
    
    const localLeadsJson = localStorage.getItem("max_ai_leads") || "[]";
    const localLeads = JSON.parse(localLeadsJson);
    
    localLeads.push({
      ...leadData,
      createdAt: new Date().toISOString(),
      id: "local_" + Date.now()
    });
    
    localStorage.setItem("max_ai_leads", JSON.stringify(localLeads));
    return { success: true, isDemo: true };
  }
}
