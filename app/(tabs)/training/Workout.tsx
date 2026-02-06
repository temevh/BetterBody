import { Exercise } from "@/app/types";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { GlobalStyles } from "../../styles";
import RestTimer from "./components/RestTimer";
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

  return (
    <View style={GlobalStyles.container}>
      <View style={GlobalStyles.header}>
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
