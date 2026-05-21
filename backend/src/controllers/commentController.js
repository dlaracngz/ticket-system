const Comment = require("../models/commentModel");
const Ticket = require("../models/ticketModel");
const User = require("../models/userModel");

//Tüm yorumları listeleme
const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "surname", "email", "role"],
        },
        {
          model: Ticket,
          as: "ticket",
          attributes: [
            "id",
            "title",
            "description",
            "status",
            "createdBy",
            "assignedTo",
            "createdAt",
            "updatedAt",
          ],
        },
      ],
    });

    return res.status(200).json({
      message: "Tüm yorumlar listelendi",
      comments,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Listeleme hatası",
      error: error.message,
    });
  }
};

// Herhangi bir ticket'a yorum oluşturma
const createComment = async (req, res) => {
  try {
    const { text, ticketId } = req.body;

    if (!text || !ticketId) {
      return res.status(404).json({
        message: "Text ve tickedId zorunludur",
      });
    }

    const ticket = await Ticket.findByPk(ticketId);

    if (!ticket) {
      return res.status(404).json({
        message: "Talep bulunamadı",
      });
    }

    const comment = await Comment.create({
      text,
      ticketId,
      userId: req.user.id,
    });

    const fullComment = await Comment.findByPk(comment.id, {
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "surname", "email"],
        },
        {
          model: Ticket,
          as: "ticket",
          attributes: ["id", "title", "description", "status"],
        },
      ],
    });

    return res.status(201).json({
      message: "Yorum oluşturuldu",
      fullComment,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Yorum oluşturulamadı",
      error: error.message,
    });
  }
};

// Ticket'a göre yorumları getirme
const getCommentsByTicketId = async (req, res) => {
  try {
    const { id: ticketId } = req.params;

    const comments = await Comment.findAll({
      where: { ticketId },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      message: "Ticket yorumları listelendi",
      comments,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Hata oluştu",
      error: error.message,
    });
  }
};

//Yorum güncelleme
const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    const comment = await Comment.findByPk(id);

    if (!comment) {
      return res.status(404).json({
        message: "Yorum bulunamadı",
      });
    }

    // Sadece kendi yorumunda güncelleme yapabilir
    if (comment.userId !== req.user.id) {
      return res.status(403).json({
        message: "Bu yorumu güncelleme yetkin yok",
      });
    }

    // sadece text güncellenir
    if (text !== undefined && text.trim() !== "") {
      comment.text = text;
    }

    await comment.save();

    return res.status(200).json({
      message: "Yorum güncellendi",
      comment,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Güncelleme hatası",
      error: error.message,
    });
  }
};
// Yorum silme
const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findByPk(id);

    if (!comment) {
      return res.status(404).json({
        message: "Yorum bulunamadı",
      });
    }

    // Sadece kendi talebine ait yorumları silebilir
    if (comment.userId !== req.user.id) {
      return res.status(403).json({
        message: "Bu yorumu silme yetkin yok",
      });
    }

    await comment.destroy();

    return res.status(200).json({
      message: "Yorum silindi",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Silme hatası",
      error: error.message,
    });
  }
};

module.exports = {
  getAllComments,
  createComment,
  getCommentsByTicketId,
  updateComment,
  deleteComment,
};
