const createTicketValidation = (req, res, next) => {
  const { title, description, assignedTo, status } = req.body;
  let errors = {};

  if (!title || title.trim() === "") {
    errors.title = "Başlık alanı doldurulması zorunludur";
  }

  if (!description || description.trim() === "") {
    errors.description = "Açıklama alanı doldurulması zorunludur";
  }

  // Status kontrolü (opsiyonel ama valid değer olmalı)
  const allowedStatus = ["OPEN", "IN_PROGRESS", "CLOSED"];

  if (status && !allowedStatus.includes(status)) {
    errors.status = "Geçersiz status değeri";
  }
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      message: "Validasyon hatası",
      errors,
    });
  }

  next();
};

const updateTicketValidation = (req, res, next) => {
  const { title, description, assignedTo, status } = req.body;

  let errors = {};

  if (title !== undefined) {
    if (typeof title !== "string" || title.trim() === "") {
      errors.title = "Başlık alanı doldurulması zorunludur";
    }
  }

  if (description !== undefined) {
    if (typeof description !== "string" || description.trim() === "") {
      errors.description = "Açıklama alanı doldurulması zorunludur";
    }
  }

  if (status !== undefined) {
    const allowedStatus = ["OPEN", "IN_PROGRESS", "CLOSED"];

    if (!allowedStatus.includes(status)) {
      errors.status = "Geçersiz status değeri";
    }
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      message: "Validasyon hatası",
      errors,
    });
  }

  next();
};

module.exports = {
  createTicketValidation,
  updateTicketValidation,
};
