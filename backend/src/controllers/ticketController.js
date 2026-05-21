const Ticket = require("../models/ticketModel");
const User = require("../models/userModel");
const { Op } = require("sequelize");

// Bütün talepleri listeleyen fonksiyon. Aynı zamanda title değişkenine göre filtreleme yapıyor
const getAllTickets = async (req, res) => {
  try {
    const { search } = req.query;
    let whereClause = {};

    if (search) {
      whereClause = {
        [Op.or]: [
          {
            title: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      };
    }

    const tickets = await Ticket.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: "creator",
          attributes: ["id", "name", "surname", "email", "role"],
        },
        {
          model: User,
          as: "assignedAdmin",
          attributes: ["id", "name", "surname", "email", "role"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      message: "Talepler listelendi",
      tickets,
    });
  } catch (error) {
    res.status(500).json({
      message: "Listeleme hatası",
      error: error.message,
    });
  }
};
// Talep oluşturma fonksiyonu
const createTicket = async (req, res) => {
  try {
    const { title, description, status, assignedTo } = req.body;
    if (!title || !description) {
      return res.status(400).json({
        message: "Başlık ve açıklama zorunludur",
      });
    }

    const ticket = await Ticket.create({
      title,
      description,
      createdBy: req.user.id,
      assignedTo: assignedTo || null,
      status: status || "OPEN",
    });

    return res.status(201).json({
      message: "Talep başarıyla oluşturuldu",
      ticket,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Talep oluşturulamadı",
      error: error.message,
    });
  }
};

//Id'ye göre talep getirme fonksiyonu
const getTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findByPk(id);

    if (!ticket) {
      return res.status(404).json({
        message: "Talep bulunamadı",
      });
    }

    return res.status(200).json({
      message: "Talep getirildi.",
      ticket,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Hata oluştu",
      error: error.message,
    });
  }
};

const updateTicketStateById = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const ticket = await Ticket.findByPk(id);

  if (!ticket) {
    return res.status(404).json({ message: "Talep bulunamadı" });
  }

  const allowedStatus = ["OPEN", "IN_PROGRESS", "CLOSED"];

  if (!allowedStatus.includes(status)) {
    return res.status(400).json({ message: "Geçersiz status" });
  }

  ticket.status = status;

  await ticket.save();

  return res.status(200).json({
    message: "Durum güncellendi",
    ticket,
  });
};

const updateTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, assignedTo } = req.body;

    if (!ticket) {
      return res.status(404).json({
        message: "Talep bulunamadı",
      });
    }

    // Sadece kendi oluşturduğu talebi güncelleme yetkisi olsun
    if (ticket.createdBy !== req.user.id) {
      return res.status(403).json({
        message: "Bu talebi güncelleme yetkin yok",
      });
    }

    // sadece gelen alanlar update edilir
    if (title !== undefined) ticket.title = title;
    if (description !== undefined) ticket.description = description;
    if (status !== undefined) ticket.status = status;
    if (assignedTo !== undefined) ticket.assignedTo = assignedTo;

    await ticket.save();

    return res.status(200).json({
      message: "Talep güncellendi",
      ticket,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Güncelleme hatası",
      error: error.message,
    });
  }
};

const deleteTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findByPk(id);

    if (!ticket) {
      return res.status(404).json({
        message: "Talep bulunamadı",
      });
    }

    // Sadece kendi oluşturduğu talebi silme yetkisi olsun
    if (ticket.createdBy !== req.user.id) {
      return res.status(403).json({
        message: "Bu talebi silme yetkin yok",
      });
    }

    await ticket.destroy();

    return res.status(200).json({
      message: "Talep silindi",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Silme hatası",
      error: error.message,
    });
  }
};

module.exports = {
  getAllTickets,
  createTicket,
  getTicketById,
  updateTicketById,
  deleteTicketById,
  updateTicketStateById,
};
