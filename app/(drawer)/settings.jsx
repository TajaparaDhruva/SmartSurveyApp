import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Switch,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "../../context/ThemeContext";

const Settings = () => {
  const router = useRouter();
  const { isDarkMode, toggleDarkMode, theme } = useTheme();
  const [notification, setNotification] = useState(true);


  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={[styles.heading, { color: theme.colors.text }]}>Settings</Text>

      <Text style={[styles.sectionHeading, { color: theme.colors.text }]}>Preferences</Text>

      {/* Dark Mode */}
      <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
        <View style={styles.cardLeft}>
          <View style={[styles.iconBox, { backgroundColor: isDarkMode ? "rgba(245, 158, 11, 0.2)" : theme.colors.primaryLight }]}>
            <Ionicons
              name={isDarkMode ? "moon" : "sunny"}
              size={20}
              color={isDarkMode ? "#F59E0B" : theme.colors.primary}
            />
          </View>
          <Text style={[styles.text, { color: theme.colors.text }]}>Dark Mode</Text>
        </View>

        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          trackColor={{ false: "#CBD5E1", true: theme.colors.primary }}
          thumbColor={isDarkMode ? "#FFFFFF" : "#F8FAFC"}
        />
      </View>

      {/* Notifications */}
      <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
        <View style={styles.cardLeft}>
          <View style={[styles.iconBox, { backgroundColor: theme.colors.successLight }]}>
            <Ionicons name="notifications" size={20} color={theme.colors.success} />
          </View>
          <Text style={[styles.text, { color: theme.colors.text }]}>Notifications</Text>
        </View>

        <Switch
          value={notification}
          onValueChange={setNotification}
          trackColor={{ false: "#CBD5E1", true: theme.colors.primary }}
          thumbColor={notification ? "#FFFFFF" : "#F8FAFC"}
        />
      </View>

      <Text style={[styles.sectionHeading, { color: theme.colors.text, marginTop: 14 }]}>About</Text>



      {/* Version Card */}
      <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
        <View style={styles.cardLeft}>
          <View style={[styles.iconBox, { backgroundColor: "rgba(100, 116, 139, 0.1)" }]}>
            <Ionicons name="code-working" size={20} color={theme.colors.subtext} />
          </View>
          <View>
            <Text style={[styles.text, { color: theme.colors.text }]}>App Version</Text>
            <Text style={[styles.subText, { color: theme.colors.subtext }]}>1.0.0 (Expo SDK 54)</Text>
          </View>
        </View>
      </View>

      {/* Log Out Button */}
      <TouchableOpacity
        style={[
          styles.card,
          {
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.dangerLight || theme.colors.border,
            marginTop: 10,
          },
        ]}
        activeOpacity={0.7}
        onPress={() => router.replace("/login")}
      >
        <View style={styles.cardLeft}>
          <View style={[styles.iconBox, { backgroundColor: theme.colors.dangerLight || "rgba(239, 68, 68, 0.15)" }]}>
            <Ionicons name="log-out" size={20} color={theme.colors.danger || "#EF4444"} />
          </View>
          <Text style={[styles.text, { color: theme.colors.danger || "#EF4444", fontWeight: "700" }]}>
            Log Out
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={theme.colors.subtext} />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  card: {
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  subText: {
    fontSize: 12,
    marginTop: 2,
  },
});