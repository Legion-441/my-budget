import { FIREBASE_COLLECTIONS } from "../constants/constants";
//* Firebase
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
//* Utils
import { transformFetchedAccountData } from "../utils/transform-fetched-data";
//* Types
import { AccountData } from "../types/AppTypes";

export const fetchAccountData = async (): Promise<AccountData> => {
  const userUid = auth.currentUser?.uid;
  if (!userUid) throw new Error("Authentication required");

  const docRef = doc(db, FIREBASE_COLLECTIONS.accounts, userUid);
  const docSnapshot = await getDoc(docRef);
  const finalAccountData = transformFetchedAccountData(docSnapshot);
  
  if (!docSnapshot.exists()) {
    await setDoc(docRef, {...finalAccountData})
  }
  
  return finalAccountData;
};
