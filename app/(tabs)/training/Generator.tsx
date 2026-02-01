/*import { Exercise } from "@/app/types";
import { ArrowLeft, Check, Dumbbell, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { View } from "react-native";

export function WorkoutGenerator() {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const generateExercises = () => {
    const exercisesPerDay =
      settings.goal === "strength" ? 4 : settings.goal === "muscle" ? 5 : 4;
    const selectedMuscles = muscleGroups.slice(
      0,
      Math.min(exercisesPerDay, muscleGroups.length),
    );

    const newExercises: Exercise[] = selectedMuscles.map((muscle, index) => {
      const muscleExercises =
        exerciseDatabase[muscle as keyof typeof exerciseDatabase];
      const randomExercise =
        muscleExercises[Math.floor(Math.random() * muscleExercises.length)];
      const reps = randomExercise[settings.difficulty];

      return {
        id: `${muscle}-${index}-${Date.now()}`,
        name: randomExercise.name,
        muscle: muscle.charAt(0).toUpperCase() + muscle.slice(1),
        equipment: randomExercise.equipment,
        sets: parseInt(reps.split("x")[0]),
        reps: reps.split("x")[1],
        selected: false,
      };
    });

    setExercises(newExercises);
  };

  const rerollExercise = (muscle: string) => {
    const muscleExercises =
      exerciseDatabase[muscle.toLowerCase() as keyof typeof exerciseDatabase];
    const currentExercise = exercises.find((ex) => ex.muscle === muscle);
    const availableExercises = muscleExercises.filter(
      (ex) => ex.name !== currentExercise?.name,
    );
    const randomExercise =
      availableExercises[Math.floor(Math.random() * availableExercises.length)];
    const reps = randomExercise[settings.difficulty];

    setExercises(
      exercises.map((ex) =>
        ex.muscle === muscle
          ? {
              ...ex,
              id: `${muscle.toLowerCase()}-${Date.now()}`,
              name: randomExercise.name,
              equipment: randomExercise.equipment,
              sets: parseInt(reps.split("x")[0]),
              reps: reps.split("x")[1],
            }
          : ex,
      ),
    );
  };

  const toggleSelect = (id: string) => {
    setExercises(
      exercises.map((ex) =>
        ex.id === id ? { ...ex, selected: !ex.selected } : ex,
      ),
    );
  };

  useEffect(() => {
    generateExercises();
  }, []);

  const getMuscleColor = (muscle: string) => {
    const colors: { [key: string]: string } = {
      Chest: "bg-blue-500",
      Back: "bg-emerald-500",
      Legs: "bg-purple-500",
      Shoulders: "bg-orange-500",
      Arms: "bg-pink-500",
      Core: "bg-amber-500",
    };
    return colors[muscle] || "bg-neutral-700";
  };
    
  return (
    <View className="flex flex-col min-h-screen bg-neutral-900">
      {/* Header *
      <View className="p-6 pb-4">
        <button
          onClick={onBack}
          className="mb-6 text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-6 h-6" strokeWidth={2} />
        </button>
        <h1 className="text-3xl text-white mb-2">Your Workout</h1>
        <View className="flex items-center gap-4 text-sm text-neutral-400">
          <span className="capitalize">{settings.difficulty}</span>
          <span>•</span>
          <span className="capitalize">
            {settings.goal === "muscle"
              ? "Muscle Building"
              : settings.goal === "strength"
                ? "Strength"
                : "Fitness"}
          </span>
          <span>•</span>
          <span>{settings.daysPerWeek}x/week</span>
        </View>
      </View>

      {/* Exercise Cards *
      <View className="flex-1 px-6 pb-6 space-y-3 overflow-auto">
        {exercises.map((exercise) => (
          <View
            key={exercise.id}
            className={`rounded-2xl overflow-hidden transition-all ${
              exercise.selected
                ? getMuscleColor(exercise.muscle)
                : "bg-neutral-800"
            }`}
          >
            <View className="p-5">
              <View className="flex items-start justify-between mb-4">
                <View className="flex-1">
                  <View className="flex items-center gap-2 mb-2">
                    <View
                      className={`w-2 h-2 rounded-full ${exercise.selected ? "bg-white/30" : getMuscleColor(exercise.muscle)}`}
                    ></View>
                    <span
                      className={`text-xs uppercase tracking-wide ${exercise.selected ? "text-white/70" : "text-neutral-400"}`}
                    >
                      {exercise.muscle}
                    </span>
                  </View>
                  <h3
                    className={`text-xl mb-2 ${exercise.selected ? "text-white" : "text-white"}`}
                  >
                    {exercise.name}
                  </h3>
                  <View
                    className={`flex items-center gap-2 mb-3 ${exercise.selected ? "text-white/70" : "text-neutral-400"}`}
                  >
                    <Dumbbell className="w-4 h-4" strokeWidth={2} />
                    <span className="text-sm">{exercise.equipment}</span>
                  </View>
                  <View
                    className={`text-lg ${exercise.selected ? "text-white" : "text-white"}`}
                  >
                    {exercise.sets} sets × {exercise.reps} reps
                  </View>
                </View>
                <View className="flex flex-col gap-2">
                  <button
                    onClick={() => toggleSelect(exercise.id)}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                      exercise.selected
                        ? "bg-white/20 text-white"
                        : "bg-neutral-700 text-neutral-400 hover:bg-neutral-600"
                    }`}
                  >
                    <Check className="w-6 h-6" strokeWidth={2.5} />
                  </button>
                  <button
                    onClick={() => rerollExercise(exercise.muscle)}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                      exercise.selected
                        ? "bg-white/20 text-white hover:bg-white/30"
                        : "bg-neutral-700 text-neutral-400 hover:bg-neutral-600"
                    }`}
                  >
                    <RefreshCw className="w-5 h-5" strokeWidth={2} />
                  </button>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Regenerate All Button 
      <View className="p-6 bg-gradient-to-t from-neutral-900 via-neutral-900 to-transparent">
        <button
          onClick={generateExercises}
          className="w-full bg-orange-500 text-white py-5 rounded-2xl flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors"
        >
          <RefreshCw className="w-6 h-6" strokeWidth={2} />
          <span>Regenerate All</span>
        </button>
      </View>
    </View>
  );
}*/
