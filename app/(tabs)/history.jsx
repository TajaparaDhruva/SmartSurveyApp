import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

const History = () => {
  const [surveys, setSurveys] = useState([
    {
      id: "1",
      site: "ABC Company",
      client: "John",
      priority: "High",
    },
    {
      id: "2",
      site: "XYZ Factory",
      client: "David",
      priority: "Medium",
    },
    {
      id: "3",
      site: "Royal Mall",
      client: "Amit",
      priority: "Low",
    },
    {
      id: "4",
      site: "Tech Park",
      client: "Rahul",
      priority: "High",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const deleteSurvey = (id) => {
    Alert.alert(
      "Delete Survey",
      "Are you sure you want to delete this survey?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            setSurveys(surveys.filter((item) => item.id !== id));
          },
        },
      ]
    );
  };

  const filteredData = surveys.filter((item) => {
    const matchSearch = item.site
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchFilter =
      filter === "All" || item.priority === filter;

    return matchSearch && matchFilter;
  });

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.site}</Text>

      <Text>Client : {item.client}</Text>

      <Text>Priority : {item.priority}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() =>
            Alert.alert(
              "Survey Details",
              `Site : ${item.site}

Client : ${item.client}

Priority : ${item.priority}`
            )
          }
        >
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteSurvey(item.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Survey History</Text>

      <TextInput
        style={styles.search}
        placeholder="Search Survey..."
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.filterRow}>
        {["All", "High", "Medium", "Low"].map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.filterButton,
              filter === item && styles.activeFilter,
            ]}
            onPress={() => setFilter(item)}
          >
            <Text
              style={{
                color: filter === item ? "#fff" : "#000",
                fontWeight: "bold",
              }}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No Survey Found
          </Text>
        }
      />
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 15,
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  search: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },

  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  filterButton: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  activeFilter: {
    backgroundColor: "#2563EB",
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  viewButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
  },

  deleteButton: {
    backgroundColor: "#EF4444",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  empty: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 50,
    color: "gray",
  },
});