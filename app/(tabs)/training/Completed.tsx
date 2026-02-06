import { GlobalStyles } from "@/app/styles";
import { Colors } from "@/app/theme";
import { ScrollView, Text, View } from "react-native";
import { SetLog } from "./Workout";

interface CompletedProps {
  logs: Record<string, SetLog[]>;
}

const Completed = ({ logs }: CompletedProps) => {
  return (
    <View style={GlobalStyles.container}>
      <View style={GlobalStyles.header}>
        <Text style={GlobalStyles.title}>Workout Summary</Text>
        <Text style={GlobalStyles.textSecondary}>Great job!</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 30, gap: 12 }}>
        {Object.entries(logs).map(([exerciseId, sets]) => {
          const activeSets = sets.filter(
            (set) => set.completed || (set.reps && set.weight),
          );

          if (activeSets.length === 0) return null;

          const exerciseName = exerciseId.replace(/_/g, " ");

          return (
            <View key={exerciseId} style={[GlobalStyles.card, { padding: 16 }]}>
              <Text style={[GlobalStyles.textLarge, { marginBottom: 12 }]}>
                {exerciseName}
              </Text>

              {activeSets.map((set, index) => (
                <View
                  key={set.id}
                  style={[
                    GlobalStyles.row,
                    {
                      justifyContent: "space-between",
                      marginBottom: 8,
                      paddingVertical: 4,
                      borderBottomWidth:
                        index === activeSets.length - 1 ? 0 : 1,
                      borderBottomColor: "#333",
                    },
                  ]}
                >
                  <View
                    style={[
                      GlobalStyles.smallIconButton,
                      {
                        width: 24,
                        height: 24,
                        borderRadius: 12,
                        backgroundColor: Colors.primary,
                      },
                    ]}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 10,
                        fontWeight: "bold",
                      }}
                    >
                      {index + 1}
                    </Text>
                  </View>
                  <Text
                    style={[
                      GlobalStyles.text,
                      { flex: 1, textAlign: "center" },
                    ]}
                  >
                    {set.weight} kg
                  </Text>
                  <Text style={GlobalStyles.textSecondary}>x</Text>
                  <Text
                    style={[
                      GlobalStyles.text,
                      { flex: 1, textAlign: "center" },
                    ]}
                  >
                    {set.reps} reps
                  </Text>
                </View>
              ))}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Completed;
