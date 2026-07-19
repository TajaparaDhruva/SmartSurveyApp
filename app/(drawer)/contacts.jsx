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
} from "react-native";
import * as Contacts from "expo-contacts";
import * as Clipboard from "expo-clipboard";
import { useTheme } from "../../context/ThemeContext";

const ContactsScreen = () => {
  const { theme } = useTheme();
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getContacts();
  }, []);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permission Denied", "Contacts permission is required.");
      return;
    }

    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers],
    });

    setContacts(data);
    setFilteredContacts(data);
  };

  const handleSearch = (text) => {
    setSearch(text);

    const result = contacts.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
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
      Alert.alert("No Number Available");
      return;
    }

    await Clipboard.setStringAsync(number);

    Alert.alert("Success", "Contact number copied.");
  };

  const renderItem = ({ item }) => {
    const phone =
      item.phoneNumbers && item.phoneNumbers.length > 0
        ? item.phoneNumbers[0].number
        : null;

    return (
      <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
        <View style={[styles.avatar, { backgroundColor: theme.colors.primary }]}>
          <Text style={styles.avatarText}>
            {item.name ? item.name.charAt(0).toUpperCase() : "?"}
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={[styles.name, { color: theme.colors.text }]}>{item.name}</Text>

          <Text style={[styles.number, { color: theme.colors.subtext }]}>
            {phone ? phone : "No Number"}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.copyBtn}
          onPress={() => copyNumber(phone)}
        >
          <Text style={{ color: "#fff" }}>Copy</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>

      <Text style={[styles.heading, { color: theme.colors.text }]}>Contacts</Text>

      <Text style={[styles.counter, { color: theme.colors.subtext }]}>
        Total Contacts : {filteredContacts.length}
      </Text>

      <TextInput
        placeholder="Search Contact..."
        placeholderTextColor={theme.colors.subtext}
        style={[styles.search, { backgroundColor: theme.colors.inputBg, color: theme.colors.text, borderColor: theme.colors.border }]}
        value={search}
        onChangeText={handleSearch}
      />

      {filteredContacts.length === 0 ? (
        <View style={styles.empty}>
          <Text style={[styles.emptyText, { color: theme.colors.subtext }]}>No Contacts Found</Text>
        </View>
      ) : (
        <FlatList
          data={filteredContacts}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />
      )}
    </View>
  );
};

export default ContactsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  counter: {
    textAlign: "center",
    marginBottom: 15,
    fontSize: 16,
  },

  search: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  avatarText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  name: {
    fontSize: 17,
    fontWeight: "bold",
  },

  number: {
    marginTop: 3,
  },

  copyBtn: {
    backgroundColor: "#22C55E",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },

  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    fontSize: 20,
  },
});