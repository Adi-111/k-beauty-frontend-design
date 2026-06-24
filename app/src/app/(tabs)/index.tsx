import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { RoseNoir } from '@/constants/theme';
import { api, toProduct, type ApiProduct } from '@/lib/api';
import type { Product } from '@/lib/products';
import { HeroBanners } from '@/components/hero-banners';
import { ProductRail } from '@/components/product-rail';
import { Stars } from '@/components/stars';

type ApiReview = { id: number; authorName: string; rating: number; title: string; body: string; productName?: string; isVerified: boolean };

const { width: W } = Dimensions.get('window');

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const STORIES: { label: string; icon: IoniconName }[] = [
  { label: 'New In',     icon: 'star' },
  { label: 'Serums',     icon: 'water-outline' },
  { label: 'Toners',     icon: 'flask-outline' },
  { label: 'Sheet Mask', icon: 'layers-outline' },
  { label: 'Suncare',    icon: 'sunny-outline' },
  { label: 'Eye Care',   icon: 'eye-outline' },
  { label: 'Cleansers',  icon: 'leaf-outline' },
  { label: 'Lip Care',   icon: 'heart-outline' },
];

const CONCERNS: { icon: IoniconName; name: string }[] = [
  { icon: 'water-outline',   name: 'Hydration' },
  { icon: 'sunny-outline',   name: 'Glow' },
  { icon: 'medical-outline', name: 'Acne' },
  { icon: 'time-outline',    name: 'Anti-Aging' },
  { icon: 'heart-outline',   name: 'Sensitivity' },
  { icon: 'apps-outline',    name: 'Pores' },
];

export default function HomeScreen() {
  const scrollY = useSharedValue(0);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<ApiReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get<ApiProduct[]>('/products/best-sellers'),
      api.get<ApiProduct[]>('/products/new-arrivals'),
      api.get<{ data: ApiReview[] }>('/reviews?limit=4'),
    ]).then(([bs, na, rv]) => {
      setBestSellers((bs ?? []).map(toProduct));
      setNewArrivals((na ?? []).map(toProduct));
      setReviews(rv?.data ?? []);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const scrollHandler = useAnimatedScrollHandler(({ contentOffset }) => {
    scrollY.value = contentOffset.y;
  });

  // Header background fades in as user scrolls past the stories row (~60px)
  const headerBgAnim = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, 60], [0, 1], Extrapolation.CLAMP),
  }));

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>

      {/* ── Header (floats above scroll content) ── */}
      <View style={styles.header} pointerEvents="box-none">
        {/* Solid bg that fades in on scroll */}
        <Animated.View style={[StyleSheet.absoluteFill, styles.headerBg, headerBgAnim]} />

        <Text style={styles.logo}>O'Circle</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="search-outline" size={22} color={RoseNoir.onBackground} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={() => router.push('/(tabs)/cart')}>
            <Ionicons name="bag-outline" size={22} color={RoseNoir.onBackground} />
          </TouchableOpacity>
        </View>
      </View>

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Spacer so content starts below the floating header */}
        <View style={{ height: 56 }} />

        {/* ── Stories ── */}
        <Animated.ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.storiesRow}>
          {STORIES.map((s, i) => (
            <TouchableOpacity key={s.label} style={styles.story} activeOpacity={0.75}>
              <View style={[styles.storyRing, i === 0 && styles.storyRingActive]}>
                <View style={styles.storyCircle}>
                  <Ionicons name={s.icon} size={22} color={i === 0 ? RoseNoir.primary : RoseNoir.onSurfaceVariant} />
                </View>
              </View>
              <Text style={[styles.storyLabel, i === 0 && styles.storyLabelActive]}>{s.label}</Text>
            </TouchableOpacity>
          ))}
        </Animated.ScrollView>

        {/* ── Hero ── */}
        <HeroBanners />

        {/* ── Flash sale strip ── */}
        <TouchableOpacity style={styles.flashStrip} activeOpacity={0.85}>
          <View style={styles.flashIconWrap}>
            <Ionicons name="flash" size={14} color={RoseNoir.primary} />
          </View>
          <Text style={styles.flashText}>Flash Sale — 20% off sitewide today only</Text>
          <Ionicons name="chevron-forward" size={16} color="rgba(255,255,255,0.8)" />
        </TouchableOpacity>

        {/* ── Best Sellers ── */}
        {loading ? <ActivityIndicator color={RoseNoir.primary} style={{ marginVertical: 20 }} /> : null}
        <ProductRail title="Best Sellers" eyebrow="TOP PICKS" products={bestSellers} viewAllHref="/(tabs)/shop" />

        {/* ── Shop by Concern ── */}
        <View style={styles.section}>
          <View style={styles.sectionHead}>
            <View>
              <Text style={styles.eyebrow}>BROWSE BY</Text>
              <Text style={styles.sectionTitle}>Skin Concern</Text>
            </View>
            <TouchableOpacity onPress={() => router.push('/(tabs)/shop')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.concernGrid}>
            {CONCERNS.map(c => (
              <TouchableOpacity
                key={c.name}
                style={styles.concernCard}
                onPress={() => router.push('/(tabs)/shop')}
                activeOpacity={0.75}
              >
                <View style={styles.concernIconCircle}>
                  <Ionicons name={c.icon} size={20} color={RoseNoir.primary} />
                </View>
                <Text style={styles.concernName}>{c.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── New Arrivals ── */}
        <ProductRail title="New Arrivals" eyebrow="JUST LANDED" products={newArrivals} viewAllHref="/(tabs)/shop" muted />

        {/* ── Reviews ── */}
        <View style={styles.reviewsSection}>
          <View style={[styles.sectionHead, { paddingHorizontal: 20 }]}>
            <View>
              <Text style={styles.eyebrow}>COMMUNITY</Text>
              <Text style={styles.sectionTitle}>What They Say</Text>
            </View>
          </View>
          <Animated.ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.reviewsRow}>
            {reviews.map(r => (
              <View key={r.id} style={styles.reviewCard}>
                <Stars rating={r.rating} size={12} />
                <Text style={styles.reviewTitle}>"{r.title}"</Text>
                <Text style={styles.reviewBody} numberOfLines={3}>{r.body}</Text>
                <View style={styles.reviewFooter}>
                  <View style={styles.reviewAvatar}>
                    <Text style={styles.reviewAvatarText}>{r.authorName.charAt(0)}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.reviewName}>{r.authorName}</Text>
                    {r.productName && <Text style={styles.reviewProduct}>{r.productName}</Text>}
                  </View>
                  {r.isVerified && (
                    <Ionicons name="checkmark-circle" size={14} color="#2d7a46" />
                  )}
                </View>
              </View>
            ))}
          </Animated.ScrollView>
        </View>

        {/* ── Quiz CTA ── */}
        <TouchableOpacity style={styles.quizCta} onPress={() => router.push('/quiz')} activeOpacity={0.88}>
          <LinearGradient colors={['#6b1e3a', '#3a0f20']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill} />
          <View style={styles.quizLeft}>
            <Text style={styles.quizTitle}>Find Your{'\n'}Skin Ritual</Text>
            <Text style={styles.quizSub}>4 questions, personalised results.</Text>
          </View>
          <View style={styles.quizArrow}>
            <Ionicons name="arrow-forward" size={18} color={RoseNoir.primary} />
          </View>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </Animated.ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: RoseNoir.background },

  // Floating header sits above scroll content
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerBg: {
    backgroundColor: RoseNoir.background,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: RoseNoir.outlineVariant,
  },
  logo: { fontSize: 28, fontFamily: 'ui-serif', fontWeight: '700', color: RoseNoir.primary, letterSpacing: -0.5 },
  headerRight: { flexDirection: 'row' },
  iconBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },

  scroll: { backgroundColor: RoseNoir.background },

  // Stories
  storiesRow: { paddingHorizontal: 16, paddingTop: 4, paddingBottom: 16, gap: 14 },
  story: { alignItems: 'center', gap: 6, width: 64 },
  storyRing: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: RoseNoir.outlineVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyRingActive: {
    borderColor: RoseNoir.primary,
    borderWidth: 2.5,
  },
  storyCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: RoseNoir.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyLabel: { fontSize: 10.5, fontWeight: '500', color: RoseNoir.onSurfaceVariant, textAlign: 'center' },
  storyLabelActive: { fontWeight: '700', color: RoseNoir.primary },

  // Flash sale
  flashStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: RoseNoir.primary,
    paddingHorizontal: 18,
    paddingVertical: 13,
    gap: 10,
  },
  flashIconWrap: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flashText: { flex: 1, fontSize: 13, fontWeight: '600', color: '#fff', letterSpacing: 0.1 },

  // Sections
  section: { paddingHorizontal: 20, paddingTop: 32, paddingBottom: 8 },
  reviewsSection: { paddingTop: 32 },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: '700',
    color: RoseNoir.primary,
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  sectionTitle: { fontSize: 22, fontWeight: '700', color: RoseNoir.onBackground, fontFamily: 'ui-serif' },
  seeAll: { fontSize: 13, fontWeight: '600', color: RoseNoir.primary, paddingBottom: 2 },

  // Concerns
  concernGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  concernCard: {
    width: (W - 60) / 3,
    backgroundColor: RoseNoir.surfaceContainerLow,
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 10,
    alignItems: 'center',
    gap: 10,
  },
  concernIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: RoseNoir.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  concernName: { fontSize: 12, fontWeight: '600', color: RoseNoir.onBackground, textAlign: 'center' },

  // Reviews
  reviewsRow: { paddingHorizontal: 20, gap: 12, paddingBottom: 4 },
  reviewCard: {
    width: W * 0.74,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    gap: 8,
    shadowColor: '#6b1e3a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 2,
  },
  reviewTitle: { fontSize: 14, fontWeight: '700', color: RoseNoir.onBackground, fontFamily: 'ui-serif', lineHeight: 21 },
  reviewBody: { fontSize: 12.5, color: RoseNoir.onSurfaceVariant, lineHeight: 20 },
  reviewFooter: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 4 },
  reviewAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: RoseNoir.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewAvatarText: { fontSize: 13, fontWeight: '700', color: RoseNoir.primary },
  reviewName: { fontSize: 12, fontWeight: '700', color: RoseNoir.onBackground },
  reviewProduct: { fontSize: 11, color: RoseNoir.onSurfaceVariant },

  // Quiz CTA
  quizCta: {
    marginHorizontal: 20,
    marginTop: 32,
    borderRadius: 22,
    paddingHorizontal: 24,
    paddingVertical: 26,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    gap: 16,
  },
  quizLeft: { flex: 1, gap: 6 },
  quizTitle: { fontSize: 22, fontWeight: '800', color: '#fff', fontFamily: 'ui-serif', lineHeight: 28 },
  quizSub: { fontSize: 13, color: 'rgba(255,255,255,0.65)' },
  quizArrow: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
});
