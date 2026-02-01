import { Colors } from "@/app/theme";
import { Exercise, SettingsState } from "@/app/types";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export function Generator({ settings }: { settings: SettingsState }) {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const generateExercises = () => {};

  useEffect(() => {
    generateExercises();
  }, []);

  const getMuscleColor = (muscle: string) => {
    const colors: { [key: string]: string } = {
      Chest: "bg-blue-500",
      Back: "bg-emerald-500",
      Legs: "bg-purple-500",
      Shoulders: "bg-orange-500",
      Arms: "bg-pink-500",
      Core: "bg-amber-500",
    };
    return colors[muscle] || "bg-neutral-700";
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Workout</Text>

        <View style={styles.metaRow}>
          <Text style={styles.metaText}>{settings.level}</Text>
          <Text style={styles.metaDot}>•</Text>
          <Text style={styles.metaText}>
            {settings.goal === "muscle"
              ? "Muscle Building"
              : settings.goal === "strength"
                ? "Strength"
                : "Fitness"}
          </Text>
          <Text style={styles.metaDot}>•</Text>
          <Text style={styles.metaText}>{settings.daysPerWeek}x/week</Text>
        </View>
      </View>

      <View className="flex-1 px-6 pb-6 space-y-3 overflow-auto">
        {/* 
        {exercises.map((exercise) => (
          <View
            key={exercise.id}
            className={`rounded-2xl overflow-hidden transition-all ${
              exercise.selected
                ? getMuscleColor(exercise.muscle)
                : "bg-neutral-800"
            }`}
          >
            <View className="p-5">
              <View className="flex items-start justify-between mb-4">
                <View className="flex-1">
                  <View className="flex items-center gap-2 mb-2">
                    <View
                      className={`w-2 h-2 rounded-full ${exercise.selected ? "bg-white/30" : getMuscleColor(exercise.muscle)}`}
                    ></View>
                    <span
                      className={`text-xs uppercase tracking-wide ${exercise.selected ? "text-white/70" : "text-neutral-400"}`}
                    >
                      {exercise.muscle}
                    </span>
                  </View>
                  <h3
                    className={`text-xl mb-2 ${exercise.selected ? "text-white" : "text-white"}`}
                  >
                    {exercise.name}
                  </h3>
                  <View
                    className={`flex items-center gap-2 mb-3 ${exercise.selected ? "text-white/70" : "text-neutral-400"}`}
                  >
                    <Dumbbell className="w-4 h-4" strokeWidth={2} />
                    <span className="text-sm">{exercise.equipment}</span>
                  </View>
                  <View
                    className={`text-lg ${exercise.selected ? "text-white" : "text-white"}`}
                  >
                    {exercise.sets} sets × {exercise.reps} reps
                  </View>
                </View>
                <View className="flex flex-col gap-2">
                  <button
                    onClick={() => toggleSelect(exercise.id)}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                      exercise.selected
                        ? "bg-white/20 text-white"
                        : "bg-neutral-700 text-neutral-400 hover:bg-neutral-600"
                    }`}
                  >
                    <Check className="w-6 h-6" strokeWidth={2.5} />
                  </button>
                  <button
                    onClick={() => rerollExercise(exercise.muscle)}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                      exercise.selected
                        ? "bg-white/20 text-white hover:bg-white/30"
                        : "bg-neutral-700 text-neutral-400 hover:bg-neutral-600"
                    }`}
                  >
                    <RefreshCw className="w-5 h-5" strokeWidth={2} />
                  </button>
                </View>
              </View>
            </View>
          </View>
        ))}
        */}
      </View>
      {/* 
      <View className="p-6 bg-gradient-to-t from-neutral-900 via-neutral-900 to-transparent">
        <button
          onClick={generateExercises}
          className="w-full bg-orange-500 text-white py-5 rounded-2xl flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors"
        >
          <RefreshCw className="w-6 h-6" strokeWidth={2} />
          <span>Regenerate All</span>
        </button>
      </View>
        */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8, // RN 0.71+
  },
  metaText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textTransform: "capitalize",
  },
  metaDot: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});
