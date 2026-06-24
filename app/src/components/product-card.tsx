import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { RoseNoir } from '@/constants/theme';
import { useCart } from '@/context/cart-context';
import { resolveImage } from '@/lib/product-images';
import type { Product } from '@/lib/products';
import { Placeholder } from './placeholder';
import { Stars } from './stars';

type Props = { product: Product; width?: number };

export function ProductCard({ product, width = 165 }: Props) {
  const img = resolveImage(product.image);
  const imgH = width * 1.3;
  const { addItem } = useCart();
  const [wishlisted, setWishlisted] = useState(false);

  const cardScale = useSharedValue(1);
  const heartScale = useSharedValue(1);

  const cardAnim = useAnimatedStyle(() => ({
    transform: [{ scale: cardScale.value }],
  }));

  const heartAnim = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  const handleQuickAdd = () => {
    addItem(product);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleWishlist = () => {
    setWishlisted(w => !w);
    heartScale.value = withSpring(1.4, { damping: 4, stiffness: 400 }, () => {
      'worklet';
      heartScale.value = withSpring(1, { damping: 12 });
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <Pressable
      onPress={() => router.push(`/product/${product.slug}`)}
      onPressIn={() => { cardScale.value = withSpring(0.96, { damping: 15, stiffness: 350 }); }}
      onPressOut={() => { cardScale.value = withSpring(1, { damping: 15, stiffness: 350 }); }}
    >
      <Animated.View style={[styles.card, { width }, cardAnim]}>

        {/* Image area */}
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

          {product.badge && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{product.badge}</Text>
            </View>
          )}

          {/* Wishlist */}
          <Pressable style={styles.wishlist} onPress={handleWishlist} hitSlop={10}>
            <Animated.View style={heartAnim}>
              <Ionicons
                name={wishlisted ? 'heart' : 'heart-outline'}
                size={16}
                color={wishlisted ? '#e84393' : '#fff'}
              />
            </Animated.View>
          </Pressable>

          {/* Quick-add */}
          <Pressable style={styles.quickAdd} onPress={handleQuickAdd} hitSlop={10}>
            <Ionicons name="add" size={18} color="#fff" />
          </Pressable>
        </View>

        {/* Info */}
        <View style={styles.info}>
          <Text style={styles.cat}>{product.category}</Text>
          <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>${product.price}</Text>
            {product.compareAt
              ? <Text style={styles.compareAt}>${product.compareAt}</Text>
              : <View style={styles.compareAtSpacer} />
            }
          </View>
          <Stars rating={product.rating} size={10} />
        </View>

      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#6b1e3a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 14,
    elevation: 4,
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
  wishlist: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.28)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickAdd: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: RoseNoir.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  info: {
    padding: 12,
    gap: 3,
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
    height: 20,
  },
  price: { fontSize: 15, fontWeight: '700', color: RoseNoir.primary },
  compareAt: { fontSize: 12, color: RoseNoir.onSurfaceVariant, textDecorationLine: 'line-through' },
  compareAtSpacer: { height: 20 },
});
