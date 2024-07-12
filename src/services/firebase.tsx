// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const createAccount = async (email: string, password: string, username: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const newUserId = userCredential.user.uid;

    const userDetails: UserDetails = {
        coin: 0,
        imagePath: "",
        username,
        xp: 0,
    }

    const docRef = doc(db, 'userdetails', newUserId);
    return setDoc(docRef, userDetails);
}

export const getAccountDetails = async (userId: string) => {
    const docRef = doc(db, 'userdetails', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data() as UserDetails;
    }
    return null;
}

export const getAllEvents = async () => {
    const q = query(collection(db, 'events'), where('verified', '==', true))
    const result = await getDocs(q)

    const events: FirebaseDocument<EventData>[] = [];
    result.forEach((doc) => {
        const data = doc.data();
        events.push({ data: data as EventData, id: doc.id })
    })

    return events
}

export const createEvent = async (event: Event) => {
    return addDoc(collection(db, "events"), event)
}

export const participateEvent = async (eventId: string) => {
    const docRef = doc(db, "events", eventId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists() && auth.currentUser) {
        const event = docSnap.data() as EventData;
        event.participantIds.push(auth.currentUser.uid);

        setDoc(docRef, event);
    }
}

export const getAllUnverifiedEvents = async () => {
    const q = query(collection(db, 'events'), where('verified', '==', false))
    const result = await getDocs(q)

    const events: FirebaseDocument<EventData>[] = [];
    result.forEach((doc) => {
        const data = doc.data();
        events.push({ data: data as EventData, id: doc.id })
    })

    return events
}

export const updateProfileImage = async (file: File) => {

}


