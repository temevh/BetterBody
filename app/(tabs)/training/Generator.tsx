import { Colors } from "@/app/theme";
import { Exercise, SettingsState } from "@/app/types";
import { RefreshCw, SaveAllIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../styles";
import { getExercise } from "../utils";
import { ExerciseCard } from "./ExerciseCard";

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

  return (
    <View style={GlobalStyles.container}>
      <View style={GlobalStyles.header}>
        <Text style={GlobalStyles.title}>Your Workout</Text>

        <View style={[GlobalStyles.row, { gap: 8 }]}>
          <Text style={[GlobalStyles.textSecondary, { textTransform: "capitalize" }]}>
            {settings.level}
          </Text>
          <Text style={GlobalStyles.textSecondary}>•</Text>
          <Text style={GlobalStyles.textSecondary}>
            {settings.goal === "muscle"
              ? "Muscle Building"
              : settings.goal === "strength"
                ? "Strength"
                : "Fitness"}
          </Text>
          <Text style={GlobalStyles.textSecondary}>•</Text>
          <Text style={GlobalStyles.textSecondary}>{settings.daysPerWeek}x/week</Text>
        </View>
      </View>

      <ScrollView>
        {exercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            selected={isSelected(exercise.id)}
            onToggle={() => toggleSelect(exercise.id)}
          />
        ))}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Pressable
          onPress={generateExercises}
          style={[GlobalStyles.button, { flex: 1, backgroundColor: Colors.surface }]}
        >
          <RefreshCw size={20} color={Colors.textPrimary} />
          <Text style={GlobalStyles.buttonText}>Regenerate</Text>
        </Pressable>
        <Pressable
          onPress={() => {}}
          style={[GlobalStyles.button, { flex: 1, backgroundColor: Colors.training }]}
        >
          <SaveAllIcon size={20} color={Colors.textPrimary} />
          <Text style={GlobalStyles.buttonText}>Save Workout</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginVertical: 10,
    marginHorizontal: 12,
  },
})