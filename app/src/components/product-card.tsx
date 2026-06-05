import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RoseNoir } from '@/constants/theme';
import { useCart } from '@/context/cart-context';
import { resolveImage } from '@/lib/product-images';
import type { Product } from '@/lib/products';
import { Placeholder } from './placeholder';
import { Stars } from './stars';

type Props = { product: Product; width?: number };

export function ProductCard({ product, width = 165 }: Props) {
  const img = resolveImage(product.image);
  const imgH = width * 1.25;
  const { addItem } = useCart();

  const handleQuickAdd = () => {
    addItem(product);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <TouchableOpacity
      onPress={() => router.push(`/product/${product.slug}`)}
      activeOpacity={0.95}
      style={[styles.card, { width }]}
    >
      {/* Image area — fixed height */}
      <View style={[styles.imgWrap, { height: imgH }]}>
        {img ? (
          <Image source={img} style={StyleSheet.absoluteFill} contentFit="cover" transition={200} />
        ) : (
          <Placeholder
            label={product.name}
            sub={product.category}
            variant={product.placeholderVariant}
            icon={product.placeholderIcon}
            style={StyleSheet.absoluteFill}
          />
        )}

        {/* Badge */}
        {product.badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{product.badge}</Text>
          </View>
        )}

        {/* Quick-add button */}
        <TouchableOpacity style={styles.quickAdd} onPress={handleQuickAdd} hitSlop={10}>
          <Ionicons name="add" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Info area — fixed min-height so grid rows stay even */}
      <View style={styles.info}>
        <Text style={styles.cat}>{product.category}</Text>
        <Text style={styles.name} numberOfLines={1}>{product.name}</Text>

        {/* Price row — always same height; compareAt shown if present */}
        <View style={styles.priceRow}>
          <Text style={styles.price}>${product.price}</Text>
          {product.compareAt
            ? <Text style={styles.compareAt}>${product.compareAt}</Text>
            : <View style={styles.compareAtSpacer} />
          }
        </View>

        <Stars rating={product.rating} size={10} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#6b1e3a',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  imgWrap: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: RoseNoir.surfaceContainerLow,
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: RoseNoir.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 8,
    color: '#fff',
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  quickAdd: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: RoseNoir.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.22,
    shadowRadius: 5,
    elevation: 5,
  },
  info: {
    padding: 12,
    gap: 3,
    // Fixed height keeps grid rows perfectly even
    minHeight: 82,
  },
  cat: {
    fontSize: 9,
    fontWeight: '700',
    color: RoseNoir.onSurfaceVariant,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  name: {
    fontSize: 13,
    fontWeight: '600',
    color: RoseNoir.onBackground,
    lineHeight: 18,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 1,
    height: 20, // fixed height row so presence/absence of compareAt doesn't shift stars down
  },
  price: { fontSize: 15, fontWeight: '700', color: RoseNoir.primary },
  compareAt: { fontSize: 12, color: RoseNoir.onSurfaceVariant, textDecorationLine: 'line-through' },
  compareAtSpacer: { height: 20 }, // maintains row height when compareAt is absent
});
