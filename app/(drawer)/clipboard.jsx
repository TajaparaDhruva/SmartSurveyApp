import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  Platform,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";

const ClipboardScreen = () => {
  const { theme } = useTheme();
  const [notes, setNotes] = useState("");

  const surveyId = "SURVEY-1001";
  const contactNumber = "+91 9876543210";
  const location = "23.0225° N, 72.5714° E";

  const copyText = async (text, label) => {
    try {
      await Clipboard.setStringAsync(text);
      if (Platform.OS === "web") {
        window.alert(`Copied! 📋 ${label} copied to clipboard.`);
      } else {
        Alert.alert("Copied! 📋", `${label} copied to clipboard.`);
      }
    } catch (e) {
      console.warn("Clipboard set error:", e);
    }
  };

  const pasteNotes = async () => {
    try {
      const text = await Clipboard.getStringAsync();
      if (text) {
        setNotes(text);
        if (Platform.OS === "web") {
          window.alert("Notes pasted from clipboard! 📋");
        } else {
          Alert.alert("Pasted! 📋", "Content pasted from clipboard.");
        }
      } else {
        if (Platform.OS === "web") {
          window.alert("Clipboard is empty.");
        } else {
          Alert.alert("Empty Clipboard", "No text found on clipboard.");
        }
      }
    } catch (e) {
      console.warn("Clipboard get error:", e);
    }
  };

  const clearClipboard = async () => {
    try {
      await Clipboard.setStringAsync("");
      setNotes("");
      if (Platform.OS === "web") {
        window.alert("Clipboard data cleared! 🧹");
      } else {
        Alert.alert("Cleared 🧹", "Clipboard data and notes cleared.");
      }
    } catch (e) {
      console.warn("Clipboard clear error:", e);
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={[styles.heading, { color: theme.colors.text }]}>Clipboard Shortcuts</Text>

      {/* Copy Shortcut Cards */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.card, { backgroundColor: theme.colors.primaryLight, borderColor: theme.colors.primaryBorder }]}
        onPress={() => copyText(surveyId, "Survey ID")}
      >
        <View style={styles.cardLeft}>
          <Ionicons name="barcode" size={22} color={theme.colors.primary} />
          <View>
            <Text style={[styles.label, { color: theme.colors.subtext }]}>Survey ID</Text>
            <Text style={[styles.value, { color: theme.colors.primary }]}>{surveyId}</Text>
          </View>
        </View>
        <Ionicons name="copy-outline" size={18} color={theme.colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.card, { backgroundColor: theme.colors.successLight, borderColor: theme.colors.success }]}
        onPress={() => copyText(contactNumber, "Contact Number")}
      >
        <View style={styles.cardLeft}>
          <Ionicons name="call" size={22} color={theme.colors.success} />
          <View>
            <Text style={[styles.label, { color: theme.colors.subtext }]}>Contact Number</Text>
            <Text style={[styles.value, { color: theme.colors.success }]}>{contactNumber}</Text>
          </View>
        </View>
        <Ionicons name="copy-outline" size={18} color={theme.colors.success} />
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.card, { backgroundColor: theme.colors.warningLight, borderColor: theme.colors.warning }]}
        onPress={() => copyText(location, "Current Location")}
      >
        <View style={styles.cardLeft}>
          <Ionicons name="location" size={22} color={theme.colors.warning} />
          <View>
            <Text style={[styles.label, { color: theme.colors.subtext }]}>Current Location</Text>
            <Text style={[styles.value, { color: theme.colors.warning }]}>{location}</Text>
          </View>
        </View>
        <Ionicons name="copy-outline" size={18} color={theme.colors.warning} />
      </TouchableOpacity>

      {/* Notes Scratchpad */}
      <Text style={[styles.sectionHeading, { color: theme.colors.text, marginTop: 14 }]}>
        Notes Scratchpad
      </Text>

      <View style={[styles.notesCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
        <TextInput
          style={[styles.input, { color: theme.colors.text }]}
          placeholder="Type or paste notes here..."
          placeholderTextColor={theme.colors.subtext}
          multiline
          numberOfLines={5}
          textAlignVertical="top"
          value={notes}
          onChangeText={setNotes}
        />

        <View style={styles.btnRow}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.actionBtn, { backgroundColor: theme.colors.success }]}
            onPress={pasteNotes}
          >
            <Ionicons name="clipboard" size={16} color="#FFFFFF" />
            <Text style={styles.btnText}>Paste Notes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.actionBtn, { backgroundColor: theme.colors.danger }]}
            onPress={clearClipboard}
          >
            <Ionicons name="trash" size={16} color="#FFFFFF" />
            <Text style={styles.btnText}>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ClipboardScreen;

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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 12,
    elevation: 2,
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
  },
  value: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 1,
  },
  notesCard: {
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    elevation: 2,
  },
  input: {
    minHeight: 110,
    fontSize: 15,
    outlineStyle: "none",
    outlineWidth: 0,
    borderWidth: 0,
  },
  btnRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    paddingVertical: 12,
    borderRadius: 10,
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});