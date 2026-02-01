import { Goal, Level, Split } from "@/app/types";
import { useState } from "react";
import { Generator } from "./Generator";
import { Settings } from "./Settings";

export default function TrainingScreen() {
  const [settings, setSettings] = useState({
    level: Level.Beginner,
    split: Split.FullBody,
    daysPerWeek: 3,
    goal: Goal.Muscle,
  });

  const [generated, setGenerated] = useState(false);

  const onGenerate = () => {
    console.log(settings);
    setGenerated(true);
  };

  return (
    <>
      {!generated ? (
        <Settings
          settings={settings}
          setSettings={setSettings}
          onGenerate={onGenerate}
        />
      ) : (
        <Generator settings={settings} />
      )}
    </>
  );
}
