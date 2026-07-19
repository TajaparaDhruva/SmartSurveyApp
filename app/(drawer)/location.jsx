import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import * as Clipboard from "expo-clipboard";
import { useTheme } from "../../context/ThemeContext";

const LocationScreen = () => {
  const { theme } = useTheme();
  const [location, setLocation] = useState(null);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permission Denied", "Location permission is required.");
      return;
    }

    const currentLocation = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    setLocation(currentLocation.coords);
  };

  const copyLocation = async () => {
    if (!location) {
      Alert.alert("Error", "Get location first.");
      return;
    }

    const text = `Latitude: ${location.latitude}\nLongitude: ${location.longitude}`;

    await Clipboard.setStringAsync(text);

    Alert.alert("Success", "Location copied successfully.");
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.heading, { color: theme.colors.text }]}>Current Location</Text>

      {location ? (
        <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.text, { color: theme.colors.text }]}>
            Latitude : {location.latitude}
          </Text>

          <Text style={[styles.text, { color: theme.colors.text }]}>
            Longitude : {location.longitude}
          </Text>

          <Text style={[styles.text, { color: theme.colors.text }]}>
            Accuracy : {location.accuracy} meters
          </Text>
        </View>
      ) : (
        <Text style={[styles.noLocation, { color: theme.colors.subtext }]}>
          No Location Available
        </Text>
      )}

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        onPress={getLocation}
      >
        <Text style={styles.buttonText}>
          Get Current Location
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        onPress={getLocation}
      >
        <Text style={styles.buttonText}>
          Refresh Location
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.copyButton}
        onPress={copyLocation}
      >
        <Text style={styles.buttonText}>
          Copy Location
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LocationScreen;

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
    padding: 20,
    borderRadius: 12,
    elevation: 3,
    marginBottom: 20,
  },

  text: {
    fontSize: 18,
    marginBottom: 10,
  },

  noLocation: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 20,
  },

  button: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },

  copyButton: {
    backgroundColor: "#22C55E",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});