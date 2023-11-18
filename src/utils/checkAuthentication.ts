//* Firebase
import { auth } from "../firebase";

const checkAuthentication = () => {
  const currentUser = auth.currentUser;
  if (currentUser === null || currentUser.uid === undefined) {
    throw new Error("unauthenticated");
  }
  return currentUser
};

export default checkAuthentication
