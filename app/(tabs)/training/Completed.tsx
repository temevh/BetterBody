import { GlobalStyles } from "@/app/styles";
import { Colors } from "@/app/theme";
import { useRouter } from "expo-router";
import { CheckCircle2, Save, Trophy } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SetLog } from "./Workout";

interface CompletedProps {
  logs: Record<string, SetLog[]>;
}

const Completed = ({ logs }: CompletedProps) => {
  const router = useRouter();
  const currentDate = new Date().toDateString();

  logs = {
    Decline_EZ_Bar_Triceps_Extension: [
      {
        id: "j8pe137n7",
        reps: "12",
        weight: "30",
        completed: false,
      },
      {
        id: "jqhnl62bf",
        reps: "10",
        weight: "32.5",
        completed: false,
      },
      {
        id: "j897zr249",
        reps: "10",
        weight: "32.5",
        completed: false,
      },
      {
        id: "pbyd6ufd8",
        reps: "8",
        weight: "35",
        completed: false,
      },
    ],
    Incline_Inner_Biceps_Curl: [
      {
        id: "y8pywa5zc",
        reps: "12",
        weight: "14",
        completed: false,
      },
      {
        id: "ux74a22d3",
        reps: "10",
        weight: "16",
        completed: false,
      },
      {
        id: "ldlm31t4e",
        reps: "10",
        weight: "16",
        completed: false,
      },
    ],
    Isometric_Wipers: [
      {
        id: "8nu94hnij",
        reps: "20",
        weight: "BW",
        completed: false,
      },
      {
        id: "hr5blbica",
        reps: "20",
        weight: "BW",
        completed: false,
      },
      {
        id: "6wk1qkdua",
        reps: "15",
        weight: "BW",
        completed: false,
      },
    ],
    Low_Pulley_Row_To_Neck: [
      {
        id: "xkvjp9o2n",
        reps: "12",
        weight: "45",
        completed: false,
      },
      {
        id: "1y0fnfrh7",
        reps: "10",
        weight: "50",
        completed: false,
      },
      {
        id: "zhx1y6947",
        reps: "10",
        weight: "50",
        completed: false,
      },
    ],
    Hip_Flexion_with_Band: [
      {
        id: "clmbz7y2e",
        reps: "15",
        weight: "Light band",
        completed: false,
      },
      {
        id: "kwnkiq3of",
        reps: "15",
        weight: "Medium band",
        completed: false,
      },
      {
        id: "k7gw04f9x",
        reps: "12",
        weight: "Medium band",
        completed: false,
      },
    ],
    Lying_Leg_Curls: [
      {
        id: "6pz39cnyv",
        reps: "12",
        weight: "40",
        completed: false,
      },
      {
        id: "5o4ub3c09",
        reps: "10",
        weight: "45",
        completed: false,
      },
      {
        id: "7elfj3r9k",
        reps: "10",
        weight: "45",
        completed: false,
      },
    ],
    Bent_Over_Barbell_Row: [
      {
        id: "hn5nm3hm5",
        reps: "11",
        weight: "70",
        completed: false,
      },
      {
        id: "bw1d30qk2",
        reps: "10",
        weight: "75",
        completed: false,
      },
      {
        id: "8e0aa5j5k",
        reps: "8",
        weight: "80",
        completed: false,
      },
    ],
  };

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
            (set) => set.completed || (set.reps && set.weight),
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
              backgroundColor: Colors.primary,
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
            Save Workout
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Completed;
