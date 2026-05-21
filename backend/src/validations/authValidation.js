const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const registerValidation = (req, res, next) => {
  const { name, surname, email, password } = req.body;

  const errors = {};

  if (!name) {
    errors.name = "İsim alanı girilmesi zorunludur";
  }
  if (!surname) {
    errors.surname = "Soyisim alanı girilmesi zorunludur";
  }
  if (!email) {
    errors.email = "Email alanı girilmesi zorunludur.";
  } else if (!emailRegex.test(email)) {
    errors.email = "Geçerli bir email giriniz";
  }
  if (!password) {
    errors.password = "Şifre alanı girilmesi zorunludur";
  } else {
    if (password.length < 8) {
      errors.password = "Şifre en az 8 karakterli olmalı";
    } else if (!/[A-Z]/.test(password)) {
      errors.password = "Şifre en az 1 büyük harf içermeli";
    } else if (!/[a-z]/.test(password)) {
      errors.password = "Şifre en az 1 küçük harf içermeli";
    } else if (!/[0-9]/.test(password)) {
      errors.password = "Şifre en az 1 rakam içermeli";
    } else if (!/[!@#$%^&*.]/.test(password)) {
      errors.password = "Şifre en az 1 özel karakter içermeli";
    }
  }
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      errors,
    });
  }

  next();
};

const loginValidation = (req, res, next) => {
  const { email, password } = req.body;

  const errors = {};

  if (!email) {
    errors.email = "Email zorunludur";
  } else if (!emailRegex.test(email)) {
    errors.email = "Geçerli email giriniz";
  }

  if (!password) {
    errors.password = "Şifre zorunludur";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      errors,
    });
  }

  next();
};

module.exports = { registerValidation, loginValidation };
