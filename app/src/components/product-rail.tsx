import { router } from 'expo-router';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RoseNoir } from '@/constants/theme';
import type { Product } from '@/lib/products';
import { ProductCard } from './product-card';

const { width: SCREEN_W } = Dimensions.get('window');
const CARD_W = Math.round(SCREEN_W * 0.44);
const GAP = 12;

type Props = {
  title: string;
  eyebrow?: string;
  products: Product[];
  viewAllHref?: string;
  muted?: boolean;
};

export function ProductRail({ title, eyebrow, products, viewAllHref, muted }: Props) {
  return (
    <View style={[styles.section, muted && styles.mutedBg]}>
      <View style={styles.header}>
        <View>
          {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
          <Text style={styles.title}>{title}</Text>
        </View>
        {viewAllHref && (
          <TouchableOpacity onPress={() => router.push(viewAllHref as any)} style={styles.seeAllBtn}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={products}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.slug}
        snapToInterval={CARD_W + GAP}
        decelerationRate="fast"
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <ProductCard product={item} width={CARD_W} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingTop: 28, paddingBottom: 12 },
  mutedBg: { backgroundColor: RoseNoir.surfaceContainerLow, paddingHorizontal: 0 },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: '700',
    color: RoseNoir.primary,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  title: { fontSize: 20, fontWeight: '700', color: RoseNoir.onBackground, fontFamily: 'ui-serif' },
  seeAllBtn: { paddingBottom: 2 },
  seeAllText: { fontSize: 13, fontWeight: '600', color: RoseNoir.primary },
  list: { paddingHorizontal: 20, gap: GAP },
});
