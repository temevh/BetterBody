import { Colors, MuscleColors } from "@/app/theme";
import { Exercise } from "@/app/types";
import { Check, Dumbbell, RefreshCcw } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../styles";

interface ExerciseCardProps {
  exercise: Exercise;
  selected: boolean;
  onToggle: () => void;
  onRegenerate: () => void;
}

export const ExerciseCard = ({ exercise, selected, onToggle, onRegenerate }: ExerciseCardProps) => {
  const getMuscleColor = (muscle: string) => {
    const color = (MuscleColors as Record<string, string>)[muscle];
    return color ?? "#404040";
  };

  const muscleColor = getMuscleColor(exercise.primaryMuscles[0]);

  return (
    <View style={GlobalStyles.card}>
      <View style={GlobalStyles.cardContent}>
        <View style={styles.cardLeft}>
          <View style={styles.muscleRow}>
            <View
              style={[
                GlobalStyles.dot,
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
            onPress={onToggle}
            style={[
              styles.iconButton,
              selected && styles.iconButtonSelected,
            ]}
          >
            <Check size={22} color="#fff" />
          </Pressable>
          <Pressable
            onPress={onRegenerate}
            style={[
              styles.iconButton,
              selected && styles.iconButtonSelected,
            ]}
          >
            <RefreshCcw size={22} color="#fff" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardLeft: {
    flex: 1,
  },
  muscleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  muscleText: {
    fontSize: 10,
    textTransform: "uppercase",
    color: Colors.textSecondary,
    letterSpacing: 1,
  },
  exerciseName: {
    fontSize: 16,
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
    fontSize: 12,
    color: Colors.textSecondary,
  },
  actions: {
    justifyContent: "center",
    marginLeft: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  iconButton: {
    width: 40,
    height: 40,
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
