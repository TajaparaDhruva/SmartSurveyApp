import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  Platform,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { useSurveys } from "../context/SurveyContext";

const Preview = () => {
  const { theme } = useTheme();
  const { addSurvey } = useSurveys();
  const params = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);

  const survey = {
    siteName: params.siteName || "ABC Company",
    clientName: params.clientName || "John Doe",
    description: params.description || "Site inspection completed successfully.",
    priority: params.priority || "High",
    date: params.date || "Mon Jul 20 2026",
    photo: params.photo || "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=800&auto=format&fit=crop&q=80",
    contact: params.contact || "+91 9876543210",
    location: params.location || "23.0225° N, 72.5714° E",
    notes: params.notes || "All safety checks verified on site.",
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return theme.colors.danger;
      case "Medium":
        return theme.colors.warning;
      case "Low":
        return theme.colors.success;
      default:
        return theme.colors.primary;
    }
  };

  const handleSubmit = () => {
    addSurvey({
      siteName: survey.siteName,
      clientName: survey.clientName,
      description: survey.description,
      priority: survey.priority,
      date: survey.date,
    });
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    router.replace("/(drawer)/(tabs)/history");
  };

  const handleEdit = () => {
    router.push({
      pathname: "/(drawer)/(tabs)/survey",
      params: {
        siteName: survey.siteName,
        clientName: survey.clientName,
        description: survey.description,
        priority: survey.priority,
        date: survey.date,
      },
    });
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.backIconBtn, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={22} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.heading, { color: theme.colors.text }]}>Survey Preview</Text>
      </View>

      {/* Main Details Card */}
      <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
        <View style={styles.cardHeader}>
          <Text style={[styles.siteTitle, { color: theme.colors.text }]}>🏢 {survey.siteName}</Text>
          <View style={[styles.priorityPill, { backgroundColor: getPriorityColor(survey.priority) }]}>
            <Text style={styles.priorityPillText}>{survey.priority}</Text>
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

        {/* Client Name */}
        <View style={styles.itemRow}>
          <View style={[styles.iconBox, { backgroundColor: theme.colors.primaryLight }]}>
            <Ionicons name="person" size={18} color={theme.colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.label, { color: theme.colors.subtext }]}>Client Name</Text>
            <Text style={[styles.value, { color: theme.colors.text }]}>{survey.clientName}</Text>
          </View>
        </View>

        {/* Survey Date */}
        <View style={styles.itemRow}>
          <View style={[styles.iconBox, { backgroundColor: theme.colors.purpleLight }]}>
            <Ionicons name="calendar" size={18} color={theme.colors.purple} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.label, { color: theme.colors.subtext }]}>Survey Date</Text>
            <Text style={[styles.value, { color: theme.colors.text }]}>{survey.date}</Text>
          </View>
        </View>

        {/* Contact Info */}
        <View style={styles.itemRow}>
          <View style={[styles.iconBox, { backgroundColor: theme.colors.successLight }]}>
            <Ionicons name="call" size={18} color={theme.colors.success} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.label, { color: theme.colors.subtext }]}>Contact</Text>
            <Text style={[styles.value, { color: theme.colors.text }]}>{survey.contact}</Text>
          </View>
        </View>

        {/* Location Coordinates */}
        <View style={styles.itemRow}>
          <View style={[styles.iconBox, { backgroundColor: theme.colors.warningLight }]}>
            <Ionicons name="location" size={18} color={theme.colors.warning} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.label, { color: theme.colors.subtext }]}>Location</Text>
            <Text style={[styles.value, { color: theme.colors.text }]}>{survey.location}</Text>
          </View>
        </View>

        {/* Description / Observations */}
        <View style={styles.itemRow}>
          <View style={[styles.iconBox, { backgroundColor: theme.colors.primaryLight }]}>
            <Ionicons name="document-text" size={18} color={theme.colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.label, { color: theme.colors.subtext }]}>Description</Text>
            <Text style={[styles.value, { color: theme.colors.text }]}>{survey.description}</Text>
          </View>
        </View>

        {/* Notes */}
        <View style={styles.itemRow}>
          <View style={[styles.iconBox, { backgroundColor: theme.colors.purpleLight }]}>
            <Ionicons name="clipboard" size={18} color={theme.colors.purple} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.label, { color: theme.colors.subtext }]}>Notes</Text>
            <Text style={[styles.value, { color: theme.colors.text }]}>{survey.notes}</Text>
          </View>
        </View>
      </View>



      {/* Success Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { backgroundColor: theme.colors.card }]}>
            <Ionicons name="checkmark-circle" size={64} color={theme.colors.success} />
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Survey Submitted!</Text>
            <Text style={[styles.modalMessage, { color: theme.colors.subtext }]}>
              Your survey has been successfully recorded in Survey History.
            </Text>
            <TouchableOpacity
              style={[styles.modalBtn, { backgroundColor: theme.colors.primary }]}
              onPress={handleModalClose}
            >
              <Text style={styles.modalBtnText}>Go to History</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Preview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  backIconBtn: {
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    elevation: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  card: {
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    elevation: 3,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  siteTitle: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    marginRight: 8,
  },
  priorityPill: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityPillText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    marginBottom: 16,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 14,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 2,
  },
  value: {
    fontSize: 15,
    fontWeight: "500",
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  photoContainer: {
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 4,
  },
  photoPreview: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
  btnRow: {
    flexDirection: "row",
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    paddingVertical: 15,
    borderRadius: 12,
    elevation: 3,
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
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
    marginTop: 12,
    marginBottom: 6,
  },
  modalMessage: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 20,
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