import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Swipeable } from 'react-native-gesture-handler';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { RoseNoir } from '@/constants/theme';
import { useCart } from '@/context/cart-context';
import { resolveImage } from '@/lib/product-images';

const FREE_SHIP_MIN = 40;

function ShipBar({ subtotal }: { subtotal: number }) {
  const progress = Math.min(subtotal / FREE_SHIP_MIN, 1);
  const remaining = Math.max(FREE_SHIP_MIN - subtotal, 0);
  const fillWidth = useSharedValue(0);

  const fillAnim = useAnimatedStyle(() => ({
    width: `${fillWidth.value * 100}%` as any,
  }));

  // Animate whenever progress changes
  fillWidth.value = withTiming(progress, { duration: 500 });

  return (
    <View style={styles.shipBar}>
      <View style={styles.shipTrack}>
        <Animated.View style={[styles.shipFill, fillAnim]} />
      </View>
      <Text style={styles.shipText}>
        {remaining === 0 ? '🎉 You have free shipping!' : `Add $${remaining.toFixed(2)} more for free shipping`}
      </Text>
    </View>
  );
}

function SwipeDeleteAction({ onDelete }: { onDelete: () => void }) {
  return (
    <TouchableOpacity style={styles.deleteAction} onPress={onDelete}>
      <Ionicons name="trash-outline" size={20} color="#fff" />
      <Text style={styles.deleteActionText}>Remove</Text>
    </TouchableOpacity>
  );
}

export default function CartScreen() {
  const { items, removeItem, setQty, subtotal, itemCount } = useCart();

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Your Bag</Text>
        </View>
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>🛒</Text>
          <Text style={styles.emptyTitle}>Your bag is empty</Text>
          <Text style={styles.emptySub}>Discover our K-beauty rituals and find your perfect routine.</Text>
          <TouchableOpacity style={styles.emptyBtn} onPress={() => router.push('/(tabs)/shop')}>
            <Text style={styles.emptyBtnText}>Shop Now →</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Bag</Text>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>{itemCount} {itemCount === 1 ? 'item' : 'items'}</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Animated free shipping bar */}
        <ShipBar subtotal={subtotal} />

        {/* Items — swipe left to remove */}
        {items.map(({ product: p, qty }) => {
          const img = resolveImage(p.image);
          return (
            <Swipeable
              key={p.slug}
              renderRightActions={() => <SwipeDeleteAction onDelete={() => removeItem(p.slug)} />}
              overshootRight={false}
            >
              <View style={styles.item}>
                <View style={styles.itemImg}>
                  {img ? (
                    <Image source={img} style={{ flex: 1 }} contentFit="cover" />
                  ) : (
                    <View style={{ flex: 1, backgroundColor: RoseNoir.surfaceContainerLow }} />
                  )}
                </View>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemCat}>{p.category}</Text>
                  <Text style={styles.itemName} numberOfLines={2}>{p.name}</Text>
                  <Text style={styles.itemSize}>{p.size}</Text>
                  <View style={styles.itemBottom}>
                    <View style={styles.qtyRow}>
                      <TouchableOpacity style={styles.qtyBtn} onPress={() => setQty(p.slug, qty - 1)}>
                        <Text style={styles.qtyBtnText}>−</Text>
                      </TouchableOpacity>
                      <Text style={styles.qtyNum}>{qty}</Text>
                      <TouchableOpacity style={styles.qtyBtn} onPress={() => setQty(p.slug, qty + 1)}>
                        <Text style={styles.qtyBtnText}>+</Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.itemPrice}>${(p.price * qty).toFixed(2)}</Text>
                  </View>
                </View>
              </View>
            </Swipeable>
          );
        })}

        {/* Order Summary */}
        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={[styles.summaryValue, { color: subtotal >= FREE_SHIP_MIN ? '#4a7c59' : RoseNoir.onBackground }]}>
              {subtotal >= FREE_SHIP_MIN ? 'Free' : '$4.99'}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Circle Member Discount</Text>
            <Text style={[styles.summaryValue, { color: RoseNoir.primary }]}>–$0.00</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryTotal}>Total</Text>
            <Text style={styles.summaryTotalValue}>${(subtotal + (subtotal >= FREE_SHIP_MIN ? 0 : 4.99)).toFixed(2)}</Text>
          </View>

          {/* Promo */}
          <View style={styles.promoRow}>
            <TextInput
              style={styles.promoInput}
              placeholder="Promo code"
              placeholderTextColor={RoseNoir.outlineVariant}
            />
            <TouchableOpacity style={styles.promoBtn}>
              <Text style={styles.promoBtnText}>Apply</Text>
            </TouchableOpacity>
          </View>

          {/* CTA */}
          <TouchableOpacity style={styles.checkoutBtn} onPress={() => router.push('/checkout')}>
            <Text style={styles.checkoutBtnText}>Proceed to Checkout →</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/(tabs)/shop')} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, marginTop: 12 }}>
            <Ionicons name="chevron-back" size={14} color={RoseNoir.primary} />
            <Text style={styles.continueLink}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: RoseNoir.background },
  header: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 20, paddingVertical: 16 },
  headerTitle: { fontSize: 24, fontWeight: '800', color: RoseNoir.onBackground, fontFamily: 'ui-serif' },
  headerBadge: { backgroundColor: RoseNoir.primaryContainer, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  headerBadgeText: { fontSize: 12, color: RoseNoir.primary, fontWeight: '700' },
  scroll: { padding: 20, gap: 0 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40, gap: 14 },
  emptyIcon: { fontSize: 56 },
  emptyTitle: { fontSize: 24, fontWeight: '800', color: RoseNoir.onBackground, fontFamily: 'ui-serif' },
  emptySub: { fontSize: 14, color: RoseNoir.onSurfaceVariant, textAlign: 'center', lineHeight: 22 },
  emptyBtn: { backgroundColor: RoseNoir.primary, paddingHorizontal: 32, paddingVertical: 15, borderRadius: 30, marginTop: 8 },
  emptyBtnText: { fontSize: 15, fontWeight: '700', color: RoseNoir.onPrimary },
  shipBar: { backgroundColor: RoseNoir.surfaceContainerLow, borderRadius: 16, padding: 14, gap: 8, marginBottom: 20 },
  shipTrack: { height: 6, backgroundColor: 'rgba(107,30,58,0.12)', borderRadius: 3, overflow: 'hidden' },
  shipFill: { height: '100%', backgroundColor: RoseNoir.primary, borderRadius: 3 },
  shipText: { fontSize: 13, color: RoseNoir.primary, fontWeight: '600' },
  deleteAction: {
    backgroundColor: '#c0392b',
    justifyContent: 'center',
    alignItems: 'center',
    width: 84,
    borderRadius: 16,
    marginBottom: 14,
    gap: 4,
  },
  deleteActionText: { fontSize: 11, color: '#fff', fontWeight: '700' },
  item: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    gap: 14,
    shadowColor: '#6b1e3a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 2,
  },
  itemImg: { width: 86, height: 110, borderRadius: 12, overflow: 'hidden', backgroundColor: RoseNoir.surfaceContainerLow },
  itemInfo: { flex: 1, gap: 3 },
  itemCat: { fontSize: 9, fontWeight: '700', color: RoseNoir.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: 0.8 },
  itemName: { fontSize: 14, fontWeight: '600', color: RoseNoir.onBackground, lineHeight: 20 },
  itemSize: { fontSize: 12, color: RoseNoir.onSurfaceVariant },
  itemBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 0, backgroundColor: RoseNoir.surfaceContainerLow, borderRadius: 22, overflow: 'hidden' },
  qtyBtn: { width: 34, height: 34, alignItems: 'center', justifyContent: 'center' },
  qtyBtnText: { fontSize: 18, color: RoseNoir.primary, fontWeight: '500' },
  qtyNum: { width: 32, textAlign: 'center', fontSize: 14, fontWeight: '700', color: RoseNoir.onBackground },
  itemPrice: { fontSize: 16, fontWeight: '800', color: RoseNoir.primary },
  summary: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 22,
    gap: 14,
    marginTop: 4,
    shadowColor: '#6b1e3a',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  summaryTitle: { fontSize: 18, fontWeight: '700', color: RoseNoir.onBackground, fontFamily: 'ui-serif', marginBottom: 2 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  summaryLabel: { fontSize: 14, color: RoseNoir.onSurfaceVariant },
  summaryValue: { fontSize: 14, fontWeight: '600', color: RoseNoir.onBackground },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: RoseNoir.outlineVariant },
  summaryTotal: { fontSize: 16, fontWeight: '700', color: RoseNoir.onBackground },
  summaryTotalValue: { fontSize: 22, fontWeight: '800', color: RoseNoir.primary },
  promoRow: { flexDirection: 'row', gap: 10 },
  promoInput: { flex: 1, height: 48, backgroundColor: RoseNoir.surfaceContainerLow, borderRadius: 12, paddingHorizontal: 14, fontSize: 14, color: RoseNoir.onBackground },
  promoBtn: { backgroundColor: RoseNoir.primary, paddingHorizontal: 18, height: 48, alignItems: 'center', justifyContent: 'center', borderRadius: 12 },
  promoBtnText: { fontSize: 13, fontWeight: '700', color: '#fff' },
  checkoutBtn: { backgroundColor: RoseNoir.primary, paddingVertical: 17, borderRadius: 30, alignItems: 'center' },
  checkoutBtnText: { fontSize: 16, fontWeight: '700', color: RoseNoir.onPrimary },
  continueLink: { fontSize: 13, color: RoseNoir.primary, fontWeight: '600' },
});
