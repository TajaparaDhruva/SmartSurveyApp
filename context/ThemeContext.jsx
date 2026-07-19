import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const lightTheme = {
  dark: false,
  colors: {
    background: "#F5F7FA",
    card: "#FFFFFF",
    text: "#1F2937",
    subtext: "#6B7280",
    border: "#E5E7EB",
    primary: "#2563EB",
    logout: "#EF4444",
    icon: "#1F2937",
    inputBg: "#FFFFFF",
  },
};

export const darkTheme = {
  dark: true,
  colors: {
    background: "#121212",
    card: "#1E1E1E",
    text: "#F3F4F6",
    subtext: "#9CA3AF",
    border: "#374151",
    primary: "#3B82F6",
    logout: "#EF4444",
    icon: "#F3F4F6",
    inputBg: "#2D2D2D",
  },
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, theme }}>
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
      theme: lightTheme,
    };
  }
  return context;
};
