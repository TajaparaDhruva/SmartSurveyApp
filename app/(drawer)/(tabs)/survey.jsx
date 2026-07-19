import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { useTheme } from "../../../context/ThemeContext";

const Survey = () => {
  const { theme } = useTheme();
  const [siteName, setSiteName] = useState("");
  const [clientName, setClientName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    setShow(false);

    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleNext = () => {
    if (
      siteName === "" ||
      clientName === "" ||
      description === "" ||
      priority === ""
    ) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    router.push("/preview");
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.heading, { color: theme.colors.text }]}>Create Survey</Text>

      <TextInput
        placeholder="Site Name"
        placeholderTextColor={theme.colors.subtext}
        style={[styles.input, { backgroundColor: theme.colors.inputBg, color: theme.colors.text, borderColor: theme.colors.border }]}
        value={siteName}
        onChangeText={setSiteName}
      />

      <TextInput
        placeholder="Client Name"
        placeholderTextColor={theme.colors.subtext}
        style={[styles.input, { backgroundColor: theme.colors.inputBg, color: theme.colors.text, borderColor: theme.colors.border }]}
        value={clientName}
        onChangeText={setClientName}
      />

      <TextInput
        placeholder="Description"
        placeholderTextColor={theme.colors.subtext}
        style={[styles.input, { backgroundColor: theme.colors.inputBg, color: theme.colors.text, borderColor: theme.colors.border, height: 100 }]}
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <Text style={[styles.label, { color: theme.colors.text }]}>Priority</Text>

      <View style={styles.priorityContainer}>
        <TouchableOpacity
          style={[
            styles.priorityButton,
            { backgroundColor: theme.colors.card, borderColor: theme.colors.border },
            priority === "High" && { backgroundColor: theme.colors.primary },
          ]}
          onPress={() => setPriority("High")}
        >
          <Text style={{ color: priority === "High" ? "white" : theme.colors.text }}>High</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.priorityButton,
            { backgroundColor: theme.colors.card, borderColor: theme.colors.border },
            priority === "Medium" && { backgroundColor: theme.colors.primary },
          ]}
          onPress={() => setPriority("Medium")}
        >
          <Text style={{ color: priority === "Medium" ? "white" : theme.colors.text }}>Medium</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.priorityButton,
            { backgroundColor: theme.colors.card, borderColor: theme.colors.border },
            priority === "Low" && { backgroundColor: theme.colors.primary },
          ]}
          onPress={() => setPriority("Low")}
        >
          <Text style={{ color: priority === "Low" ? "white" : theme.colors.text }}>Low</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.dateButton, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
        onPress={() => setShow(true)}
      >
        <Text style={{ color: theme.colors.text }}>{date.toDateString()}</Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}

      <TouchableOpacity
        style={[styles.nextButton, { backgroundColor: theme.colors.primary }]}
        onPress={handleNext}
      >
        <Text style={styles.nextText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Survey;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
  },

  input: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
  },

  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  priorityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  priorityButton: {
    width: "30%",
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
  },

  dateButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 25,
    borderWidth: 1,
  },

  nextButton: {
    padding: 18,
    borderRadius: 10,
  },

  nextText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
});
