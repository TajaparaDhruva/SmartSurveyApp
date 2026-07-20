import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { useTheme } from "../../../context/ThemeContext";
import { useSurveys } from "../../../context/SurveyContext";

const Home = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { surveys } = useSurveys();

  const recentSurvey = surveys[0] || null;
  const highPriorityCount = surveys.filter((s) => s.priority === "High").length;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Top Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.iconButton, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Ionicons name="menu-outline" size={24} color={theme.colors.text} />
        </TouchableOpacity>

        <View style={styles.brandTitleRow}>
          <Text style={[styles.heading, { color: theme.colors.text }]}>Smart Survey</Text>
          <View style={[styles.brandDot, { backgroundColor: theme.colors.primary }]} />
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.avatarHeaderBtn, { borderColor: theme.colors.primaryBorder }]}
          onPress={() => router.push("/(drawer)/(tabs)/profile")}
        >
          <View style={[styles.headerAvatarCircle, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.headerAvatarText}>DT</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Colorful Hero Welcome Banner */}
      <View style={[styles.heroBanner, { backgroundColor: theme.colors.primary }]}>
        <View style={{ flex: 1 }}>
          <Text style={styles.heroSub}>Welcome Back 👋</Text>
          <Text style={styles.heroTitle}>Dhruva Tajapara</Text>
          <View style={styles.heroBadge}>
            <Ionicons name="school" size={13} color="#FFFFFF" />
            <Text style={styles.heroBadgeText}>Computer Engineering Student</Text>
          </View>
        </View>
        <View style={styles.heroIconBg}>
          <Ionicons name="sparkles" size={32} color="#FFFFFF" />
        </View>
      </View>

      {/* Analytics Overview Section */}
      <View style={styles.sectionHeaderRow}>
        <Text style={[styles.sectionHeading, { color: theme.colors.text }]}>Analytics Overview</Text>
      </View>

      {/* Stats Summary Grid */}
      <View style={styles.statsRow}>
        <View style={[styles.statBox, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
          <View style={styles.statHeader}>
            <View style={[styles.statIconBg, { backgroundColor: theme.colors.primaryLight }]}>
              <Ionicons name="document-text" size={20} color={theme.colors.primary} />
            </View>
            <Text style={[styles.statNumber, { color: theme.colors.primary }]}>{surveys.length}</Text>
          </View>
          <Text style={[styles.statLabel, { color: theme.colors.text }]}>Total Surveys</Text>
          <Text style={[styles.statSubLabel, { color: theme.colors.subtext }]}>Submitted entries</Text>
        </View>

        <View style={[styles.statBox, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
          <View style={styles.statHeader}>
            <View style={[styles.statIconBg, { backgroundColor: theme.colors.dangerLight }]}>
              <Ionicons name="flame" size={20} color={theme.colors.danger} />
            </View>
            <Text style={[styles.statNumber, { color: theme.colors.danger }]}>{highPriorityCount}</Text>
          </View>
          <Text style={[styles.statLabel, { color: theme.colors.text }]}>High Priority</Text>
          <Text style={[styles.statSubLabel, { color: theme.colors.subtext }]}>Requires attention</Text>
        </View>
      </View>

      {/* Quick Tools */}
      <View style={styles.sectionHeaderRow}>
        <Text style={[styles.sectionHeading, { color: theme.colors.text }]}>Quick Tools</Text>
      </View>

      <View style={styles.actionGrid}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.actionCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
          onPress={() => router.push("/(drawer)/(tabs)/survey")}
        >
          <View style={[styles.actionIconBg, { backgroundColor: theme.colors.primaryLight }]}>
            <Ionicons name="add-circle" size={26} color={theme.colors.primary} />
          </View>
          <Text style={[styles.actionText, { color: theme.colors.text }]}>New Survey</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.actionCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
          onPress={() => router.push("/(drawer)/camera")}
        >
          <View style={[styles.actionIconBg, { backgroundColor: theme.colors.successLight }]}>
            <Ionicons name="camera" size={26} color={theme.colors.success} />
          </View>
          <Text style={[styles.actionText, { color: theme.colors.text }]}>Site Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.actionCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
          onPress={() => router.push("/(drawer)/location")}
        >
          <View style={[styles.actionIconBg, { backgroundColor: theme.colors.warningLight }]}>
            <Ionicons name="location" size={26} color={theme.colors.warning} />
          </View>
          <Text style={[styles.actionText, { color: theme.colors.text }]}>GPS Location</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.actionCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
          onPress={() => router.push("/(drawer)/contacts")}
        >
          <View style={[styles.actionIconBg, { backgroundColor: theme.colors.purpleLight }]}>
            <Ionicons name="people" size={26} color={theme.colors.purple} />
          </View>
          <Text style={[styles.actionText, { color: theme.colors.text }]}>Contacts</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Survey */}
      <View style={styles.recentHeader}>
        <Text style={[styles.sectionHeading, { color: theme.colors.text, marginBottom: 0 }]}>
          Recent Survey
        </Text>
        <TouchableOpacity onPress={() => router.push("/(drawer)/(tabs)/history")}>
          <Text style={{ color: theme.colors.primary, fontWeight: "700", fontSize: 14 }}>
            View History →
          </Text>
        </TouchableOpacity>
      </View>

      {recentSurvey ? (
        <View style={[styles.recentCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.siteTitleGroup}>
              <View style={[styles.siteIconBox, { backgroundColor: theme.colors.primaryLight }]}>
                <Ionicons name="business" size={18} color={theme.colors.primary} />
              </View>
              <Text style={[styles.recentTitle, { color: theme.colors.text }]} numberOfLines={1}>
                {recentSurvey.site}
              </Text>
            </View>

            <View style={[styles.priorityPill, { backgroundColor: recentSurvey.priority === "High" ? theme.colors.danger : recentSurvey.priority === "Medium" ? theme.colors.warning : theme.colors.success }]}>
              <Text style={styles.priorityPillText}>{recentSurvey.priority}</Text>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

          <View style={styles.metaRow}>
            <Ionicons name="person-outline" size={15} color={theme.colors.subtext} />
            <Text style={[styles.recentDetail, { color: theme.colors.subtext }]}>
              Client: <Text style={{ color: theme.colors.text, fontWeight: "600" }}>{recentSurvey.client}</Text>
            </Text>
          </View>

          {recentSurvey.date && (
            <View style={styles.metaRow}>
              <Ionicons name="calendar-outline" size={15} color={theme.colors.subtext} />
              <Text style={[styles.recentDetail, { color: theme.colors.subtext }]}>
                Date: <Text style={{ color: theme.colors.text, fontWeight: "500" }}>{recentSurvey.date}</Text>
              </Text>
            </View>
          )}

          {recentSurvey.description && (
            <View style={[styles.descriptionBox, { backgroundColor: theme.colors.inputBg, borderColor: theme.colors.border }]}>
              <Text style={[styles.descriptionText, { color: theme.colors.text }]} numberOfLines={2}>
                "{recentSurvey.description}"
              </Text>
            </View>
          )}
        </View>
      ) : (
        <View style={[styles.recentCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border, alignItems: "center", paddingVertical: 30 }]}>
          <Ionicons name="document-text-outline" size={42} color={theme.colors.subtext} />
          <Text style={{ color: theme.colors.text, fontWeight: "700", marginTop: 10 }}>No Surveys Recorded</Text>
          <Text style={{ color: theme.colors.subtext, fontSize: 13, marginTop: 4 }}>Tap "New Survey" to add your first entry</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingTop: 45,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },
  brandTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  heading: {
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  brandDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  avatarHeaderBtn: {
    borderRadius: 20,
    borderWidth: 2,
    padding: 2,
  },
  headerAvatarCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
  },
  headerAvatarText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "bold",
  },
  heroBanner: {
    borderRadius: 20,
    padding: 22,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
  },
  heroSub: {
    color: "rgba(255, 255, 255, 0.85)",
    fontSize: 14,
    fontWeight: "600",
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "800",
    marginVertical: 4,
  },
  heroBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
    alignSelf: "flex-start",
    marginTop: 6,
  },
  heroBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  heroIconBg: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  sectionHeaderRow: {
    marginBottom: 12,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: -0.2,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  statHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  statIconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  statNumber: {
    fontSize: 26,
    fontWeight: "800",
  },
  statLabel: {
    fontSize: 14,
    fontWeight: "700",
  },
  statSubLabel: {
    fontSize: 11,
    marginTop: 2,
  },
  actionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  actionCard: {
    width: "48%",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    gap: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  actionIconBg: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
  },
  actionText: {
    fontSize: 14,
    fontWeight: "700",
  },
  recentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  recentCard: {
    padding: 18,
    borderRadius: 18,
    borderWidth: 1,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  siteTitleGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
    marginRight: 8,
  },
  siteIconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  recentTitle: {
    fontSize: 17,
    fontWeight: "700",
    flex: 1,
  },
  priorityPill: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
  },
  priorityPillText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  recentDetail: {
    fontSize: 14,
  },
  descriptionBox: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 8,
  },
  descriptionText: {
    fontSize: 13,
    fontStyle: "italic",
    lineHeight: 18,
  },
});
