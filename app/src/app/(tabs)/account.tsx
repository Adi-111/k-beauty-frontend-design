import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView,
  StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import { RoseNoir } from '@/constants/theme';
import { useAuth } from '@/context/auth-context';

const PERKS = [
  { icon: 'gift-outline' as const, text: 'Free birthday gift every year' },
  { icon: 'star-outline' as const, text: 'Earn points on every order' },
  { icon: 'flash-outline' as const, text: 'Early access to new drops' },
];

export default function AccountScreen() {
  const { user, login, register, logout, loading, error } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [showPass, setShowPass] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    if (!email || !password) { Alert.alert('Error', 'Please fill in all fields'); return; }
    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        if (!name) { Alert.alert('Error', 'Please enter your name'); return; }
        await register(name, email, password);
      }
    } catch (e: any) {
      Alert.alert('Error', e?.message ?? 'Something went wrong');
    }
  };

  // ── Logged-in view ──────────────────────────────────────────────────────────
  if (user) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.topBar}>
            <Text style={styles.logo}>O'Circle</Text>
          </View>
          <View style={styles.heroArea}>
            <View style={styles.brandCircle}>
              <Text style={styles.brandInitial}>{user.name?.[0]?.toUpperCase() ?? 'O'}</Text>
            </View>
            <Text style={styles.heroEyebrow}>WELCOME BACK</Text>
            <Text style={styles.heroTitle}>{user.name}</Text>
            <Text style={styles.heroSub}>{user.email}</Text>
          </View>

          <TouchableOpacity style={styles.loyaltyCta} onPress={() => router.push('/loyalty')}>
            <View style={styles.loyaltyIcon}>
              <Ionicons name="diamond-outline" size={20} color={RoseNoir.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.loyaltyCtaTitle}>O'Circle Loyalty</Text>
              <Text style={styles.loyaltyCtaSub}>Earn points • Unlock free products</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={RoseNoir.primary} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.primaryBtn, { margin: 24, backgroundColor: RoseNoir.surfaceContainerLow }]} onPress={logout}>
            <Text style={[styles.primaryBtnText, { color: RoseNoir.onBackground }]}>Sign Out</Text>
            <Ionicons name="log-out-outline" size={16} color={RoseNoir.onBackground} />
          </TouchableOpacity>
          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ── Auth form ───────────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={styles.topBar}>
            <Text style={styles.logo}>O'Circle</Text>
          </View>

          <View style={styles.heroArea}>
            <View style={styles.brandCircle}>
              <Text style={styles.brandInitial}>O</Text>
            </View>
            <Text style={styles.heroEyebrow}>{mode === 'login' ? 'WELCOME BACK' : 'JOIN THE CIRCLE'}</Text>
            <Text style={styles.heroTitle}>{mode === 'login' ? 'Sign in' : 'Create account'}</Text>
            <Text style={styles.heroSub}>
              {mode === 'login' ? 'Your ritual, orders & rewards — all in one place.' : 'Join 12,000+ members. Unlock K-beauty perks.'}
            </Text>
          </View>

          <View style={styles.form}>
            {mode === 'signup' && (
              <View style={styles.inputWrap}>
                <Ionicons name="person-outline" size={18} color={RoseNoir.onSurfaceVariant} style={styles.inputIcon} />
                <TextInput style={styles.input} placeholder="Full name" value={name} onChangeText={setName}
                  placeholderTextColor={RoseNoir.outlineVariant} returnKeyType="next" />
              </View>
            )}
            <View style={styles.inputWrap}>
              <Ionicons name="mail-outline" size={18} color={RoseNoir.onSurfaceVariant} style={styles.inputIcon} />
              <TextInput style={styles.input} placeholder="Email address" value={email} onChangeText={setEmail}
                keyboardType="email-address" autoCapitalize="none" placeholderTextColor={RoseNoir.outlineVariant} returnKeyType="next" />
            </View>
            <View style={styles.inputWrap}>
              <Ionicons name="lock-closed-outline" size={18} color={RoseNoir.onSurfaceVariant} style={styles.inputIcon} />
              <TextInput style={[styles.input, { flex: 1 }]} placeholder="Password" value={password} onChangeText={setPassword}
                secureTextEntry={!showPass} placeholderTextColor={RoseNoir.outlineVariant} returnKeyType="done" />
              <TouchableOpacity onPress={() => setShowPass(v => !v)} style={styles.eyeBtn}>
                <Ionicons name={showPass ? 'eye-off-outline' : 'eye-outline'} size={18} color={RoseNoir.onSurfaceVariant} />
              </TouchableOpacity>
            </View>

            {error && <Text style={{ color: '#c0392b', fontSize: 13, textAlign: 'center' }}>{error}</Text>}

            <TouchableOpacity style={styles.primaryBtn} onPress={handleSubmit} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : (
                <>
                  <Text style={styles.primaryBtnText}>{mode === 'login' ? 'Sign In' : 'Create Account'}</Text>
                  <Ionicons name="arrow-forward" size={16} color="#fff" />
                </>
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => setMode(m => m === 'login' ? 'signup' : 'login')} style={styles.toggleWrap}>
            <Text style={styles.toggleText}>
              {mode === 'login' ? "New to O'Circle?" : 'Already have an account?'}{'  '}
              <Text style={styles.toggleLink}>{mode === 'login' ? 'Join free' : 'Sign in'}</Text>
            </Text>
          </TouchableOpacity>

          {mode === 'signup' && (
            <View style={styles.perksCard}>
              <Text style={styles.perksTitle}>Member perks</Text>
              {PERKS.map(p => (
                <View key={p.text} style={styles.perkRow}>
                  <View style={styles.perkDot}><Ionicons name={p.icon} size={14} color={RoseNoir.primary} /></View>
                  <Text style={styles.perkText}>{p.text}</Text>
                </View>
              ))}
            </View>
          )}

          <TouchableOpacity style={styles.loyaltyCta} onPress={() => router.push('/loyalty')}>
            <View style={styles.loyaltyIcon}><Ionicons name="diamond-outline" size={20} color={RoseNoir.primary} /></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.loyaltyCtaTitle}>O'Circle Loyalty</Text>
              <Text style={styles.loyaltyCtaSub}>Earn points • Unlock free products</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={RoseNoir.primary} />
          </TouchableOpacity>
          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: RoseNoir.background },
  scroll: { paddingBottom: 20 },
  topBar: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 4 },
  logo: { fontSize: 22, fontFamily: 'ui-serif', fontWeight: '700', color: RoseNoir.primary },
  heroArea: { alignItems: 'center', paddingHorizontal: 28, paddingTop: 12, paddingBottom: 28, gap: 6 },
  brandCircle: { width: 72, height: 72, borderRadius: 36, backgroundColor: RoseNoir.primaryContainer, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  brandInitial: { fontSize: 30, fontWeight: '700', color: RoseNoir.primary, fontFamily: 'ui-serif' },
  heroEyebrow: { fontSize: 10, fontWeight: '700', color: RoseNoir.primary, letterSpacing: 2, textTransform: 'uppercase' },
  heroTitle: { fontSize: 30, fontWeight: '800', color: RoseNoir.onBackground, fontFamily: 'ui-serif' },
  heroSub: { fontSize: 14, color: RoseNoir.onSurfaceVariant, textAlign: 'center', lineHeight: 21 },
  form: { gap: 12, paddingHorizontal: 24 },
  inputWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: RoseNoir.surfaceContainerLow, borderRadius: 14, paddingHorizontal: 14, height: 52, gap: 10 },
  inputIcon: { flexShrink: 0 },
  input: { flex: 1, fontSize: 15, color: RoseNoir.onBackground, height: '100%' },
  eyeBtn: { padding: 4 },
  primaryBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: RoseNoir.primary, paddingVertical: 16, borderRadius: 30, marginTop: 6 },
  primaryBtnText: { fontSize: 16, fontWeight: '700', color: '#fff' },
  toggleWrap: { alignItems: 'center', paddingVertical: 18 },
  toggleText: { fontSize: 14, color: RoseNoir.onSurfaceVariant },
  toggleLink: { color: RoseNoir.primary, fontWeight: '700' },
  perksCard: { marginHorizontal: 24, backgroundColor: RoseNoir.primaryContainer, borderRadius: 18, padding: 20, gap: 12, marginBottom: 16 },
  perksTitle: { fontSize: 14, fontWeight: '700', color: RoseNoir.primary },
  perkRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  perkDot: { width: 30, height: 30, borderRadius: 15, backgroundColor: 'rgba(107,30,58,0.12)', alignItems: 'center', justifyContent: 'center' },
  perkText: { fontSize: 13, color: RoseNoir.onPrimaryContainer, flex: 1 },
  loyaltyCta: { flexDirection: 'row', alignItems: 'center', gap: 14, marginHorizontal: 24, backgroundColor: '#fff', borderRadius: 18, padding: 18, shadowColor: '#6b1e3a', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 10, elevation: 2 },
  loyaltyIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: RoseNoir.primaryContainer, alignItems: 'center', justifyContent: 'center' },
  loyaltyCtaTitle: { fontSize: 14, fontWeight: '700', color: RoseNoir.onBackground },
  loyaltyCtaSub: { fontSize: 12, color: RoseNoir.onSurfaceVariant, marginTop: 2 },
});
