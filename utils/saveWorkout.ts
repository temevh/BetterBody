import { SetLog } from "@/app/_types";
import { useGetUser } from "@/hooks/useGetUser";
import { supabase } from "./supabase";

type ExerciseInput = {
  exerciseId: string;
  sets: SetLog[];
};

type SaveWorkoutPayload = {
  name: string;
  exercises: ExerciseInput[];
};

export async function saveWorkout(workoutData: SaveWorkoutPayload) {
  const user = await useGetUser();

  const date = new Date();

  const { data: workout, error: workoutError } = await supabase
    .from("workouts")
    .insert({
      user_id: user.id,
      performed_at: date,
      name: workoutData.name,
    })
    .select()
    .single();

  if (workoutError) throw workoutError;

  const workoutExercisesPayload = workoutData.exercises.map((ex, index) => ({
    workout_id: workout.id,
    exercise_id: ex.exerciseId,
    order_index: index,
  }));

  const { data: workoutExercises, error: weError } = await supabase
    .from("workout_exercises")
    .insert(workoutExercisesPayload)
    .select();

  if (weError) throw weError;

  const setsPayload = workoutExercises.flatMap((we, exIndex) =>
    workoutData.exercises[exIndex].sets.map((set, setIndex) => ({
      workout_exercise_id: we.id,
      set_index: setIndex,
      reps: set.reps,
      weight: set.weight,
      completed: set.completed,
    })),
  );

  const { error: setsError } = await supabase.from("sets").insert(setsPayload);

  if (setsError) throw setsError;

  return workout.id;
}
