import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function LoginScreen({ navigation }) {
  const { signIn, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing info', 'Please enter email and password');
      return;
    }
    try {
      setLoading(true);
      await signIn(email, password);
    } catch (e) {
      // error is handled by context, optionally show alert
      Alert.alert('Login failed', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Pressable style={styles.button} onPress={onLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign In</Text>}
      </Pressable>

      <Pressable onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>No account? Create one</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 12 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  input: { width: '100%', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12 },
  button: { marginTop: 8, width: '100%', backgroundColor: '#2563eb', padding: 12, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold' },
  error: { color: 'crimson' },
  link: { color: '#2563eb', marginTop: 12 },
});

