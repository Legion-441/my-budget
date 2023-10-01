//* Firebase
import { FirebaseError } from "firebase/app";
//* Types
import { AuthErrors } from "../types/authTypes";

export const INITIAL_AUTH_ERRORS: AuthErrors = {
  emailError: "",
  passwordError: "",
  confirmPasswordError: "",
  externalProviderError: "",
  generalError: "",
};

type AuthErrorField = keyof AuthErrors;

export const getAuthInputError = (error: FirebaseError | Error | unknown): AuthErrors => {
  let errorIdentifier: string;

  if (error instanceof FirebaseError) {
    errorIdentifier = error.code;
  } else if (error instanceof Error) {
    errorIdentifier = error.message;
  } else {
    errorIdentifier = "unknown-error";
  }

  type ErrorInfoObject = {
    errorField: AuthErrorField;
    errorText: string;
  };

  const errorMap: Record<string, ErrorInfoObject> = {
    //* email errors
    "auth/missing-email": { errorField: "emailError", errorText: "Wprowadź adres email" },
    "auth/invalid-email": { errorField: "emailError", errorText: "Nieprawidłowy email." },
    "auth/email-already-in-use": { errorField: "emailError", errorText: "Ten adres e-mail jest już w użyciu." },
    "auth/user-not-found": { errorField: "emailError", errorText: "Nie znaleziono użytkownika." },
    "auth/user-disabled": { errorField: "emailError", errorText: "Konto tego użytkownika zostało wyłączone." },
    //* password errors
    "auth/weak-password": { errorField: "passwordError", errorText: "Hasło musi mieć conajmniej 6 znaków." },
    "auth/wrong-password": { errorField: "passwordError", errorText: "Nieprawidłowe hasło." },
    "auth/missing-password": { errorField: "passwordError", errorText: "Wprowadź hasło" },
    "passwords-is-not-identical": { errorField: "confirmPasswordError", errorText: "Hasła nie są identyczne." },
    //* provider errors
    "auth/unauthorized-domain": { errorField: "externalProviderError", errorText: "Obecna domena nie jest upoważniona do operacji OAuth." },
    "auth/popup-closed-by-user": { errorField: "externalProviderError", errorText: "Popup zamknięte przez użytkownika" },
    "auth/cancelled-popup-request": { errorField: "externalProviderError", errorText: "Żądanie otwarcia popup anulowane" },
    //* general errors
    "auth/too-many-requests": { errorField: "generalError", errorText: "Osiągnięto limit prób logowania." },
    "auth/provider-already-linked": { errorField: "generalError", errorText: "Konto dostawcy jest już powiązane." },
    "auth/credential-already-in-use": { errorField: "generalError", errorText: "Konto dostawcy jest już używane." },
    //* unexpected errors
    "unmatched-error": { errorField: "generalError", errorText: errorIdentifier },
    "unknown-error": { errorField: "generalError", errorText: "Nieznany błąd." },
  };

  const errorObject: ErrorInfoObject = errorMap[errorIdentifier] || errorMap["unmatched-error"];

  return {
    ...INITIAL_AUTH_ERRORS,
    [errorObject.errorField]: errorObject.errorText,
  };
};
