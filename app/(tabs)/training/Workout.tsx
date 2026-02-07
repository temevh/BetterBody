import { Colors } from "@/app/_theme";
import { Exercise } from "@/app/_types";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../_styles";
import Completed from "./Completed";
import RestTimer from "./_components/RestTimer";
import WorkoutCard from "./_components/WorkoutCard";

export interface SetLog {
  id: string;
  reps: string;
  weight: string;
  completed: boolean;
}

interface WorkoutProps {
  workout: Exercise[];
}

export default function Workout({ workout }: WorkoutProps) {
  const [rest, setRest] = useState<number>(150);
  const [timerKey, setTimerKey] = useState<number>(0);

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

  const [completed, setCompleted] = useState(false);

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
    setRest(150);
    setTimerKey((prev) => prev + 1);
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

  const deleteSet = (exerciseId: string, index: number) => {
    setLogs((prev) => {
      const exerciseLogs = [...(prev[exerciseId] || [])];
      exerciseLogs.splice(index, 1);
      return { ...prev, [exerciseId]: exerciseLogs };
    });
  };

  const saveWorkout = () => {
    setCompleted(true);
  };

  if (completed) {
    return <Completed logs={logs} />;
  }

  return (
    <View style={GlobalStyles.container}>
      <View style={[GlobalStyles.header, { paddingHorizontal: 12 }]}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={GlobalStyles.title}>Current Workout</Text>
          <RestTimer
            key={timerKey}
            duration={rest}
            onCancel={() => {
              setRest(150);
            }}
          />
        </View>
        <Text style={GlobalStyles.textSecondary}>
          {workout.length} Exercises
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 20, gap: 10 }}>
        {workout.map((exercise) => (
          <WorkoutCard
            key={exercise.id}
            exercise={exercise}
            logs={logs}
            updateSet={updateSet}
            toggleSet={toggleSet}
            addSet={addSet}
            deleteSet={deleteSet}
          />
        ))}
        <Pressable style={styles.saveWorkoutButton} onPress={saveWorkout}>
          <Text style={GlobalStyles.textLarge}>Complete workout</Text>
        </Pressable>
        <Pressable style={styles.cancelWorkoutButton}>
          <Text style={[GlobalStyles.subHeaderText, { color: "white" }]}>
            Cancel workout
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  saveWorkoutButton: {
    width: "95%",
    backgroundColor: Colors.succeed,
    marginVertical: 4,
    alignSelf: "center",
    alignItems: "center",
    padding: 6,
    borderRadius: 12,
  },
  cancelWorkoutButton: {
    width: "50%",
    backgroundColor: Colors.cancel,
    marginVertical: 2,
    alignSelf: "center",
    alignItems: "center",
    padding: 6,
    borderRadius: 12,
    opacity: 0.8,
  },
});
