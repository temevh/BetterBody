import { GlobalStyles } from "@/app/_styles";
import { Colors } from "@/app/_theme";
import { Exercise } from "@/app/_types";
import { X } from "lucide-react-native";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";

interface ExerciseInfoModalProps {
  exercise: Exercise;
  visible: boolean;
  onClose: () => void;
}

export default function ExerciseInfoModal({
  exercise,
  visible,
  onClose,
}: ExerciseInfoModalProps) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <View
          style={{
            backgroundColor: Colors.background,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 24,
            height: "80%",
          }}
        >
          <View
            style={[
              GlobalStyles.row,
              { justifyContent: "space-between", marginBottom: 16 },
            ]}
          >
            <Text style={GlobalStyles.title}>{exercise.name}</Text>
            <Pressable onPress={onClose}>
              <X color={Colors.textPrimary} size={24} />
            </Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={[
                GlobalStyles.row,
                { flexWrap: "wrap", gap: 8, marginBottom: 16 },
              ]}
            >
              {[
                exercise.level,
                exercise.mechanic,
                exercise.equipment,
                exercise.force,
              ]
                .filter(Boolean)
                .map((tag, index) => (
                  <View
                    key={index}
                    style={{
                      backgroundColor: Colors.surface,
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 16,
                    }}
                  >
                    <Text style={{ color: Colors.textSecondary, fontSize: 12 }}>
                      {tag?.toUpperCase()}
                    </Text>
                  </View>
                ))}
            </View>

            <View style={{ marginBottom: 16 }}>
              <Text style={[GlobalStyles.textLarge, { marginBottom: 8 }]}>
                Muscles
              </Text>
              <Text style={GlobalStyles.text}>
                Primary:{" "}
                <Text style={{ color: Colors.primary }}>
                  {exercise.primary_muscles.join(", ").toUpperCase()}
                </Text>
              </Text>
              {exercise.secondary_muscles.length > 0 && (
                <Text style={GlobalStyles.text}>
                  Secondary:{" "}
                  <Text style={{ color: Colors.secondary }}>
                    {exercise.secondary_muscles.join(", ").toUpperCase()}
                  </Text>
                </Text>
              )}
            </View>

            <View style={{ marginBottom: 24 }}>
              <Text style={[GlobalStyles.textLarge, { marginBottom: 8 }]}>
                Instructions
              </Text>
              {exercise.instructions.map((instruction, index) => (
                <View
                  key={index}
                  style={[
                    GlobalStyles.row,
                    { alignItems: "flex-start", marginBottom: 8, gap: 12 },
                  ]}
                >
                  <View style={GlobalStyles.smallIconButton}>
                    <Text
                      style={[GlobalStyles.text, { alignContent: "center" }]}
                    >
                      {index + 1}
                    </Text>
                  </View>
                  <Text
                    style={[
                      GlobalStyles.text,
                      { color: Colors.textSecondary, flex: 1 },
                    ]}
                  >
                    {instruction}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
