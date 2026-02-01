import { Level, Split } from "@/app/types";
import { useState } from "react";
import { Settings } from "./Settings";

export default function TrainingScreen() {
  const [settings, setSettings] = useState({
    level: Level.Beginner,
    split: Split.FullBody,
    daysPerWeek: 3,
  });

  const onGenerate = () => {
    console.log(settings);
  };

  return (
    <Settings
      settings={settings}
      setSettings={setSettings}
      onGenerate={onGenerate}
    />
  );
}
