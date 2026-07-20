import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const themePresets = {
  nordicTeal: {
    name: "Crisp Ocean Teal & Cyan",
    primaryColor: "#0284C7",
    light: {
      dark: false,
      colors: {
        background: "#F0FDFA",
        card: "#FFFFFF",
        cardElevated: "#FFFFFF",
        text: "#0F172A",
        subtext: "#475569",
        border: "#CCFBF1",
        borderLight: "#E6FFFA",
        primary: "#0284C7",
        primaryLight: "#E0F2FE",
        primaryBorder: "#BAE6FD",
        success: "#10B981",
        successLight: "#ECFDF5",
        warning: "#F59E0B",
        warningLight: "#FFFBEB",
        danger: "#EF4444",
        dangerLight: "#FEF2F2",
        purple: "#8B5CF6",
        purpleLight: "#F5F3FF",
        icon: "#475569",
        inputBg: "#F4FBF9",
        shadowColor: "#0284C7",
      },
    },
    dark: {
      dark: true,
      colors: {
        background: "#081C24",
        card: "#0F2B36",
        cardElevated: "#183B48",
        text: "#F0FDFA",
        subtext: "#94A3B8",
        border: "#1C4A5A",
        borderLight: "#0F2B36",
        primary: "#38BDF8",
        primaryLight: "rgba(56, 189, 248, 0.18)",
        primaryBorder: "rgba(56, 189, 248, 0.4)",
        success: "#34D399",
        successLight: "rgba(52, 211, 153, 0.15)",
        warning: "#FBBF24",
        warningLight: "rgba(251, 191, 36, 0.15)",
        danger: "#F87171",
        dangerLight: "rgba(248, 113, 113, 0.15)",
        purple: "#A78BFA",
        purpleLight: "rgba(167, 139, 250, 0.15)",
        icon: "#94A3B8",
        inputBg: "#0F2B36",
        shadowColor: "#000000",
      },
    },
  },
};

export const lightTheme = themePresets.nordicTeal.light;
export const darkTheme = themePresets.nordicTeal.dark;

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activePreset, setActivePreset] = useState("nordicTeal");

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const changeThemePreset = (presetKey) => {
    if (themePresets[presetKey]) {
      setActivePreset(presetKey);
    }
  };

  const selectedPreset = themePresets[activePreset] || themePresets.nordicTeal;
  const theme = isDarkMode ? selectedPreset.dark : selectedPreset.light;

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        activePreset,
        changeThemePreset,
        themePresets,
        theme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      isDarkMode: false,
      toggleDarkMode: () => {},
      activePreset: "nordicTeal",
      changeThemePreset: () => {},
      themePresets,
      theme: lightTheme,
    };
  }
  return context;
};
