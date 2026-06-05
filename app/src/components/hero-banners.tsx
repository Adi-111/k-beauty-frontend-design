import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import {
  Dimensions, FlatList, NativeScrollEvent, NativeSyntheticEvent,
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { RoseNoir } from '@/constants/theme';
import { resolveImage } from '@/lib/product-images';

const { width: W } = Dimensions.get('window');
const H = W * 0.72;

type Slide = { id: string; image: string; eyebrow: string; title: string; subtitle: string; cta: string };

const SLIDES: Slide[] = [
  { id: '1', image: '/products/toner-pad-2.jpg', eyebrow: 'May Sale', title: 'K-Beauty,\nExpress', subtitle: '20% off first ritual bundle', cta: 'Shop Now' },
  { id: '2', image: '/products/cica-mask-3.jpg', eyebrow: 'Top Rated', title: 'The CICA\nEdit', subtitle: 'Calm, soothe & restore — fast', cta: 'Explore' },
  { id: '3', image: '/products/cat-banner-rewards.jpg', eyebrow: 'Double Points', title: 'Rewards\nEvent is On', subtitle: 'Earn 2× Circle points this week', cta: 'Join Now' },
];

export function HeroBanners() {
  const [active, setActive] = useState(0);
  const ref = useRef<FlatList>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive(prev => {
        const next = (prev + 1) % SLIDES.length;
        ref.current?.scrollToIndex({ index: next, animated: true });
        return next;
      });
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / W);
    setActive(Math.max(0, Math.min(idx, SLIDES.length - 1)));
  };

  return (
    <View>
      <FlatList
        ref={ref}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={s => s.id}
        onMomentumScrollEnd={onScroll}
        getItemLayout={(_, i) => ({ length: W, offset: W * i, index: i })}
        renderItem={({ item }) => {
          const img = resolveImage(item.image);
          return (
            <View style={{ width: W, height: H, backgroundColor: RoseNoir.primary }}>
              {img && <Image source={img} style={StyleSheet.absoluteFill} contentFit="cover" />}
              <LinearGradient
                colors={['transparent', 'rgba(40,10,20,0.7)']}
                locations={[0.35, 1]}
                style={StyleSheet.absoluteFill}
              />
              <View style={styles.content}>
                <View style={styles.eyebrowPill}>
                  <Text style={styles.eyebrowText}>{item.eyebrow}</Text>
                </View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
                <TouchableOpacity style={styles.cta}>
                  <Text style={styles.ctaText}>{item.cta} →</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
      <View style={styles.dots}>
        {SLIDES.map((_, i) => (
          <View key={i} style={[styles.dot, i === active && styles.dotActive]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, justifyContent: 'flex-end', padding: 24, gap: 8 },
  eyebrowPill: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  eyebrowText: { fontSize: 11, color: '#fff', fontWeight: '600', letterSpacing: 0.5 },
  title: { fontSize: 32, fontWeight: '800', color: '#fff', fontFamily: 'ui-serif', lineHeight: 38, letterSpacing: -0.5 },
  subtitle: { fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 19 },
  cta: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    marginTop: 4,
  },
  ctaText: { fontSize: 13, fontWeight: '700', color: RoseNoir.primary },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 5, paddingVertical: 12 },
  dot: { width: 5, height: 5, borderRadius: 3, backgroundColor: RoseNoir.outlineVariant },
  dotActive: { width: 22, backgroundColor: RoseNoir.primary },
});
