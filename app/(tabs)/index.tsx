import { useEffect, useState } from "react";
import { Button, View } from "react-native";
import { Exercise } from "../types";
import { ExeriseCard } from "./components/ExerciseCard";
import { getExercise } from "./utils";

export default function HomeScreen() {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    console.log(exercises);
  }, [exercises]);

  return (
    <View>
      <Button
        title="press me"
        onPress={() => setExercises(getExercise())}
      ></Button>
      {exercises.length > 0 &&
        exercises.map((ex) => {
          return <ExeriseCard exercise={ex} key={ex.id} />;
        })}
    </View>
  );
}
