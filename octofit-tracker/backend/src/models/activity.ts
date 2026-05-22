import { Schema, model } from 'mongoose';

const activitySchema = new Schema({
  user: { type: String, required: true },
  type: { type: String, required: true },
  minutes: { type: Number, required: true }
});

export const Activity = model('Activity', activitySchema);
