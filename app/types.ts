export interface Exercise {
  id: string;
  name: string;
  force?: Force | null;
  level: Level;
  mechanic: Mechanic | null;
  equipment: Equipment | null;
  primaryMuscles: Muscle[];
  secondaryMuscles: Muscle[];
  instructions: string[];
  category: Category;
  images: string[];
}

// Enums
enum Force {
  Static = "static",
  Pull = "pull",
  Push = "push",
}

enum Level {
  Beginner = "beginner",
  Intermediate = "intermediate",
  Expert = "expert",
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
