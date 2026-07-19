import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { useTheme } from "../context/ThemeContext";

const Preview = () => {
  const { theme } = useTheme();
  const survey = {
    siteName: "ABC Company",
    clientName: "John Doe",
    description: "Site inspection completed successfully.",
    priority: "High",
    date: "20 July 2026",
    location: "23.0225, 72.5714",
    contact: "+91 9876543210",
    notes: "Everything is working properly.",
    photo: "https://picsum.photos/300",
  };

  const handleSubmit = () => {
    Alert.alert(
      "Survey Submitted",
      "Your survey has been submitted successfully."
    );

    router.replace("/(drawer)/(tabs)/history");
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.heading, { color: theme.colors.text }]}>Survey Preview</Text>

      <Image
        source={{ uri: survey.photo }}
        style={styles.image}
      />

      <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
        <Text style={styles.label}>Site Name</Text>
        <Text style={[styles.value, { color: theme.colors.text }]}>{survey.siteName}</Text>

        <Text style={styles.label}>Client Name</Text>
        <Text style={[styles.value, { color: theme.colors.text }]}>{survey.clientName}</Text>

        <Text style={styles.label}>Description</Text>
        <Text style={[styles.value, { color: theme.colors.text }]}>{survey.description}</Text>

        <Text style={styles.label}>Priority</Text>
        <Text style={[styles.value, { color: theme.colors.text }]}>{survey.priority}</Text>

        <Text style={styles.label}>Date</Text>
        <Text style={[styles.value, { color: theme.colors.text }]}>{survey.date}</Text>

        <Text style={styles.label}>Location</Text>
        <Text style={[styles.value, { color: theme.colors.text }]}>{survey.location}</Text>

        <Text style={styles.label}>Contact</Text>
        <Text style={[styles.value, { color: theme.colors.text }]}>{survey.contact}</Text>

        <Text style={styles.label}>Notes</Text>
        <Text style={[styles.value, { color: theme.colors.text }]}>{survey.notes}</Text>
      </View>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>Edit Survey</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Submit Survey</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Preview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  image: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 20,
  },

  card: {
    padding: 15,
    borderRadius: 12,
    elevation: 3,
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    color: "#2563EB",
  },

  value: {
    fontSize: 16,
    marginTop: 5,
  },

  editButton: {
    backgroundColor: "#F59E0B",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },

  submitButton: {
    backgroundColor: "#22C55E",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});