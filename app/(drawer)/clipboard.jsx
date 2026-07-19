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

const ClipboardScreen = () => {
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
    <View style={styles.container}>
      <Text style={styles.heading}>Clipboard</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => copyText(surveyId, "Survey ID copied")}
      >
        <Text style={styles.buttonText}>Copy Survey ID</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => copyText(contactNumber, "Contact Number copied")}
      >
        <Text style={styles.buttonText}>Copy Contact Number</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
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
        style={styles.input}
        placeholder="Pasted Notes..."
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
    backgroundColor: "#F5F7FA",
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },

  button: {
    backgroundColor: "#2563EB",
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
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    minHeight: 120,
    textAlignVertical: "top",
  },
});