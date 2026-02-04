import { Exercise, Goal, Level, Split } from "@/app/types";
import { useState } from "react";
import { Generator } from "./Generator";
import { Settings } from "./Settings";
import { Workout } from "./Workout";

export default function TrainingScreen() {
  const [settings, setSettings] = useState({
    level: Level.Beginner,
    split: Split.FullBody,
    daysPerWeek: 3,
    goal: Goal.Muscle,
  });

  const [generated, setGenerated] = useState(false);
  const [workout, setWorkout] = useState<Exercise[]>([]);

  const onGenerate = () => {
    console.log(settings);
    setGenerated(true);
  };

  if (workout.length > 0) {
    return <Workout workout={workout} />;
  }

  if (generated) {
    return <Generator settings={settings} setWorkout={setWorkout} />;
  }

  return (
    <Settings
      settings={settings}
      setSettings={setSettings}
      onGenerate={onGenerate}
    />
  );
}
