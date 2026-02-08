import { Colors } from "@/app/_theme";
import { Exercise, SettingsState } from "@/app/_types";
import { fetchExercises, getExercise } from "@/utils/utils";
import { RefreshCw, SaveAllIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { GlobalStyles } from "../../_styles";
import { ExerciseCard } from "./_components/ExerciseCard";

type GeneratorProps = {
  settings: SettingsState;
  setWorkout: (exercises: Exercise[]) => void;
};

export default function Generator({ settings, setWorkout }: GeneratorProps) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [allExercises, setAllExercises] = useState<Exercise[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [workoutName, setWorkoutName] = useState<string>("Your workout");
  const [editName, setEditName] = useState<boolean>(false);

  useEffect(() => {
    loadExercises();
  }, []);

  const loadExercises = async () => {
    const data = await fetchExercises();
    setAllExercises(data);
  };

  const generateExercises = () => {
    if (allExercises.length === 0) return;
    const result = getExercise(
      settings.level,
      settings.goal,
      settings.split,
      settings.daysPerWeek,
      allExercises,
    );
    setExercises(result);
    setSelectedIds(new Set(result.map((e) => e.id)));
  };

  useEffect(() => {
    if (allExercises.length > 0 && exercises.length === 0) {
      generateExercises();
    }
  }, [allExercises]);

  const saveWorkout = () => {
    setWorkout(exercises);
  };

  const generateSingleExercise = ({
    muscle,
    id,
  }: {
    muscle: string;
    id: string;
  }) => {
    const result = getExercise(
      settings.level,
      settings.goal,
      settings.split,
      settings.daysPerWeek,
      allExercises,
      muscle,
    );
    if (result.length > 0) {
      const newExercise = result[0];
      setExercises((prev) =>
        prev.map((ex) => (ex.id === id ? newExercise : ex)),
      );

      if (selectedIds.has(id)) {
        setSelectedIds((prev) => {
          const next = new Set(prev);
          next.delete(id);
          next.add(newExercise.id);
          return next;
        });
      }
    }
  };

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
        <Pressable
          style={GlobalStyles.title}
          onPress={() => {
            setEditName(!editName);
          }}
        >
          {editName ? (
            <TextInput
              value={workoutName}
              onChangeText={setWorkoutName}
              autoFocus
              style={GlobalStyles.title}
              onBlur={() => setEditName(false)}
            />
          ) : (
            <Pressable onPress={() => setEditName(true)}>
              <Text style={GlobalStyles.title}>{workoutName}</Text>
            </Pressable>
          )}
        </Pressable>

        <View style={[GlobalStyles.row, { gap: 8 }]}>
          <Text
            style={[
              GlobalStyles.textSecondary,
              { textTransform: "capitalize" },
            ]}
          >
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
          <Text style={GlobalStyles.textSecondary}>
            {settings.daysPerWeek}x/week
          </Text>
        </View>
      </View>

      <ScrollView>
        {exercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            selected={isSelected(exercise.id)}
            onToggle={() => toggleSelect(exercise.id)}
            onRegenerate={() =>
              generateSingleExercise({
                muscle: exercise.primary_muscles[0],
                id: exercise.id,
              })
            }
          />
        ))}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Pressable
          onPress={generateExercises}
          style={[
            GlobalStyles.button,
            { flex: 1, backgroundColor: Colors.surface },
          ]}
        >
          <RefreshCw size={20} color={Colors.textPrimary} />
          <Text style={GlobalStyles.buttonText}>Regenerate</Text>
        </Pressable>
        <Pressable
          onPress={saveWorkout}
          style={[
            GlobalStyles.button,
            { flex: 1, backgroundColor: Colors.training },
          ]}
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
});
