import { Pressable, StyleSheet, Text } from "react-native";

export const SelectionCard = ({
  option,
  selected,
  onPress,
}: {
  option: string;
  selected: boolean;
  onPress: () => void;
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, selected && styles.cardSelected]}
    >
      <Text style={[styles.text, selected && styles.textSelected]}>
        {option}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#E5E7EB",
  },
  cardSelected: {
    backgroundColor: "#3B82F6",
  },
  text: {
    fontWeight: "600",
    color: "#374151",
    textTransform: "capitalize",
  },
  textSelected: {
    color: "#FFFFFF",
  },
});
