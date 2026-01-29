import { Exercise } from "@/app/types";
import { StyleSheet, Text, View } from "react-native";

export const ExeriseCard = ({ exercise }: { exercise: Exercise }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.header}>{exercise.name}</Text>
      <Text>{exercise.instructions}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    borderRadius: 12,
    padding: 20,
    backgroundColor: "gray",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
