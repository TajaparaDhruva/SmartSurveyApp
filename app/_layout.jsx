import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack } from "expo-router";
import { ThemeProvider } from "../context/ThemeContext";
import { SurveyProvider } from "../context/SurveyContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <SurveyProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" />
            <Stack.Screen name="index" />
            <Stack.Screen name="(drawer)" />
            <Stack.Screen name="preview" />
          </Stack>
        </GestureHandlerRootView>
      </SurveyProvider>
    </ThemeProvider>
  );
}