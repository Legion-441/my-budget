export type AuthData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type AuthErrors = {
  emailError: string;
  passwordError: string;
  confirmPasswordError: string;
  externalProviderError: string;
  generalError: string;
};

export type FormType = "login" | "sign-up";
