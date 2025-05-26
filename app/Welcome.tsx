
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/ui/button';

export default function Welcome() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to ChipAway!</Text>
        <Text style={styles.description}>
          Your golf training app designed to help you improve your game.
        </Text>

        <View style={styles.actions}>
          {/* Now the Button’s `style` prop will work because ButtonProps was updated */}
          <Button
            onPress={() => router.push('/Dashboard')}
            style={styles.button}
          >
            Get Started
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#10B981',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 32,
  },
  actions: {
    width: '100%',           // OK on a View
  },
  button: {
    width: '100%',           // OK now that ButtonProps uses StyleProp<ViewStyle>
  },
});