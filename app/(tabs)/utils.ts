import { MuscleColors } from "../theme";
import { Exercise, Goal, Level, Split } from "../types";
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

export const getExercise = (
  level: Level,
  goal: Goal,
  split: Split,
  days: number,
  targetMuscle?: string,
): Exercise[] => {
  const result: Exercise[] = [];

  const musclesToProcess = targetMuscle ? [targetMuscle] : muscles;

  for (const muscle of musclesToProcess) {
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

export const getMuscleColor = (muscle: string) => {
  const color = (MuscleColors as Record<string, string>)[muscle];
  return color ?? "#404040";
};
