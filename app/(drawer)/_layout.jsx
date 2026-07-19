import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer screenOptions={{ headerShown: true }}>
      <Drawer.Screen
        name="camera"
        options={{ title: "Camera" }}
      />

      <Drawer.Screen
        name="contacts"
        options={{ title: "Contacts" }}
      />

      <Drawer.Screen
        name="location"
        options={{ title: "Location" }}
      />

      <Drawer.Screen
        name="clipboard"
        options={{ title: "Clipboard" }}
      />

      <Drawer.Screen
        name="settings"
        options={{ title: "Settings" }}
      />
    </Drawer>
  );
}