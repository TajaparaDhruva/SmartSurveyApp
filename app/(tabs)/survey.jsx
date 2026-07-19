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

const Survey = () => {
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
    <View style={styles.container}>
      <Text style={styles.heading}>Create Survey</Text>

      <TextInput
        placeholder="Site Name"
        style={styles.input}
        value={siteName}
        onChangeText={setSiteName}
      />

      <TextInput
        placeholder="Client Name"
        style={styles.input}
        value={clientName}
        onChangeText={setClientName}
      />

      <TextInput
        placeholder="Description"
        style={[styles.input, { height: 100 }]}
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Priority</Text>

      <View style={styles.priorityContainer}>
        <TouchableOpacity
          style={[
            styles.priorityButton,
            priority === "High" && styles.selected,
          ]}
          onPress={() => setPriority("High")}
        >
          <Text>High</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.priorityButton,
            priority === "Medium" && styles.selected,
          ]}
          onPress={() => setPriority("Medium")}
        >
          <Text>Medium</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.priorityButton,
            priority === "Low" && styles.selected,
          ]}
          onPress={() => setPriority("Low")}
        >
          <Text>Low</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShow(true)}
      >
        <Text>{date.toDateString()}</Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Survey;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 20,
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
  },

  input: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
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
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  selected: {
    backgroundColor: "#2563EB",
  },

  dateButton: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  nextButton: {
    backgroundColor: "#2563EB",
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