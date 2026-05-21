const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Giriş yapmış kullanıcının bilgilerini getirir
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Yetkisiz erişim. Token bulunamadı",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Kullanıcı bulunamadı",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Geçersiz veya süresi dolmuş token",
      error: error.message,
    });
  }
};

module.exports = authMiddleware;
