import { Colors } from "@/app/theme";
import { Level, Split } from "@/app/types";
import { ArrowLeft, Sparkles } from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export function Settings() {
  const [settings, setSettings] = useState({
    level: "beginner",
    split: "Full body",
    daysPerWeek: 3,
  });
  const levels: Level[] = [Level.Beginner, Level.Intermediate, Level.Expert];

  const splits: { id: Split; label: string }[] = [
    { id: Split.FullBody, label: "Full Body" },
    { id: Split.UpperLower, label: "Upper / Lower" },
    { id: Split.PPL, label: "Push / Pull / Legs" },
  ];
  [];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => {}} style={styles.backButton}>
          <ArrowLeft size={24} color="#9CA3AF" />
        </Pressable>

        <Text style={styles.title}>Workout Settings</Text>
        <Text style={styles.subtitle}>Customize your workout plan</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
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
        <Pressable style={styles.generateButton} onPress={() => {}}>
          <Sparkles size={22} color="white" />
          <Text style={styles.generateText}>Generate Workout</Text>
        </Pressable>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 24,
    paddingBottom: 32,
  },
  backButton: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    color: Colors.textPrimary,
  },
  subtitle: {
    marginTop: 8,
    color: Colors.textSecondary,
    fontSize: 16,
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
  optionLarge: {
    width: "100%",
    paddingVertical: 20,
    borderRadius: 16,
    backgroundColor: Colors.surface,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  optionActive: {
    backgroundColor: Colors.training,
  },
  optionText: {
    color: Colors.textSecondary,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  optionTextActive: {
    color: Colors.textPrimary,
  },
  daysGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 4,
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
  },
  generateButton: {
    backgroundColor: Colors.training,
    paddingVertical: 20,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  generateText: {
    color: "#F9FAFB",
    fontWeight: "600",
    fontSize: 16,
  },
});
