import { ProductCard } from '@/components/product-card';
import { RoseNoir } from '@/constants/theme';
import { api, toProduct, type ApiProduct } from '@/lib/api';
import type { Product } from '@/lib/products';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator, Dimensions, FlatList, Modal, Pressable, ScrollView,
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const CATEGORY_LIST = [
  'All', 'Toner Pads', 'Sheet Masks', 'Serums', 'Essences', 'Toners',
  'Cleansers', 'Moisturizers', 'Suncare', 'Eye Care', 'Lip Care', 'Exfoliators', 'Body',
];

const { width: W } = Dimensions.get('window');
const CARD_W = Math.round((W - 52) / 2);

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const CAT_ICONS: Record<string, IoniconName> = {
  'All': 'apps-outline',
  'Toner Pads': 'water-outline',
  'Sheet Masks': 'layers-outline',
  'Serums': 'flask-outline',
  'Essences': 'star-outline',
  'Toners': 'filter-outline',
  'Cleansers': 'leaf-outline',
  'Moisturizers': 'heart-outline',
  'Suncare': 'sunny-outline',
  'Eye Care': 'eye-outline',
  'Lip Care': 'heart-half-outline',
  'Exfoliators': 'brush-outline',
  'Body': 'body-outline',
};

const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured', icon: 'star-outline' as IoniconName },
  { label: 'Price: Low → High', value: 'price_asc', icon: 'trending-up-outline' as IoniconName },
  { label: 'Price: High → Low', value: 'price_desc', icon: 'trending-down-outline' as IoniconName },
  { label: 'Top Rated', value: 'rating', icon: 'ribbon-outline' as IoniconName },
];

function CategoryChip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  const scale = useSharedValue(1);
  const anim = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => { scale.value = withSpring(0.93, { damping: 12, stiffness: 350 }); }}
      onPressOut={() => { scale.value = withSpring(1, { damping: 12, stiffness: 350 }); }}
    >
      <Animated.View style={[styles.chip, active && styles.chipActive, anim]}>
        <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
}

export default function ShopScreen() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sort, setSort] = useState('featured');
  const [sortOpen, setSortOpen] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (activeCategory !== 'All') params.set('category', activeCategory);
    if (sort !== 'featured') params.set('sort', sort);
    api.get<{ data: ApiProduct[]; total: number }>(`/products?${params.toString()}`)
      .then(res => setAllProducts((res?.data ?? []).map(toProduct)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [activeCategory, sort]);

  const filtered = useMemo(() => allProducts, [allProducts]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>

      {/* ── Header ── */}
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={17} color={RoseNoir.onSurfaceVariant} />
          <Text style={styles.searchPlaceholder}>Search products…</Text>
        </View>
        <TouchableOpacity style={styles.sortBtn} onPress={() => setSortOpen(true)}>
          <Ionicons name="options-outline" size={18} color={RoseNoir.primary} />
        </TouchableOpacity>
      </View>

      {/* ── Category chips ── */}
      <View style={styles.chipsWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chips}
        >
          {CATEGORY_LIST.map(cat => (
            <CategoryChip
              key={cat}
              label={cat}
              active={activeCategory === cat}
              onPress={() => setActiveCategory(cat)}
            />
          ))}
        </ScrollView>
        {/* Fade-out on right edge signals more chips to scroll */}
        <LinearGradient
          colors={['transparent', RoseNoir.background]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.chipsFade}
          pointerEvents="none"
        />
      </View>

      {/* ── Result count ── */}
      <View style={styles.countRow}>
        <Text style={styles.count}>
          <Text style={styles.countNum}>{filtered.length}</Text>
          {'  products'}
        </Text>
        {activeCategory !== 'All' && (
          <TouchableOpacity style={styles.clearFilter} onPress={() => setActiveCategory('All')}>
            <Ionicons name="close-circle" size={14} color={RoseNoir.primary} />
            <Text style={styles.clearFilterText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* ── Product grid ── */}
      {loading ? (
        <ActivityIndicator color={RoseNoir.primary} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={filtered}
          numColumns={2}
          keyExtractor={item => item.slug}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <ProductCard product={item} width={CARD_W} />}
        />
      )}

      {/* ── Sort bottom sheet ── */}
      <Modal
        visible={sortOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setSortOpen(false)}
      >
        <TouchableOpacity style={styles.modalBack} onPress={() => setSortOpen(false)} activeOpacity={1} />
        <View style={styles.sortSheet}>
          <View style={styles.sortHandle} />
          <Text style={styles.sortTitle}>Sort by</Text>
          <View style={styles.sortOptions}>
            {SORT_OPTIONS.map(o => {
              const active = o.value === sort;
              return (
                <TouchableOpacity
                  key={o.value}
                  style={[styles.sortOption, active && styles.sortOptionActive]}
                  onPress={() => { setSort(o.value); setSortOpen(false); }}
                >
                  <View style={[styles.sortOptionIcon, active && styles.sortOptionIconActive]}>
                    <Ionicons name={o.icon} size={16} color={active ? '#fff' : RoseNoir.onSurfaceVariant} />
                  </View>
                  <Text style={[styles.sortOptionText, active && styles.sortOptionTextActive]}>
                    {o.label}
                  </Text>
                  {active && <Ionicons name="checkmark-circle" size={20} color={RoseNoir.primary} />}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: RoseNoir.background },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: RoseNoir.surfaceContainerLow,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  searchPlaceholder: { fontSize: 14, color: RoseNoir.onSurfaceVariant },
  sortBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: RoseNoir.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Chips
  chipsWrapper: { position: 'relative' },
  chips: { paddingLeft: 20, paddingRight: 48, paddingBottom: 4, gap: 8 },
  chipsFade: { position: 'absolute', top: 0, bottom: 0, right: 0, width: 48 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 22,
    backgroundColor: RoseNoir.surfaceContainerLow,
  },
  chipActive: { backgroundColor: RoseNoir.primary },
  chipText: { fontSize: 13, fontWeight: '500', color: RoseNoir.onSurfaceVariant },
  chipTextActive: { color: '#fff', fontWeight: '700' },

  // Count
  countRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 10,
  },
  count: { fontSize: 13, color: RoseNoir.onSurfaceVariant },
  countNum: { fontWeight: '700', color: RoseNoir.onBackground },
  clearFilter: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  clearFilterText: { fontSize: 13, fontWeight: '600', color: RoseNoir.primary },

  // Grid
  grid: { paddingHorizontal: 20, paddingBottom: 110 },
  row: { gap: 12, marginBottom: 14 },

  // Sort sheet
  modalBack: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)' },
  sortSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
  },
  sortHandle: { width: 40, height: 4, borderRadius: 2, backgroundColor: RoseNoir.outlineVariant, alignSelf: 'center', marginBottom: 20 },
  sortTitle: { fontSize: 20, fontWeight: '800', color: RoseNoir.onBackground, fontFamily: 'ui-serif', marginBottom: 14 },
  sortOptions: { gap: 8 },
  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
  },
  sortOptionActive: { backgroundColor: RoseNoir.surfaceContainerLow },
  sortOptionIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: RoseNoir.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sortOptionIconActive: { backgroundColor: RoseNoir.primary },
  sortOptionText: { flex: 1, fontSize: 15, color: RoseNoir.onBackground, fontWeight: '500' },
  sortOptionTextActive: { fontWeight: '700', color: RoseNoir.primary },
});
