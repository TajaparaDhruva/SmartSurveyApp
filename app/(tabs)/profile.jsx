import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { router } from "expo-router";

const Profile = () => {

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
    <View style={styles.container}>

      <Text style={styles.name}>
        Dhruva Tajapara
      </Text>

      <Text style={styles.detail}>
        🎓 Computer Engineering Student
      </Text>

      <Text style={styles.detail}>
        🏫 Swaminarayan University
      </Text>

      <Text style={styles.detail}>
        📧 dhruva@gmail.com
      </Text>

      <Text style={styles.detail}>
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
    backgroundColor: "#F5F7FA",
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
    color: "#555",
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