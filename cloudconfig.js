const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME, // ✅ CORRECT
  api_key: process.env.CLOUD_API_KEY, // ✅ CORRECT
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "dtil",
    allowedFormat: ["png", "jpeg", "jpg", "pdf", "docx"], // supports promises as well
  },
});

module.exports = {
  cloudinary,
  storage,
};
