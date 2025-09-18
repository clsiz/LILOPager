import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function RegisterScreen({ navigation }) {
  const { signUp, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const onRegister = async () => {
    if (!email || !password) {
      Alert.alert('Missing info', 'Please enter email and password');
      return;
    }
    if (password.length < 8) {
      Alert.alert('Weak password', 'Use at least 8 characters');
      return;
    }
    if (password !== confirm) {
      Alert.alert('Mismatch', 'Passwords do not match');
      return;
    }
    try {
      setLoading(true);
      await signUp(email, password);
    } catch (e) {
      Alert.alert('Registration failed', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
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
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Confirm Password"
        value={confirm}
        onChangeText={setConfirm}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Pressable style={styles.button} onPress={onRegister} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign Up</Text>}
      </Pressable>

      <Pressable onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Have an account? Sign in</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 12 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  input: { width: '100%', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12 },
  button: { marginTop: 8, width: '100%', backgroundColor: '#16a34a', padding: 12, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold' },
  error: { color: 'crimson' },
  link: { color: '#2563eb', marginTop: 12 },
});

