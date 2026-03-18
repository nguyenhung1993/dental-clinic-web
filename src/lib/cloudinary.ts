import { v2 as cloudinary } from 'cloudinary';

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  const missing = [
    !process.env.CLOUDINARY_CLOUD_NAME && 'CLOUDINARY_CLOUD_NAME',
    !process.env.CLOUDINARY_API_KEY && 'CLOUDINARY_API_KEY',
    !process.env.CLOUDINARY_API_SECRET && 'CLOUDINARY_API_SECRET'
  ].filter(Boolean);
  
  console.error(`❌ Cloudinary Error: Missing environment variables: ${missing.join(', ')}. Hãy cập nhật file .env.local với thông tin từ Cloudinary Dashboard.`);
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary;
