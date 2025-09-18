import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function HomeScreen() {
  const { user, signOut } = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>{user?.email}</Text>
      <Pressable style={styles.button} onPress={signOut}>
        <Text style={styles.buttonText}>Log Out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { fontSize: 16, color: '#555' },
  button: { marginTop: 8, backgroundColor: '#ef4444', padding: 12, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold' },
});

