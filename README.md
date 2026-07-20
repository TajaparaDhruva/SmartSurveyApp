# 📋 Smart Survey App

A modern, feature-rich cross-platform survey management and mobile hardware utility application built using **React Native**, **Expo SDK 54**, and **Expo Router**.


---

## ✨ Features & Highlights

### 📱 Core Pages & Navigation
- **Custom Teal Drawer Navigation**: Custom branded side drawer menu featuring category headers (`CORE PAGES`, `HARDWARE UTILITIES`), rounded active item pills, profile cover banner, and quick settings access.
- **Interactive Dashboard**: Survey statistics, quick action shortcuts, recent survey history, and survey management overview.
- **Survey Creator**: Multi-field survey form with priority selectors, category tagging, date pickers, and dynamic survey submission.
- **Survey History & Filtering**: Searchable survey records with status filter tabs (*All*, *Completed*, *Pending*, *In Progress*), detailed view modals, and deletion actions.

### 🛠️ Hardware Utilities
- **Camera Capture**: High-quality camera viewfinder integration, flash toggle, camera flipping (front/back), image preview modal, and photo gallery saving.
- **Contacts Integration**: Import contacts, quick search filtering, phone number copying with haptic/alert feedback, and contact permission handler.
- **GPS Mapping**: Real-time geolocation detection, latitude/longitude display, accuracy rating, address geocoding, and interactive map preview link.
- **Clipboard Actions**: Read & write system clipboard data, quick note pasting, and toast feedback.

### 👤 Profile & Authentication
- **User Authentication**: Modern Login & Sign Up screen with show/hide password toggle, remember me checkbox, and input focus outline fixes.
- **Profile Management**: Profile page displaying student credentials (**Dhruva Tajapara** / **Student ID: 892**), active online status badge, email, phone, and department info.
- **Interactive Modals**: Fully functional **Edit Profile** and **Change Password** modals with live updates, validation, and toast notifications.
- **Log Out Action**: One-tap sign out routing back to the authentication page.

### 🎨 Design & Theme System
- **Dynamic Light & Dark Theme**: Built-in `ThemeContext` supporting seamless dark mode toggling and crisp color palettes (*Nordic Teal & Cyan*).
- **Polished Mobile & Web UI**: Universal responsive layout built with clean typography, card elevations, smooth transitions, and zero default browser focus outlines.

---

## 📁 Project Structure

```text
02SmartSurveyApp/
├── app/
│   ├── (drawer)/
│   │   ├── (tabs)/
│   │   │   ├── index.jsx        # Dashboard Screen
│   │   │   ├── survey.jsx       # New Survey Form
│   │   │   ├── history.jsx      # Survey History
│   │   │   ├── profile.jsx      # User Profile Screen
│   │   │   └── _layout.jsx      # Bottom Tabs Layout
│   │   ├── camera.jsx           # Camera Capture Utility
│   │   ├── contacts.jsx         # Contacts Integration
│   │   ├── location.jsx         # GPS Location Mapping
│   │   ├── clipboard.jsx        # Clipboard Utility
│   │   ├── settings.jsx         # App Settings & Preferences
│   │   └── _layout.jsx          # Drawer Navigation Layout
│   ├── login.jsx                # Login / Authentication Screen
│   ├── index.jsx                # Entry Redirect Route
│   └── _layout.jsx              # Root Stack Layout
├── components/
│   └── CustomDrawerContent.jsx  # Custom Dark Teal Drawer Menu
├── context/
│   ├── SurveyContext.jsx        # Global Survey State Management
│   └── ThemeContext.jsx         # Light & Dark Theme System
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18 or higher)
- Expo Go app on mobile (Android/iOS) or Android Studio / Xcode for emulators.

### 2. Installation
Clone the repository and install project dependencies:

```bash
git clone https://github.com/TajaparaDhruva/SmartSurveyApp.git
cd SmartSurveyApp
npm install
```

### 3. Run the App

Start the Expo development server:

```bash
npx expo start
```

Press:
- `a` to run on **Android Emulator**
- `i` to run on **iOS Simulator**
- `w` to run on **Web Browser**

---

## 🛠️ Technology Stack

- **Framework**: React Native, Expo SDK 54
- **Routing**: Expo Router v6 (File-based navigation with Drawer & Tabs)
- **Icons**: Expo Vector Icons (Ionicons)
- **State Management**: React Context API (`SurveyContext`, `ThemeContext`)
- **Modules**: `expo-camera`, `expo-location`, `expo-contacts`, `expo-clipboard`

---

