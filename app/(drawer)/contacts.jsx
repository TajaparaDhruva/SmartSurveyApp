import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  Alert,
  ScrollView,
  Modal,
  Platform,
} from "react-native";
import * as Contacts from "expo-contacts";
import * as Clipboard from "expo-clipboard";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";

const ContactsScreen = () => {
  const { theme } = useTheme();
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [hasConfirmedPermission, setHasConfirmedPermission] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);

  const mockContacts = [];

  const openPermissionPrompt = () => {
    setShowModal(true);
  };

  const handleAllow = async () => {
    setShowModal(false);
    setPermissionDenied(false);
    try {
      if (Platform.OS === "web") {
        setContacts(mockContacts);
        setFilteredContacts(mockContacts);
        setHasConfirmedPermission(true);
        return;
      }

      const { status } = await Contacts.requestPermissionsAsync();
      setHasConfirmedPermission(true);

      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        if (data && data.length > 0) {
          setContacts(data);
          setFilteredContacts(data);
        } else {
          setContacts(mockContacts);
          setFilteredContacts(mockContacts);
        }
      } else {
        setContacts(mockContacts);
        setFilteredContacts(mockContacts);
      }
    } catch (e) {
      setContacts(mockContacts);
      setFilteredContacts(mockContacts);
      setHasConfirmedPermission(true);
    }
  };

  const handleDeny = () => {
    setShowModal(false);
    setHasConfirmedPermission(false);
    setPermissionDenied(true);
  };

  const getContacts = async () => {
    try {
      if (Platform.OS === "web") {
        setContacts(mockContacts);
        setFilteredContacts(mockContacts);
        return;
      }

      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });
        if (data && data.length > 0) {
          setContacts(data);
          setFilteredContacts(data);
        }
      }
    } catch (e) {
      setContacts(mockContacts);
      setFilteredContacts(mockContacts);
    }
  };

  const handleSearch = (text) => {
    setSearch(text);
    const result = contacts.filter((item) =>
      item.name ? item.name.toLowerCase().includes(text.toLowerCase()) : false
    );
    setFilteredContacts(result);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getContacts();
    setRefreshing(false);
  };

  const copyNumber = async (number) => {
    if (!number) {
      if (Platform.OS === "web") {
        window.alert("Contact has no phone number.");
      } else {
        Alert.alert("No Number", "Contact has no phone number.");
      }
      return;
    }
    await Clipboard.setStringAsync(number);
    if (Platform.OS === "web") {
      window.alert(`Copied! 📋 Contact number ${number} copied.`);
    } else {
      Alert.alert("Copied! 📋", `Contact number ${number} copied.`);
    }
  };

  const avatarColors = [
    theme.colors.primary,
    theme.colors.success,
    theme.colors.warning,
    theme.colors.purple,
  ];

  const renderItem = ({ item, index }) => {
    const phone =
      item.phoneNumbers && item.phoneNumbers.length > 0
        ? item.phoneNumbers[0].number
        : null;

    const bg = avatarColors[index % avatarColors.length];

    return (
      <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
        <View style={[styles.avatar, { backgroundColor: bg }]}>
          <Text style={styles.avatarText}>
            {item.name ? item.name.charAt(0).toUpperCase() : "?"}
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={[styles.name, { color: theme.colors.text }]}>{item.name}</Text>
          <Text style={[styles.number, { color: phone ? theme.colors.subtext : theme.colors.danger }]}>
            {phone ? phone : "No Number"}
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.copyBtn,
            { backgroundColor: phone ? theme.colors.success : "#94A3B8" },
          ]}
          onPress={() => copyNumber(phone)}
        >
          <Ionicons name="copy-outline" size={14} color="#FFFFFF" />
          <Text style={styles.copyBtnText}>Copy</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.heading, { color: theme.colors.text }]}>Contacts</Text>

      {/* STEP 1: Permission Prompt Screen */}
      {!hasConfirmedPermission ? (
        <View style={[styles.permissionCardFull, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
          <View style={[styles.contactsIconCircle, { backgroundColor: theme.colors.purpleLight }]}>
            <Ionicons name="people" size={44} color={theme.colors.purple} />
          </View>

          <Text style={[styles.permissionCardTitle, { color: theme.colors.text }]}>
            Contacts Access Required
          </Text>
          <Text style={[styles.permissionCardSub, { color: theme.colors.subtext }]}>
            Tap below to grant contacts permission to import client survey contacts.
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
            <Text style={styles.primaryGrantBtnText}>Allow Contacts Access</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {/* Contact Counter Pill */}
          <View style={styles.counterRow}>
            <View style={[styles.badgePill, { backgroundColor: theme.colors.purpleLight, borderColor: theme.colors.purple }]}>
              <Ionicons name="people" size={16} color={theme.colors.purple} />
              <Text style={[styles.counterText, { color: theme.colors.purple }]}>
                Total Contacts: {filteredContacts.length}
              </Text>
            </View>
          </View>

          {/* Search Input Bar */}
          <View style={[styles.searchContainer, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
            <Ionicons name="search-outline" size={18} color={theme.colors.subtext} style={{ marginRight: 8 }} />
            <TextInput
              placeholder="Search contact by name..."
              placeholderTextColor={theme.colors.subtext}
              style={[styles.searchInput, { color: theme.colors.text }]}
              value={search}
              onChangeText={handleSearch}
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => handleSearch("")}>
                <Ionicons name="close-circle" size={18} color={theme.colors.subtext} />
              </TouchableOpacity>
            )}
          </View>

          {/* Empty State or Contact List */}
          {filteredContacts.length === 0 ? (
            <View style={styles.empty}>
              <Ionicons name="person-remove-outline" size={56} color={theme.colors.subtext} />
              <Text style={[styles.emptyText, { color: theme.colors.text }]}>No Contacts Found</Text>
              <Text style={{ color: theme.colors.subtext, fontSize: 13, marginTop: 4 }}>
                Try searching for a different contact name
              </Text>
            </View>
          ) : (
            <FlatList
              data={filteredContacts}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              contentContainerStyle={{ paddingBottom: 30 }}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={[theme.colors.primary]}
                />
              }
            />
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
            <View style={[styles.modalIconBox, { backgroundColor: theme.colors.purpleLight }]}>
              <Ionicons name="people" size={36} color={theme.colors.purple} />
            </View>

            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
              Allow Contacts Access?
            </Text>
            <Text style={[styles.modalSub, { color: theme.colors.subtext }]}>
              "Smart Survey App" would like to access your phone contacts to import client details for survey reports.
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

export default ContactsScreen;

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
  contactsIconCircle: {
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
  counterRow: {
    alignItems: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  badgePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  counterText: {
    fontSize: 13,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    outlineStyle: "none",
    outlineWidth: 0,
    borderWidth: 0,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
  },
  number: {
    marginTop: 2,
    fontSize: 13,
  },
  copyBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  copyBtnText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "bold",
  },
  empty: {
    paddingVertical: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 12,
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