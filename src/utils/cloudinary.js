import { v2 as cloudinary } from 'cloudinary';
import fs from 'node:fs/promises';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadPhotoToCloudinary = async (
  filePath,
  folder = 'articles',
) => {
  const result = await cloudinary.uploader.upload(filePath, { folder });
  await fs.unlink(filePath);
  return result.secure_url;
};

export const deletePhotoFromCloudinary = async (photoUrl) => {
  if (!photoUrl) return;

  try {
    const parts = photoUrl.split('/');
    const fileName = parts[parts.length - 1];
    const folder = parts[parts.length - 2];
    const publicId = `${folder}/${fileName.split('.')[0]}`;

    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary: не вдалось видалити старе фото:', error.message);
  }
};
