const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

const migrateExerciseList = async () => {
  // Rename the existing "ExerciseList" collection to "exerciselists"
  await db.collection('exerciselists').rename('exercisesList');

  // Create a new collection for the updated schema
  const exerciseListSchema = new mongoose.Schema({
    trainerId: { type: String, required: true },
    squat: { type: [String], required: true },
    bench_press: { type: [String], required: true },
    deadlift: { type: [String], required: true },
    knee_dominant: { type: [String], required: true },
    hip_dominant: { type: [String], required: true },
    push: { type: [String], required: true },
    pull: { type: [String], required: true },
    complementary: { type: [String], required: true }
  });
  const ExerciseList = mongoose.model('ExerciseList', exerciseListSchema);

  // Migrate the data from the old collection to the new one
  const oldExerciseLists = await mongoose.connection.db.collection('exercisesList').find().toArray();
  const newExerciseLists = oldExerciseLists.map(exerciseList => {
    const newExerciseList = new ExerciseList({
      trainerId: exerciseList.trainerId,
      squat: [],
      bench_press: [],
      deadlift: [],
      knee_dominant: [],
      hip_dominant: [],
      push: [],
      pull: [],
      complementary: []
    });

    exerciseList.exerciseList.forEach(exercise => {
    //set all exercises by default to complementary category
    newExerciseList.complementary.push(exercise.exercise);
    });
    return newExerciseList;
  });
  await ExerciseList.insertMany(newExerciseLists);

  // Remove the old collection
//   await mongoose.connection.db.collection('exerciselists').drop();
};

migrateExerciseList().then(() => {
  console.log('Migration complete!');
  mongoose.connection.close();
}).catch((err) => {
  console.error(err);
  mongoose.connection.close();
});