import { StyleSheet, Text } from "react-native";

export const Chip = ({ text }: { text: string }) => {
  return <Text style={styles.metaChip}>{text}</Text>;
};

const styles = StyleSheet.create({
  metaChip: {
    backgroundColor: "#2A2A2A",
    color: "#BBBBBB",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 6,
    fontSize: 12,
    fontWeight: "600",
  },
});
