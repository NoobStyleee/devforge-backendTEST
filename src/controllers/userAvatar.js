import { uploadToCloudinary } from '../services/cloudinaryService.js';
import createHttpError from 'http-errors';
import { User } from '../models/user.js';

export const updateUserAvatar = async (req, res) => {
  if (!req.file) {
    throw createHttpError(400, 'Avatar image file is required');
  }

  const { _id } = req.user;

  const avatarUrl = await uploadToCloudinary(req.file.buffer);

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { avatarUrl },
    { new: true, select: '-password -token' },
  );

  if (!updatedUser) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json({
    avatarUrl: updatedUser.avatarUrl,
  });
};
