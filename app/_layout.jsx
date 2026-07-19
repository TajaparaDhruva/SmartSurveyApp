import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import { ThemeProvider, useTheme } from "../context/ThemeContext";

function DrawerLayoutContent() {
  const { theme } = useTheme();

  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: theme.colors.card,
          width: 260,
        },
        drawerActiveTintColor: theme.colors.primary,
        drawerInactiveTintColor: theme.colors.text,
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: "600",
        },
      }}
    >
      <Drawer.Screen
        name="login"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />

      <Drawer.Screen
        name="(tabs)"
        options={{
          title: "Home",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="(drawer)/camera"
        options={{
          title: "Camera",
          headerShown: true,
          headerStyle: { backgroundColor: theme.colors.card },
          headerTintColor: theme.colors.text,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="camera" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="(drawer)/contacts"
        options={{
          title: "Contacts",
          headerShown: true,
          headerStyle: { backgroundColor: theme.colors.card },
          headerTintColor: theme.colors.text,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="people" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="(drawer)/location"
        options={{
          title: "Location",
          headerShown: true,
          headerStyle: { backgroundColor: theme.colors.card },
          headerTintColor: theme.colors.text,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="location" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="(drawer)/clipboard"
        options={{
          title: "Clipboard",
          headerShown: true,
          headerStyle: { backgroundColor: theme.colors.card },
          headerTintColor: theme.colors.text,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="clipboard" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="(drawer)/settings"
        options={{
          title: "Settings",
          headerShown: true,
          headerStyle: { backgroundColor: theme.colors.card },
          headerTintColor: theme.colors.text,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="preview"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />
    </Drawer>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <DrawerLayoutContent />
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}