import { FirebaseError } from "firebase/app";

export interface AuthErrors {
  emailError: string;
  passwordError: string;
  confirmPasswordError: string;
  generalError: string;
}

export const initialAuthErrors: AuthErrors = {
  emailError: "",
  passwordError: "",
  confirmPasswordError: "",
  generalError: "",
};

type AuthErrorField = keyof AuthErrors;

export const getInputError = (error: FirebaseError | Error | unknown): AuthErrors => {
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
    ...initialAuthErrors,
    [errorObject.errorField]: errorObject.errorText,
  };
};
