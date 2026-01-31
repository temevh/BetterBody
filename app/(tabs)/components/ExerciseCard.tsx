import { Exercise } from "@/app/types";
import { Image } from "expo-image";
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Chip } from "./Chip";

export const ExeriseCard = ({ exercise }: { exercise: Exercise }) => {
  const [viewInstructions, setviewInstructions] = useState(false);

  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
  return (
    <View style={styles.card}>
      <View style={styles.iconRow}>
        <View>
          <Text style={styles.title}>{exercise.name}</Text>

          <View style={styles.metaRow}>
            {exercise.level && <Chip text={exercise.level.toUpperCase()} />}
            {exercise.equipment && (
              <Chip text={exercise.equipment.toUpperCase()} />
            )}
            {exercise.mechanic && (
              <Chip text={exercise.mechanic.toUpperCase()} />
            )}
          </View>
        </View>
        <Image
          style={styles.image}
          source={require("../../../assets/images/biceps.png")}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
        />{" "}
      </View>

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
  image: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0553",
  },
  iconRow: {
    gap: 0,
  },
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
