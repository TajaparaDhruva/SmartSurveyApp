import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Switch,
  TouchableOpacity,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { useTheme } from "../../context/ThemeContext";

const Settings = () => {
  const { isDarkMode, toggleDarkMode, theme } = useTheme();
  const [notification, setNotification] = useState(true);

  const handleAbout = () => {
    Alert.alert(
      "Smart Survey App",
      "Version 1.0.0\n\nDeveloped using React Native Expo SDK 54."
    );
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: () => router.replace("/login"),
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.heading, { color: theme.colors.text }]}>Settings</Text>

      <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.text, { color: theme.colors.text }]}>Dark Mode</Text>

        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          trackColor={{ false: "#767577", true: theme.colors.primary }}
          thumbColor={isDarkMode ? "#FFFFFF" : "#f4f3f4"}
        />
      </View>

      <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.text, { color: theme.colors.text }]}>Notifications</Text>

        <Switch
          value={notification}
          onValueChange={setNotification}
          trackColor={{ false: "#767577", true: theme.colors.primary }}
        />
      </View>

      <TouchableOpacity
        style={[styles.card, { backgroundColor: theme.colors.card }]}
        onPress={handleAbout}
      >
        <Text style={[styles.text, { color: theme.colors.text }]}>About App</Text>
      </TouchableOpacity>

      <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.text, { color: theme.colors.text }]}>
          App Version : 1.0.0
        </Text>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
  },

  card: {
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  text: {
    fontSize: 18,
    fontWeight: "500",
  },

  logoutButton: {
    backgroundColor: "#EF4444",
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    alignItems: "center",
  },

  logoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});