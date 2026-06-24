import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ActivityIndicator, Dimensions, FlatList, LayoutAnimation, NativeScrollEvent, NativeSyntheticEvent,
  Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { RoseNoir } from '@/constants/theme';
import { useCart } from '@/context/cart-context';
import { resolveImage } from '@/lib/product-images';
import { api, toProduct, type ApiProduct } from '@/lib/api';
import type { Product } from '@/lib/products';
import { ProductCard } from '@/components/product-card';
import { Stars } from '@/components/stars';
import { Placeholder } from '@/components/placeholder';

const { width: W } = Dimensions.get('window');
const GALLERY_H = W * 1.1;
const CARD_W = (W - 52) / 2;

function Accordion({ title, children }: { title: string; children: string }) {
  const [open, setOpen] = useState(false);
  const toggle = () => {
    if (Platform.OS !== 'web') {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
    setOpen(o => !o);
  };
  return (
    <View style={acc.wrap}>
      <TouchableOpacity style={acc.row} onPress={toggle} activeOpacity={0.7}>
        <Text style={acc.title}>{title}</Text>
        <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={18} color={RoseNoir.primary} />
      </TouchableOpacity>
      {open && <Text style={acc.body}>{children}</Text>}
    </View>
  );
}

const acc = StyleSheet.create({
  wrap: { borderTopWidth: StyleSheet.hairlineWidth, borderColor: RoseNoir.outlineVariant, paddingVertical: 18 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 15, fontWeight: '600', color: RoseNoir.onBackground },
  body: { fontSize: 14, color: RoseNoir.onSurfaceVariant, lineHeight: 23, marginTop: 12 },
});

export default function ProductDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [added, setAdded] = useState(false);
  const insets = useSafeAreaInsets();

  const addBtnScale = useSharedValue(1);
  const addBtnAnim = useAnimatedStyle(() => ({ transform: [{ scale: addBtnScale.value }] }));

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    Promise.all([
      api.get<ApiProduct>(`/products/${slug}`),
      api.get<ApiProduct[]>(`/products/${slug}/related`),
    ]).then(([p, rel]) => {
      if (p) setProduct(toProduct(p));
      setRelated((rel ?? []).map(toProduct));
    }).catch(() => {}).finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <TouchableOpacity style={[styles.backCircle, { margin: 16 }]} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={20} color={RoseNoir.primary} />
        </TouchableOpacity>
        <ActivityIndicator color={RoseNoir.primary} style={{ flex: 1 }} />
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <TouchableOpacity style={[styles.backCircle, { margin: 16 }]} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={20} color={RoseNoir.primary} />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: RoseNoir.onSurfaceVariant }}>Product not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const gallery = product.gallery ?? (product.image ? [product.image] : []);

  const onGalleryScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / W);
    setGalleryIdx(Math.max(0, Math.min(idx, gallery.length - 1)));
  };

  const handleAddToCart = () => {
    addItem(product);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <View style={styles.safe}>
      {/* Gallery + overlay buttons — outside SafeAreaView so image extends to very top */}
      <View style={{ height: GALLERY_H, position: 'relative' }}>
        {gallery.length > 0 ? (
          <FlatList
            data={gallery}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, i) => String(i)}
            onMomentumScrollEnd={onGalleryScroll}
            getItemLayout={(_, i) => ({ length: W, offset: W * i, index: i })}
            renderItem={({ item }) => {
              const img = resolveImage(item);
              return img ? (
                <Image source={img} style={{ width: W, height: GALLERY_H }} contentFit="cover" />
              ) : (
                <Placeholder label={product.name} variant={product.placeholderVariant} icon={product.placeholderIcon} style={{ width: W, height: GALLERY_H }} />
              );
            }}
          />
        ) : (
          <Placeholder label={product.name} variant={product.placeholderVariant} icon={product.placeholderIcon} style={{ width: W, height: GALLERY_H }} />
        )}

        {/* Gradient at top for button contrast */}
        <LinearGradient
          colors={['rgba(0,0,0,0.35)', 'transparent']}
          locations={[0, 0.4]}
          style={[StyleSheet.absoluteFill, { height: 120 }]}
          pointerEvents="none"
        />

        {/* Back + cart buttons — padded below safe-area inset */}
        <View style={[styles.navOverlay, { paddingTop: insets.top + 10 }]}>
          <TouchableOpacity style={styles.backCircle} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={20} color={RoseNoir.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.backCircle} onPress={() => router.push('/(tabs)/cart')}>
            <Ionicons name="bag-outline" size={19} color={RoseNoir.primary} />
          </TouchableOpacity>
        </View>

        {/* Gallery dots — inside a frosted pill so they read on any image */}
        {gallery.length > 1 && (
          <View style={styles.galleryDotsPill}>
            {gallery.map((_, i) => (
              <View key={i} style={[styles.dot, i === galleryIdx && styles.dotActive]} />
            ))}
          </View>
        )}
      </View>

      {/* Scrollable content */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={styles.body}>
          <Text style={styles.collection}>{product.collection}</Text>
          <Text style={styles.name}>{product.name}</Text>

          <View style={styles.ratingRow}>
            <Stars rating={product.rating} size={14} />
            <Text style={styles.ratingCount}>{product.reviewCount.toLocaleString()} reviews</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.price}>${product.price}</Text>
            {product.compareAt && <Text style={styles.compareAt}>${product.compareAt}</Text>}
            {product.badge && (
              <View style={styles.saveBadge}>
                <Text style={styles.saveBadgeText}>{product.badge}</Text>
              </View>
            )}
            <Text style={styles.size}>{product.size}</Text>
          </View>

          <Text style={styles.shortDesc}>{product.shortDesc}</Text>

          {/* Trust badges */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.badgesRow}>
            {([
              { icon: 'leaf-outline',    label: 'Vegan'            },
              { icon: 'globe-outline',   label: 'Made in Korea'    },
              { icon: 'flask-outline',   label: 'Clinically Tested'},
              { icon: 'heart-outline',   label: 'Cruelty-Free'     },
            ] as { icon: React.ComponentProps<typeof Ionicons>['name']; label: string }[]).map(b => (
              <View key={b.label} style={styles.trustBadge}>
                <Ionicons name={b.icon} size={13} color={RoseNoir.primary} />
                <Text style={styles.trustBadgeText}>{b.label}</Text>
              </View>
            ))}
          </ScrollView>

          {/* Accordions */}
          <View style={{ marginTop: 8 }}>
            <Accordion title="Description">{product.description}</Accordion>
            <Accordion title="How to Use">{product.ritual}</Accordion>
            <Accordion title="Full Ingredients">{product.ingredients}</Accordion>
          </View>

          {/* Key Ingredients */}
          {product.keyIngredients.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionEyebrow}>WHAT'S INSIDE</Text>
              <Text style={styles.sectionTitle}>Key Ingredients</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
                {product.keyIngredients.map(ki => (
                  <View key={ki.name} style={styles.ingredientCard}>
                    <Text style={styles.ingredientRole}>{ki.role}</Text>
                    <Text style={styles.ingredientName}>{ki.name}</Text>
                    <Text style={styles.ingredientDesc} numberOfLines={3}>{ki.desc}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Stats */}
          {product.stats && product.stats.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionEyebrow}>BY THE NUMBERS</Text>
              <Text style={styles.sectionTitle}>Why It Works</Text>
              <View style={styles.statsGrid}>
                {product.stats.map(s => (
                  <View key={s.value} style={styles.statCard}>
                    <Text style={styles.statValue}>{s.value}</Text>
                    <Text style={styles.statLabel}>{s.label}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

        </View>
        {/* Related — horizontal rail outside body padding for full-bleed scroll */}
        <View style={styles.section}>
          <Text style={styles.sectionEyebrow}>COMPLETE THE RITUAL</Text>
          <Text style={[styles.sectionTitle, { paddingHorizontal: 22 }]}>You May Also Like</Text>
          <FlatList
            data={related}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={p => p.slug}
            snapToInterval={CARD_W + 12}
            decelerationRate="fast"
            contentContainerStyle={styles.relatedRail}
            renderItem={({ item }) => <ProductCard product={item} width={CARD_W} />}
          />
        </View>
      </ScrollView>

      {/* Sticky Add to Bag — bottom inset-aware */}
      <View style={[styles.stickyBar, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <View style={styles.stickyPrice}>
          <Text style={styles.stickyPriceVal}>${product.price}</Text>
          {product.compareAt && <Text style={styles.stickyPriceOld}>${product.compareAt}</Text>}
        </View>
        <Pressable
          onPress={handleAddToCart}
          onPressIn={() => { addBtnScale.value = withSpring(0.95, { damping: 15, stiffness: 350 }); }}
          onPressOut={() => { addBtnScale.value = withSpring(1, { damping: 15, stiffness: 350 }); }}
          style={{ flex: 1 }}
        >
          <Animated.View style={[styles.addBtn, added && styles.addBtnAdded, addBtnAnim]}>
            {added
              ? <><Ionicons name="checkmark-circle" size={18} color="#fff" /><Text style={styles.addBtnText}>Added to Bag</Text></>
              : <Text style={styles.addBtnText}>Add to Bag</Text>
            }
          </Animated.View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: RoseNoir.background },

  // Gallery overlay
  navOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  backCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.88)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  galleryDotsPill: {
    position: 'absolute',
    bottom: 14,
    alignSelf: 'center',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.55)',
  },
  dotActive: { width: 18, backgroundColor: '#fff' },

  // Body
  body: { padding: 22, paddingTop: 18 },
  collection: { fontSize: 11, fontWeight: '700', color: RoseNoir.primary, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6 },
  name: { fontSize: 26, fontWeight: '800', color: RoseNoir.onBackground, fontFamily: 'ui-serif', lineHeight: 33, marginBottom: 10 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  ratingCount: { fontSize: 13, color: RoseNoir.onSurfaceVariant },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12, flexWrap: 'wrap' },
  price: { fontSize: 28, fontWeight: '800', color: RoseNoir.primary },
  compareAt: { fontSize: 17, color: RoseNoir.onSurfaceVariant, textDecorationLine: 'line-through' },
  saveBadge: { backgroundColor: '#fce8ee', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  saveBadgeText: { fontSize: 12, fontWeight: '700', color: RoseNoir.primary },
  size: { fontSize: 13, color: RoseNoir.onSurfaceVariant, marginLeft: 'auto' },
  shortDesc: { fontSize: 14, color: RoseNoir.onSurfaceVariant, lineHeight: 22, marginBottom: 16 },

  // Trust badges
  badgesRow: { gap: 8, paddingBottom: 4 },
  trustBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: RoseNoir.surfaceContainerLow,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 22,
  },
  trustBadgeText: { fontSize: 12, color: RoseNoir.onSurfaceVariant, fontWeight: '500' },

  // Sections
  section: { marginTop: 30 },
  sectionEyebrow: { fontSize: 10, fontWeight: '700', color: RoseNoir.primary, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4 },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: RoseNoir.onBackground, fontFamily: 'ui-serif', marginBottom: 14 },

  // Ingredients
  ingredientCard: {
    width: W * 0.58,
    backgroundColor: RoseNoir.surfaceContainerLow,
    borderRadius: 16,
    padding: 18,
  },
  ingredientRole: { fontSize: 10, fontWeight: '700', color: RoseNoir.primary, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 },
  ingredientName: { fontSize: 16, fontWeight: '700', color: RoseNoir.onBackground, marginBottom: 6 },
  ingredientDesc: { fontSize: 13, color: RoseNoir.onSurfaceVariant, lineHeight: 20 },

  // Stats
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  statCard: { width: (W - 64) / 2, backgroundColor: RoseNoir.primaryContainer, borderRadius: 16, padding: 18 },
  statValue: { fontSize: 30, fontWeight: '800', color: RoseNoir.primary, fontFamily: 'ui-serif', marginBottom: 4 },
  statLabel: { fontSize: 11, color: RoseNoir.onPrimaryContainer, lineHeight: 16 },

  // Related
  relatedRail: { paddingLeft: 22, paddingRight: 20, gap: 12 },

  // Sticky bar
  stickyBar: {
    position: 'absolute' as const,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 20,
    paddingTop: 14,
    // paddingBottom is set inline using insets.bottom
    backgroundColor: RoseNoir.background,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: RoseNoir.outlineVariant,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 10,
  },
  stickyPrice: { gap: 1 },
  stickyPriceVal: { fontSize: 20, fontWeight: '800', color: RoseNoir.primary },
  stickyPriceOld: { fontSize: 13, color: RoseNoir.onSurfaceVariant, textDecorationLine: 'line-through' },
  addBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    backgroundColor: RoseNoir.primary,
    paddingVertical: 15,
    borderRadius: 30,
  },
  addBtnAdded: { backgroundColor: '#4a7c59' },
  addBtnText: { fontSize: 15, fontWeight: '700', color: '#fff' },
});
