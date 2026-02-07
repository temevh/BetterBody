import { LucideIcon } from "lucide-react-native";
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
  Icon,
}: {
  section: string;
  onPress: () => void;
  Icon: LucideIcon;
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: SectionColors[section as keyof typeof SectionColors],
          opacity: pressed ? 0.9 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
      ]}
    >
      <Icon size={48} color="white" strokeWidth={2} style={styles.icon} />
      <Text style={styles.text}>{section}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 160,
    height: 160,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  icon: {
    marginBottom: 12,
  },
  text: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: FontSizes.large,
    letterSpacing: 0.5,
  },
});
