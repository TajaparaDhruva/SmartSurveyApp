import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
} from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

export default function CustomDrawerContent(props) {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, isDarkMode } = useTheme();

  // Dynamic colors from theme context
  const primaryColor = theme.colors.primary;
  const drawerBg = theme.dark ? theme.colors.background : theme.colors.card;
  const cardBg = theme.colors.card;
  const textColor = theme.colors.text;
  const subtextColor = theme.colors.subtext;
  const borderColor = theme.colors.border;

  const isActive = (routeKey) => {
    if (routeKey === "dashboard") {
      return (
        pathname === "/" ||
        pathname === "/(drawer)" ||
        pathname === "/(drawer)/(tabs)" ||
        pathname === "/(drawer)/(tabs)/index" ||
        pathname === "/index" ||
        (!pathname.includes("survey") &&
          !pathname.includes("history") &&
          !pathname.includes("camera") &&
          !pathname.includes("contacts") &&
          !pathname.includes("location") &&
          !pathname.includes("clipboard") &&
          !pathname.includes("settings"))
      );
    }
    return pathname.includes(routeKey);
  };

  const navigateTo = (path) => {
    if (props.navigation) {
      props.navigation.closeDrawer();
    }
    router.push(path);
  };

  const corePages = [
    { key: "dashboard", label: "Dashboard", icon: "home-outline", activeIcon: "home", path: "/(drawer)/(tabs)" },
    { key: "survey", label: "New Survey", icon: "document-text-outline", activeIcon: "document-text", path: "/(drawer)/(tabs)/survey" },
    { key: "history", label: "Survey History", icon: "time-outline", activeIcon: "time", path: "/(drawer)/(tabs)/history" },
  ];

  const hardwareUtilities = [
    { key: "camera", label: "Camera Capture", icon: "camera-outline", activeIcon: "camera", path: "/(drawer)/camera" },
    { key: "contacts", label: "Contacts Integration", icon: "people-outline", activeIcon: "people", path: "/(drawer)/contacts" },
    { key: "location", label: "GPS Mapping", icon: "location-outline", activeIcon: "location", path: "/(drawer)/location" },
    { key: "clipboard", label: "Clipboard Actions", icon: "clipboard-outline", activeIcon: "clipboard", path: "/(drawer)/clipboard" },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: drawerBg }]}>
      {/* Dynamic Header Banner using Theme Primary Color */}
      <View style={[styles.banner, { backgroundColor: primaryColor }]} />

      {/* Profile Section with User Name Dhruva Tajapara */}
      <View style={styles.profileSection}>
        <View style={styles.avatarWrapper}>
          <View style={[styles.avatarBorder, { borderColor: cardBg, backgroundColor: primaryColor }]}>
            <View style={[styles.avatarCircle, { backgroundColor: cardBg }]}>
              <Text style={[styles.avatarText, { color: primaryColor }]}>DT</Text>
            </View>
          </View>
          <View style={[styles.statusDot, { backgroundColor: theme.colors.success || "#10B981", borderColor: drawerBg }]} />
        </View>
        <Text style={[styles.userName, { color: textColor }]}>Dhruva Tajapara</Text>
        <Text style={[styles.userRole, { color: subtextColor }]}>Student ID: 892</Text>
      </View>

      {/* Menu List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* CORE PAGES */}
        <Text style={[styles.sectionHeader, { color: subtextColor }]}>CORE PAGES</Text>
        {corePages.map((item) => {
          const active = isActive(item.key);
          return (
            <TouchableOpacity
              key={item.key}
              activeOpacity={0.7}
              style={[
                styles.menuItem,
                active && [styles.activeMenuItem, { backgroundColor: primaryColor }],
              ]}
              onPress={() => navigateTo(item.path)}
            >
              <Ionicons
                name={active ? item.activeIcon : item.icon}
                size={20}
                color={active ? "#FFFFFF" : subtextColor}
                style={styles.menuIcon}
              />
              <Text
                style={[
                  styles.menuItemText,
                  { color: active ? "#FFFFFF" : textColor },
                  active && styles.activeMenuItemText,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}

        {/* HARDWARE UTILITIES */}
        <Text style={[styles.sectionHeader, { color: subtextColor }]}>HARDWARE UTILITIES</Text>
        {hardwareUtilities.map((item) => {
          const active = isActive(item.key);
          return (
            <TouchableOpacity
              key={item.key}
              activeOpacity={0.7}
              style={[
                styles.menuItem,
                active && [styles.activeMenuItem, { backgroundColor: primaryColor }],
              ]}
              onPress={() => navigateTo(item.path)}
            >
              <Ionicons
                name={active ? item.activeIcon : item.icon}
                size={20}
                color={active ? "#FFFFFF" : subtextColor}
                style={styles.menuIcon}
              />
              <Text
                style={[
                  styles.menuItemText,
                  { color: active ? "#FFFFFF" : textColor },
                  active && styles.activeMenuItemText,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}

        {/* Divider Line */}
        <View style={[styles.divider, { backgroundColor: borderColor }]} />

        {/* Settings Option */}
        {(() => {
          const active = isActive("settings");
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.menuItem,
                active && [styles.activeMenuItem, { backgroundColor: primaryColor }],
              ]}
              onPress={() => navigateTo("/(drawer)/settings")}
            >
              <Ionicons
                name={active ? "settings" : "settings-outline"}
                size={20}
                color={active ? "#FFFFFF" : subtextColor}
                style={styles.menuIcon}
              />
              <Text
                style={[
                  styles.menuItemText,
                  { color: active ? "#FFFFFF" : textColor },
                  active && styles.activeMenuItemText,
                ]}
              >
                Settings
              </Text>
            </TouchableOpacity>
          );
        })()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 0 : 0,
  },
  banner: {
    height: 110,
    width: "100%",
  },
  profileSection: {
    alignItems: "center",
    marginTop: -46,
    marginBottom: 16,
  },
  avatarWrapper: {
    position: "relative",
  },
  statusDot: {
    position: "absolute",
    bottom: 3,
    right: 3,
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 3,
  },
  avatarBorder: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  userName: {
    fontSize: 19,
    fontWeight: "800",
    marginTop: 8,
    letterSpacing: -0.2,
  },
  userRole: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginTop: 18,
    marginBottom: 8,
    paddingHorizontal: 22,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginHorizontal: 14,
    marginVertical: 3,
    borderRadius: 24,
  },
  activeMenuItem: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  menuIcon: {
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 15,
    fontWeight: "600",
  },
  activeMenuItemText: {
    fontWeight: "700",
  },
  divider: {
    height: 1,
    marginHorizontal: 22,
    marginVertical: 16,
  },
});
