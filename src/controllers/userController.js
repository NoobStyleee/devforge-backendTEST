import { User } from '../models/User.js';
import { uploadToCloudinary } from '../services/cloudinaryService.js';
import { HttpError } from '../utils/HttpError.js';

export const updateUserAvatar = async (req, res) => {
  if (!req.file) {
    throw HttpError(400, 'Avatar image file is required');
  }

  // req.user нужно дописать в middleware authenticate.js
  const userId = req.user._id;

  const avatarUrl = await uploadToCloudinary(req.file.buffer);

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { avatarUrl },
    { new: true, select: '-password -token' },
  );

  if (!updatedUser) {
    throw HttpError(404, 'User not found');
  }

  res.status(200).json({
    avatarUrl: updatedUser.avatarUrl,
  });
};
