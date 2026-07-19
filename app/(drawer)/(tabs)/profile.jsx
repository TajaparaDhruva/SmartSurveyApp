import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { useTheme } from "../../../context/ThemeContext";

const Profile = () => {
  const { theme } = useTheme();

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

      <Text style={[styles.name, { color: theme.colors.text }]}>
        Dhruva Tajapara
      </Text>

      <Text style={[styles.detail, { color: theme.colors.subtext }]}>
        🎓 Computer Engineering Student
      </Text>

      <Text style={[styles.detail, { color: theme.colors.subtext }]}>
        🏫 Swaminarayan University
      </Text>

      <Text style={[styles.detail, { color: theme.colors.subtext }]}>
        📧 dhruva@gmail.com
      </Text>

      <Text style={[styles.detail, { color: theme.colors.subtext }]}>
        📱 +91 9876543210
      </Text>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>
          Logout
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  name: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  detail: {
    fontSize: 18,
    marginBottom: 12,
  },

  logoutButton: {
    marginTop: 40,
    backgroundColor: "#EF4444",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
