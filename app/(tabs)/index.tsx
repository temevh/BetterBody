import { useEffect, useState } from "react";
import { Button, ScrollView, View } from "react-native";
import { Exercise } from "../types";
import { ExeriseCard } from "./components/ExerciseCard";
import { getExercise } from "./utils";

export default function HomeScreen() {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    console.log(exercises);
  }, [exercises]);

  return (
    <View style={{ flex: 1 }}>
      <Button
        title="press me"
        onPress={() => setExercises(getExercise())}
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
