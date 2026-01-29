import { Exercise } from "@/app/types";
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Chip } from "./Chip";

export const ExeriseCard = ({ exercise }: { exercise: Exercise }) => {
  const [viewInstructions, setviewInstructions] = useState(false);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{exercise.name}</Text>

      <View style={styles.metaRow}>
        {exercise.level && <Chip text={exercise.level.toUpperCase()} />}
        {exercise.equipment && <Chip text={exercise.equipment} />}
        {exercise.mechanic && <Chip text={exercise.mechanic} />}
      </View>

      <Text style={styles.sectionTitle}>Primary muscles</Text>
      <View style={styles.metaRow}>
        {exercise.primaryMuscles.map((muscle) => (
          <Chip key={muscle} text={muscle} />
        ))}
      </View>

      {exercise.secondaryMuscles.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>Secondary muscles</Text>
          <View style={styles.metaRow}>
            {exercise.secondaryMuscles.map((muscle) => (
              <Chip key={muscle} text={muscle} />
            ))}
          </View>
        </View>
      )}

      <Button
        onPress={() => setviewInstructions(!viewInstructions)}
        title="Instructions"
      ></Button>
      {viewInstructions && (
        <View>
          {exercise.instructions.map((step, index) => (
            <View key={index} style={styles.instructionRow}>
              <Text style={styles.stepIndex}>{index + 1}.</Text>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "gray",
    borderRadius: 16,
    padding: 20,
    marginVertical: 12,
    marginHorizontal: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 12,
  },

  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },

  instructionRow: {
    flexDirection: "row",
    marginBottom: 8,
  },

  stepIndex: {
    color: "#9CA3AF",
    marginRight: 6,
    fontWeight: "600",
  },

  stepText: {
    color: "#E5E7EB",
    flex: 1,
    lineHeight: 20,
  },
});
