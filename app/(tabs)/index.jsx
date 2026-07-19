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

const Dashboard = () => {
  return (
    <ScrollView style={styles.container}>

      {/* Header */}

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/(drawer)/camera")}>
          <Ionicons name="menu" size={30} color="black" />
        </TouchableOpacity>

        <Text style={styles.heading}>Smart Survey</Text>

        <Ionicons name="person-circle" size={35} color="#2563EB" />
      </View>

      {/* Welcome */}

      <Text style={styles.welcome}>Good Morning 👋</Text>

      <Text style={styles.name}>Dhruva Tajapara</Text>

      {/* Survey Count */}

      <View style={styles.countCard}>
        <Text style={styles.countTitle}>Today's Surveys</Text>

        <Text style={styles.count}>12</Text>
      </View>

      {/* Quick Actions */}

      <Text style={styles.section}>Quick Actions</Text>

      <View style={styles.row}>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/(tabs)/survey")}
        >
          <Ionicons name="document-text" size={40} color="#2563EB" />
          <Text>Survey</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/(drawer)/camera")}
        >
          <Ionicons name="camera" size={40} color="#2563EB" />
          <Text>Camera</Text>
        </TouchableOpacity>

      </View>

      <View style={styles.row}>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/(drawer)/location")}
        >
          <Ionicons name="location" size={40} color="#2563EB" />
          <Text>Location</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/(drawer)/contacts")}
        >
          <Ionicons name="people" size={40} color="#2563EB" />
          <Text>Contacts</Text>
        </TouchableOpacity>

      </View>

      {/* Recent Survey */}

      <Text style={styles.section}>Recent Survey</Text>

      <View style={styles.recentCard}>
        <Text>🏢 Site : ABC Company</Text>

        <Text>👤 Client : John</Text>

        <Text>🔥 Priority : High</Text>
      </View>

    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
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
    color: "gray",
  },

  name: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  countCard: {
    backgroundColor: "#2563EB",
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
    backgroundColor: "white",
    width: "48%",
    alignItems: "center",
    padding: 25,
    borderRadius: 15,
    elevation: 3,
  },

  recentCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
    elevation: 3,
  },
});