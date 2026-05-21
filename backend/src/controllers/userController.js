const User = require("../models/userModel");
const { Op } = require("sequelize");

const getAllUsers = async (req, res) => {
  try {
    const { search } = req.query;
    let whereClause = {};

    //Arama varsa filtre uygulama
    if (search) {
      whereClause = {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            surname: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            email: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      };
    }
    const users = await User.findAll({
      where: whereClause,
      attributes: { exclude: ["password"] }, // Kullanıcılar listelenirken password alanını dahil etmez
    });

    res.status(200).json({
      message: "Kullanıcılar listelendi",
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Kullanıcılar alınamadı",
      error: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: { exclude: ["pasword"] },
    });

    if (!user) {
      return res.status(404).json({
        message: "Kullanıcı bulunamadı",
      });
    }

    res.json({
      message: "Kullanıcı getirildi.",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Hata oluştu",
      error: error.message,
    });
  }
};

const updateByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, surname, email } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        message: "Kullanıcı bulunamadı",
      });
    }

    //Sadece değiştirilen alanları güncellemek için
    if (name !== undefined) user.name = name;
    if (surname !== undefined) user.surname = surname;

    //Email güncelleniyorsa kontrol et
    if (email && email !== user.email) {
      const existingEmail = await User.findOne({
        where: { email },
      });
      if (existingEmail) {
        return res.status(400).json({
          message: "Bu email başka bir kullanıcı tarafından kullanılıyor",
        });
      }
      user.email = email;
    }

    await user.save();
    res.json({
      message: "Kullanıcı güncellendi",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Güncelleme hatası",
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        message: "Kullanıcı bulunamadı",
      });
    }
    await user.destroy();

    res.json({
      message: "Kullanıcı silindi",
    });
  } catch (error) {
    res.status(500).json({
      message: "Silme hatası",
      error: error.message,
    });
  }
};

const getAdmins = async (req, res) => {
  try {
    const admins = await User.findAll({
      where: {
        role: "ADMIN",
      },
      attributes: ["id", "name", "surname"],
    });

    res.status(200).json({
      admins,
    });
  } catch (error) {
    res.status(500).json({
      message: "Adminler getirilemedi",
      error: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateByUserId,
  deleteUser,
  getAdmins,
};
