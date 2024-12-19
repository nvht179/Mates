const multer = require("multer");

// Sử dụng bộ nhớ tạm thời trên RAM (Buffer)
const storage = multer.memoryStorage();

const avatar = multer({
  storage: storage,
  limits: { fileSize: 200 * 1024 * 1024 }, // Giới hạn file 100MB
});

module.exports = avatar.single("file"); // Nhận một file với field name là "file"