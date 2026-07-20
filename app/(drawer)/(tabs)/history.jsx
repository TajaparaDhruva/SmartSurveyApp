import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../../context/ThemeContext";
import { useSurveys } from "../../../context/SurveyContext";

const History = () => {
  const { theme } = useTheme();
  const { surveys, deleteSurvey } = useSurveys();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const handleDelete = (id, siteName) => {
    if (Platform.OS === "web") {
      const confirmed = window.confirm(`Are you sure you want to delete "${siteName}"?`);
      if (confirmed) {
        deleteSurvey(id);
      }
    } else {
      Alert.alert(
        "Delete Survey",
        `Are you sure you want to delete "${siteName}"?`,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Delete",
            style: "destructive",
            onPress: () => {
              deleteSurvey(id);
            },
          },
        ]
      );
    }
  };

  const filteredData = surveys.filter((item) => {
    const siteMatch = item.site ? item.site.toLowerCase().includes(search.toLowerCase()) : false;
    const clientMatch = item.client ? item.client.toLowerCase().includes(search.toLowerCase()) : false;
    const matchSearch = siteMatch || clientMatch;
    const matchFilter = filter === "All" || item.priority === filter;
    return matchSearch && matchFilter;
  });

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

  const renderItem = ({ item }) => {
    const priorityColor = getPriorityColor(item.priority);

    return (
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.border,
            borderLeftColor: priorityColor,
          },
        ]}
      >
        <View style={styles.cardHeader}>
          <View style={styles.titleGroup}>
            <View style={[styles.siteIconBox, { backgroundColor: theme.colors.primaryLight }]}>
              <Ionicons name="business" size={16} color={theme.colors.primary} />
            </View>
            <Text style={[styles.title, { color: theme.colors.text }]} numberOfLines={1}>
              {item.site}
            </Text>
          </View>
          <View style={[styles.priorityBadge, { backgroundColor: priorityColor }]}>
            <Text style={styles.badgeText}>{item.priority}</Text>
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

        <View style={styles.detailRow}>
          <Ionicons name="person-outline" size={14} color={theme.colors.subtext} />
          <Text style={[styles.detailText, { color: theme.colors.subtext }]}>
            Client: <Text style={{ color: theme.colors.text, fontWeight: "600" }}>{item.client}</Text>
          </Text>
        </View>

        {item.date && (
          <View style={styles.detailRow}>
            <Ionicons name="calendar-outline" size={14} color={theme.colors.subtext} />
            <Text style={[styles.detailText, { color: theme.colors.subtext }]}>
              Date: <Text style={{ color: theme.colors.text, fontWeight: "500" }}>{item.date}</Text>
            </Text>
          </View>
        )}

        {item.description ? (
          <View style={[styles.descBox, { backgroundColor: theme.colors.inputBg, borderColor: theme.colors.border }]}>
            <Text style={[styles.descriptionText, { color: theme.colors.text }]} numberOfLines={2}>
              "{item.description}"
            </Text>
          </View>
        ) : null}

        <View style={styles.actionRow}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.actionBtn,
              { backgroundColor: theme.colors.primaryLight, borderColor: theme.colors.primary, borderWidth: 1 },
            ]}
            onPress={() =>
              router.push({
                pathname: "/preview",
                params: {
                  siteName: item.site,
                  clientName: item.client,
                  description: item.description,
                  priority: item.priority,
                  date: item.date,
                },
              })
            }
          >
            <Ionicons name="eye-outline" size={14} color={theme.colors.primary} />
            <Text style={[styles.actionBtnText, { color: theme.colors.primary }]}>View Details</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.actionBtn,
              { backgroundColor: theme.colors.dangerLight, borderColor: theme.colors.danger, borderWidth: 1 },
            ]}
            onPress={() => handleDelete(item.id, item.site)}
          >
            <Ionicons name="trash-outline" size={14} color={theme.colors.danger} />
            <Text style={[styles.actionBtnText, { color: theme.colors.danger }]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.heading, { color: theme.colors.text }]}>Survey History</Text>

      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
        <Ionicons name="search-outline" size={18} color={theme.colors.subtext} style={{ marginRight: 8 }} />
        <TextInput
          style={[styles.searchInput, { color: theme.colors.text }]}
          placeholder="Search by site or client name..."
          placeholderTextColor={theme.colors.subtext}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch("")}>
            <Ionicons name="close-circle" size={18} color={theme.colors.subtext} />
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        {[
          { label: "All", color: theme.colors.primary },
          { label: "High", color: theme.colors.danger },
          { label: "Medium", color: theme.colors.warning },
          { label: "Low", color: theme.colors.success },
        ].map((item) => (
          <TouchableOpacity
            key={item.label}
            activeOpacity={0.8}
            style={[
              styles.filterBtn,
              { backgroundColor: theme.colors.card, borderColor: theme.colors.border },
              filter === item.label && { backgroundColor: item.color, borderColor: item.color },
            ]}
            onPress={() => setFilter(item.label)}
          >
            <Text
              style={{
                color: filter === item.label ? "#FFFFFF" : theme.colors.text,
                fontWeight: "700",
                fontSize: 13,
              }}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Survey List using FlatList */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <View style={[styles.emptyIconCircle, { backgroundColor: theme.colors.primaryLight }]}>
              <Ionicons name="documents-outline" size={42} color={theme.colors.primary} />
            </View>
            <Text style={[styles.emptyText, { color: theme.colors.text }]}>No Surveys Found</Text>
            <Text style={{ color: theme.colors.subtext, fontSize: 13, marginTop: 4, textAlign: "center" }}>
              Try searching with another keyword or select a different filter
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 45,
  },
  heading: {
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 20,
    letterSpacing: -0.3,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 14,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    outlineStyle: "none",
    outlineWidth: 0,
    borderWidth: 0,
  },
  filterRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 18,
  },
  filterBtn: {
    flex: 1,
    paddingVertical: 9,
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
  },
  card: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderLeftWidth: 5,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  titleGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
    marginRight: 8,
  },
  siteIconBox: {
    width: 30,
    height: 30,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    flex: 1,
  },
  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  detailText: {
    fontSize: 13,
  },
  descBox: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 6,
  },
  descriptionText: {
    fontSize: 13,
    fontStyle: "italic",
    lineHeight: 18,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
    marginTop: 12,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  actionBtnText: {
    fontSize: 12,
    fontWeight: "700",
  },
  emptyBox: {
    alignItems: "center",
    marginTop: 60,
    paddingHorizontal: 20,
  },
  emptyIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "700",
  },
});
