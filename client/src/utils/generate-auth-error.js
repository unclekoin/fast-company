const generateAuthError = (message) => {
  switch (message) {
  case "INVALID_PASSWORD":
    return "Почта или пароль введены некорректно";
  case "EMAIL_EXISTS":
    return "Пользователь с такой электронной почтой уже существует";
  default:
    return "Слишком много попыток входа. Попробуйте позднее";
  }
};

export default generateAuthError;
