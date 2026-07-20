import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "../../../context/ThemeContext";

const Profile = () => {
  const router = useRouter();
  const { theme } = useTheme();

  // Profile Information State
  const [profile, setProfile] = useState({
    name: "Dhruva Tajapara",
    studentId: "892",
    email: "dhruva.tajapara@gmail.com",
    phone: "+91 98765 43210",
    department: "Computer Engineering",
  });

  // Modal Control States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  // Edit Profile Form State
  const [editForm, setEditForm] = useState({ ...profile });

  // Change Password Form State
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Toast / Banner Feedback
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const showToast = (msg) => {
    setFeedbackMsg(msg);
    setTimeout(() => {
      setFeedbackMsg("");
    }, 3000);
  };

  // Compute Initials dynamically
  const getInitials = (nameStr) => {
    if (!nameStr) return "DT";
    const parts = nameStr.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return nameStr.substring(0, 2).toUpperCase();
  };

  // Open Edit Profile Modal
  const handleOpenEdit = () => {
    setEditForm({ ...profile });
    setIsEditModalOpen(true);
  };

  // Save Profile Changes
  const handleSaveProfile = () => {
    if (!editForm.name.trim()) {
      if (Platform.OS === "web") alert("Name cannot be empty.");
      else Alert.alert("Required Field", "Name cannot be empty.");
      return;
    }
    setProfile({ ...editForm });
    setIsEditModalOpen(false);
    showToast("Profile updated successfully!");
  };

  // Open Password Modal
  const handleOpenPassword = () => {
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setIsPasswordModalOpen(true);
  };

  // Save Password Changes
  const handleSavePassword = () => {
    if (!passwordForm.currentPassword) {
      if (Platform.OS === "web") alert("Please enter your current password.");
      else Alert.alert("Error", "Please enter your current password.");
      return;
    }
    if (!passwordForm.newPassword || passwordForm.newPassword.length < 6) {
      if (Platform.OS === "web") alert("New password must be at least 6 characters.");
      else Alert.alert("Error", "New password must be at least 6 characters.");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      if (Platform.OS === "web") alert("New passwords do not match.");
      else Alert.alert("Error", "New passwords do not match.");
      return;
    }

    setIsPasswordModalOpen(false);
    showToast("Password updated successfully!");
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Toast Notification Banner */}
      {feedbackMsg !== "" && (
        <View style={[styles.toast, { backgroundColor: theme.colors.success || "#10B981" }]}>
          <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
          <Text style={styles.toastText}>{feedbackMsg}</Text>
        </View>
      )}

      {/* Top Banner Header */}
      <View style={[styles.banner, { backgroundColor: theme.colors.primary }]} />

      {/* Profile Avatar & Header Info */}
      <View style={styles.profileHeaderSection}>
        <View style={styles.avatarWrapper}>
          <View
            style={[
              styles.avatarBorder,
              {
                borderColor: theme.colors.background,
                backgroundColor: theme.colors.card,
              },
            ]}
          >
            <View style={[styles.avatar, { backgroundColor: theme.colors.primary }]}>
              <Text style={styles.avatarText}>{getInitials(profile.name)}</Text>
            </View>
          </View>
          {/* Active Status Dot */}
          <View
            style={[
              styles.statusDot,
              {
                backgroundColor: theme.colors.success || "#10B981",
                borderColor: theme.colors.background,
              },
            ]}
          />
        </View>

        <Text style={[styles.name, { color: theme.colors.text }]}>{profile.name}</Text>
        <Text style={[styles.studentId, { color: theme.colors.subtext }]}>
          Student ID: {profile.studentId}
        </Text>
      </View>

      {/* Personal Info Card */}
      <View style={styles.sectionContainer}>
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.border,
            },
          ]}
        >
          {/* Email Row */}
          <View style={styles.infoRow}>
            <View
              style={[
                styles.iconBox,
                { backgroundColor: theme.colors.primaryLight },
              ]}
            >
              <Ionicons name="mail-outline" size={20} color={theme.colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.label, { color: theme.colors.subtext }]}>Email</Text>
              <Text style={[styles.value, { color: theme.colors.text }]}>
                {profile.email}
              </Text>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

          {/* Phone Row */}
          <View style={styles.infoRow}>
            <View
              style={[
                styles.iconBox,
                { backgroundColor: theme.colors.successLight || "rgba(16, 185, 129, 0.15)" },
              ]}
            >
              <Ionicons
                name="call-outline"
                size={20}
                color={theme.colors.success || "#10B981"}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.label, { color: theme.colors.subtext }]}>Phone</Text>
              <Text style={[styles.value, { color: theme.colors.text }]}>
                {profile.phone}
              </Text>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

          {/* Department Row */}
          <View style={styles.infoRow}>
            <View
              style={[
                styles.iconBox,
                { backgroundColor: theme.colors.warningLight || "rgba(245, 158, 11, 0.15)" },
              ]}
            >
              <Ionicons
                name="briefcase-outline"
                size={20}
                color={theme.colors.warning || "#F59E0B"}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.label, { color: theme.colors.subtext }]}>
                Department
              </Text>
              <Text style={[styles.value, { color: theme.colors.text }]}>
                {profile.department}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Account Settings Section */}
      <View style={styles.sectionContainer}>
        <Text style={[styles.sectionHeading, { color: theme.colors.text }]}>
          Account Settings
        </Text>

        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.border,
            },
          ]}
        >
          {/* Edit Profile Button */}
          <TouchableOpacity
            style={styles.actionRow}
            activeOpacity={0.7}
            onPress={handleOpenEdit}
          >
            <View style={styles.actionRowLeft}>
              <View
                style={[
                  styles.iconBox,
                  { backgroundColor: theme.colors.primaryLight },
                ]}
              >
                <Ionicons name="person-outline" size={20} color={theme.colors.primary} />
              </View>
              <Text style={[styles.actionText, { color: theme.colors.text }]}>
                Edit Profile
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={theme.colors.subtext}
            />
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

          {/* Change Password Button */}
          <TouchableOpacity
            style={styles.actionRow}
            activeOpacity={0.7}
            onPress={handleOpenPassword}
          >
            <View style={styles.actionRowLeft}>
              <View
                style={[
                  styles.iconBox,
                  { backgroundColor: theme.colors.purpleLight || "rgba(139, 92, 246, 0.15)" },
                ]}
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={theme.colors.purple || "#8B5CF6"}
                />
              </View>
              <Text style={[styles.actionText, { color: theme.colors.text }]}>
                Change Password
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={theme.colors.subtext}
            />
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

          {/* Log Out Button */}
          <TouchableOpacity
            style={styles.actionRow}
            activeOpacity={0.7}
            onPress={() => router.replace("/login")}
          >
            <View style={styles.actionRowLeft}>
              <View
                style={[
                  styles.iconBox,
                  { backgroundColor: theme.colors.dangerLight || "rgba(239, 68, 68, 0.15)" },
                ]}
              >
                <Ionicons
                  name="log-out-outline"
                  size={20}
                  color={theme.colors.danger || "#EF4444"}
                />
              </View>
              <Text style={[styles.actionText, { color: theme.colors.danger || "#EF4444" }]}>
                Log Out
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={theme.colors.subtext}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* EDIT PROFILE MODAL */}
      <Modal
        visible={isEditModalOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsEditModalOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalCard,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
                Edit Profile
              </Text>
              <TouchableOpacity onPress={() => setIsEditModalOpen(false)}>
                <Ionicons name="close" size={24} color={theme.colors.subtext} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Full Name */}
              <Text style={[styles.modalLabel, { color: theme.colors.text }]}>
                Full Name
              </Text>
              <TextInput
                style={[
                  styles.modalInput,
                  {
                    backgroundColor: theme.colors.inputBg || theme.colors.background,
                    color: theme.colors.text,
                    borderColor: theme.colors.border,
                  },
                ]}
                value={editForm.name}
                onChangeText={(val) => setEditForm({ ...editForm, name: val })}
              />

              {/* Student ID */}
              <Text style={[styles.modalLabel, { color: theme.colors.text }]}>
                Student ID
              </Text>
              <TextInput
                style={[
                  styles.modalInput,
                  {
                    backgroundColor: theme.colors.inputBg || theme.colors.background,
                    color: theme.colors.text,
                    borderColor: theme.colors.border,
                  },
                ]}
                value={editForm.studentId}
                onChangeText={(val) => setEditForm({ ...editForm, studentId: val })}
              />

              {/* Email */}
              <Text style={[styles.modalLabel, { color: theme.colors.text }]}>
                Email Address
              </Text>
              <TextInput
                style={[
                  styles.modalInput,
                  {
                    backgroundColor: theme.colors.inputBg || theme.colors.background,
                    color: theme.colors.text,
                    borderColor: theme.colors.border,
                  },
                ]}
                keyboardType="email-address"
                value={editForm.email}
                onChangeText={(val) => setEditForm({ ...editForm, email: val })}
              />

              {/* Phone */}
              <Text style={[styles.modalLabel, { color: theme.colors.text }]}>
                Phone Number
              </Text>
              <TextInput
                style={[
                  styles.modalInput,
                  {
                    backgroundColor: theme.colors.inputBg || theme.colors.background,
                    color: theme.colors.text,
                    borderColor: theme.colors.border,
                  },
                ]}
                keyboardType="phone-pad"
                value={editForm.phone}
                onChangeText={(val) => setEditForm({ ...editForm, phone: val })}
              />

              {/* Department */}
              <Text style={[styles.modalLabel, { color: theme.colors.text }]}>
                Department
              </Text>
              <TextInput
                style={[
                  styles.modalInput,
                  {
                    backgroundColor: theme.colors.inputBg || theme.colors.background,
                    color: theme.colors.text,
                    borderColor: theme.colors.border,
                  },
                ]}
                value={editForm.department}
                onChangeText={(val) => setEditForm({ ...editForm, department: val })}
              />
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={[
                  styles.modalCancelBtn,
                  { borderColor: theme.colors.border },
                ]}
                onPress={() => setIsEditModalOpen(false)}
              >
                <Text style={[styles.modalCancelBtnText, { color: theme.colors.subtext }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modalSaveBtn,
                  { backgroundColor: theme.colors.primary },
                ]}
                onPress={handleSaveProfile}
              >
                <Text style={styles.modalSaveBtnText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* CHANGE PASSWORD MODAL */}
      <Modal
        visible={isPasswordModalOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsPasswordModalOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalCard,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
                Change Password
              </Text>
              <TouchableOpacity onPress={() => setIsPasswordModalOpen(false)}>
                <Ionicons name="close" size={24} color={theme.colors.subtext} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Current Password */}
              <Text style={[styles.modalLabel, { color: theme.colors.text }]}>
                Current Password
              </Text>
              <TextInput
                style={[
                  styles.modalInput,
                  {
                    backgroundColor: theme.colors.inputBg || theme.colors.background,
                    color: theme.colors.text,
                    borderColor: theme.colors.border,
                  },
                ]}
                secureTextEntry={true}
                placeholder="Enter current password"
                placeholderTextColor={theme.colors.subtext}
                value={passwordForm.currentPassword}
                onChangeText={(val) =>
                  setPasswordForm({ ...passwordForm, currentPassword: val })
                }
              />

              {/* New Password */}
              <Text style={[styles.modalLabel, { color: theme.colors.text }]}>
                New Password
              </Text>
              <TextInput
                style={[
                  styles.modalInput,
                  {
                    backgroundColor: theme.colors.inputBg || theme.colors.background,
                    color: theme.colors.text,
                    borderColor: theme.colors.border,
                  },
                ]}
                secureTextEntry={true}
                placeholder="Enter new password (min 6 chars)"
                placeholderTextColor={theme.colors.subtext}
                value={passwordForm.newPassword}
                onChangeText={(val) =>
                  setPasswordForm({ ...passwordForm, newPassword: val })
                }
              />

              {/* Confirm Password */}
              <Text style={[styles.modalLabel, { color: theme.colors.text }]}>
                Confirm New Password
              </Text>
              <TextInput
                style={[
                  styles.modalInput,
                  {
                    backgroundColor: theme.colors.inputBg || theme.colors.background,
                    color: theme.colors.text,
                    borderColor: theme.colors.border,
                  },
                ]}
                secureTextEntry={true}
                placeholder="Confirm new password"
                placeholderTextColor={theme.colors.subtext}
                value={passwordForm.confirmPassword}
                onChangeText={(val) =>
                  setPasswordForm({ ...passwordForm, confirmPassword: val })
                }
              />
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={[
                  styles.modalCancelBtn,
                  { borderColor: theme.colors.border },
                ]}
                onPress={() => setIsPasswordModalOpen(false)}
              >
                <Text style={[styles.modalCancelBtnText, { color: theme.colors.subtext }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modalSaveBtn,
                  { backgroundColor: theme.colors.primary },
                ]}
                onPress={handleSavePassword}
              >
                <Text style={styles.modalSaveBtnText}>Update Password</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  toast: {
    position: "absolute",
    top: 15,
    left: 20,
    right: 20,
    zIndex: 999,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  toastText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  banner: {
    height: 130,
    width: "100%",
  },
  profileHeaderSection: {
    alignItems: "center",
    marginTop: -52,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  avatarWrapper: {
    position: "relative",
  },
  avatarBorder: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  avatar: {
    width: 86,
    height: 86,
    borderRadius: 43,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  statusDot: {
    position: "absolute",
    bottom: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 3,
  },
  name: {
    fontSize: 23,
    fontWeight: "800",
    marginTop: 10,
    letterSpacing: -0.3,
  },
  studentId: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 4,
  },
  sectionContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    letterSpacing: -0.2,
  },
  card: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 4,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  actionRowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  actionText: {
    fontSize: 16,
    fontWeight: "700",
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
  },
  value: {
    fontSize: 15,
    fontWeight: "700",
    marginTop: 2,
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  /* MODAL STYLES */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalCard: {
    width: "100%",
    maxWidth: 420,
    borderRadius: 24,
    borderWidth: 1,
    padding: 22,
    maxHeight: "85%",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "800",
  },
  modalLabel: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 6,
    marginTop: 10,
  },
  modalInput: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    fontWeight: "600",
    outlineStyle: "none",
    outlineWidth: 0,
  },
  modalFooter: {
    flexDirection: "row",
    gap: 12,
    marginTop: 22,
  },
  modalCancelBtn: {
    flex: 1,
    height: 46,
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalCancelBtnText: {
    fontSize: 15,
    fontWeight: "700",
  },
  modalSaveBtn: {
    flex: 1,
    height: 46,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  modalSaveBtnText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
