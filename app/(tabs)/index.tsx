import { useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, View } from "react-native";
import { Exercise, Level } from "../types";
import { ExeriseCard } from "./components/ExerciseCard";
import { SelectionCard } from "./components/SelectionCard";
import { getExercise } from "./utils";

export default function HomeScreen() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [level, setLevel] = useState<Level>(Level.Beginner);

  useEffect(() => {
    console.log(exercises);
  }, [exercises]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.metaRow}>
        {Object.values(Level).map((lvl) => (
          <SelectionCard key={lvl} option={lvl} onPress={() => setLevel(lvl)} />
        ))}
      </View>
      <Button
        title="Generate"
        onPress={() => setExercises(getExercise(level))}
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
