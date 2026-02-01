import { StyleSheet, Text, View } from "react-native";

export const SectionCard = ({ section }: { section: string }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>{section}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 220,
    height: 30,
    backgroundColor: "red",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 22,
  },
});
