import { User } from '../models/User.js';
import { uploadToCloudinary } from '../services/cloudinaryService.js';

export const updateUserAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'Avatar image file is required.',
      });
    }

    // req.user нужно написать
    const userId = req.user._id;

    const avatarUrl = await uploadToCloudinary(req.file.buffer);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatarUrl },
      { new: true, select: '-password -token' },
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ status: 'error', message: 'User not found.' });
    }

    res.status(200).json({
      status: 'success',
      message: 'Avatar updated successfully',
      data: {
        avatarUrl: updatedUser.avatarUrl,
      },
    });
  } catch (error) {
    next(error);
  }
};
