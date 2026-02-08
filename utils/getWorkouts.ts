import { supabase } from "./supabase";

export async function getWorkouts() {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Not authenticated");
  }

  const { data, error } = await supabase
    .from("workouts")
    .select(
      `
      id,
      name,
      performed_at,
      workout_exercises (
        id,
        order_index,
        exercise_id,
        sets (
          id,
          set_index,
          reps,
          weight,
          completed
        )
      )
    `,
    )
    .eq("user_id", user.id)
    .order("performed_at", { ascending: false })
    .order("order_index", { foreignTable: "workout_exercises" })
    .order("set_index", { foreignTable: "workout_exercises.sets" });

  if (error) throw error;

  return data;
}
