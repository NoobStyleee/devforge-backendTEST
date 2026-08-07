import { model, Schema } from 'mongoose';

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 48,
    },
    description: {
      type: String,
      required: true,
      minlength: 100,
      maxlength: 4000,
    },
    photo: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export const Article = model('Article', articleSchema);
