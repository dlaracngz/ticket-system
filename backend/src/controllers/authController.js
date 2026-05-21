const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const generateToken = require("../utils/jwt");

// Kullanıcı üye olma fonksiyonu
const register = async (req, res) => {
  try {
    const { name, surname, email, password, role } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        message: "Bu email zaten sistemde kayıtlı.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      surname,
      email,
      password: hashedPassword,
      role: role || "USER",
    });

    res.status(201).json({
      message: "Kullanıcı kaydı başarılı bir şekilde yapıldı.",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Kullanıcı ekleme işlemi başarısız oldu.",
      error: error.message,
    });
  }
};

// Kullanıcı giriş yapma fonksiyonu
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Böyle bir kullanıcının var olup olmadığını bulma
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        message: "Böyle bir kullanıcı bulunamadı",
      });
    }
    //Şifre kontrolü
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Girilen şifre yanlış",
      });
    }

    const token = generateToken(user);

    //Token'ı cookiye yazma
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, //1 Gün
    });

    res.json({
      message: "Başarıyla giriş yapıldı",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Login hatası",
      error: error.message,
    });
  }
};

// Kullanıcı çıkış yapma fonksiyonu
const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });
    res.status(200).json({
      message: "Çıkış işlemi başarıyla gerçekleştirildi",
    });
  } catch (error) {
    res.status(500).json({
      message: "Logout hatası",
      error: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  logout,
};
