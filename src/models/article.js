import { model, Schema } from 'mongoose';

const articleSchema = new Schema(
  {
    img: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    article: {
      type: String,
      required: false,      
    },
    rate: {
      type: Number,
      default: 0,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: { 
      type: String,
      required: true,
    }, 
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Article = model('Article', articleSchema);