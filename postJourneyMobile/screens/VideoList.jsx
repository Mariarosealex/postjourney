import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";

export default function VideoList({ route, navigation }) {
  const { category } = route.params;
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // === IMPORTANT: replace this with your machine's local IP visible to the phone ===
  // e.g. "http://172.16.237.198:5000" or whatever `ipconfig` showed as your IPv4.
  const API_BASE = "http://192.168.112.170:5000";

  useEffect(() => {
    let isMounted = true;
    const fetchVideos = async () => {
      try {
        setLoading(true);
        // encode category so spaces or special chars won't break URL
        const encoded = encodeURIComponent(category);
        const url = `${API_BASE}/api/videos/category/${encoded}`;
        const res = await axios.get(url, { timeout: 8000 });
        if (!isMounted) return;
        setVideos(res.data || []);
      } catch (err) {
        console.error("VideoList fetch error:", err?.message || err);
        Alert.alert(
          "Failed to load videos",
          err?.response?.data?.message || err?.message || "Network or server error"
        );
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchVideos();
    return () => {
      isMounted = false;
    };
  }, [category]);

  return (
    <ImageBackground
      source={require("../assets/pjlogo_bg.png")}
      style={styles.bg}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{category.replace("-", " ")} Videos</Text>

        {loading && (
          <View style={{ marginTop: 40 }}>
            <ActivityIndicator size="large" />
          </View>
        )}

        {!loading && videos.length === 0 && (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              No videos found for this category.
            </Text>
          </View>
        )}

        {videos.map((video) => (
          <TouchableOpacity
            key={video._id}
            style={styles.card}
            onPress={() => navigation.navigate("VideoPlayer", { url: video.url })}
          >
            <Image
              source={
                video.thumbnail
                  ? { uri: video.thumbnail }
                  : require("../assets/postjourney_logo.png")
              }
              style={styles.thumbnail}
            />
            <Text style={styles.cardTitle}>{video.title}</Text>
            <Text style={styles.cardDesc} numberOfLines={3}>
              {video.description}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 100,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 25,
  },
  card: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    elevation: 4,
  },
  thumbnail: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: "#eee",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: 14,
    color: "#444",
  },
  empty: {
    marginTop: 30,
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    color: "#333",
    fontSize: 16,
  },
});
