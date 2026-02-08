import { GlobalStyles } from "@/app/_styles";
import { Colors } from "@/app/_theme";
import { ArrowLeft } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

interface SavedWorkoutsProps {
  onBack: () => void;
}

export default function SavedWorkouts({ onBack }: SavedWorkoutsProps) {
  return (
    <View style={GlobalStyles.container}>
      <View
        style={[
          GlobalStyles.header,
          { flexDirection: "row", alignItems: "center", gap: 16 },
        ]}
      >
        <Pressable onPress={onBack}>
          <ArrowLeft size={24} color={Colors.textPrimary} />
        </Pressable>
        <Text style={[GlobalStyles.title, { marginBottom: 0 }]}>
          Saved Workouts
        </Text>
      </View>
      <View style={{ padding: 16 }}>
        <Text style={GlobalStyles.textSecondary}>
          Saved workouts will appear here.
        </Text>
      </View>
    </View>
  );
}
