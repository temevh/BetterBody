import { GlobalStyles } from "@/app/_styles";
import { Colors } from "@/app/_theme";
import { Exercise } from "@/app/_types";
import { fetchExercises, getMuscleColor } from "@/utils/utils";
import { ArrowLeft } from "lucide-react-native";
import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

interface ExerciseListProps {
  onBack: () => void;
}

export default function ExerciseList({ onBack }: ExerciseListProps) {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    loadExercises();
  }, []);

  const loadExercises = async () => {
    const data = await fetchExercises();
    setExercises(data);
  };

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
        <Text style={[GlobalStyles.title, { marginBottom: 0 }]}>Exercises</Text>
      </View>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              backgroundColor: Colors.surface,
              padding: 12,
              borderRadius: 12,
            }}
          >
            <View
              style={[
                GlobalStyles.dot,
                {
                  backgroundColor: getMuscleColor(item.primary_muscles[0]),
                },
              ]}
            />
            <View style={{ flex: 1 }}>
              <Text style={GlobalStyles.text}>{item.name}</Text>
              <Text style={GlobalStyles.textSecondary}>
                {item.primary_muscles.join(", ")}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
