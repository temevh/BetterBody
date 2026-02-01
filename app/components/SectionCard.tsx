import { Pressable, StyleSheet, Text } from "react-native";
import { Colors, FontSizes } from "../theme";

export const SectionColors = {
  Training: Colors.training,
  Meals: Colors.meals,
  Stretching: Colors.stretching,
  Metrics: Colors.metrics,
} as const;

export const SectionCard = ({
  section,
  onPress,
}: {
  section: string;
  onPress: () => void;
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, { backgroundColor: SectionColors[section] }]}
    >
      <Text style={styles.text}>{section}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 150,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: FontSizes.xl,
  },
});
