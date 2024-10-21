const passwordMatcher = (password: string, rePassword: string) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (!regex.test(password)) {
    return {
      error: true,
      message:
        "Şifre en az 8 karakter, bir büyük harf, bir küçük harf ve bir sayı içermelidir.",
    };
  } else {
    if (password !== rePassword) {
      return { error: true, message: "Şifreler eşleşmiyor." };
    }
  }
  return { error: false, message: "" };
};

const emailMatcher = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailRegex.test(email)) {
    return true;
  }
  return false;
};

export { passwordMatcher, emailMatcher };
