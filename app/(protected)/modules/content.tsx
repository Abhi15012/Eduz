import React, { useRef } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function content() {
  const webViewRef = useRef(null);
 const MOCK_WEB_PAGE = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>LMS Course Player</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body { font-family: -apple-system, sans-serif; padding: 20px; background: #f4f4f9; }
      .card { background: white; padding: 15px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
      .btn { background: #007AFF; color: white; padding: 12px; border-radius: 8px; text-align: center; margin-top: 20px; cursor: pointer; }
      .status { font-size: 12px; color: #666; margin-top: 10px; }
    </style>
  </head>
  <body>
    <div class="card">
      <h2 id="courseTitle">Loading...</h2>
      <p id="courseDesc">Waiting for native headers...</p>
      <div class="btn" onclick="requestDownload()">Download Study Material (PDF)</div>
      <div class="btn" style="background: #34C759" onclick="completeLesson()">Complete Lesson</div>
    </div>
    <p class="status" id="authStatus">Auth: Checking...</p>

    <script>
      // 1. Listen for data sent from Native App
      window.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'LOAD_DATA') {
          document.getElementById('courseTitle').innerText = data.title;
          document.getElementById('courseDesc').innerText = data.description;
          document.getElementById('authStatus').innerText = "Auth Token Found: " + data.token;
        }
      });

      // 2. Send data to Native App
      function requestDownload() {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'DOWNLOAD',
          payload: { fileName: 'React_Basics.pdf', url: 'https://example.com/file.pdf' }
        }));
      }

      function completeLesson() {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'COMPLETE',
          payload: { timestamp: new Date().toISOString() }
        }));
      }
    </script>
  </body>
  </html>
`;

  const dummyUser = { token: "ABC-123-XYZ", name: "Jane Doe" };

  // This function runs once the page loads to "sync" native state to web
  const sendDataToWeb = () => {
    const data = {
      type: 'LOAD_DATA',
      title: "Mastering React Native WebViews",
      description: "Learn how to bridge native and web layers seamlessly.",
      token: dummyUser.token
    };
    // Send to web via the bridge
    webViewRef.current?.injectJavaScript(`
      window.dispatchEvent(new MessageEvent('message', { data: '${JSON.stringify(data)}' }));
    `);
  };

  const onMessage = (event) => {
    const { type, payload } = JSON.parse(event.nativeEvent.data);

    switch (type) {
      case 'DOWNLOAD':
        Alert.alert("Native Download Triggered", `Downloading: ${payload.fileName}`);
        break;
      case 'COMPLETE':
        Alert.alert("Course Updated", `Lesson completed at ${payload.timestamp}`);
        // Here you would navigate: navigation.navigate('SuccessScreen');
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{ 
            html: MOCK_WEB_PAGE,
            headers: { "Authorization": `Bearer ${dummyUser.token}` } 
        }}
        onLoadEnd={sendDataToWeb} // Sync data when finished loading
        onMessage={onMessage}     // Catch messages from web
        style={styles.webview}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  webview: { flex: 1 },
});