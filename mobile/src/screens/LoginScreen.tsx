import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { authApi } from '../api/auth';

const COLORS = { bg: '#0A0F1E', surface: '#111827', border: '#1E293B', primary: '#22D3EE', text: '#F1F5F9', muted: '#64748B', danger: '#EF4444' };

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) { Alert.alert('Error', 'Please fill all fields'); return; }
    setLoading(true);
    try {
      const { data } = await authApi.login({ email, password });
      if (data.success) {
        await login(data.data);
      }
    } catch (e: any) {
      Alert.alert('Error', e.response?.data?.message || 'Login failed');
    } finally { setLoading(false); }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.logo}>SpringPath</Text>
        <Text style={styles.subtitle}>Sign in to continue learning</Text>
        <TextInput style={styles.input} placeholder="Email" placeholderTextColor={COLORS.muted} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <TextInput style={styles.input} placeholder="Password" placeholderTextColor={COLORS.muted} value={password} onChangeText={setPassword} secureTextEntry />
        <TouchableOpacity style={[styles.button, loading && { opacity: 0.5 }]} onPress={handleLogin} disabled={loading}>
          {loading ? <ActivityIndicator color={COLORS.bg} /> : <Text style={styles.buttonText}>Sign In</Text>}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Don't have an account? Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg, justifyContent: 'center', padding: 20 },
  card: { backgroundColor: COLORS.surface, borderRadius: 16, padding: 24, borderWidth: 1, borderColor: COLORS.border },
  logo: { fontSize: 28, fontWeight: '800', color: COLORS.primary, textAlign: 'center', marginBottom: 8 },
  subtitle: { color: COLORS.muted, textAlign: 'center', marginBottom: 24, fontSize: 14 },
  input: { backgroundColor: COLORS.bg, borderWidth: 1, borderColor: COLORS.border, borderRadius: 12, padding: 14, color: COLORS.text, fontSize: 16, marginBottom: 12 },
  button: { backgroundColor: COLORS.primary, borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 8 },
  buttonText: { color: COLORS.bg, fontSize: 16, fontWeight: '700' },
  link: { color: COLORS.primary, textAlign: 'center', marginTop: 16, fontSize: 14 },
});
