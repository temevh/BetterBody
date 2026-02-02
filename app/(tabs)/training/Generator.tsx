import { Colors, MuscleColors } from "@/app/theme";
import { Exercise, SettingsState } from "@/app/types";
import { Check, Dumbbell, RefreshCw } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { getExercise } from "../utils";

export function Generator({ settings }: { settings: SettingsState }) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const generateExercises = () => {
    const result = getExercise(
      settings.level,
      settings.goal,
      settings.split,
      settings.daysPerWeek,
    );
    setExercises(result);
    setSelectedIds(new Set(result.map((e) => e.id)));
  };

  useEffect(() => {
    generateExercises();
  }, []);

  useEffect(() => {
    console.log(exercises);
  }, [exercises]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const isSelected = (id: string) => selectedIds.has(id);

  const getMuscleColor = (muscle: string) => {
    const color = MuscleColors[muscle];
    return colors[muscle] ?? "#404040";
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

      <ScrollView>
        {exercises.map((exercise) => {
          const selected = isSelected(exercise.id);
          const muscleColor = getMuscleColor(exercise.primaryMuscles[0]);

          return (
            <View key={exercise.id} style={styles.card}>
              <View style={styles.cardContent}>
                <View style={styles.cardLeft}>
                  <View style={styles.muscleRow}>
                    <View
                      style={[
                        styles.muscleDot,
                        {
                          backgroundColor: muscleColor,
                        },
                      ]}
                    />
                    <Text
                      style={[
                        styles.muscleText,
                        selected && styles.textSelectedMuted,
                      ]}
                    >
                      {exercise.primaryMuscles[0]}
                    </Text>
                  </View>

                  <Text style={styles.exerciseName}>{exercise.name}</Text>

                  <View style={styles.equipmentRow}>
                    <Dumbbell
                      size={16}
                      color={selected ? "#fff" : Colors.textSecondary}
                    />
                    <Text style={styles.equipmentText}>
                      {exercise.equipment?.toUpperCase()}
                    </Text>
                  </View>
                </View>

                <View style={styles.actions}>
                  <Pressable
                    onPress={() => toggleSelect(exercise.id)}
                    style={[
                      styles.iconButton,
                      selected && styles.iconButtonSelected,
                    ]}
                  >
                    <Check size={22} color="#fff" />
                  </Pressable>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <View>
        <button onClick={generateExercises}>
          <RefreshCw className="w-6 h-6" strokeWidth={2} />
          <span>Regenerate All</span>
        </button>
      </View>
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
  card: {
    borderRadius: 20,
    marginBottom: 12,
    backgroundColor: Colors.surface,
  },
  cardContent: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardLeft: {
    flex: 1,
  },
  muscleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  muscleDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  muscleText: {
    fontSize: 12,
    textTransform: "uppercase",
    color: Colors.textSecondary,
    letterSpacing: 1,
  },
  exerciseName: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 8,
    fontWeight: "600",
  },
  equipmentRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  equipmentText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  repText: {
    fontSize: 16,
    color: "#fff",
  },
  actions: {
    justifyContent: "center",
    marginLeft: 12,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#404040",
    alignItems: "center",
    justifyContent: "center",
  },
  iconButtonSelected: {
    backgroundColor: "rgba(255,255,255,0.25)",
  },
  textSelectedMuted: {
    color: "rgba(255,255,255,0.7)",
  },
});
