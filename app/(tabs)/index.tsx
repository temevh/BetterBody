import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SectionCard } from "../components/SectionCard";

const sections = ["Training", "Meals", "Stretching", "Metrics"] as const;

const sectionRoutes = {
  Training: "/(tabs)/training",
  Meals: "/(tabs)/meals",
  Stretching: "/(tabs)/stretching",
  Metrics: "/(tabs)/metrics",
} as const;

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {sections.map((section) => (
        <View key={section} style={styles.item}>
          <SectionCard
            section={section}
            onPress={() => router.push(sectionRoutes[section])}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  item: {
    width: "50%",
    alignItems: "center",
    marginBottom: 30,
  },
});
