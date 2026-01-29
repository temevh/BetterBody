import { Level } from "@/app/types";
import { Button } from "react-native";

export const SelectionCard = ({
  option,
  onPress,
}: {
  option: Level;
  onPress: () => void;
}) => {
  return <Button title={option} onPress={onPress} />;
};
