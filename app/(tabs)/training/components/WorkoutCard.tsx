import { GlobalStyles } from "@/app/styles";
import { Colors } from "@/app/theme";
import { Check, Plus } from "lucide-react-native";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { Exercise } from "@/app/types";
import { getMuscleColor } from "../../utils";
import { SetLog } from "../Workout";

interface WorkoutCardProps {
  exercise: Exercise;
  logs: Record<string, SetLog[]>;
  updateSet: (
    exerciseId: string,
    index: number,
    field: "reps" | "weight",
    value: string,
  ) => void;
  toggleSet: (exerciseId: string, index: number) => void;
  addSet: (exerciseId: string) => void;
}

export default function WorkoutCard({
  exercise,
  logs,
  updateSet,
  toggleSet,
  addSet,
}: WorkoutCardProps) {
  const allCompleted = logs[exercise.id].every((log) => {
    return log.completed === true;
  });

  console.log(logs[exercise.id], exercise);
  console.log(allCompleted);
  return (
    <View
      key={exercise.id}
      style={[
        GlobalStyles.card,
        {
          padding: 16,
          backgroundColor: allCompleted ? Colors.succeed : Colors.surface,
        },
      ]}
    >
      <View style={[, { flexDirection: "row", alignItems: "center", gap: 8 }]}>
        <View
          style={[
            GlobalStyles.dot,
            {
              backgroundColor: getMuscleColor(exercise.primaryMuscles[0]),
            },
          ]}
        />
        <Text style={GlobalStyles.text}>{exercise.name} </Text>
      </View>

      <View style={[GlobalStyles.row, { gap: 12, height: 30 }]}>
        <Text
          style={[
            GlobalStyles.subHeaderText,
            { width: 30, textAlign: "center" },
          ]}
        >
          Set
        </Text>
        <Text
          style={[
            GlobalStyles.subHeaderText,
            { width: 160, textAlign: "center" },
          ]}
        >
          kg
        </Text>
        <Text
          style={[
            GlobalStyles.subHeaderText,
            { width: 140, textAlign: "center" },
          ]}
        >
          Reps
        </Text>
        <View style={{ width: 40 }} />
      </View>

      {logs[exercise.id]?.map((set, index) => (
        <View
          key={set.id}
          style={[
            GlobalStyles.row,
            { gap: 16, marginBottom: 2, height: 40 },
            set.completed && { opacity: 0.8 },
          ]}
        >
          <View
            style={[
              styles.setNumberContainer,
              set.completed && { backgroundColor: Colors.meals },
            ]}
          >
            <Text
              style={[styles.setNumber, set.completed && { color: "#fff" }]}
            >
              {index + 1}
            </Text>
          </View>

          <TextInput
            style={[
              GlobalStyles.textInput,
              { width: 120, flex: 0 },
              set.completed && styles.inputCompleted,
            ]}
            placeholder="-"
            placeholderTextColor={Colors.textSecondary}
            keyboardType="numeric"
            value={set.weight}
            onChangeText={(text) => {
              if (/^\d*\.?\d*$/.test(text)) {
                updateSet(exercise.id, index, "weight", text);
              }
            }}
          />

          <TextInput
            style={[
              GlobalStyles.textInput,
              { width: 120, flex: 0 },
              set.completed && styles.inputCompleted,
            ]}
            placeholder="-"
            placeholderTextColor={Colors.textSecondary}
            keyboardType="numeric"
            value={set.reps}
            onChangeText={(text) => {
              if (/^\d*$/.test(text)) {
                updateSet(exercise.id, index, "reps", text);
              }
            }}
          />

          <Pressable
            style={[
              GlobalStyles.smallIconButton,
              set.completed && { backgroundColor: Colors.succeed },
            ]}
            onPress={() => toggleSet(exercise.id, index)}
          >
            <Check
              size={16}
              color={set.completed ? "#fff" : Colors.textSecondary}
            />
          </Pressable>
        </View>
      ))}

      <Pressable
        style={styles.addSetButton}
        onPress={() => addSet(exercise.id)}
      >
        <Plus size={16} color={Colors.textSecondary} />
        <Text style={GlobalStyles.textSecondary}>Add Set</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
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
  inputCompleted: {
    backgroundColor: "rgba(34, 197, 94, 0.1)",
    color: Colors.succeed,
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
});
