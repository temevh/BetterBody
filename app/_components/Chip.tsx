import { Colors } from "@/app/_theme";
import { StyleSheet, Text } from "react-native";

export const Chip = ({
  text,
  primary,
  secondary,
}: {
  text: string;
  primary?: boolean;
  secondary?: boolean;
}) => {
  return (
    <Text
      style={[
        styles.metaChip,
        primary && styles.primaryChip,
        secondary && styles.secondaryChip,
      ]}
    >
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  metaChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 6,
    fontSize: 12,
    fontWeight: "600",
    color: "#111827",
    backgroundColor: "pink",
  },

  primaryChip: {
    backgroundColor: Colors.gold, // gold
  },

  secondaryChip: {
    backgroundColor: "#E5E7EB", // silver
  },
});
