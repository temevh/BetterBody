import { Pressable, StyleSheet, Text } from "react-native";

const cardColor: Record<string, string> = {
  Training: "red",
  Meals: "green",
  Stretching: "blue",
  Metrics: "orange",
};

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
      style={[styles.card, { backgroundColor: cardColor[section] }]}
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
    fontSize: 28,
  },
});
