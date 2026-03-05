import { usePushTokenStore } from "@/store/pushTokenStore";
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("urgent", {
      name: "urgent",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });

    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.warn("Notification permission not granted");
    return;
  }

  const projectId =
    Constants?.expoConfig?.extra?.eas?.projectId ??
    Constants?.easConfig?.projectId;

  if (!projectId) {
    console.error("Project ID not found");
    return;
  }

  const token = (
    await Notifications.getExpoPushTokenAsync({
      projectId,
    })
  ).data;

  usePushTokenStore.getState().setExpoPushToken(token);

  console.log("Expo Push Token:", token);

  return token;
}

export async function setupCloudMessaging() {
  await registerForPushNotificationsAsync();

  const notificationListener = Notifications.addNotificationReceivedListener((notification) => {
  console.log("FULL NOTIFICATION:", JSON.stringify(notification, null, 2));
});

  const responseListener =
    Notifications.addNotificationResponseReceivedListener((response) => {
      console.log("Notification clicked:", response);
    });

  return () => {
    notificationListener.remove();
    responseListener.remove();
  };
}