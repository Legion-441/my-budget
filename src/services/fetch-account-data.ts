//* Firebase
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
//* Utils
import { transformFetchedAccountData } from "../utils/transform-fetched-data";
//* Types
import { AccountData } from "../types/AppTypes";

export const fetchAccountData = async (): Promise<AccountData> => {
  const userUid = auth.currentUser?.uid;
  if (!userUid) throw new Error("Authentication required");

  const docRef = doc(db, "userSettings", userUid);
  const docSnapshot = await getDoc(docRef);
  const finalAccountData = transformFetchedAccountData(docSnapshot);

  return finalAccountData;
};
