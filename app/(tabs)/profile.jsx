import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";

const Profile = () => {
  const navigation = useNavigation();
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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Ionicons name="menu" size={30} color={theme.colors.text} />
        </TouchableOpacity>

        <Text style={[styles.heading, { color: theme.colors.text }]}>My Profile</Text>

        <Ionicons name="person-circle" size={35} color={theme.colors.primary} />
      </View>

      <View style={styles.body}>
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

    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },

  heading: {
    fontSize: 22,
    fontWeight: "bold",
  },

  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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