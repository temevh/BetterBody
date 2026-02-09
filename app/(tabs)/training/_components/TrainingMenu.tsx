import { GlobalStyles } from "@/app/_styles";
import { Colors } from "@/app/_theme";
import {
  Dumbbell,
  History,
  LucideIcon,
  PlusSquare,
  Save,
} from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface TrainingMenuProps {
  onSelect: (option: "new" | "history" | "saved" | "exercises") => void;
}

const items = [
  {
    path: "new",
    header: "New Workout",
    subHeader: "Generate a personalized workout",
    icon: PlusSquare,
    color: Colors.primary,
  },
  {
    path: "history",
    header: "History",
    subHeader: "View your past workouts",
    icon: History,
    color: Colors.metrics,
  },
  {
    path: "saved",
    header: "Saved Workouts",
    subHeader: "Access your favorite templates",
    icon: Save,
    color: Colors.gold,
  },
  {
    path: "exercises",
    header: "Exercises",
    subHeader: "Browse exercise library",
    icon: Dumbbell,
    color: Colors.stretching,
  },
] as const;

function TrainingMenuCard({
  path,
  header,
  subHeader,
  icon: Icon,
  color,
  onSelect,
}: {
  path: TrainingMenuProps["onSelect"] extends (o: infer T) => void ? T : never;
  header: string;
  subHeader: string;
  icon: LucideIcon;
  color: string;
  onSelect: TrainingMenuProps["onSelect"];
}) {
  return (
    <Pressable style={styles.menuItem} onPress={() => onSelect(path)}>
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        <Icon size={24} color="white" />
      </View>
      <View>
        <Text style={GlobalStyles.textLarge}>{header}</Text>
        <Text style={GlobalStyles.textSecondary}>{subHeader}</Text>
      </View>
    </Pressable>
  );
}

export default function TrainingMenu({ onSelect }: TrainingMenuProps) {
  return (
    <View style={GlobalStyles.container}>
      <View style={GlobalStyles.header}>
        <Text style={GlobalStyles.title}>Training</Text>
      </View>
      <View style={{ padding: 16, gap: 16 }}>
        {items.map((item) => (
          <TrainingMenuCard key={item.path} {...item} onSelect={onSelect} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 16,
    gap: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
