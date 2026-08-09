import { User } from '../models/user.js';
import { uploadToCloudinary } from '../services/cloudinaryService.js';
import createError from 'http-errors';

export const updateUserAvatar = async (req, res) => {
  if (!req.file) {
    throw createError(400, 'Avatar image file is required');
  }

  const { _id } = req.user;

  const avatarUrl = await uploadToCloudinary(req.file.buffer);

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { avatarUrl },
    { new: true, select: '-password -token' },
  );

  if (!updatedUser) {
    throw createError(404, 'User not found');
  }

  res.status(200).json({
    avatarUrl: updatedUser.avatarUrl,
  });
};
