const createCommentValidation = (req, res, next) => {
  try {
    const { text, ticketId } = req.body;

    let errors = {};

    if (!text || text.trim() === "") {
      errors.text = "Yorum alanı zorunludur";
    }

    if (!ticketId) {
      errors.ticketId = "ticketId zorunludur";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        message: "Validasyon hatası",
        errors,
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Validation hatası",
      error: error.message,
    });
  }
};

const updateCommentValidation = (req, res, next) => {
  try {
    const { text } = req.body;

    let errors = {};

    if (text !== undefined) {
      if (typeof text !== "string" || text.trim() === "") {
        errors.text = "Yorum boş olamaz";
      }
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        message: "Validasyon hatası",
        errors,
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Validation hatası",
      error: error.message,
    });
  }
};

module.exports = {
  createCommentValidation,
  updateCommentValidation,
};
