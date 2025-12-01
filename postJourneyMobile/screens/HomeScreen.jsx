import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen({ route }) {
  const { userEmail } = route.params || {};

  return (
    <LinearGradient
      colors={['#6a11cb', '#2575fc']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.highlight}>PostJourney</Text>

        {userEmail ? (
          <Text style={styles.subText}>Logged in as: {userEmail}</Text>
        ) : (
          <Text style={styles.subText}>Your wellness journey starts here!</Text>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 5,
  },
  highlight: {
    fontSize: 40,
    fontWeight: '800',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  subText: {
    marginTop: 20,
    fontSize: 16,
    color: '#f0f0f0',
  },
});
