import { StyleSheet } from "react-native";
import { Colors } from "./theme";

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  text: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  textLarge: {
    color: Colors.textPrimary,
    fontSize: 22,
    fontWeight: "bold",
    flex: 1,
  },
  subHeaderText: {
    color: Colors.textSecondary,
    fontSize: 14,
    fontWeight: "500",
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  card: {
    marginHorizontal: 12,
    borderRadius: 20,
    marginBottom: 8,
    backgroundColor: Colors.surface,
  },
  cardContent: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textSecondary: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  smallIconButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: Colors.surfaceHighlight,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: "600",
  },
  textInput: {
    flex: 1,
    height: 36,
    backgroundColor: Colors.surfaceHighlight,
    borderRadius: 8,
    textAlign: "center",
    color: Colors.textPrimary,
    fontSize: 16,
  },
});
