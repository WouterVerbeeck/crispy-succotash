import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db';

const seed = async (): Promise<void> => {
  await mongoose.connect(connectionString);

  // Seed the octofit_db database with test data
  console.log('Seed the octofit_db database with test data');

  const db = mongoose.connection.db;
  if (!db) {
    throw new Error('Database connection is not initialized');
  }
  await db.collection('users').deleteMany({});
  await db.collection('teams').deleteMany({});
  await db.collection('activities').deleteMany({});
  await db.collection('leaderboard').deleteMany({});
  await db.collection('workouts').deleteMany({});

  await db.collection('users').insertMany([
    { name: 'Mona Octocat', email: 'mona@example.com', team: 'Team Alpha' },
    { name: 'Hubot', email: 'hubot@example.com', team: 'Team Beta' }
  ]);
  await db.collection('teams').insertMany([{ name: 'Team Alpha' }, { name: 'Team Beta' }]);
  await db.collection('activities').insertMany([
    { user: 'Mona Octocat', type: 'Run', minutes: 30 },
    { user: 'Hubot', type: 'Swim', minutes: 25 }
  ]);
  await db.collection('leaderboard').insertMany([
    { user: 'Mona Octocat', points: 90 },
    { user: 'Hubot', points: 84 }
  ]);
  await db.collection('workouts').insertMany([
    { title: 'Cardio Circuit', difficulty: 'medium' },
    { title: 'Core Burn', difficulty: 'easy' }
  ]);

  await mongoose.disconnect();
};

seed().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
