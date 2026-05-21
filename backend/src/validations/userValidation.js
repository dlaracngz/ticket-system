const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const updateUserValidation = (req, res, next) => {
  const { name, surname, email } = req.body;

  const errors = {};

  if (name !== undefined && name.trim() === "") {
    errors.name = "İsim boş olamaz";
  }

  if (surname !== undefined && surname.trim() === "") {
    errors.surname = "Soyisim boş olamaz";
  }

  if (email !== undefined) {
    if (!emailRegex.test(email)) {
      errors.email = "Geçerli email giriniz";
    }
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation hatası",
      errors,
    });
  }

  next();
};

module.exports = {
  updateUserValidation,
};
