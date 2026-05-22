import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema({
  user: { type: String, required: true },
  points: { type: Number, required: true }
});

export const Leaderboard = model('Leaderboard', leaderboardSchema);
