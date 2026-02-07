import { Colors } from "@/app/_theme";
import { Goal, Level, SettingsState, Split } from "@/app/_types";
import { ArrowLeft, Sparkles } from "lucide-react-native";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../_styles";

export default function Settings({
  settings,
  setSettings,
  onGenerate,
}: {
  settings: SettingsState;
  setSettings: React.Dispatch<React.SetStateAction<SettingsState>>;
  onGenerate: () => void;
}) {
  const levels: Level[] = [Level.Beginner, Level.Intermediate, Level.Expert];

  const splits: { id: Split; label: string }[] = [
    { id: Split.FullBody, label: "Full Body" },
    { id: Split.UpperLower, label: "Upper / Lower" },
    { id: Split.PPL, label: "Push / Pull / Legs" },
  ];

  const goals: Goal[] = [Goal.Muscle, Goal.Strengh];

  return (
    <View style={GlobalStyles.container}>
      {/* Header */}
      <View style={GlobalStyles.header}>
        <Pressable onPress={() => {}} style={styles.backButton}>
          <ArrowLeft size={24} color="#9CA3AF" />
        </Pressable>

        <Text style={GlobalStyles.title}>Workout Settings</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View>
          <Text style={styles.label}>Goal</Text>
          <View style={styles.row}>
            {goals.map((goal) => {
              const active = settings.goal === goal;
              return (
                <Pressable
                  key={goal}
                  onPress={() => {
                    setSettings((prev) => ({ ...prev, goal }));
                  }}
                  style={[styles.optionMedium, active && styles.optionActive]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      active && styles.optionTextActive,
                    ]}
                  >
                    {goal}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
        {/* Level */}
        <View>
          <Text style={styles.label}>Experience Level</Text>
          <View style={styles.row}>
            {levels.map((level) => {
              const active = settings.level === level;
              return (
                <Pressable
                  key={level}
                  onPress={() => {
                    setSettings((prev) => ({ ...prev, level }));
                  }}
                  style={[styles.option, active && styles.optionActive]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      active && styles.optionTextActive,
                    ]}
                  >
                    {level}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Split */}
        <View>
          <Text style={styles.label}>Training Split</Text>
          {splits.map((split) => {
            const active = settings.split === split.id;
            return (
              <Pressable
                key={split.id}
                onPress={() => {
                  setSettings((prev) => ({ ...prev, split: split.id }));
                }}
                style={[styles.optionLarge, active && styles.optionActive]}
              >
                <Text
                  style={[styles.optionText, active && styles.optionTextActive]}
                >
                  {split.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Days */}
        <View>
          <Text style={styles.label}>
            Days per Week: {settings.daysPerWeek}
          </Text>
          <View style={styles.daysGrid}>
            {[1, 2, 3, 4, 5, 6, 7].map((day) => {
              const active = settings.daysPerWeek === day;
              return (
                <Pressable
                  key={day}
                  onPress={() => {
                    setSettings((prev) => ({ ...prev, daysPerWeek: day }));
                  }}
                  style={[styles.day, active && styles.optionActive]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      active && styles.optionTextActive,
                    ]}
                  >
                    {day}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Generate */}
      <View style={styles.footer}>
        <Pressable
          style={[GlobalStyles.button, { backgroundColor: Colors.training }]}
          onPress={onGenerate}
        >
          <Sparkles size={22} color="white" />
          <Text style={GlobalStyles.buttonText}>Generate Workout</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    marginBottom: 24,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    rowGap: 32,
  },
  label: {
    color: Colors.textSecondary,
    marginBottom: 12,
    fontSize: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  option: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: Colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  optionMedium: {
    width: "48%",
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: Colors.surface,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  optionLarge: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: Colors.surface,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  optionActive: {
    backgroundColor: Colors.training,
  },
  optionText: {
    color: Colors.textSecondary,
    fontWeight: "500",
    textTransform: "capitalize",
    fontSize: 16,
  },
  optionTextActive: {
    color: Colors.textPrimary,
  },
  daysGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 8,
  },
  day: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    padding: 24,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.surface,
  },
});
