import { Goal, Level, Split, WorkoutType } from "@/app/_types";
import { useState } from "react";
import TrainingMenu from "./_components/TrainingMenu";
import ExerciseList from "./ExerciseList";
import Generator from "./Generator";
import History from "./History";
import SavedWorkouts from "./SavedWorkouts";
import Settings from "./Settings";
import Workout from "./Workout";

type ViewState = "menu" | "new" | "history" | "saved" | "exercises";

export default function TrainingScreen() {
  const [view, setView] = useState<ViewState>("menu");
  const [settings, setSettings] = useState({
    level: Level.Beginner,
    split: Split.FullBody,
    daysPerWeek: 3,
    goal: Goal.Muscle,
  });

  const [generated, setGenerated] = useState(false);
  const [workout, setWorkout] = useState<WorkoutType>({
    exercises: [],
    name: "",
    notes: "",
  });

  const onGenerate = () => {
    setGenerated(true);
  };

  if (workout.exercises.length > 0) {
    return <Workout workout={workout} />;
  }

  if (view === "history") {
    return <History onBack={() => setView("menu")} />;
  }

  if (view === "saved") {
    return <SavedWorkouts onBack={() => setView("menu")} />;
  }

  if (view === "exercises") {
    return <ExerciseList onBack={() => setView("menu")} />;
  }

  if (view === "new") {
    if (generated) {
      return <Generator settings={settings} setWorkout={setWorkout} />;
    }
    return (
      <Settings
        settings={settings}
        setSettings={setSettings}
        onGenerate={onGenerate}
        onBack={() => setView("menu")}
      />
    );
  }

  return <TrainingMenu onSelect={setView} />;
}
