import { supabase } from "@/utils/supabase";
import { useRouter } from "expo-router";
import {
  Activity,
  ChartNoAxesColumn,
  Dumbbell,
  Utensils,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { SectionCard } from "../_components/SectionCard";
import { GlobalStyles } from "../_styles";
import { Colors } from "../_theme";
import Auth from "./onboarding/Auth";

const sections = [
  { name: "Training", icon: Dumbbell, route: "/(tabs)/training" },
  { name: "Meals", icon: Utensils, route: "/(tabs)/meals" },
  { name: "Stretching", icon: Activity, route: "/(tabs)/stretching" },
  { name: "Metrics", icon: ChartNoAxesColumn, route: "/(tabs)/metrics" },
] as const;

export default function HomeScreen() {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    console.log(session);
  }, []);

  if (!session) return <Auth />;

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) console.error(error);
  }

  return (
    <View style={styles.container}>
      {sections.map((section) => (
        <View key={section.name} style={styles.item}>
          <SectionCard
            section={section.name}
            Icon={section.icon}
            onPress={() => router.push(section.route as any)}
          />
        </View>
      ))}
      <Pressable
        onPress={signOut}
        style={[GlobalStyles.button, { backgroundColor: Colors.cancel }]}
      >
        Sign out
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    justifyContent: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    paddingHorizontal: 20,
  },
  item: {
    width: "47%", // slightly less than 50% to account for gap
    alignItems: "center",
    marginBottom: 10,
  },
});
