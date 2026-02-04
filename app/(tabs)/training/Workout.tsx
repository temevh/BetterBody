import { Colors } from "@/app/theme";
import { Exercise } from "@/app/types";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../styles";
import WorkoutCard from "./components/WorkoutCard";

export interface SetLog {
  id: string;
  reps: string;
  weight: string;
  completed: boolean;
}

interface WorkoutProps {
  workout: Exercise[];
}

export function Workout({ workout }: WorkoutProps) {
  const [logs, setLogs] = useState<Record<string, SetLog[]>>(() => {
    const initialLogs: Record<string, SetLog[]> = {};
    workout.forEach((exercise) => {
      initialLogs[exercise.id] = Array(3)
        .fill(0)
        .map((_, i) => ({
          id: Math.random().toString(36).substr(2, 9),
          reps: "",
          weight: "",
          completed: false,
        }));
    });
    return initialLogs;
  });

  const updateSet = (
    exerciseId: string,
    index: number,
    field: "reps" | "weight",
    value: string,
  ) => {
    setLogs((prev) => {
      const exerciseLogs = [...(prev[exerciseId] || [])];
      exerciseLogs[index] = { ...exerciseLogs[index], [field]: value };
      return { ...prev, [exerciseId]: exerciseLogs };
    });
  };

  const toggleSet = (exerciseId: string, index: number) => {
    setLogs((prev) => {
      const exerciseLogs = [...(prev[exerciseId] || [])];
      exerciseLogs[index] = {
        ...exerciseLogs[index],
        completed: !exerciseLogs[index].completed,
      };
      return { ...prev, [exerciseId]: exerciseLogs };
    });
  };

  const addSet = (exerciseId: string) => {
    setLogs((prev) => {
      const exerciseLogs = [...(prev[exerciseId] || [])];
      exerciseLogs.push({
        id: Math.random().toString(36).substr(2, 9),
        reps: "",
        weight: "",
        completed: false,
      });
      return { ...prev, [exerciseId]: exerciseLogs };
    });
  };

  return (
    <View style={GlobalStyles.container}>
      <View style={GlobalStyles.header}>
        <Text style={GlobalStyles.title}>Current Workout</Text>
        <Text style={GlobalStyles.textSecondary}>
          {workout.length} Exercises
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {workout.map((exercise) => (
          <WorkoutCard
            key={exercise.id}
            exercise={exercise}
            logs={logs}
            updateSet={updateSet}
            toggleSet={toggleSet}
            addSet={addSet}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  exerciseCard: {
    backgroundColor: Colors.surface,
    marginHorizontal: 12,
    marginBottom: 12,
    borderRadius: 16,
    padding: 16,
  },
  exerciseHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  exerciseName: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  setRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
    height: 40,
  },
  setCompleted: {
    opacity: 0.8,
  },
  headerText: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: "500",
  },
  setNumberContainer: {
    width: 30,
    height: 30,
    borderRadius: 6,
    backgroundColor: "#262626",
    alignItems: "center",
    justifyContent: "center",
  },
  setNumber: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: "600",
  },
  input: {
    flex: 1,
    height: 36,
    backgroundColor: "#262626",
    borderRadius: 8,
    textAlign: "center",
    color: Colors.textPrimary,
    fontSize: 10,
  },
  inputCompleted: {
    backgroundColor: "rgba(34, 197, 94, 0.1)",
    color: Colors.meals,
  },
  checkButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#262626",
    alignItems: "center",
    justifyContent: "center",
  },
  checkButtonCompleted: {
    backgroundColor: Colors.meals,
  },
  addSetButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 8,
    paddingVertical: 8,
    backgroundColor: "#262626",
    borderRadius: 8,
  },
  addSetText: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: "600",
  },
});
