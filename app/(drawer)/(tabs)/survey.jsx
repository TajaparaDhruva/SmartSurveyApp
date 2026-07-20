import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Modal,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../../context/ThemeContext";
import { useSurveys } from "../../../context/SurveyContext";

const Survey = () => {
  const { theme } = useTheme();
  const { addSurvey } = useSurveys();
  const params = useLocalSearchParams();

  const [siteName, setSiteName] = useState(params.siteName || "");
  const [clientName, setClientName] = useState(params.clientName || "");
  const [description, setDescription] = useState(params.description || "");
  const [priority, setPriority] = useState(params.priority || "Medium");

  const [date, setDate] = useState(params.date ? new Date(params.date) : new Date());
  const [show, setShow] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (params.siteName) setSiteName(params.siteName);
    if (params.clientName) setClientName(params.clientName);
    if (params.description) setDescription(params.description);
    if (params.priority) setPriority(params.priority);
    if (params.date) {
      const parsedDate = new Date(params.date);
      if (!isNaN(parsedDate.getTime())) setDate(parsedDate);
    }
  }, [params.siteName, params.clientName, params.description, params.priority, params.date]);

  const onChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleNext = () => {
    if (
      siteName.trim() === "" ||
      clientName.trim() === "" ||
      description.trim() === "" ||
      priority === ""
    ) {
      if (Platform.OS === "web") {
        window.alert("Please fill in all required fields.");
      } else {
        Alert.alert("Missing Fields", "Please fill in all required fields.");
      }
      return;
    }

    addSurvey({
      siteName,
      clientName,
      description,
      priority,
      date: date.toDateString(),
    });

    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSiteName("");
    setClientName("");
    setDescription("");
    setPriority("Medium");
    router.push("/(drawer)/(tabs)/history");
  };

  const formatDateForWeb = (d) => {
    try {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    } catch (e) {
      return "";
    }
  };

  const handleWebDateChange = (e) => {
    const val = e.target.value;
    if (val) {
      const parts = val.split("-");
      if (parts.length === 3) {
        setDate(new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2])));
      }
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      {/* Title */}
      <Text style={[styles.heading, { color: theme.colors.text }]}>Create Survey</Text>
      <Text style={[styles.subheading, { color: theme.colors.subtext }]}>
        Fill in the details below to record a new site survey
      </Text>

      {/* Form Fields Card */}
      <View style={[styles.formCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>

        <View style={styles.fieldGroup}>
          <Text style={[styles.label, { color: theme.colors.text }]}>
            <Ionicons name="business-outline" size={16} color={theme.colors.primary} /> Site Name *
          </Text>
          <TextInput
            placeholder="e.g. Metro Construction Site"
            placeholderTextColor={theme.colors.subtext}
            style={[
              styles.input,
              {
                backgroundColor: theme.colors.inputBg,
                color: theme.colors.text,
                borderColor: theme.colors.border,
              },
            ]}
            value={siteName}
            onChangeText={setSiteName}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={[styles.label, { color: theme.colors.text }]}>
            <Ionicons name="person-outline" size={16} color={theme.colors.primary} /> Client Name *
          </Text>
          <TextInput
            placeholder="e.g. John Doe"
            placeholderTextColor={theme.colors.subtext}
            style={[
              styles.input,
              {
                backgroundColor: theme.colors.inputBg,
                color: theme.colors.text,
                borderColor: theme.colors.border,
              },
            ]}
            value={clientName}
            onChangeText={setClientName}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={[styles.label, { color: theme.colors.text }]}>
            <Ionicons name="create-outline" size={16} color={theme.colors.primary} /> Description *
          </Text>
          <TextInput
            placeholder="Enter survey observations or site details..."
            placeholderTextColor={theme.colors.subtext}
            style={[
              styles.input,
              styles.textArea,
              {
                backgroundColor: theme.colors.inputBg,
                color: theme.colors.text,
                borderColor: theme.colors.border,
              },
            ]}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            value={description}
            onChangeText={setDescription}
          />
        </View>

        {/* Priority Selection with Color Badges */}
        <View style={styles.fieldGroup}>
          <Text style={[styles.label, { color: theme.colors.text }]}>
            <Ionicons name="flag-outline" size={16} color={theme.colors.primary} /> Priority *
          </Text>
          <View style={styles.priorityRow}>
            {[
              { level: "High", color: theme.colors.danger, icon: "flame" },
              { level: "Medium", color: theme.colors.warning, icon: "alert-circle" },
              { level: "Low", color: theme.colors.success, icon: "checkmark-circle" },
            ].map((item) => {
              const isSelected = priority === item.level;
              return (
                <TouchableOpacity
                  key={item.level}
                  activeOpacity={0.8}
                  style={[
                    styles.priorityOption,
                    {
                      backgroundColor: isSelected ? item.color : theme.colors.inputBg,
                      borderColor: isSelected ? item.color : theme.colors.border,
                    },
                  ]}
                  onPress={() => setPriority(item.level)}
                >
                  <Ionicons
                    name={item.icon}
                    size={16}
                    color={isSelected ? "#FFFFFF" : item.color}
                  />
                  <Text
                    style={{
                      color: isSelected ? "#FFFFFF" : theme.colors.text,
                      fontWeight: "bold",
                      fontSize: 14,
                    }}
                  >
                    {item.level}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Date Selection */}
        <View style={styles.fieldGroup}>
          <Text style={[styles.label, { color: theme.colors.text }]}>
            <Ionicons name="calendar-outline" size={16} color={theme.colors.primary} /> Survey Date
          </Text>

          {Platform.OS === "web" ? (
            <View
              style={[
                styles.webDateBox,
                { backgroundColor: theme.colors.inputBg, borderColor: theme.colors.border },
              ]}
            >
              <Ionicons name="calendar" size={18} color={theme.colors.primary} style={{ marginRight: 8 }} />
              <input
                type="date"
                value={formatDateForWeb(date)}
                onChange={handleWebDateChange}
                style={{
                  border: "none",
                  outline: "none",
                  backgroundColor: "transparent",
                  color: theme.colors.text,
                  fontSize: "15px",
                  fontWeight: "500",
                  fontFamily: "inherit",
                  cursor: "pointer",
                  width: "100%",
                }}
              />
            </View>
          ) : (
            <>
              <TouchableOpacity
                style={[
                  styles.dateButton,
                  {
                    backgroundColor: theme.colors.inputBg,
                    borderColor: theme.colors.border,
                  },
                ]}
                onPress={() => setShow(true)}
              >
                <Ionicons name="calendar" size={18} color={theme.colors.primary} />
                <Text style={{ color: theme.colors.text, fontSize: 15, fontWeight: "500" }}>
                  {date.toDateString()}
                </Text>
              </TouchableOpacity>

              {show && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={onChange}
                />
              )}
            </>
          )}
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          activeOpacity={0.85}
          style={[styles.submitBtn, { backgroundColor: theme.colors.primary }]}
          onPress={handleNext}
        >
          <Text style={styles.submitBtnText}>Submit Survey</Text>
          <Ionicons name="arrow-forward-circle" size={22} color="#FFFFFF" />
        </TouchableOpacity>

      </View>

      {/* In-App Visual Success Popup Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { backgroundColor: theme.colors.card }]}>
            <Ionicons name="checkmark-circle" size={60} color={theme.colors.success} />
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
              Survey Submitted
            </Text>
            <Text style={[styles.modalMessage, { color: theme.colors.subtext }]}>
              Survey details is submitted successfully.
            </Text>
            <TouchableOpacity
              style={[styles.modalBtn, { backgroundColor: theme.colors.primary }]}
              onPress={handleModalClose}
            >
              <Text style={styles.modalBtnText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Survey;

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
  },
  subheading: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 4,
    marginBottom: 20,
  },
  formCard: {
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  input: {
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    borderWidth: 1,
    outlineStyle: "none",
    outlineWidth: 0,
  },
  textArea: {
    minHeight: 100,
    paddingTop: 12,
  },
  priorityRow: {
    flexDirection: "row",
    gap: 10,
  },
  priorityOption: {
    flex: 1,
    flexDirection: "row",
    gap: 6,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  webDateBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  submitBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 10,
    elevation: 3,
  },
  submitBtnText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
  },

  /* Modal Styles */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalCard: {
    width: "90%",
    maxWidth: 340,
    borderRadius: 18,
    padding: 24,
    alignItems: "center",
    elevation: 6,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 6,
  },
  modalMessage: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
  modalBtn: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  modalBtnText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
});
