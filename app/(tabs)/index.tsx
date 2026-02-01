import { View } from "react-native";
import { SectionCard } from "../components/SectionCard";

const sections = ["Fitness", "Meals", "Stretching", "Metrics"];

export default function HomeScreen() {
  return (
    <View>
      {sections.map((section) => (
        <SectionCard key={section} section={section} />
      ))}
    </View>
  );
}
