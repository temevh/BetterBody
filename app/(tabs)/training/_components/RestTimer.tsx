import { GlobalStyles } from "@/app/_styles";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

const RestTimer = ({
  duration,
  onCancel,
}: {
  duration: number;
  onCancel: () => void;
}) => {
  const [time, setTime] = useState<number>(duration);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onCancel();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <View
      style={[GlobalStyles.card, { paddingHorizontal: 20, paddingVertical: 6 }]}
    >
      <Text style={GlobalStyles.subHeaderText}>Rest</Text>
      <Text style={GlobalStyles.textLarge}>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </Text>
    </View>
  );
};

export default RestTimer;
