export const validateLengthPassword = (password: string) => {
  if (password.length < 6) {
    return "Hasło musi mieć conajmniej 6 znaków.";
  }
  return "";
};

export const validateConfirmPassword = (password: string, confirmPassword: string) => {
  if (password !== confirmPassword) {
    return "Hasła nie są identyczne.";
  }
  return "";
};
