import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { useTheme } from "../../../context/ThemeContext";

const Dashboard = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>

      {/* Header */}

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Ionicons name="menu" size={30} color={theme.colors.text} />
        </TouchableOpacity>

        <Text style={[styles.heading, { color: theme.colors.text }]}>Smart Survey</Text>

        <Ionicons name="person-circle" size={35} color={theme.colors.primary} />
      </View>

      {/* Welcome */}

      <Text style={[styles.welcome, { color: theme.colors.subtext }]}>Good Morning 👋</Text>

      <Text style={[styles.name, { color: theme.colors.text }]}>Dhruva Tajapara</Text>

      {/* Survey Count */}

      <View style={[styles.countCard, { backgroundColor: theme.colors.primary }]}>
        <Text style={styles.countTitle}>Today's Surveys</Text>

        <Text style={styles.count}>12</Text>
      </View>

      {/* Quick Actions */}

      <Text style={[styles.section, { color: theme.colors.text }]}>Quick Actions</Text>

      <View style={styles.row}>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: theme.colors.card }]}
          onPress={() => router.push("/(drawer)/(tabs)/survey")}
        >
          <Ionicons name="document-text" size={40} color={theme.colors.primary} />
          <Text style={{ color: theme.colors.text, marginTop: 8 }}>Survey</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: theme.colors.card }]}
          onPress={() => router.push("/(drawer)/camera")}
        >
          <Ionicons name="camera" size={40} color={theme.colors.primary} />
          <Text style={{ color: theme.colors.text, marginTop: 8 }}>Camera</Text>
        </TouchableOpacity>

      </View>

      <View style={styles.row}>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: theme.colors.card }]}
          onPress={() => router.push("/(drawer)/location")}
        >
          <Ionicons name="location" size={40} color={theme.colors.primary} />
          <Text style={{ color: theme.colors.text, marginTop: 8 }}>Location</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: theme.colors.card }]}
          onPress={() => router.push("/(drawer)/contacts")}
        >
          <Ionicons name="people" size={40} color={theme.colors.primary} />
          <Text style={{ color: theme.colors.text, marginTop: 8 }}>Contacts</Text>
        </TouchableOpacity>

      </View>

      {/* Recent Survey */}

      <Text style={[styles.section, { color: theme.colors.text }]}>Recent Survey</Text>

      <View style={[styles.recentCard, { backgroundColor: theme.colors.card }]}>
        <Text style={{ color: theme.colors.text, marginBottom: 6 }}>🏢 Site : ABC Company</Text>

        <Text style={{ color: theme.colors.text, marginBottom: 6 }}>👤 Client : John</Text>

        <Text style={{ color: theme.colors.text }}>🔥 Priority : High</Text>
      </View>

    </ScrollView>
  );
};

export default Dashboard;

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
  },

  heading: {
    fontSize: 22,
    fontWeight: "bold",
  },

  welcome: {
    fontSize: 18,
    marginTop: 20,
  },

  name: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  countCard: {
    padding: 25,
    borderRadius: 15,
  },

  countTitle: {
    color: "white",
    fontSize: 18,
  },

  count: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 10,
  },

  section: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 15,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  card: {
    width: "48%",
    alignItems: "center",
    padding: 25,
    borderRadius: 15,
    elevation: 3,
  },

  recentCard: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
    elevation: 3,
  },
});
