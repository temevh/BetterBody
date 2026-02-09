import { GlobalStyles } from "@/app/_styles";
import { Colors } from "@/app/_theme";
import { WorkoutType } from "@/app/_types";
import { getWorkouts } from "@/utils/getWorkouts";
import { ArrowLeft } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

interface HistoryListProps {
  onBack: () => void;
}

export default function History({ onBack }: HistoryListProps) {
  const [workouts, setWorkouts] = useState<WorkoutType[]>([]);

  useEffect(() => {
    async function loadWorkouts() {
      const response = await getWorkouts();
      setWorkouts(response);
    }

    loadWorkouts();
  }, []);

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
        <Text style={[GlobalStyles.title, { marginBottom: 0 }]}>History</Text>
      </View>
      <View style={{ padding: 16 }}>
        <Text style={GlobalStyles.textSecondary}>
          Workout history will appear here.
        </Text>
        {workouts &&
          workouts.map((workout) => (
            <Text key={workout.name}>{workout.name}</Text>
          ))}
      </View>
    </View>
  );
}
