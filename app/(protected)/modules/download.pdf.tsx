import { Button } from "@/components/appButton";
import BackButton from "@/components/backButton";
import { Directory, File, Paths } from "expo-file-system";
import * as IntentLauncher from "expo-intent-launcher";
import { useLocalSearchParams } from "expo-router";
import * as Sharing from "expo-sharing";
import { useState } from "react";
import { Alert, Platform, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PDF_URL = "https://pdfobject.com/pdf/sample.pdf";

export default function PdfOpen() {
  const [status, setStatus] = useState("Ready");
  const [localUri, setLocalUri] = useState<string | null>(null);
  const { title } = useLocalSearchParams() as { title: string };
  const [isLoading, setIsLoading] = useState(false);

  const downloadAndOpenPdf = async () => {
    if (localUri) {
      await openPdf(localUri);
      return;
    }

    setIsLoading(true);
    setStatus("Downloading...");

    const destination = new Directory(Paths.cache, "pdfs");

    try {
      destination.create();
      const output = await File.downloadFileAsync(PDF_URL, destination);

      if (!output.exists) {
        throw new Error("Download failed");
      }

      setLocalUri(output.uri);
      setStatus("Downloaded");
      await openPdf(output.uri);
    } catch (error) {
      console.error(error);
      setStatus("Failed");
      Alert.alert("Error", "Could not download or open PDF");
    } finally {
      setIsLoading(false);
    }
  };

  const openPdf = async (fileUri: string) => {
    if (Platform.OS === "ios") {
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri, {
          mimeType: "application/pdf",
          dialogTitle: "Open PDF",
          UTI: "com.adobe.pdf",
        });
      } else {
        Alert.alert("Sharing not available on this device");
      }
    } else if (Platform.OS === "android") {
      try {
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(fileUri, { mimeType: "application/pdf" });
        } else {
          await IntentLauncher.startActivityAsync(
            "android.intent.action.VIEW",
            {
              data: fileUri,
              flags: 1,
              type: "application/pdf",
            },
          );
        }
      } catch (e) {
        console.error("Open PDF failed:", e);
        Alert.alert("Cannot open PDF", "No PDF viewer found");
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 p-4 bg-light dark:bg-dark">
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
      >
        <BackButton />
        <Text className="text-lg text-light-title dark:text-dark-title font-l-semibold">
          {title}
        </Text>
      </View>

      <Button
        label={
          isLoading
            ? "Downloading..."
            : localUri
              ? "Open Downloaded PDF"
              : "Open PDF"
        }
        onPress={downloadAndOpenPdf}
        disabled={isLoading}
      />

      <Text className="mt-4 text-center">{status}</Text>
    </SafeAreaView>
  );
}
