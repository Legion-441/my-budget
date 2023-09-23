export type AuthData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type AuthErrors = {
  emailError: string;
  passwordError: string;
  confirmPasswordError: string;
  providerError: string;
  generalError: string;
};

export type FormType = "login" | "sign-up";
