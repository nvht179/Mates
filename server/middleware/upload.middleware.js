const multer = require("multer");

// Sử dụng bộ nhớ tạm thời trên RAM (Buffer)
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Giới hạn file 10MB
});

module.exports = upload.single("file"); // Nhận một file với field name là "file"