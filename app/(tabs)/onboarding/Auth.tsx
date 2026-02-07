import { GlobalStyles } from "@/app/_styles";
import { Colors } from "@/app/_theme";
import { supabase } from "@/utils/supabase";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
    if (!error) router.replace("/");
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session && !error)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
    if (!error && session) router.replace("/");
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[GlobalStyles.container, { padding: 24 }]}
    >
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View style={{ marginBottom: 40, alignItems: "center" }}>
          <Text style={GlobalStyles.title}>BetterBody</Text>
          <Text style={GlobalStyles.text}>Sign in to start your training</Text>
        </View>

        <View style={styles.verticallySpaced}>
          <TextInput
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="Email"
            placeholderTextColor={Colors.textSecondary}
            autoCapitalize="none"
            style={[GlobalStyles.textInput, styles.input]}
          />
        </View>

        <View style={styles.verticallySpaced}>
          <TextInput
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
            placeholderTextColor={Colors.textSecondary}
            autoCapitalize="none"
            style={[GlobalStyles.textInput, styles.input]}
          />
        </View>
      </View>

      <View style={{ paddingBottom: 20 }}>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <TouchableOpacity
            style={[
              GlobalStyles.button,
              { backgroundColor: Colors.training, width: "100%" },
              loading && styles.buttonDisabled,
            ]}
            onPress={() => signInWithEmail()}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={Colors.textPrimary} />
            ) : (
              <Text style={GlobalStyles.buttonText}>Sign in</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.verticallySpaced}>
          <TouchableOpacity
            style={[
              GlobalStyles.button,
              { backgroundColor: Colors.surface, width: "100%" },
              loading && styles.buttonDisabled,
            ]}
            onPress={() => signUpWithEmail()}
            disabled={loading}
          >
            <Text style={GlobalStyles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
    marginBottom: 12,
  },
  mt20: {
    marginTop: 20,
  },
  input: {
    textAlign: "left",
    fontSize: 24,
    padding: 16,
    fontWeight: "bold",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});
