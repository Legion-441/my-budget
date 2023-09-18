import { useNavigate } from "react-router-dom";
//* Firebase
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
//* Utils
import { INITIAL_AUTH_ERRORS, getInputError } from "../utils/errorHandling";
//* Types
import { AuthData, AuthErrors } from "../types/type";

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
  formType: "login" | "signup",
  navigate: ReturnType<typeof useNavigate>,
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
    const inputErrors = getInputError(error);
    setInputErrors(inputErrors);
    setSending(false);
  }
};

export default handleAuth;
