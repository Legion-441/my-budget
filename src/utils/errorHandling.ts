import { FirebaseError } from "firebase/app";

export interface AuthErrorObject {
  emailError?: string;
  passwordError?: string;
  confirmPasswordError?: string;
  generalError?: string;
};

type AuthErrorField = keyof AuthErrorObject;

export const handleAuthError = (error: FirebaseError | Error, setInputErrors: React.Dispatch<React.SetStateAction<AuthErrorObject>>): void => {
  const errorCode = error instanceof FirebaseError ? error.code : error.message;

  let errorFields: AuthErrorField[] = ['generalError'];

  switch (errorCode) {
    case 'auth/invalid-email':
      errorFields = ['emailError'];
      break;
    case 'auth/email-already-in-use':
      errorFields = ['emailError'];
      break;
    case 'auth/user-not-found':
      errorFields = ['emailError'];
      break;
    case 'auth/user-disabled':
      errorFields = ['emailError'];
      break;
    case 'auth/weak-password':
      errorFields = ['passwordError'];
      break;
    case 'passwords-is-not-identical':
      errorFields = ['passwordError', 'confirmPasswordError'];
      break;
    case 'auth/wrong-password':
      errorFields = ['passwordError'];
      break;
    case 'auth/too-many-requests':
      errorFields = ['generalError'];
      break;
    case 'auth/provider-already-linked':
      errorFields = ['generalError'];
      break;
    case 'auth/credential-already-in-use':
      errorFields = ['generalError'];
      break;
    default:
      errorFields = ['generalError'];
      break;
  }
  
  
  const errorMap: Record<string, string> = {
    'auth/invalid-email': 'Nieprawidłowy email.',
    'auth/email-already-in-use': 'Ten adres e-mail jest już w użyciu.',
    'auth/user-not-found': 'Nie znaleziono użytkownika.',
    'auth/user-disabled': 'Konto tego użytkownika zostało wyłączone',
    'auth/weak-password': 'Hasło musi mieć conajmniej 6 znaków.',
    'passwords-is-not-identical': 'Hasła nie są identyczne.',
    'auth/wrong-password': 'Nieprawidłowe hasło.',
    'auth/too-many-requests': 'Osiągnięto limit prób logowania.',
    'auth/provider-already-linked': 'Konto dostawcy jest już powiązane.',
    'auth/credential-already-in-use': 'Konto dostawcy jest już używane.',
  };

  const errorMessage = errorMap[errorCode] || error.message;
  

  setInputErrors(() => {
    const errors: AuthErrorObject = {};
  
    errorFields.forEach((field) => {
      errors[field] = errorMessage;
    });
  
    return {
      ...errors,
    };
  });
};