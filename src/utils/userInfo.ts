//* Firebase
import { DocumentData, DocumentReference, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export const fetchFirebaseUserInfo = async () => {
  try {
    if (!auth.currentUser) throw new Error("Authentication required")
    if (!auth.currentUser.uid) throw new Error("UID not available")

    const currentUserUid = auth.currentUser.uid
    const userInfoDoc = doc(db, "users", currentUserUid )
    let docSnap = await getDoc(userInfoDoc)

    if (!docSnap.exists()) {
      await createFirestoreUserInfo(userInfoDoc)
      docSnap = await getDoc(userInfoDoc);
    }

    const data = docSnap.data()
    return data
    
  } catch (error) {
    console.error(error);
  }
};

export const createFirestoreUserInfo = async (userInfoDoc: DocumentReference<DocumentData>) => {
  try {    
    const userData = { budgets: [] };
    await setDoc(userInfoDoc, userData);
  } catch (error) {
    throw error
  }
};