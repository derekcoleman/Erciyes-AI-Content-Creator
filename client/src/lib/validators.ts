const passwordMatcher = (password: string, rePassword: string) => {
  if (password !== rePassword) {
    return { error: true, message: "Passwords do not match." };
  }
  return { error: false, message: "" };
};

export { passwordMatcher };
