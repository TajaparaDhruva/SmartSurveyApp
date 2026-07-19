import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { useTheme } from "../../context/ThemeContext";

const ClipboardScreen = () => {
  const { theme } = useTheme();
  const [notes, setNotes] = useState("");

  const surveyId = "SURVEY-1001";
  const contactNumber = "+91 9876543210";
  const location = "23.0225, 72.5714";

  const copyText = async (text, message) => {
    await Clipboard.setStringAsync(text);
    Alert.alert("Success", message);
  };

  const pasteNotes = async () => {
    const text = await Clipboard.getStringAsync();
    setNotes(text);
  };

  const clearClipboard = async () => {
    await Clipboard.setStringAsync("");
    setNotes("");
    Alert.alert("Success", "Clipboard cleared.");
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.heading, { color: theme.colors.text }]}>Clipboard</Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        onPress={() => copyText(surveyId, "Survey ID copied")}
      >
        <Text style={styles.buttonText}>Copy Survey ID</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        onPress={() => copyText(contactNumber, "Contact Number copied")}
      >
        <Text style={styles.buttonText}>Copy Contact Number</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        onPress={() => copyText(location, "Location copied")}
      >
        <Text style={styles.buttonText}>Copy Current Location</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.pasteButton}
        onPress={pasteNotes}
      >
        <Text style={styles.buttonText}>Paste Notes</Text>
      </TouchableOpacity>

      <TextInput
        style={[styles.input, { backgroundColor: theme.colors.inputBg, color: theme.colors.text, borderColor: theme.colors.border }]}
        placeholder="Pasted Notes..."
        placeholderTextColor={theme.colors.subtext}
        multiline
        value={notes}
        onChangeText={setNotes}
      />

      <TouchableOpacity
        style={styles.clearButton}
        onPress={clearClipboard}
      >
        <Text style={styles.buttonText}>Clear Clipboard</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ClipboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },

  button: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },

  pasteButton: {
    backgroundColor: "#22C55E",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },

  clearButton: {
    backgroundColor: "#EF4444",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  input: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 15,
    minHeight: 120,
    textAlignVertical: "top",
  },
});