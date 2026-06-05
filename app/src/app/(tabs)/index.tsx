import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { RoseNoir } from '@/constants/theme';
import { resolveImage } from '@/lib/product-images';
import {
  bestSellers, byCategory, newArrivals, reviews, trendingNow, underPrice, products,
} from '@/lib/products';
import { HeroBanners } from '@/components/hero-banners';
import { ProductRail } from '@/components/product-rail';
import { Stars } from '@/components/stars';

const { width: W } = Dimensions.get('window');

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

// ─── Data ────────────────────────────────────────────────────────────────────

const STORIES: { label: string; icon: IoniconName; bg: string; fg: string; featured?: boolean }[] = [
  { label: 'New In',     icon: 'star',           bg: RoseNoir.primary, fg: '#fff', featured: true },
  { label: 'Serums',     icon: 'water-outline',  bg: '#e5eff9', fg: '#2d6fa8' },
  { label: 'Toners',     icon: 'flask-outline',  bg: '#e5f2e8', fg: '#2d7a46' },
  { label: 'Sheet Mask', icon: 'layers-outline', bg: '#f7ede0', fg: '#a05c22' },
  { label: 'Suncare',    icon: 'sunny-outline',  bg: '#fdf6d6', fg: '#a07d0a' },
  { label: 'Eye Care',   icon: 'eye-outline',    bg: '#ede3f8', fg: '#6830a8' },
  { label: 'Cleansers',  icon: 'leaf-outline',   bg: '#d9f2e8', fg: '#1e7a52' },
  { label: 'Lip Care',   icon: 'heart-outline',  bg: '#fce8f0', fg: '#a02856' },
];

const CONCERNS: { icon: IoniconName; name: string; sub: string; bg: string; fg: string }[] = [
  { icon: 'water-outline',   name: 'Hydration',  sub: 'Quench & plump',   bg: '#ddeef8', fg: '#1e5ea0' },
  { icon: 'sunny-outline',   name: 'Glow',       sub: 'Brighten & even',  bg: '#fdf4d0', fg: '#966a08' },
  { icon: 'medical-outline', name: 'Acne',       sub: 'Clear & calm',     bg: '#fde6e6', fg: '#962828' },
  { icon: 'time-outline',    name: 'Anti-Aging', sub: 'Firm & smooth',    bg: '#eee5fd', fg: '#522896' },
  { icon: 'heart-outline',   name: 'Sensitivity',sub: 'Soothe & protect', bg: '#fde5ef', fg: '#962850' },
  { icon: 'apps-outline',    name: 'Pores',      sub: 'Refine & tighten', bg: '#e4ecfd', fg: '#2840a0' },
];

const TOP5 = products.filter(p => p.bestSeller || p.trending).slice(0, 5);

const STATS: { value: string; label: string; icon: IoniconName; bg: string }[] = [
  { value: '9+',   label: 'Years trusted',    icon: 'ribbon-outline',  bg: RoseNoir.primaryContainer },
  { value: '32',   label: 'Countries',        icon: 'globe-outline',   bg: RoseNoir.tertiaryFixed },
  { value: '98%',  label: 'Satisfaction',     icon: 'happy-outline',   bg: '#dff2e8' },
  { value: '100K+',label: 'Happy customers',  icon: 'people-outline',  bg: RoseNoir.primaryContainer },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>

      {/* ── Header ── */}
      <View style={styles.header}>
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

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* ── Stories ── */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.storiesRow}>
          {STORIES.map(s => (
            <TouchableOpacity key={s.label} style={styles.story} activeOpacity={0.75}>
              <View style={[
                styles.storyCircle,
                { backgroundColor: s.bg },
                s.featured && styles.storyCircleFeatured,
              ]}>
                <Ionicons name={s.icon} size={s.featured ? 24 : 22} color={s.fg} />
              </View>
              <Text style={[styles.storyLabel, s.featured && styles.storyLabelFeatured]}>
                {s.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

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
        <ProductRail eyebrow="Fan Favourites" title="Best Sellers" products={bestSellers(10)} viewAllHref="/(tabs)/shop" />

        {/* ── Shop by Concern ── */}
        <View style={styles.section}>
          <View style={styles.sectionHead}>
            <View>
              <Text style={styles.sectionEyebrow}>FIND YOUR FIX</Text>
              <Text style={styles.sectionTitle}>Shop by Concern</Text>
            </View>
            <TouchableOpacity onPress={() => router.push('/(tabs)/shop')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.concernGrid}>
            {CONCERNS.map(c => (
              <TouchableOpacity
                key={c.name}
                style={[styles.concernCard, { backgroundColor: c.bg }]}
                onPress={() => router.push('/(tabs)/shop')}
                activeOpacity={0.8}
              >
                <View style={[styles.concernIconCircle, { backgroundColor: `${c.fg}18` }]}>
                  <Ionicons name={c.icon} size={20} color={c.fg} />
                </View>
                <View style={styles.concernText}>
                  <Text style={styles.concernName}>{c.name}</Text>
                  <Text style={styles.concernSub}>{c.sub}</Text>
                </View>
                <Ionicons name="chevron-forward" size={14} color={c.fg} style={{ opacity: 0.5 }} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── New Arrivals ── */}
        <ProductRail eyebrow="Just Dropped" title="New Arrivals" products={newArrivals(10)} viewAllHref="/(tabs)/shop" muted />

        {/* ── Deal card ── */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.dealCard} activeOpacity={0.92}>
            <LinearGradient colors={[RoseNoir.primary, '#3a0f20']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill} />
            <View style={styles.dealContent}>
              <View style={styles.dealBadge}><Text style={styles.dealBadgeText}>Bundle & Save</Text></View>
              <Text style={styles.dealTitle}>Buy 2, Get 3rd{'\n'}at 50% off</Text>
              <Text style={styles.dealSub}>Mix & match any masks, pads or serums</Text>
              <View style={styles.dealBtn}><Text style={styles.dealBtnText}>Shop Bundle</Text><Ionicons name="arrow-forward" size={13} color={RoseNoir.primary} /></View>
            </View>
          </TouchableOpacity>
          <View style={styles.dealRow}>
            <TouchableOpacity style={[styles.dealSmall, { backgroundColor: RoseNoir.primaryContainer }]}>
              <View style={styles.dealSmallIconWrap}>
                <Ionicons name="gift-outline" size={20} color={RoseNoir.primary} />
              </View>
              <Text style={styles.dealSmallTitle}>Free Gift{'\n'}with $60+</Text>
              <Text style={styles.dealSmallSub}>Auto added at checkout</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.dealSmall, { backgroundColor: RoseNoir.tertiaryFixed }]}>
              <View style={styles.dealSmallIconWrap}>
                <Ionicons name="pricetag-outline" size={20} color={RoseNoir.primary} />
              </View>
              <Text style={styles.dealSmallTitle}>New Member{'\n'}Discount</Text>
              <Text style={styles.dealSmallSub}>Use code CIRCLE10</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Sheet Masks ── */}
        <ProductRail eyebrow="The Edit" title="Sheet Mask Rituals" products={byCategory('Sheet Masks', 10)} viewAllHref="/(tabs)/shop" />

        {/* ── Top 5 Ranked ── */}
        <View style={styles.section}>
          <View style={styles.sectionHead}>
            <View>
              <Text style={styles.sectionEyebrow}>THIS WEEK</Text>
              <Text style={styles.sectionTitle}>Top 5 Picks</Text>
            </View>
          </View>
          {TOP5.map((p, i) => {
            const img = resolveImage(p.image);
            return (
              <TouchableOpacity key={p.slug} style={styles.rankRow} onPress={() => router.push(`/product/${p.slug}`)}>
                <Text style={styles.rankNum}>{`0${i + 1}`}</Text>
                <View style={styles.rankImg}>
                  {img
                    ? <Image source={img} style={StyleSheet.absoluteFill} contentFit="cover" />
                    : <View style={[StyleSheet.absoluteFill, { backgroundColor: RoseNoir.surfaceContainerLow }]} />}
                </View>
                <View style={{ flex: 1, gap: 2 }}>
                  <Text style={styles.rankCat}>{p.category}</Text>
                  <Text style={styles.rankName} numberOfLines={1}>{p.name}</Text>
                  <Stars rating={p.rating} size={10} />
                </View>
                <View style={styles.rankRight}>
                  <Text style={styles.rankPrice}>${p.price}</Text>
                  <Ionicons name="chevron-forward" size={14} color={RoseNoir.outlineVariant} />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ── Under $30 ── */}
        <ProductRail eyebrow="Great Value" title="Under $30" products={underPrice(30, 10)} viewAllHref="/(tabs)/shop" muted />

        {/* ── Trending ── */}
        <ProductRail eyebrow="Hot Right Now" title="Trending Now" products={trendingNow(10)} viewAllHref="/(tabs)/shop" />

        {/* ── Stats bento ── */}
        <View style={styles.statsSection}>
          <View style={styles.sectionHead}>
            <View>
              <Text style={styles.sectionEyebrow}>BY THE NUMBERS</Text>
              <Text style={styles.sectionTitle}>Why Trust Us</Text>
            </View>
          </View>
          <View style={styles.statsGrid}>
            {STATS.map(s => (
              <View key={s.value} style={[styles.statCard, { backgroundColor: s.bg }]}>
                <View style={styles.statIconWrap}>
                  <Ionicons name={s.icon} size={16} color={RoseNoir.primary} />
                </View>
                <Text style={styles.statValue}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── Reviews ── */}
        <View style={{ paddingTop: 28 }}>
          <View style={[styles.sectionHead, { paddingHorizontal: 20 }]}>
            <View>
              <Text style={styles.sectionEyebrow}>REAL RESULTS</Text>
              <Text style={styles.sectionTitle}>What They Say</Text>
            </View>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.reviewsRow}>
            {reviews.slice(0, 5).map(r => (
              <View key={r.name} style={styles.reviewCard}>
                <Stars rating={r.rating} size={12} />
                <Text style={styles.reviewTitle}>"{r.title}"</Text>
                <Text style={styles.reviewBody} numberOfLines={3}>{r.body}</Text>
                <View style={styles.reviewFooter}>
                  <View style={styles.reviewAvatar}>
                    <Text style={styles.reviewAvatarText}>{r.name.charAt(0)}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.reviewName}>{r.name}</Text>
                    <Text style={styles.reviewProduct}>{r.product}</Text>
                  </View>
                  {r.verified && (
                    <View style={styles.verifiedBadge}>
                      <Ionicons name="checkmark-circle" size={12} color="#2d7a46" />
                      <Text style={styles.verifiedText}>Verified</Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* ── Quiz CTA ── */}
        <TouchableOpacity style={styles.quizCta} onPress={() => router.push('/quiz')} activeOpacity={0.88}>
          <LinearGradient colors={['#f7d4e2', '#faeef4']} style={StyleSheet.absoluteFill} />
          <View style={styles.quizIconRow}>
            <View style={styles.quizIconCircle}>
              <Ionicons name="color-wand-outline" size={22} color={RoseNoir.primary} />
            </View>
          </View>
          <Text style={styles.quizEyebrow}>PERSONALISED FOR YOU</Text>
          <Text style={styles.quizTitle}>Find Your{'\n'}Skin Ritual</Text>
          <Text style={styles.quizSub}>4 quick questions — your perfect K-beauty routine, curated.</Text>
          <View style={styles.quizBtn}>
            <Text style={styles.quizBtnText}>Take the Quiz</Text>
            <Ionicons name="arrow-forward" size={14} color="#fff" />
          </View>
        </TouchableOpacity>

        <View style={{ height: 48 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: RoseNoir.background },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  logo: { fontSize: 28, fontFamily: 'ui-serif', fontWeight: '700', color: RoseNoir.primary, letterSpacing: -0.5 },
  headerRight: { flexDirection: 'row' },
  iconBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },

  scroll: { backgroundColor: RoseNoir.background },

  // Stories
  storiesRow: { paddingHorizontal: 16, paddingTop: 4, paddingBottom: 14, gap: 14 },
  story: { alignItems: 'center', gap: 7, width: 66 },
  storyCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  storyCircleFeatured: {
    shadowColor: RoseNoir.primary,
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: 5,
  },
  storyLabel: { fontSize: 10.5, fontWeight: '500', color: RoseNoir.onSurfaceVariant, textAlign: 'center' },
  storyLabelFeatured: { fontWeight: '700', color: RoseNoir.primary },

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
  statsSection: { paddingHorizontal: 20, paddingTop: 32, paddingBottom: 8 },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  sectionEyebrow: { fontSize: 10, fontWeight: '700', letterSpacing: 1.6, color: RoseNoir.primary, textTransform: 'uppercase', marginBottom: 3 },
  sectionTitle: { fontSize: 22, fontWeight: '700', color: RoseNoir.onBackground, fontFamily: 'ui-serif' },
  seeAll: { fontSize: 13, fontWeight: '600', color: RoseNoir.primary, paddingBottom: 2 },

  // Concerns — 2-col rows, horizontal layout inside card
  concernGrid: { gap: 10 },
  concernCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  concernIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  concernText: { flex: 1 },
  concernName: { fontSize: 14, fontWeight: '700', color: RoseNoir.onBackground, marginBottom: 1 },
  concernSub: { fontSize: 11, color: RoseNoir.onSurfaceVariant },

  // Deal
  dealCard: { height: 210, borderRadius: 22, overflow: 'hidden', marginBottom: 12 },
  dealContent: { flex: 1, padding: 24, justifyContent: 'flex-end', gap: 6 },
  dealBadge: { alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4, marginBottom: 2 },
  dealBadgeText: { fontSize: 11, color: '#fff', fontWeight: '600', letterSpacing: 0.3 },
  dealTitle: { fontSize: 28, fontWeight: '800', color: '#fff', fontFamily: 'ui-serif', lineHeight: 34 },
  dealSub: { fontSize: 13, color: 'rgba(255,255,255,0.78)' },
  dealBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start', backgroundColor: '#fff', paddingHorizontal: 18, paddingVertical: 10, borderRadius: 24, marginTop: 6 },
  dealBtnText: { fontSize: 13, fontWeight: '700', color: RoseNoir.primary },
  dealRow: { flexDirection: 'row', gap: 12 },
  dealSmall: { flex: 1, borderRadius: 18, padding: 18, gap: 8 },
  dealSmallIconWrap: { width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(107,30,58,0.1)', alignItems: 'center', justifyContent: 'center' },
  dealSmallTitle: { fontSize: 14, fontWeight: '700', color: RoseNoir.onBackground, lineHeight: 20 },
  dealSmallSub: { fontSize: 11, color: RoseNoir.onSurfaceVariant },

  // Top 5
  rankRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 13,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: RoseNoir.outlineVariant,
  },
  rankNum: { fontSize: 18, fontWeight: '800', color: RoseNoir.primaryContainer, width: 30, fontFamily: 'ui-serif' },
  rankImg: { width: 58, height: 58, borderRadius: 12, overflow: 'hidden', backgroundColor: RoseNoir.surfaceContainerLow },
  rankCat: { fontSize: 9, color: RoseNoir.onSurfaceVariant, fontWeight: '700', letterSpacing: 0.9, textTransform: 'uppercase' },
  rankName: { fontSize: 13, fontWeight: '600', color: RoseNoir.onBackground },
  rankRight: { alignItems: 'flex-end', gap: 4 },
  rankPrice: { fontSize: 15, fontWeight: '700', color: RoseNoir.primary },

  // Stats
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  statCard: { width: (W - 52) / 2, borderRadius: 20, padding: 20, gap: 8 },
  statIconWrap: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(107,30,58,0.1)', alignItems: 'center', justifyContent: 'center' },
  statValue: { fontSize: 34, fontWeight: '800', color: RoseNoir.primary, fontFamily: 'ui-serif' },
  statLabel: { fontSize: 12, color: RoseNoir.onSurfaceVariant, lineHeight: 17 },

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
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: RoseNoir.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewAvatarText: { fontSize: 14, fontWeight: '700', color: RoseNoir.primary },
  reviewName: { fontSize: 12, fontWeight: '700', color: RoseNoir.onBackground },
  reviewProduct: { fontSize: 11, color: RoseNoir.onSurfaceVariant },
  verifiedBadge: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  verifiedText: { fontSize: 10, color: '#2d7a46', fontWeight: '600' },

  // Quiz CTA
  quizCta: {
    marginHorizontal: 20,
    marginTop: 32,
    borderRadius: 26,
    padding: 28,
    gap: 10,
    overflow: 'hidden',
  },
  quizIconRow: { marginBottom: 4 },
  quizIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(107,30,58,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quizEyebrow: { fontSize: 10, fontWeight: '700', letterSpacing: 1.6, color: RoseNoir.primary, textTransform: 'uppercase' },
  quizTitle: { fontSize: 30, fontWeight: '800', color: RoseNoir.onBackground, fontFamily: 'ui-serif', lineHeight: 37 },
  quizSub: { fontSize: 13, color: RoseNoir.onSurfaceVariant, lineHeight: 20 },
  quizBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    backgroundColor: RoseNoir.primary,
    paddingHorizontal: 22,
    paddingVertical: 13,
    borderRadius: 28,
    marginTop: 6,
  },
  quizBtnText: { fontSize: 14, fontWeight: '700', color: '#fff' },
});
