import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { useTheme } from "../context/ThemeContext";

const Login = () => {
  const { theme } = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "" || password === "") {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    router.replace("/(drawer)");
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={styles.logo}>📋</Text>

      <Text style={[styles.title, { color: theme.colors.text }]}>Smart Survey App</Text>

      <Text style={[styles.subtitle, { color: theme.colors.subtext }]}>Welcome Back</Text>

      <TextInput
        placeholder="Username"
        placeholderTextColor={theme.colors.subtext}
        style={[styles.input, { backgroundColor: theme.colors.inputBg, color: theme.colors.text, borderColor: theme.colors.border }]}
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor={theme.colors.subtext}
        secureTextEntry
        style={[styles.input, { backgroundColor: theme.colors.inputBg, color: theme.colors.text, borderColor: theme.colors.border }]}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.primary }]} onPress={handleLogin}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
  },

  logo: {
    fontSize: 70,
    textAlign: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },

  subtitle: {
    textAlign: "center",
    marginBottom: 30,
    fontSize: 16,
  },

  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },

  button: {
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },

  btnText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});