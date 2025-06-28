import { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const router = useRouter();
  const [timerFinished, setTimerFinished] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimerFinished(true);
      router.replace('/(tabs)/index');
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const handleSkip = () => {
    router.replace('/(tabs)/index');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/splash.png')
}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>TastyBites</Text>
      <Text style={styles.tagline}>Discover Delicious Recipes</Text>

      {!timerFinished && (
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip →</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Black background
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 260,
    height: 260,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 40,
  },
  skipButton: {
    backgroundColor: '#f39c12',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  skipText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
