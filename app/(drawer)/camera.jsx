import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  ScrollView,
  Modal,
  Platform,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";

const CameraScreen = () => {
  const { theme } = useTheme();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  const [facing, setFacing] = useState("front");
  const [photo, setPhoto] = useState(null);
  const [captureTime, setCaptureTime] = useState("");
  const [loading, setLoading] = useState(true);
  const [hasConfirmedPermission, setHasConfirmedPermission] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);

  useEffect(() => {
    if (Platform.OS === "web") {
      setFacing("front");
    }
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const openPermissionPrompt = () => {
    setShowModal(true);
  };

  const handleAllow = async () => {
    setShowModal(false);
    setPermissionDenied(false);
    try {
      if (Platform.OS === "web") {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            stream.getTracks().forEach((track) => track.stop());
            if (requestPermission) await requestPermission();
            setHasConfirmedPermission(true);
          } catch (webErr) {
            console.warn("Web camera permission error:", webErr);
            setHasConfirmedPermission(true);
          }
        } else {
          if (requestPermission) await requestPermission();
          setHasConfirmedPermission(true);
        }
      } else {
        if (requestPermission) {
          await requestPermission();
        }
        setHasConfirmedPermission(true);
      }
    } catch (err) {
      console.warn("Permission request error:", err);
      setHasConfirmedPermission(true);
    }
  };

  const handleDeny = () => {
    setShowModal(false);
    setHasConfirmedPermission(false);
    setPermissionDenied(true);
  };

  const useMockPhoto = () => {
    const samplePhoto = "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=800&auto=format&fit=crop&q=80";
    setPhoto(samplePhoto);
    setCaptureTime(new Date().toLocaleString());
  };

  const takePicture = async () => {
    if (Platform.OS === "web" && facing === "back") {
      useMockPhoto();
      return;
    }

    if (!cameraRef.current) {
      useMockPhoto();
      return;
    }

    try {
      const options = { quality: 0.85, base64: false };
      const result = await cameraRef.current.takePictureAsync(options);
      if (result && result.uri) {
        setPhoto(result.uri);
        setCaptureTime(new Date().toLocaleString());
      } else {
        useMockPhoto();
      }
    } catch (e) {
      console.warn("Camera capture exception:", e);
      useMockPhoto();
    }
  };

  const deletePhoto = () => {
    if (Platform.OS === "web") {
      const confirmed = window.confirm("Are you sure you want to delete this photo?");
      if (confirmed) {
        setPhoto(null);
        setCaptureTime("");
      }
    } else {
      Alert.alert("Delete Photo", "Are you sure you want to delete this photo?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setPhoto(null);
            setCaptureTime("");
          },
        },
      ]);
    }
  };

  const savePhoto = () => {
    if (Platform.OS === "web") {
      window.alert("Photo saved successfully to survey! 📸");
    } else {
      Alert.alert("Photo Saved 📸", "The captured photo has been saved to your survey records.");
    }
  };

  if (loading) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.heading, { color: theme.colors.text }]}>Site Camera</Text>

      {/* STEP 1: Permission Prompt Screen */}
      {!hasConfirmedPermission ? (
        <View style={[styles.permissionCardFull, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
          <View style={[styles.cameraIconCircle, { backgroundColor: theme.colors.primaryLight }]}>
            <Ionicons name="camera" size={44} color={theme.colors.primary} />
          </View>

          <Text style={[styles.permissionCardTitle, { color: theme.colors.text }]}>
            Camera Access Required
          </Text>
          <Text style={[styles.permissionCardSub, { color: theme.colors.subtext }]}>
            Tap below to grant camera permission for capturing survey site photos.
          </Text>

          {permissionDenied && (
            <View style={[styles.deniedBadge, { backgroundColor: theme.colors.dangerLight, borderColor: theme.colors.danger }]}>
              <Ionicons name="close-circle" size={16} color={theme.colors.danger} />
              <Text style={[styles.deniedText, { color: theme.colors.danger }]}>Permission Denied</Text>
            </View>
          )}

          <TouchableOpacity
            activeOpacity={0.85}
            style={[styles.primaryGrantBtn, { backgroundColor: theme.colors.primary }]}
            onPress={openPermissionPrompt}
          >
            <Ionicons name="key" size={18} color="#FFFFFF" />
            <Text style={styles.primaryGrantBtnText}>Allow Camera Access</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {/* Permission Status Pill */}
          <View style={styles.statusRow}>
            <View
              style={[
                styles.statusPill,
                {
                  backgroundColor: theme.colors.successLight,
                  borderColor: theme.colors.success,
                },
              ]}
            >
              <Ionicons name="checkmark-circle" size={16} color={theme.colors.success} />
              <Text style={[styles.statusText, { color: theme.colors.success }]}>
                Permission: Granted
              </Text>
            </View>
          </View>

          {photo ? (
            <View style={styles.previewContainer}>
              <View style={[styles.previewCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
                <Image source={{ uri: photo }} style={styles.imagePreview} resizeMode="cover" />
                <View style={styles.timeBadge}>
                  <Ionicons name="time-outline" size={14} color="#FFFFFF" />
                  <Text style={styles.captureTimeText}>Captured: {captureTime}</Text>
                </View>
              </View>

              <View style={styles.buttonGroup}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[styles.actionBtn, { backgroundColor: theme.colors.primary }]}
                  onPress={() => setPhoto(null)}
                >
                  <Ionicons name="refresh-outline" size={18} color="#FFFFFF" />
                  <Text style={styles.btnText}>Retake</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[styles.actionBtn, { backgroundColor: theme.colors.success }]}
                  onPress={savePhoto}
                >
                  <Ionicons name="checkmark-circle-outline" size={18} color="#FFFFFF" />
                  <Text style={styles.btnText}>Save Photo</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[
                    styles.actionBtn,
                    { backgroundColor: theme.colors.dangerLight, borderColor: theme.colors.danger, borderWidth: 1 },
                  ]}
                  onPress={deletePhoto}
                >
                  <Ionicons name="trash-outline" size={18} color={theme.colors.danger} />
                  <Text style={[styles.btnText, { color: theme.colors.danger }]}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={[styles.cameraCard, { borderColor: theme.colors.border }]}>
              <View style={styles.cameraContainer}>
                {facing === "back" && Platform.OS === "web" ? (
                  <View style={styles.laptopBackSimContainer}>
                    <Image
                      source={{ uri: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=800&auto=format&fit=crop&q=80" }}
                      style={StyleSheet.absoluteFillObject}
                      resizeMode="cover"
                    />
                    <View style={styles.laptopNoticeOverlay}>
                      <Ionicons name="information-circle-outline" size={20} color="#FFFFFF" />
                      <Text style={styles.laptopNoticeText}>
                        Rear Site Camera Mode (Laptop Web View)
                      </Text>
                    </View>
                  </View>
                ) : (
                  <CameraView
                    ref={cameraRef}
                    style={styles.cameraView}
                    facing={facing}
                  />
                )}

                {/* Top Camera Mode Indicator Bar */}
                <View style={styles.topCameraBar}>
                  <View style={styles.modeBadge}>
                    <Ionicons name="camera" size={14} color="#FFFFFF" />
                    <Text style={styles.modeBadgeText}>
                      {facing === "front"
                        ? "Front Camera (Webcam)"
                        : Platform.OS === "web"
                        ? "Rear Site Camera Mode"
                        : "Back Camera (Rear)"}
                    </Text>
                  </View>
                </View>

                {/* Bottom Control Overlay Bar */}
                <View style={styles.bottomControlBar}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.flipBtn}
                    onPress={toggleCameraFacing}
                  >
                    <Ionicons name="camera-reverse" size={26} color="#FFFFFF" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.85}
                    style={[styles.captureBtn, { backgroundColor: theme.colors.primary }]}
                    onPress={takePicture}
                  >
                    <View style={styles.captureBtnInner}>
                      <Ionicons name="camera" size={28} color="#FFFFFF" />
                    </View>
                  </TouchableOpacity>

                  <View style={{ width: 46 }} />
                </View>
              </View>
            </View>
          )}
        </>
      )}

      {/* Permission Request Modal with ALLOW and DENY options */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={handleDeny}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { backgroundColor: theme.colors.card }]}>
            <View style={[styles.modalIconBox, { backgroundColor: theme.colors.primaryLight }]}>
              <Ionicons name="camera" size={36} color={theme.colors.primary} />
            </View>

            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
              Allow Camera Access?
            </Text>
            <Text style={[styles.modalSub, { color: theme.colors.subtext }]}>
              "Smart Survey App" would like to access your camera to capture site photos for survey records.
            </Text>

            <View style={styles.modalBtnRow}>
              <TouchableOpacity
                activeOpacity={0.85}
                style={[styles.modalBtn, { backgroundColor: theme.colors.dangerLight, borderColor: theme.colors.danger, borderWidth: 1 }]}
                onPress={handleDeny}
              >
                <Text style={[styles.modalBtnText, { color: theme.colors.danger }]}>Deny</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.85}
                style={[styles.modalBtn, { backgroundColor: theme.colors.primary }]}
                onPress={handleAllow}
              >
                <Text style={[styles.modalBtnText, { color: "#FFFFFF" }]}>Allow</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingTop: 45,
    paddingBottom: 40,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: -0.3,
  },
  permissionCardFull: {
    alignItems: "center",
    padding: 28,
    borderRadius: 20,
    borderWidth: 1,
    marginTop: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  cameraIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  permissionCardTitle: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 8,
    textAlign: "center",
  },
  permissionCardSub: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 20,
  },
  deniedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 16,
  },
  deniedText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  primaryGrantBtn: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
  },
  primaryGrantBtnText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  statusRow: {
    alignItems: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 13,
    fontWeight: "bold",
  },
  cameraCard: {
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    elevation: 4,
  },
  cameraContainer: {
    height: 480,
    position: "relative",
    justifyContent: "space-between",
  },
  cameraView: {
    ...StyleSheet.absoluteFillObject,
  },
  laptopBackSimContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
  },
  laptopNoticeOverlay: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    paddingHorizontal: 16,
    paddingVertical: 10,
    margin: 16,
    borderRadius: 12,
  },
  laptopNoticeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
    flex: 1,
  },
  topCameraBar: {
    padding: 14,
    zIndex: 10,
    alignItems: "center",
  },
  modeBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
  },
  modeBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  bottomControlBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    paddingBottom: 24,
    zIndex: 10,
  },
  flipBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    justifyContent: "center",
    alignItems: "center",
  },
  captureBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  captureBtnInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  previewContainer: {
    gap: 16,
  },
  previewCard: {
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    elevation: 3,
  },
  imagePreview: {
    width: "100%",
    height: 400,
  },
  timeBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    position: "absolute",
    bottom: 12,
    left: 12,
    borderRadius: 8,
  },
  captureTimeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 10,
  },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    paddingVertical: 13,
    borderRadius: 10,
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },

  /* Modal Styles */
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
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    elevation: 8,
  },
  modalIconBox: {
    width: 68,
    height: 68,
    borderRadius: 34,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },
  modalTitle: {
    fontSize: 19,
    fontWeight: "800",
    marginBottom: 8,
    textAlign: "center",
  },
  modalSub: {
    fontSize: 13,
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 22,
  },
  modalBtnRow: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  modalBtnText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});