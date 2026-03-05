import BackButton from "@/components/backButton";
import { useToast } from "@/hooks/useToast";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

export default function content() {
  const webViewRef = useRef(null);
  const { title, id, type } = useLocalSearchParams();

  const dummyUser = { token: "ABC-123-XYZ", name: "Jane Doe" };

  const book = `
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        h1 { color: #0ea5e9; }
        background-color: #f8f9fa;
        p { font-size: 16px; line-height: 1.5; }
      </style>
    </head>
    <body>
      <h1>Introduction to Programming</h1>
      <p>Welcome to the Introduction to Programming course! In this course, you will learn the basics of programming using Python. We will cover topics such as variables, data types, control structures, functions, and more.</p>
      <p>By the end of this course, you will have a solid foundation in programming and be ready to tackle more advanced topics. Let's get started!</p>
     <img src="https://picsum.photos/600/400" style="max-width:100%; margin-top:20px;" />
     <p style="margin-top:20px;">This is a sample reading content with an image. Imagine this section contains 2000+ words of text, multiple images, code blocks, and tables to provide a comprehensive learning experience.</p>
  <img src="https://picsum.photos/600/400" style="max-width:100%; margin-top:20px;" />
     
      </body>
  </html>
`;

  const source =
    type === "reading"
      ? { html: book }
      : type === "video"
        ? { uri: "https://your-lms.com/lectures/video-embed.html" }
        : type === "assessment"
          ? {
              html: `
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      html, body { margin: 0; padding: 0; width: 100%; min-height: 100vh; }
      body { font-family: Arial, sans-serif; padding: 20px; box-sizing: border-box; }
      h3 { font-size: 22px; color: #1e293b; margin-bottom: 16px; }
      p { font-size: 16px; color: #334155; margin-bottom: 16px; }
      label { display: block; padding: 14px 16px; margin-bottom: 10px; border: 2px solid #e2e8f0; border-radius: 10px; font-size: 16px; color: #334155; }
      input[type="radio"] { margin-right: 10px; accent-color: #0ea5e9; width: 18px; height: 18px; vertical-align: middle; }
      #submitBtn { display: block; width: 100%; padding: 16px; margin-top: 20px; background: #0ea5e9; color: #fff; font-size: 17px; font-weight: 600; border: none; border-radius: 12px; }
    </style>
  </head>
  <body>

    <h3>Quiz Question</h3>
    <p>What is 5 + 5?</p>

    <label><input type="radio" name="q1" value="8"> 8</label>
    <label><input type="radio" name="q1" value="10"> 10</label>
    <label><input type="radio" name="q1" value="12"> 12</label>

    <button id="submitBtn">Submit Quiz</button>

  </body>
  </html>
  `,
            }
          : { html: "<html><body><h1>Content Not Found</h1></body></html>" };

  const injectjs = `
  document.getElementById('submitBtn')?.addEventListener('click', function() {
    const selectedOption = document.querySelector('input[name="q1"]:checked');

    if (selectedOption) {
      const answer = selectedOption.value;
      window.ReactNativeWebView.postMessage('Selected answer: ' + answer);
    } else {
      window.ReactNativeWebView.postMessage('No option selected');
    }
  });
  true;
  `;
  const {showToast} = useToast()

  const router = useRouter();
  return (
    <SafeAreaView className="bg-white dark:bg-dark flex-1">
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
      >
        <BackButton />
        <Text className="text-lg text-light-title dark:text-dark-title font-l-semibold">
          {title}
        </Text>
      </View>

      <View style={{ flex: 1 }}>
        <WebView
          ref={webViewRef}
          onMessage={(e)=>{
            const message = e.nativeEvent.data;
            console.log("Message from WebView:", message);
            Alert.alert("Quiz Submitted", message);
          }}
          originWhitelist={["*"]}
          source={source}
          style={{ flex: 1 }}
          injectedJavaScript={injectjs}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          router.push("/modules/topics");
        }}
      >
        <Text className="text-center text-dark-title font-l-semibold py-3 bg-primary rounded-lg mx-4 mb-4">
          Next
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  webview: { flex: 1 },
});
