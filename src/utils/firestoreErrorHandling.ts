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
    "unknown": "Niestety, wystąpił nieznany błąd. Proszę spróbować jeszcze raz.",
    "invalid-argument": "Wprowadzono nieprawidłowe dane. Proszę sprawdzić i spróbować ponownie.",
    "deadline-exceeded": "Minął czas oczekiwania na zakończenie operacji.",
    "not-found": "Przepraszamy, nie znaleziono żądanego dokumentu.",
    "already-exists": "Ten element już istnieje.",
    "permission-denied": "Niestety, nie masz uprawnień do wykonania tej operacji lub dokument nie istnieje.",
    "resource-exhausted": "Osiągnięty limit operacji lub pojemności. Proszę spróbować później.",
    "failed-precondition": "Operacja została odrzucona. System nie znajduje się w wymaganym stanie do jej wykonania.",
    "aborted": "Operacja została przerwana. Proszę spróbować ponownie.",
    "out-of-range": "Próbujesz wykonać operację poza prawidłowym zakresem.",
    "unimplemented": "Przepraszamy, ta operacja nie jest obecnie obsługiwana.",
    "internal": "Wystąpił błąd wewnętrzny. Proszę spróbować ponownie później.",
    "unavailable": "Usługa jest obecnie niedostępna. Proszę spróbować później.",
    "data-loss": "Niestety, doszło do nieodwracalnej utraty lub uszkodzenia danych.",
    "unauthenticated": "Aby wykonać tę operację musisz być zalogowany.",
    "no-data-changed": "Nie zmieniono żadnych danych",
    "unmatched-error": `Wystąpił nieoczekiwany błąd: ${errorIdentifier}.`,
  };

  const errorText: string = errorMap[errorIdentifier] || errorMap["unmatched-error"];

  return errorText;
};
