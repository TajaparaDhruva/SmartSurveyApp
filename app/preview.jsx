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

const Preview = () => {
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

    router.replace("/(tabs)/history");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Survey Preview</Text>

      <Image
        source={{ uri: survey.photo }}
        style={styles.image}
      />

      <View style={styles.card}>
        <Text style={styles.label}>Site Name</Text>
        <Text style={styles.value}>{survey.siteName}</Text>

        <Text style={styles.label}>Client Name</Text>
        <Text style={styles.value}>{survey.clientName}</Text>

        <Text style={styles.label}>Description</Text>
        <Text style={styles.value}>{survey.description}</Text>

        <Text style={styles.label}>Priority</Text>
        <Text style={styles.value}>{survey.priority}</Text>

        <Text style={styles.label}>Date</Text>
        <Text style={styles.value}>{survey.date}</Text>

        <Text style={styles.label}>Location</Text>
        <Text style={styles.value}>{survey.location}</Text>

        <Text style={styles.label}>Contact</Text>
        <Text style={styles.value}>{survey.contact}</Text>

        <Text style={styles.label}>Notes</Text>
        <Text style={styles.value}>{survey.notes}</Text>
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
    backgroundColor: "#F5F7FA",
    padding: 20,
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  image: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
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