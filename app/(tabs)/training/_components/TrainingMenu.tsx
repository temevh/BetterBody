import { GlobalStyles } from "@/app/_styles";
import { Colors } from "@/app/_theme";
import { Dumbbell, History, PlusSquare, Save } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface TrainingMenuProps {
  onSelect: (option: "new" | "history" | "saved" | "exercises") => void;
}

export default function TrainingMenu({ onSelect }: TrainingMenuProps) {
  return (
    <View style={GlobalStyles.container}>
      <View style={GlobalStyles.header}>
        <Text style={GlobalStyles.title}>Training</Text>
      </View>
      <View style={{ padding: 16, gap: 16 }}>
        <Pressable style={styles.menuItem} onPress={() => onSelect("new")}>
          <View
            style={[styles.iconContainer, { backgroundColor: Colors.primary }]}
          >
            <PlusSquare size={24} color="white" />
          </View>
          <View>
            <Text style={GlobalStyles.textLarge}>New Workout</Text>
            <Text style={GlobalStyles.textSecondary}>
              Generate a personalized workout
            </Text>
          </View>
        </Pressable>

        <Pressable style={styles.menuItem} onPress={() => onSelect("history")}>
          <View
            style={[styles.iconContainer, { backgroundColor: Colors.metrics }]}
          >
            <History size={24} color="white" />
          </View>
          <View>
            <Text style={GlobalStyles.textLarge}>History</Text>
            <Text style={GlobalStyles.textSecondary}>
              View your past workouts
            </Text>
          </View>
        </Pressable>

        <Pressable style={styles.menuItem} onPress={() => onSelect("saved")}>
          <View
            style={[styles.iconContainer, { backgroundColor: Colors.gold }]}
          >
            <Save size={24} color="white" />
          </View>
          <View>
            <Text style={GlobalStyles.textLarge}>Saved Workouts</Text>
            <Text style={GlobalStyles.textSecondary}>
              Access your favorite templates
            </Text>
          </View>
        </Pressable>

        <Pressable
          style={styles.menuItem}
          onPress={() => onSelect("exercises")}
        >
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: Colors.stretching },
            ]}
          >
            <Dumbbell size={24} color="white" />
          </View>
          <View>
            <Text style={GlobalStyles.textLarge}>Exercises</Text>
            <Text style={GlobalStyles.textSecondary}>
              Browse exercise library
            </Text>
          </View>
        </Pressable>
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
