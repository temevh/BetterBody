import { SelectionCard } from "@/app/components/SelectionCard";
import { Exercise, Force, Level, Split } from "@/app/types";
import { useState } from "react";
import { Button, ScrollView, StyleSheet, View } from "react-native";
import { getExercise } from "../utils";
import { ExeriseCard } from "./ExerciseCard";

export default function TrainingScreen() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [level, setLevel] = useState<Level>(Level.Beginner);
  const [force, setForce] = useState<Force>(Force.Static);
  const [split, setSplit] = useState<Split>(Split.FullBody);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.metaRow}>
        {Object.values(Level).map((lvl) => (
          <SelectionCard
            key={lvl}
            option={lvl}
            onPress={() => setLevel(lvl)}
            selected={lvl === level}
          />
        ))}
      </View>
      {/* 
      <View style={styles.metaRow}>
        {Object.values(Force).map((fc) => (
          <SelectionCard
            key={fc}
            option={fc}
            onPress={() => setForce(fc)}
            selected={fc === force}
          />
        ))}
      </View>
          */}
      <View style={styles.metaRow}>
        {Object.values(Split).map((sp) => (
          <SelectionCard
            key={sp}
            option={sp}
            onPress={() => setSplit(sp)}
            selected={sp === split}
          />
        ))}
      </View>
      <Button
        title="Generate"
        onPress={() => setExercises(getExercise(level, force))}
      ></Button>
      <ScrollView>
        {exercises.length > 0 &&
          exercises.map((ex) => {
            return <ExeriseCard exercise={ex} key={ex.id} />;
          })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  metaRow: {
    justifyContent: "center",
    gap: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
    margin: 12,
  },
});
