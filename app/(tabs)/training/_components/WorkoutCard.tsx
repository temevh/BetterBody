import { GlobalStyles } from "@/app/_styles";
import { Colors } from "@/app/_theme";
import { Check, Info, Plus, Trash2 } from "lucide-react-native";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { Exercise } from "@/app/_types";
import { useState } from "react";
import { getMuscleColor } from "../../../../utils/utils";
import { SetLog } from "../Workout";

import ExerciseInfoModal from "./ExerciseInfoModal";

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
  deleteSet: (exerciseId: string, index: number) => void;
}

export default function WorkoutCard({
  exercise,
  logs,
  updateSet,
  toggleSet,
  addSet,
  deleteSet,
}: WorkoutCardProps) {
  const [showInfo, setShowInfo] = useState(false);
  const [bin, setBin] = useState<number>(0);

  const allCompleted = logs[exercise.id].every((log) => {
    return log.completed === true;
  });

  const removeSet = (index: number) => {
    if (bin === index + 1) {
      deleteSet(exercise.id, index);
      setBin(0);
    } else {
      setBin(index + 1);
    }
  };

  return (
    <View
      key={exercise.id}
      style={[
        GlobalStyles.card,
        {
          padding: 16,
          backgroundColor: allCompleted ? Colors.succeed : Colors.surface,
          opacity: allCompleted ? 0.8 : 1,
        },
      ]}
    >
      <ExerciseInfoModal
        exercise={exercise}
        visible={showInfo}
        onClose={() => setShowInfo(false)}
      />
      <View style={[, { flexDirection: "row", alignItems: "center", gap: 8 }]}>
        <View
          style={[
            GlobalStyles.dot,
            {
              backgroundColor: getMuscleColor(exercise.primary_muscles[0]),
            },
          ]}
        />
        <Text style={GlobalStyles.text}>{exercise.name} </Text>
        <Pressable
          onPress={() => {
            setShowInfo(!showInfo);
          }}
        >
          <Info size={24} color={Colors.textSecondary} />
        </Pressable>
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
          <Pressable
            onPress={() => {
              removeSet(index);
            }}
            style={[
              styles.setNumberContainer,
              {
                backgroundColor:
                  bin === index + 1
                    ? Colors.cancel
                    : set.completed
                      ? Colors.meals
                      : "#262626",
              },
            ]}
          >
            {bin === index + 1 ? (
              <Trash2 size={16} color="white" />
            ) : (
              <Text
                style={[
                  styles.setNumber,
                  (set.completed || bin === index + 1) && { color: "#fff" },
                ]}
              >
                {index + 1}
              </Text>
            )}
          </Pressable>

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
    fontSize: 16,
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
