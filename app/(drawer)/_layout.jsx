import { Drawer } from "expo-router/drawer";
import { useTheme } from "../../context/ThemeContext";
import CustomDrawerContent from "../../components/CustomDrawerContent";

export default function DrawerLayout() {
  const { theme } = useTheme();

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.colors.card,
          elevation: 2,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
        },
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 18,
          color: theme.colors.text,
        },
        headerTintColor: theme.colors.primary,
        drawerStyle: {
          backgroundColor: theme.dark ? theme.colors.background : theme.colors.card,
          width: 285,
        },
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: "Dashboard",
          headerShown: false,
        }}
      />

      <Drawer.Screen
        name="camera"
        options={{
          title: "Camera Capture",
        }}
      />

      <Drawer.Screen
        name="contacts"
        options={{
          title: "Contacts Integration",
        }}
      />

      <Drawer.Screen
        name="location"
        options={{
          title: "GPS Mapping",
        }}
      />

      <Drawer.Screen
        name="clipboard"
        options={{
          title: "Clipboard Actions",
        }}
      />

      <Drawer.Screen
        name="settings"
        options={{
          title: "Settings",
        }}
      />
    </Drawer>
  );
}