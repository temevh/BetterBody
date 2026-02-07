import { MuscleColors } from "@/app/_theme";
import { Exercise, Goal, Level, Split } from "@/app/_types";
import { supabase } from "./supabase";

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

export async function fetchExercises(): Promise<Exercise[]> {
  const { data, error } = await supabase.from("exercises").select();
  if (error) {
    console.error("Error fetching exercises:", error);
    return [];
  }
  return (data || []).map((exercise: any) => ({
    ...exercise,
  })) as Exercise[];
}

export const getExercise = (
  level: Level,
  goal: Goal,
  split: Split,
  days: number,
  availableExercises: Exercise[],
  targetMuscle?: string,
): Exercise[] => {
  const result: Exercise[] = [];

  const musclesToProcess = targetMuscle ? [targetMuscle] : muscles;

  for (const muscle of musclesToProcess) {
    const matchingPrimary = availableExercises.filter(
      (entry: Exercise) => entry["primary_muscles"][0] === muscle,
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
