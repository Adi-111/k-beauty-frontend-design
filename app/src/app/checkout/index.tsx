import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView,
  StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';
import { RoseNoir } from '@/constants/theme';
import { useCart } from '@/context/cart-context';
import { useAuth } from '@/context/auth-context';
import { api, type ApiOrder } from '@/lib/api';

const STEPS = ['Information', 'Shipping', 'Payment'];
const SHIPPING = [
  { id: 'standard', label: 'Standard Delivery', sub: '5–7 business days', price: 'Free' },
  { id: 'express', label: 'Express Delivery', sub: '2–3 business days', price: '$9.99' },
];
const PAYMENT = [
  { id: 'card', label: 'Credit / Debit Card', icon: '💳' },
  { id: 'upi', label: 'UPI / NetBanking', icon: '📱' },
  { id: 'cod', label: 'Cash on Delivery', icon: '💵' },
];

export default function CheckoutScreen() {
  const [step, setStep] = useState(0);
  const [shipping, setShipping] = useState('standard');
  const [payment, setPayment] = useState('card');
  const [placing, setPlacing] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const { items, subtotal, clearCart } = useCart();
  const { token, user } = useAuth();

  // Controlled delivery form state
  const [email, setEmail] = useState(user?.email ?? '');
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState(user?.name ?? '');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pin, setPin] = useState('');

  const handleNext = async () => {
    if (step < 2) { setStep(s => s + 1); return; }
    if (!token) { Alert.alert('Sign in required', 'Please sign in to place an order.'); return; }
    if (!street || !city || !pin) { Alert.alert('Missing info', 'Please complete your delivery address.'); return; }
    setPlacing(true);
    try {
      const order = await api.post<ApiOrder>('/orders', {
        paymentMethod: payment,
        shippingMethod: shipping,
        contactEmail: email,
        contactPhone: phone,
        shippingAddress: { street, city, state, pin, country: 'India' },
      }, token);
      clearCart();
      setOrderNumber(order.orderNumber);
      setStep(3);
    } catch (e: any) {
      Alert.alert('Order failed', e?.message ?? 'Please try again.');
    } finally {
      setPlacing(false);
    }
  };

  if (step === 3) {
    return (
      <SafeAreaView style={[styles.safe, { alignItems: 'center', justifyContent: 'center' }]} edges={['top', 'bottom']}>
        <Animated.View entering={ZoomIn.springify()} style={styles.successIcon}>
          <Text style={{ fontSize: 36 }}>✓</Text>
        </Animated.View>
        <Animated.Text entering={FadeIn.delay(400)} style={styles.successTitle}>Order Placed!</Animated.Text>
        <Animated.Text entering={FadeIn.delay(600)} style={styles.successSub}>
          Your ritual is on its way. We'll send tracking details to your email.
        </Animated.Text>
        <Animated.Text entering={FadeIn.delay(700)} style={styles.orderNum}>Order #{orderNumber}</Animated.Text>
        <TouchableOpacity style={styles.successBtn} onPress={() => router.replace('/(tabs)')}>
          <Text style={styles.successBtnText}>Back to Home →</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => step > 0 ? setStep(s => s - 1) : router.back()}>
          <Ionicons name="chevron-back" size={20} color={RoseNoir.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Step indicator */}
      <View style={styles.stepRow}>
        {STEPS.map((s, i) => (
          <View key={s} style={styles.stepItem}>
            <View style={[styles.stepCircle, i <= step && styles.stepCircleActive]}>
              <Text style={[styles.stepNum, i <= step && styles.stepNumActive]}>{i < step ? '✓' : String(i + 1)}</Text>
            </View>
            <Text style={[styles.stepLabel, i === step && styles.stepLabelActive]}>{s}</Text>
            {i < STEPS.length - 1 && <View style={[styles.stepLine, i < step && styles.stepLineActive]} />}
          </View>
        ))}
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

          {/* Step 0: Address */}
          {step === 0 && (
            <View style={styles.form}>
              <Text style={styles.formTitle}>Delivery Information</Text>
              {([
                { label: 'Email', ph: 'hello@email.com', type: 'email-address' as const, value: email, set: setEmail },
                { label: 'Phone', ph: '+91 98765 43210', type: 'phone-pad' as const, value: phone, set: setPhone },
                { label: 'Full Name', ph: 'Your full name', type: 'default' as const, value: fullName, set: setFullName },
                { label: 'Address Line 1', ph: 'Building, Street', type: 'default' as const, value: street, set: setStreet },
                { label: 'City', ph: 'City', type: 'default' as const, value: city, set: setCity },
                { label: 'State', ph: 'State', type: 'default' as const, value: state, set: setState },
                { label: 'PIN Code', ph: '400001', type: 'numeric' as const, value: pin, set: setPin },
              ] as { label: string; ph: string; type: 'email-address' | 'phone-pad' | 'default' | 'numeric'; value: string; set: (v: string) => void }[]).map(f => (
                <View key={f.label} style={styles.inputWrap}>
                  <Text style={styles.inputLabel}>{f.label}</Text>
                  <TextInput
                    style={styles.input}
                    placeholder={f.ph}
                    keyboardType={f.type}
                    value={f.value}
                    onChangeText={f.set}
                    placeholderTextColor={RoseNoir.outlineVariant}
                  />
                </View>
              ))}
            </View>
          )}

          {/* Step 1: Shipping */}
          {step === 1 && (
            <View style={styles.form}>
              <Text style={styles.formTitle}>Shipping Method</Text>
              {SHIPPING.map(opt => (
                <TouchableOpacity key={opt.id} style={[styles.optionRow, shipping === opt.id && styles.optionRowActive]} onPress={() => setShipping(opt.id)}>
                  <View style={[styles.radio, shipping === opt.id && styles.radioActive]} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.optionLabel}>{opt.label}</Text>
                    <Text style={styles.optionSub}>{opt.sub}</Text>
                  </View>
                  <Text style={[styles.optionPrice, opt.price === 'Free' && { color: '#4a7c59' }]}>{opt.price}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <View style={styles.form}>
              <Text style={styles.formTitle}>Payment Method</Text>
              {PAYMENT.map(opt => (
                <TouchableOpacity key={opt.id} style={[styles.optionRow, payment === opt.id && styles.optionRowActive]} onPress={() => setPayment(opt.id)}>
                  <View style={[styles.radio, payment === opt.id && styles.radioActive]} />
                  <Text style={styles.optionIcon}>{opt.icon}</Text>
                  <Text style={[styles.optionLabel, { flex: 1 }]}>{opt.label}</Text>
                </TouchableOpacity>
              ))}
              {payment === 'card' && (
                <View style={[styles.form, { marginTop: 12 }]}>
                  <View style={styles.inputWrap}>
                    <Text style={styles.inputLabel}>Card Number</Text>
                    <TextInput style={styles.input} placeholder="•••• •••• •••• ••••" keyboardType="numeric" placeholderTextColor={RoseNoir.outlineVariant} />
                  </View>
                  <View style={{ flexDirection: 'row', gap: 12 }}>
                    <View style={[styles.inputWrap, { flex: 1 }]}>
                      <Text style={styles.inputLabel}>Expiry</Text>
                      <TextInput style={styles.input} placeholder="MM/YY" keyboardType="numeric" placeholderTextColor={RoseNoir.outlineVariant} />
                    </View>
                    <View style={[styles.inputWrap, { flex: 1 }]}>
                      <Text style={styles.inputLabel}>CVV</Text>
                      <TextInput style={styles.input} placeholder="•••" keyboardType="numeric" secureTextEntry placeholderTextColor={RoseNoir.outlineVariant} />
                    </View>
                  </View>
                </View>
              )}
            </View>
          )}

          {/* Order summary */}
          <View style={styles.orderSummary}>
            <Text style={styles.formTitle}>Order Summary</Text>
            {items.slice(0, 3).map(({ product: p, qty }) => (
              <View key={p.slug} style={styles.summaryItem}>
                <Text style={styles.summaryItemName} numberOfLines={1}>{p.name}</Text>
                <Text style={styles.summaryItemQty}>×{qty}</Text>
                <Text style={styles.summaryItemPrice}>${(p.price * qty).toFixed(2)}</Text>
              </View>
            ))}
            {items.length > 3 && <Text style={{ fontSize: 12, color: RoseNoir.onSurfaceVariant }}>+{items.length - 3} more items</Text>}
            <View style={styles.summaryTotal}>
              <Text style={styles.summaryTotalLabel}>Total</Text>
              <Text style={styles.summaryTotalVal}>${subtotal.toFixed(2)}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.nextBtn} onPress={handleNext} disabled={placing}>
            {placing ? <ActivityIndicator color="#fff" /> : (
              <Text style={styles.nextBtnText}>
                {step === 2 ? 'Place Order →' : `Continue to ${STEPS[step + 1]} →`}
              </Text>
            )}
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: RoseNoir.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: RoseNoir.surfaceContainerLow, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: RoseNoir.onBackground, fontFamily: 'ui-serif' },
  stepRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16 },
  stepItem: { flex: 1, alignItems: 'center', position: 'relative' },
  stepCircle: { width: 28, height: 28, borderRadius: 14, borderWidth: 2, borderColor: RoseNoir.outlineVariant, alignItems: 'center', justifyContent: 'center', backgroundColor: RoseNoir.background },
  stepCircleActive: { borderColor: RoseNoir.primary, backgroundColor: RoseNoir.primary },
  stepNum: { fontSize: 12, fontWeight: '700', color: RoseNoir.onSurfaceVariant },
  stepNumActive: { color: RoseNoir.onPrimary },
  stepLabel: { fontSize: 10, color: RoseNoir.onSurfaceVariant, marginTop: 4, fontWeight: '500' },
  stepLabelActive: { color: RoseNoir.primary, fontWeight: '700' },
  stepLine: { position: 'absolute', top: 13, left: '60%', right: '-40%', height: 2, backgroundColor: RoseNoir.outlineVariant },
  stepLineActive: { backgroundColor: RoseNoir.primary },
  scroll: { padding: 20, gap: 16 },
  form: { gap: 12 },
  formTitle: { fontSize: 18, fontWeight: '700', color: RoseNoir.onBackground, fontFamily: 'ui-serif', marginBottom: 4 },
  inputWrap: { gap: 5 },
  inputLabel: { fontSize: 12, fontWeight: '600', color: RoseNoir.onSurfaceVariant, letterSpacing: 0.3, textTransform: 'uppercase' },
  input: { height: 50, backgroundColor: RoseNoir.surfaceContainerLow, borderRadius: 12, paddingHorizontal: 16, fontSize: 15, color: RoseNoir.onBackground },
  optionRow: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: RoseNoir.surfaceContainerLow, borderRadius: 14, padding: 16 },
  optionRowActive: { backgroundColor: RoseNoir.primaryContainer },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: RoseNoir.outlineVariant },
  radioActive: { borderColor: RoseNoir.primary, backgroundColor: RoseNoir.primary },
  optionLabel: { fontSize: 15, fontWeight: '600', color: RoseNoir.onBackground },
  optionSub: { fontSize: 12, color: RoseNoir.onSurfaceVariant, marginTop: 2 },
  optionPrice: { fontSize: 14, fontWeight: '700', color: RoseNoir.onBackground },
  optionIcon: { fontSize: 20 },
  orderSummary: { backgroundColor: '#fff', borderRadius: 18, padding: 18, gap: 10, shadowColor: '#6b1e3a', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 10, elevation: 2 },
  summaryItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  summaryItemName: { flex: 1, fontSize: 13, color: RoseNoir.onBackground },
  summaryItemQty: { fontSize: 13, color: RoseNoir.onSurfaceVariant },
  summaryItemPrice: { fontSize: 13, fontWeight: '600', color: RoseNoir.onBackground },
  summaryTotal: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: StyleSheet.hairlineWidth, borderColor: RoseNoir.outlineVariant, paddingTop: 10, marginTop: 4 },
  summaryTotalLabel: { fontSize: 15, fontWeight: '700', color: RoseNoir.onBackground },
  summaryTotalVal: { fontSize: 18, fontWeight: '700', color: RoseNoir.primary },
  nextBtn: { backgroundColor: RoseNoir.primary, paddingVertical: 16, borderRadius: 28, alignItems: 'center' },
  nextBtnText: { fontSize: 15, fontWeight: '700', color: RoseNoir.onPrimary },
  successIcon: { width: 80, height: 80, borderRadius: 40, backgroundColor: RoseNoir.primaryContainer, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  successTitle: { fontSize: 30, fontWeight: '700', color: RoseNoir.onBackground, fontFamily: 'ui-serif', marginBottom: 12 },
  successSub: { fontSize: 14, color: RoseNoir.onSurfaceVariant, textAlign: 'center', lineHeight: 22, paddingHorizontal: 32, marginBottom: 12 },
  orderNum: { fontSize: 13, fontWeight: '600', color: RoseNoir.primary, marginBottom: 24 },
  successBtn: { backgroundColor: RoseNoir.primary, paddingHorizontal: 36, paddingVertical: 16, borderRadius: 28 },
  successBtnText: { fontSize: 15, fontWeight: '700', color: RoseNoir.onPrimary },
});
