//* Firebase
import { FirebaseError } from "firebase/app";

export const getFirestoreErrorText = (error: FirebaseError | Error | unknown): string => {
  let errorIdentifier: string;

  if (error instanceof FirebaseError) {
    errorIdentifier = error.code;
  } else if (error instanceof Error) {
    errorIdentifier = error.message;
  } else {
    errorIdentifier = "unknown";
  }

  const errorMap: Record<string, string> = {
    "cancelled": "Operacja została anulowana.",
    "unknown": "Nieznany błąd. Spróbuj ponownie później.",
    "invalid-argument": "Nieprawidłowy argument.",
    "deadline-exceeded": "Czas oczekiwania minął przed zakończeniem operacji.",
    "not-found": "Nie znaleziono żądanego elementu.",
    "already-exists": "Element już istnieje.",
    "permission-denied": "Nie masz uprawnień do wykonania tej operacji.",
    "resource-exhausted": "Osiągnięty limit operacji lub pojemności",
    "failed-precondition": "Operacja została odrzucona. System nie znajduje się w wymaganym stanie do jej wykonania.",
    "aborted": "Operacja została przerwana.",
    "out-of-range": "Podjęto próbę przeprowadzenia operacji poza prawidłowym zakresem.",
    "unimplemented": "Operacja nie jest obsługiwana w tej usłudze.",
    "internal": "Błąd wewnętrzny.",
    "unavailable": "Usługa jest obecnie niedostępna.",
    "data-loss": "Nieodwracalna utrata lub uszkodzenie danych.",
    "unauthenticated": "Aby wykonać tą operację musisz być zalogowany.",
    "unmatched-error": `Nieoczekiwany błąd: ${errorIdentifier}.`,
  };

  const errorText: string = errorMap[errorIdentifier] || errorMap["unmatched-error"];

  return errorText;
};
