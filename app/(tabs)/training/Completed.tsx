import { GlobalStyles } from "@/app/_styles";
import { Colors } from "@/app/_theme";
import { SetLog } from "@/app/_types";
import { useRouter } from "expo-router";
import { CheckCircle2, Save, Trophy } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";

interface CompletedProps {
  logs: Record<string, SetLog[]>;
}

const Completed = ({ logs }: CompletedProps) => {
  const router = useRouter();
  const currentDate = new Date().toDateString();
  const colSet = { flex: 1, alignItems: "center" as const };
  const colValue = { flex: 2, alignItems: "center" as const };

  return (
    <View style={GlobalStyles.container}>
      <View style={[GlobalStyles.header, { alignItems: "center" }]}>
        <Trophy size={64} color={Colors.gold} style={{ marginBottom: 16 }} />
        <Text style={[GlobalStyles.title, { textAlign: "center" }]}>
          Workout Complete!
        </Text>
        <Text style={GlobalStyles.textSecondary}>{currentDate}</Text>
        <Text style={[GlobalStyles.textSecondary, { marginTop: 8 }]}>
          Great job! You smashed it. 🙌
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 80, gap: 16 }}>
        {Object.entries(logs).map(([exerciseId, sets]) => {
          const activeSets = sets.filter(
            (set) =>
              set.completed || (set.reps !== null && set.weight !== null),
          );

          if (activeSets.length === 0) return null;

          const exerciseName = exerciseId.replace(/_/g, " ");

          return (
            <View key={exerciseId} style={[GlobalStyles.card, { padding: 16 }]}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 8,
                  borderBottomWidth: 1,
                  borderBottomColor: Colors.surfaceHighlight,
                  paddingBottom: 12,
                }}
              >
                <CheckCircle2
                  size={32}
                  color={Colors.succeed}
                  style={{ marginRight: 10 }}
                />
                <Text
                  style={[
                    GlobalStyles.textLarge,
                    { flex: 1, fontSize: 20, color: Colors.textPrimary },
                  ]}
                >
                  {exerciseName}
                </Text>
              </View>

              <View style={{ gap: 6, paddingHorizontal: 8 }}>
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 4,
                    paddingHorizontal: 6,
                  }}
                >
                  <View style={colSet}>
                    <Text style={{ color: Colors.textSecondary, fontSize: 14 }}>
                      SET
                    </Text>
                  </View>
                  <View style={colValue}>
                    <Text style={{ color: Colors.textSecondary, fontSize: 14 }}>
                      KG
                    </Text>
                  </View>
                  <View style={colValue}>
                    <Text style={{ color: Colors.textSecondary, fontSize: 14 }}>
                      REPS
                    </Text>
                  </View>
                </View>

                {activeSets.map((set, index) => (
                  <View
                    key={set.id || index}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: Colors.surfaceHighlight,
                      padding: 8,
                      borderRadius: 8,
                    }}
                  >
                    <View style={colSet}>
                      <View
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 12,
                          backgroundColor: Colors.surface,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: Colors.textSecondary,
                            fontSize: 14,
                            fontWeight: "bold",
                          }}
                        >
                          {index + 1}
                        </Text>
                      </View>
                    </View>

                    <View style={colValue}>
                      <Text
                        style={[
                          GlobalStyles.text,
                          { fontSize: 18, fontWeight: "bold" },
                        ]}
                      >
                        {set.weight}
                      </Text>
                    </View>

                    <View style={colValue}>
                      <Text
                        style={[
                          GlobalStyles.text,
                          { fontSize: 18, fontWeight: "bold" },
                        ]}
                      >
                        {set.reps}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          );
        })}
      </ScrollView>

      <View
        style={{
          position: "absolute",
          bottom: 30,
          left: 20,
          right: 20,
        }}
      >
        <Pressable
          style={[
            GlobalStyles.button,
            {
              backgroundColor: Colors.training,
              shadowColor: Colors.primary,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 5,
            },
          ]}
          onPress={() => router.replace("/")}
        >
          <Save size={20} color="white" />
          <Text style={[GlobalStyles.buttonText, { fontSize: 18 }]}>
            Finish Workout
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Completed;
