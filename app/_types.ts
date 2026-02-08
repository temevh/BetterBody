export interface Exercise {
  id: string;
  name: string;
  force?: Force | null;
  level: Level;
  mechanic: Mechanic | null;
  equipment: Equipment | null;
  primary_muscles: Muscle[];
  secondary_muscles: Muscle[];
  instructions: string[];
  category: Category;
  images: string[];
}

export type WorkoutType = {
  exercises: Exercise[];
  name: string;
  notes: string;
};

// Enums
export enum Force {
  Static = "static",
  Pull = "pull",
  Push = "push",
}

export enum Split {
  FullBody = "Full body",
  UpperLower = "Upper/Lower",
  PPL = "PPL",
}

export enum Level {
  Beginner = "beginner",
  Intermediate = "intermediate",
  Expert = "expert",
}

export enum Goal {
  Muscle = "muscle",
  Strengh = "strength",
}

enum Mechanic {
  Isolation = "isolation",
  Compound = "compound",
}

enum Equipment {
  MedicineBall = "medicine ball",
  Dumbbell = "dumbbell",
  BodyOnly = "body only",
  Bands = "bands",
  Kettlebells = "kettlebells",
  FoamRoll = "foam roll",
  Cable = "cable",
  Machine = "machine",
  Barbell = "barbell",
  ExerciseBall = "exercise ball",
  EZCurlBar = "e-z curl bar",
  Other = "other",
}

enum Muscle {
  Abdominals = "abdominals",
  Abductors = "abductors",
  Adductors = "adductors",
  Biceps = "biceps",
  Calves = "calves",
  Chest = "chest",
  Forearms = "forearms",
  Glutes = "glutes",
  Hamstrings = "hamstrings",
  Lats = "lats",
  LowerBack = "lower back",
  MiddleBack = "middle back",
  Neck = "neck",
  Quadriceps = "quadriceps",
  Shoulders = "shoulders",
  Traps = "traps",
  Triceps = "triceps",
}

enum Category {
  Powerlifting = "powerlifting",
  Strength = "strength",
  Stretching = "stretching",
  Cardio = "cardio",
  OlympicWeightlifting = "olympic weightlifting",
  Strongman = "strongman",
  Plyometrics = "plyometrics",
}

//Types
export type SettingsState = {
  level: Level;
  split: Split;
  daysPerWeek: number;
  goal: Goal;
};

export interface SetLog {
  id: string;
  reps: number | null;
  weight: number | null;
  completed: boolean;
}
