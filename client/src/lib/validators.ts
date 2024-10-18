const passwordMatcher = (password: string, rePassword: string) => {
  if (password !== rePassword) {
    return { error: true, message: "Passwords do not match." };
  }
  return { error: false, message: "" };
};

const passwordSizeController = (password: string) => {
  if (password.length < 8) {
    return {
      error: true,
      message: "Minimum length of the password must be 8 characters.",
    };
  }
  return { error: false, message: "" };
};

const validatePasswords = (password: string, rePassword: string) => {
  const matchResult = passwordMatcher(password, rePassword);
  if (matchResult.error) {
    return {
      isValid: false,
      message: matchResult.message,
      field: "rePassword",
    };
  }

  const passwordSizeResult = passwordSizeController(password);
  if (passwordSizeResult.error) {
    return {
      isValid: false,
      message: passwordSizeResult.message,
      field: "password",
    };
  }

  const rePasswordSizeResult = passwordSizeController(rePassword);
  if (rePasswordSizeResult.error) {
    return {
      isValid: false,
      message: rePasswordSizeResult.message,
      field: "rePassword",
    };
  }

  return { isValid: true, message: "" };
};

export { validatePasswords };
