import React from "react";
import { View, StyleSheet, Alert, Linking, Platform } from "react-native";
import { WebView } from "react-native-webview";

export default function VideoPlayer({ route }) {
  const { url } = route.params;

  if (!url) {
    Alert.alert("Error", "No video URL provided.");
    return <View style={styles.container} />;
  }

  // Extract YouTube video ID robustly (handles &params)
  const extractYouTubeId = (u) => {
    try {
      // common youtube patterns
      const regex =
        /(?:youtube\.com\/.*v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]{6,})/;
      const match = u.match(regex);
      if (match && match[1]) {
        // strip any trailing params
        return match[1].split("&")[0];
      }
      // fallback: attempt last path segment
      const last = u.split("/").pop();
      return last.split("?")[0].split("&")[0];
    } catch (e) {
      return "";
    }
  };

  const id = extractYouTubeId(url);

  if (!id) {
    // if we couldn't parse a youtube id, try opening the raw url in browser
    // Useful for non-youtube urls.
    Alert.alert(
      "Cannot play inside the app",
      "Video URL could not be embedded. Opening in external browser.",
      [
        {
          text: "Open",
          onPress: () => Linking.openURL(url),
        },
        { text: "Cancel", style: "cancel" },
      ]
    );
    return <View style={styles.container} />;
  }

  const embed = `https://www.youtube.com/embed/${id}`;

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: embed }}
        style={{ flex: 1 }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
});
