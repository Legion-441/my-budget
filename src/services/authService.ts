import { NavigateFunction } from "react-router-dom";
//* Firebase
import "firebase/compat/auth";
import firebase from "firebase/compat/app";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
//* Utils
import { INITIAL_AUTH_ERRORS, getAuthInputError } from "../utils/AuthErrorHandling";
//* Types
import { AuthData, AuthErrors, FormType } from "../types/authTypes";

const signupOperation = async (email: string, password: string, confirmPassword: string) => {
  if (password !== confirmPassword) {
    throw new Error("passwords-is-not-identical");
  }

  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const emailUsername = email.split("@")[0].split(".")[0];
  const initialUsername = emailUsername.charAt(0).toUpperCase() + emailUsername.slice(1);

  await updateProfile(userCredential.user, {
    displayName: initialUsername,
  });
};

const handleAuth = async (
  formType: FormType,
  navigate: NavigateFunction,
  setSending: React.Dispatch<React.SetStateAction<boolean>>,
  setInputErrors: React.Dispatch<React.SetStateAction<AuthErrors>>,
  authFormData: AuthData,
  from: string = "/"
) => {
  const { email, password, confirmPassword } = authFormData;
  setInputErrors({ ...INITIAL_AUTH_ERRORS });
  setSending(true);

  try {
    if (formType === "login") {
      await signInWithEmailAndPassword(auth, email, password);
    } else {
      await signupOperation(email, password, confirmPassword);
    }

    setSending(false);
    navigate(from);
  } catch (error) {
    const inputErrors = getAuthInputError(error);
    setInputErrors(inputErrors);
    setSending(false);
  }
};

export default handleAuth;

export const handleOAuth = async (
  navigate: NavigateFunction,
  setInputErrors: React.Dispatch<React.SetStateAction<AuthErrors>>,
  from: string = "/"
) => {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    navigate(from);
  } catch (error) {
    const inputErrors = getAuthInputError(error);
    setInputErrors(inputErrors);
  }
};
