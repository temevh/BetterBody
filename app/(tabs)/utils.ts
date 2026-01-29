import { Exercise, Force, Level } from "../types";
const data = require("../../exercises.json");

const muscles = [
  "triceps",
  "biceps",
  "chest",
  "shoulders",
  "quadriceps",
  "hamstrings",
  "middle back",
];
const category = "strength";

export const getExercise = (level: Level, foce: Force): Exercise[] => {
  const result: Exercise[] = [];

  for (const muscle of muscles) {
    const matchingPrimary = data.filter(
      (entry: Exercise) => entry.primaryMuscles[0] === muscle,
    );

    const categoryMatch = matchingPrimary.filter(
      (entry: Exercise) => entry.category === category,
    );
    const levelMatch = categoryMatch.filter(
      (entry: Exercise) => entry.level === level,
    );
    const random = levelMatch[Math.floor(Math.random() * levelMatch.length)];

    if (random) {
      result.push(random);
    }
  }

  return result;
};
