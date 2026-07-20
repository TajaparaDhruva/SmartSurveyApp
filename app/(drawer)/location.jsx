import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
  Modal,
  Platform,
} from "react-native";
import * as Location from "expo-location";
import * as Clipboard from "expo-clipboard";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";

const LocationScreen = () => {
  const { theme } = useTheme();
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [hasConfirmedPermission, setHasConfirmedPermission] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);

  const openPermissionPrompt = () => {
    setShowModal(true);
  };

  const handleAllow = async () => {
    setShowModal(false);
    setPermissionDenied(false);
    try {
      setLoading(true);
      if (Platform.OS === "web") {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              setLocation({
                latitude: parseFloat(pos.coords.latitude.toFixed(6)),
                longitude: parseFloat(pos.coords.longitude.toFixed(6)),
                accuracy: Math.round(pos.coords.accuracy),
              });
              setPermissionStatus("granted");
              setHasConfirmedPermission(true);
              setLoading(false);
            },
            (err) => {
              console.warn("Web Geolocation error:", err);
              setLocation({
                latitude: 23.0225,
                longitude: 72.5714,
                accuracy: 5,
              });
              setPermissionStatus("denied");
              setHasConfirmedPermission(true);
              setLoading(false);
            },
            { enableHighAccuracy: true, timeout: 10000 }
          );
        } else {
          setLocation({
            latitude: 23.0225,
            longitude: 72.5714,
            accuracy: 5,
          });
          setHasConfirmedPermission(true);
          setLoading(false);
        }
        return;
      }

      let { status } = await Location.requestForegroundPermissionsAsync();
      setPermissionStatus(status);
      setHasConfirmedPermission(true);

      if (status === "granted") {
        getLocation();
      } else {
        setLocation({
          latitude: 23.0225,
          longitude: 72.5714,
          accuracy: 5,
        });
        setLoading(false);
      }
    } catch (e) {
      console.warn("Permission request error:", e);
      setHasConfirmedPermission(true);
      setLoading(false);
    }
  };

  const handleDeny = () => {
    setShowModal(false);
    setHasConfirmedPermission(false);
    setPermissionDenied(true);
  };

  const getLocation = async () => {
    try {
      setLoading(true);

      if (Platform.OS === "web") {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              setLocation({
                latitude: parseFloat(pos.coords.latitude.toFixed(6)),
                longitude: parseFloat(pos.coords.longitude.toFixed(6)),
                accuracy: Math.round(pos.coords.accuracy),
              });
              setPermissionStatus("granted");
              setLoading(false);
            },
            (err) => {
              console.warn("Web Geolocation error:", err);
              if (!location) {
                setLocation({
                  latitude: 23.0225,
                  longitude: 72.5714,
                  accuracy: 5,
                });
              }
              setPermissionStatus("denied");
              setLoading(false);
            },
            { enableHighAccuracy: true, timeout: 8000 }
          );
        } else {
          setLocation({
            latitude: 23.0225,
            longitude: 72.5714,
            accuracy: 5,
          });
          setLoading(false);
        }
        return;
      }

      let { status } = await Location.requestForegroundPermissionsAsync();
      setPermissionStatus(status);

      if (status !== "granted") {
        setLocation({
          latitude: 23.0225,
          longitude: 72.5714,
          accuracy: 5,
        });
        setLoading(false);
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      if (currentLocation && currentLocation.coords) {
        setLocation({
          latitude: parseFloat(currentLocation.coords.latitude.toFixed(6)),
          longitude: parseFloat(currentLocation.coords.longitude.toFixed(6)),
          accuracy: Math.round(currentLocation.coords.accuracy),
        });
      }
    } catch (e) {
      console.warn("Location fetch exception:", e);
      setLocation({
        latitude: 23.0225,
        longitude: 72.5714,
        accuracy: 10,
      });
    } finally {
      setLoading(false);
    }
  };

  const copyLocation = async () => {
    if (!location) {
      if (Platform.OS === "web") {
        window.alert("No location available to copy.");
      } else {
        Alert.alert("No Location", "Please get location first.");
      }
      return;
    }

    const text = `Latitude: ${location.latitude}, Longitude: ${location.longitude} (Accuracy: ${location.accuracy}m)`;
    await Clipboard.setStringAsync(text);

    if (Platform.OS === "web") {
      window.alert("Copied! 📋 Location coordinates copied to clipboard.");
    } else {
      Alert.alert("Copied! 📋", "Location coordinates copied to clipboard.");
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.heading, { color: theme.colors.text }]}>Current Location</Text>

      {/* STEP 1: Permission Prompt Screen */}
      {!hasConfirmedPermission ? (
        <View style={[styles.permissionCardFull, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
          <View style={[styles.locationIconCircle, { backgroundColor: theme.colors.warningLight }]}>
            <Ionicons name="location" size={44} color={theme.colors.warning} />
          </View>

          <Text style={[styles.permissionCardTitle, { color: theme.colors.text }]}>
            Location Access Required
          </Text>
          <Text style={[styles.permissionCardSub, { color: theme.colors.subtext }]}>
            Tap below to grant location permission for capturing site GPS coordinates.
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
            <Text style={styles.primaryGrantBtnText}>Allow Location Access</Text>
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
                  backgroundColor:
                    permissionStatus === "granted"
                      ? theme.colors.successLight
                      : theme.colors.warningLight,
                  borderColor:
                    permissionStatus === "granted"
                      ? theme.colors.success
                      : theme.colors.warning,
                },
              ]}
            >
              <Ionicons
                name={permissionStatus === "granted" ? "checkmark-circle" : "alert-circle"}
                size={16}
                color={permissionStatus === "granted" ? theme.colors.success : theme.colors.warning}
              />
              <Text
                style={[
                  styles.statusText,
                  {
                    color:
                      permissionStatus === "granted"
                        ? theme.colors.success
                        : theme.colors.warning,
                  },
                ]}
              >
                Permission: {permissionStatus === "granted" ? "Granted" : "Default Mock Coords"}
              </Text>
            </View>
          </View>

          {loading ? (
            <View style={[styles.loadingCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
              <Text style={[styles.loadingText, { color: theme.colors.subtext }]}>
                Fetching GPS Coordinates...
              </Text>
            </View>
          ) : location ? (
            <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
              <View style={styles.cardHeader}>
                <Ionicons name="location" size={24} color={theme.colors.warning} />
                <Text style={[styles.cardTitle, { color: theme.colors.text }]}>GPS Coordinates</Text>
              </View>

              <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

              <View style={styles.itemRow}>
                <View style={[styles.iconBox, { backgroundColor: theme.colors.primaryLight }]}>
                  <Ionicons name="navigate" size={18} color={theme.colors.primary} />
                </View>
                <View>
                  <Text style={[styles.label, { color: theme.colors.subtext }]}>Latitude</Text>
                  <Text style={[styles.value, { color: theme.colors.text }]}>{location.latitude}</Text>
                </View>
              </View>

              <View style={styles.itemRow}>
                <View style={[styles.iconBox, { backgroundColor: theme.colors.purpleLight }]}>
                  <Ionicons name="compass" size={18} color={theme.colors.purple} />
                </View>
                <View>
                  <Text style={[styles.label, { color: theme.colors.subtext }]}>Longitude</Text>
                  <Text style={[styles.value, { color: theme.colors.text }]}>{location.longitude}</Text>
                </View>
              </View>

              <View style={styles.itemRow}>
                <View style={[styles.iconBox, { backgroundColor: theme.colors.successLight }]}>
                  <Ionicons name="shield-checkmark" size={18} color={theme.colors.success} />
                </View>
                <View>
                  <Text style={[styles.label, { color: theme.colors.subtext }]}>Accuracy</Text>
                  <Text style={[styles.value, { color: theme.colors.text }]}>{location.accuracy} meters</Text>
                </View>
              </View>
            </View>
          ) : (
            <View style={[styles.emptyCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
              <Ionicons name="location-outline" size={48} color={theme.colors.warning} />
              <Text style={[styles.noLocation, { color: theme.colors.text }]}>
                No Location Captured Yet
              </Text>
              <Text style={{ color: theme.colors.subtext, fontSize: 13, marginTop: 4 }}>
                Tap button below to capture site GPS coordinates
              </Text>
            </View>
          )}

          {/* Refresh / Get Location Button */}
          <TouchableOpacity
            activeOpacity={0.85}
            disabled={loading}
            style={[styles.button, { backgroundColor: theme.colors.primary }]}
            onPress={getLocation}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Ionicons name="refresh" size={20} color="#FFFFFF" />
            )}
            <Text style={styles.buttonText}>
              {loading ? "Fetching Location..." : location ? "Refresh Location" : "Get Current Location"}
            </Text>
          </TouchableOpacity>

          {/* Copy Location Button */}
          <TouchableOpacity
            activeOpacity={0.85}
            style={[styles.button, { backgroundColor: theme.colors.success }]}
            onPress={copyLocation}
          >
            <Ionicons name="copy" size={20} color="#FFFFFF" />
            <Text style={styles.buttonText}>Copy Coordinates</Text>
          </TouchableOpacity>
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
            <View style={[styles.modalIconBox, { backgroundColor: theme.colors.warningLight }]}>
              <Ionicons name="location" size={36} color={theme.colors.warning} />
            </View>

            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
              Allow Location Access?
            </Text>
            <Text style={[styles.modalSub, { color: theme.colors.subtext }]}>
              "Smart Survey App" would like to access your GPS location to record coordinates for your survey sites.
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

export default LocationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingTop: 45,
    paddingBottom: 40,
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
  locationIconCircle: {
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
  card: {
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    elevation: 3,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  loadingCard: {
    padding: 40,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    marginBottom: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: "600",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
  },
  divider: {
    height: 1,
    marginVertical: 14,
  },
  emptyCard: {
    padding: 30,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    elevation: 2,
    marginBottom: 20,
  },
  noLocation: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 10,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
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
    marginTop: 1,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
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