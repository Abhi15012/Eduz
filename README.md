# EduZ

A React Native educational platform built with **Expo SDK 54**, providing students with personalized course discovery, enrollment, bookmarking, and content consumption (videos, readings, PDFs).

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [Git](https://git-scm.com/)
- [Android Studio](https://developer.android.com/studio) (for Android emulator) or [Xcode](https://developer.apple.com/xcode/) (for iOS simulator, macOS only)

### Clone & Install

```bash
git clone <your-repo-url>
cd EduZ
npm install
```

### Run in Development (Expo Go)

```bash
npx expo start
```

Scan the QR code with the **Expo Go** app on your device to preview.

### Run on Emulators / Simulators

For native builds on emulators, you need to prebuild the native projects first:

```bash
npx expo prebuild
```

Then run on your target platform:

```bash
# Android
npx expo run:android

# iOS (macOS only)
npx expo run:ios
```

### OTA Updates (EAS)

```bash
eas update
```

---

## Project Structure

```
EduZ/
├── app/                             # Expo Router file-based routes
│   ├── _layout.tsx                  # Root layout — fonts, auth check, OTA updates, toast provider
│   ├── index.tsx                    # Splash / onboarding screen
│   ├── offline.tsx                  # Offline fallback screen
│   ├── modal.tsx                    # Modal demo
│   ├── (unprotected)/              # Auth screens (no token required)
│   │   ├── signin.tsx              # Login
│   │   ├── register.tsx            # Registration
│   │   ├── fgp.tsx                 # Forgot password
│   │   ├── reset_pwd.tsx           # Reset password
│   │   └── _components/            # Auth UI components (header, texts)
│   ├── (protected)/                # Screens behind authentication
│   │   ├── _layout.tsx             # Protected stack navigator
│   │   ├── enrollmentPage.tsx      # Course detail & enrollment
│   │   ├── profile.tsx             # User profile (JWT-decoded info, dark mode)
│   │   ├── logout.tsx              # Logout confirmation modal
│   │   ├── trending.tsx            # Trending courses
│   │   ├── tutor.tsx               # Tutor profile page
│   │   ├── verticalList.tsx        # Full course list with search
│   │   ├── _components/            # Shared protected UI (cards, lists, banners)
│   │   ├── (tabs)/                 # Bottom tab navigation
│   │   │   ├── list.tsx            # Home dashboard
│   │   │   └── bookMarks.tsx       # Bookmarked courses
│   │   └── modules/                # Course content player
│   │       ├── topics.tsx          # Lesson menu
│   │       ├── content.tsx         # Reading content (WebView)
│   │       ├── video.player.tsx    # Video playback (expo-video)
│   │       ├── download.pdf.tsx    # PDF download & share
│   │       └── dummyData.ts        # Placeholder course steps
│   └── api/
│       └── send-push/+api.ts       # Push notification API route
├── components/                      # Reusable UI components
│   ├── appButton.tsx               # Gradient button (LinearGradient)
│   ├── backButton.tsx              # Navigation back button
│   ├── bg.tsx                      # Background pattern
│   ├── search.texts.tsx            # Rotating search placeholders
│   ├── themed-text.tsx             # Theme-aware Text
│   ├── themed-view.tsx             # Theme-aware View
│   ├── haptic-tab.tsx              # Tab bar with haptic feedback
│   └── ui/                         # Collapsible, icon symbol
├── config/                          # API config & request helpers
│   ├── endpoints.ts                # API base URL & endpoint paths
│   ├── requests.ts                 # postRequest() / getRequest() wrappers
│   └── store.functions.ts          # Token & tutor helpers (get/set/clear)
├── constants/                       # App-wide constants
│   ├── storage.tsx                 # MMKV storage instance & helpers
│   └── theme.ts                    # Light / dark color tokens
├── hooks/                           # Custom React hooks
│   ├── useInternetCheck.ts         # Network connectivity monitor
│   ├── useToast.tsx                # Toast notification context & UI
│   ├── use-color-scheme.ts         # System color scheme detection
│   └── use-theme-color.ts          # Resolved theme color hook
├── services/
│   └── notificationService.ts      # Push notification registration & listeners
├── store/                           # Global state management
│   ├── store.ts                    # Auth store (Zustand + SecureStore)
│   ├── dataStore.ts                # Courses & tutors store
│   ├── pushTokenStore.ts           # Expo push token store
│   └── toandfro.ts                 # Bookmark toggle store
├── utils/
│   └── Auth/                        # Auth controllers, Zod schemas, types
├── firebase.js                      # Firebase web config (analytics)
├── assets/                          # Fonts (Lexend family) & images
├── android/                         # Native Android project
├── ios/                             # Native iOS project
└── scripts/
    └── reset-project.js             # Starter code reset script
```

---

## 1. Authentication & Security

### Flow

| Screen          | Route        | Purpose                    |
| --------------- | ------------ | -------------------------- |
| Sign In         | `/signin`    | Email & password login     |
| Register        | `/register`  | New account creation       |
| Forgot Password | `/fgp`       | Send reset email           |
| Reset Password  | `/reset_pwd` | Set new password via token |

### How It Works

- **Backend API** – All auth goes through a REST API (`https://api.freeapi.app/api/v1/users/*`). No Firebase Auth is used for login.
- **Form Validation** – `react-hook-form` + `zod` schemas enforce:
  - Min 8 characters
  - At least one uppercase, lowercase, number, and special character (`!@#$%^&*(),.?":{}|<>`)
- **Token Storage** – JWT tokens are stored in `expo-secure-store` (iOS Keychain / Android Keystore), never in plain storage.
- **Protected Routes** – `app/(protected)/_layout.tsx` checks for a valid token on mount. Missing/invalid token redirects to `/signin`.
- **JWT Decoding** – `jwt-decode` extracts user info (name, email, role) for the profile screen without a network call.
- **Logout** – Clears token from both Zustand store and SecureStore, then redirects to sign-in.

### Packages

| Package               | Role                                    |
| --------------------- | --------------------------------------- |
| `expo-secure-store`   | Platform-native encrypted token storage |
| `react-hook-form`     | Controlled form state management        |
| `@hookform/resolvers` | Connects Zod schemas to react-hook-form |
| `zod`                 | TypeScript-first schema validation      |
| `jwt-decode`          | Client-side JWT payload decoding        |

---

## 2. Store, Storage (MMKV), Dashboard & Bookmarks

### Zustand Stores

| Store                 | File                      | State                                            |
| --------------------- | ------------------------- | ------------------------------------------------ |
| **useAuthStore**      | `store/store.ts`          | `token` — auth JWT persisted with SecureStore    |
| **coursesStore**      | `store/dataStore.ts`      | `courses`, `tutors` — fetched from API           |
| **usePushTokenStore** | `store/pushTokenStore.ts` | `expoPushToken` — Expo push token                |
| **toAndFroStore**     | `store/toandfro.ts`       | `isBookMarked` — triggers bookmark UI re-renders |

### MMKV Storage (`constants/storage.tsx`)

[react-native-mmkv](https://github.com/nickolaj-jepsen/react-native-mmkv) provides ultra-fast, synchronous key-value storage for non-sensitive data:

| Key Pattern              | Purpose                                         |
| ------------------------ | ----------------------------------------------- |
| `isFirstLaunch`          | Boolean flag — show onboarding or auto-navigate |
| `bookmark-{id}-{header}` | Stores bookmarked course IDs                    |
| `enrolled-{id}-{header}` | Stores enrolled/purchased course IDs            |

`getAllKeys()` is used to filter bookmarks and enrollments at runtime.

### Dashboard (`app/(protected)/(tabs)/list.tsx`)

The home screen fetches courses and tutors on mount, stores them in `coursesStore`, and renders dynamic sections:

- **Search Bar** — Animated rotating placeholder text
- **My Learning** — Enrolled courses (filtered from MMKV enrolled keys)
- **Recommended** — Full course catalog
- **Premium Banner** — Tappable ad that triggers a push notification
- **Your Favorites** — Bookmarked courses
- **Trending** — Horizontal course carousel
- **Skill Mastery Banner** — Promotional card
- **Newly Added** — Latest courses
- Pull-to-refresh support

### Bookmarks (`app/(protected)/(tabs)/bookMarks.tsx`)

- Courses bookmarked via the enrollment page are saved to MMKV with `bookmark-{id}-{header}` keys.
- The bookmarks tab reads all MMKV keys, filters for `bookmark-*`, and displays matching courses.
- `toAndFroStore.toggleBookmark()` triggers re-renders across screens.
- Every 5th bookmark triggers a local push notification as a reward.

### Packages

| Package             | Role                                               |
| ------------------- | -------------------------------------------------- |
| `zustand`           | Lightweight global state management                |
| `react-native-mmkv` | Synchronous, encrypted key-value storage           |
| `@legendapp/list`   | High-performance list rendering for large datasets |
| `expo-image`        | Cached image loading with placeholder support      |

---

## 3. Purchase, Enrollment & WebView

### Enrollment Page (`enrollmentPage.tsx`)

Course detail screen with animated parallax `SectionList`:

- **Description** — Course overview
- **What You'll Learn** — Bullet points
- **Course Includes** — Content breakdown
- **Instructor** — Tappable card → navigates to tutor profile
- **Reviews** — User reviews with star ratings
- **Bookmark Toggle** — Saves/removes from MMKV
- **Enroll Action** — Marks course as enrolled in MMKV (`enrolled-{id}-{header}`)

### Course Content Modules (`app/(protected)/modules/`)

| Screen  | File               | Description                                                     |
| ------- | ------------------ | --------------------------------------------------------------- |
| Topics  | `topics.tsx`       | Lesson menu with 4 step types: Reading, Video, PDF, Assessment  |
| Reading | `content.tsx`      | HTML content rendered in `react-native-webview`                 |
| Video   | `video.player.tsx` | Native video playback via `expo-video`                          |
| PDF     | `download.pdf.tsx` | Download & share PDFs using `expo-file-system` + `expo-sharing` |

### Packages

| Package                | Role                                  |
| ---------------------- | ------------------------------------- |
| `react-native-webview` | Renders HTML/web course content       |
| `expo-video`           | Native video player with controls     |
| `expo-file-system`     | File download management              |
| `expo-sharing`         | Share files via native share sheet    |
| `expo-intent-launcher` | Open files with system apps (Android) |

---

## 4. Toast Notifications & Push Notifications

### useToast (`hooks/useToast.tsx`)

A context-based in-app toast system:

- **Types**: `success`, `error`, `warn`, `info` — each with a distinct icon
- **Animation**: Spring entry/exit powered by `moti` + `react-native-reanimated`
- **Blur Background**: `expo-blur` BlurView with platform-specific intensity
- **Auto-dismiss**: Default 3 seconds (configurable)
- **Theme-aware**: Adapts to light/dark mode

```tsx
const { showToast } = useToast();
showToast("Course enrolled!", "success");
```

### Push Notifications (`services/notificationService.ts`)

- **Registration**: `registerForPushNotificationsAsync()` requests permissions, creates Android notification channels (`urgent` + `default`), and retrieves the Expo push token.
- **Cloud Messaging**: `setupCloudMessaging()` sets up listeners for incoming notifications and user interactions.
- **API Route**: `app/api/send-push/+api.ts` — server-side POST endpoint that sends push notifications via `expo-notifications`.
- **Android Channels**: `urgent` (MAX importance) and `default` (DEFAULT importance).

### Packages

| Package                   | Role                                                |
| ------------------------- | --------------------------------------------------- |
| `expo-notifications`      | Push notification registration, channels & handling |
| `expo-device`             | Device type checks for notification support         |
| `moti`                    | Declarative spring animations for toast             |
| `expo-blur`               | Glass-morphism blur effect for toast background     |
| `react-native-reanimated` | Animation engine powering moti                      |
| `expo-haptics`            | Haptic feedback on tab presses                      |

---

## 5. Networking & Offline Handling

- **Internet Check** — `useInternetCheck` hook (via `@react-native-community/netinfo`) monitors connectivity in real-time.
- **Offline Screen** — When disconnected, the app renders `app/offline.tsx` with a friendly message.
- **API Helpers** — `config/requests.ts` provides `postRequest()` and `getRequest()` wrappers with error handling.

---

## All Dependencies

| Package                                  | Purpose                       |
| ---------------------------------------- | ----------------------------- |
| `expo` ~54.0.33                          | Core Expo SDK                 |
| `expo-router` ~6.0.23                    | File-based routing            |
| `react-native` 0.81.5                    | React Native runtime          |
| `zustand` ^5.0.11                        | Global state management       |
| `react-native-mmkv` ^4.1.2               | Fast key-value storage        |
| `expo-secure-store` ~15.0.8              | Encrypted token storage       |
| `expo-notifications` ~0.32.16            | Push notifications            |
| `react-hook-form` ^7.71.2                | Form state management         |
| `zod` ^4.3.6                             | Schema validation             |
| `nativewind` ^4.2.2                      | Tailwind CSS for React Native |
| `tailwindcss` ^3.4.19                    | Utility CSS framework         |
| `moti` ^0.30.0                           | Declarative animations        |
| `react-native-reanimated` ~4.1.1         | Animation engine              |
| `react-native-gesture-handler` ~2.28.0   | Native gesture support        |
| `react-native-webview` ^13.16.1          | WebView for HTML content      |
| `expo-video` ~3.0.16                     | Video playback                |
| `expo-image` ~3.0.11                     | Optimized image loading       |
| `expo-blur` ~15.0.8                      | Blur effects                  |
| `expo-linear-gradient` ~15.0.8           | Gradient backgrounds          |
| `expo-haptics` ~15.0.8                   | Haptic feedback               |
| `expo-file-system` ~19.0.21              | File operations               |
| `expo-sharing` ~14.0.8                   | Native share sheet            |
| `expo-intent-launcher` ~13.0.8           | Open files with system apps   |
| `expo-updates` ~29.0.16                  | OTA updates via EAS           |
| `expo-device` ~8.0.10                    | Device info for notifications |
| `expo-web-browser` ~15.0.10              | In-app browser                |
| `@legendapp/list` ^2.0.19                | High-performance lists        |
| `@react-native-community/netinfo` 11.4.1 | Network status                |
| `jwt-decode` ^4.0.0                      | JWT token decoding            |
| `@expo/vector-icons` ^15.0.3             | Icon sets                     |
| `@react-navigation/bottom-tabs` ^7.4.0   | Tab navigation                |
| `expo-constants` ~18.0.13                | App constants                 |
| `expo-splash-screen` ~31.0.13            | Splash screen control         |
