import { model, Schema } from 'mongoose';

const dummySchema = new Schema({}, { timestamps: true });

export const Dummy = model('Dummy', dummySchema);
