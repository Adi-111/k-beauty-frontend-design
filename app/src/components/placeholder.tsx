import { StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { RoseNoir } from '@/constants/theme';

type Variant = 'green' | 'stone' | 'linen' | 'dark';

const BG: Record<Variant, string> = {
  green:  '#dce8d5',
  stone:  '#e8d8d3',
  linen:  '#f0e4e5',
  dark:   '#6b1e3a',
};
const FG: Record<Variant, string> = {
  green:  '#4a2530',
  stone:  '#6b1e3a',
  linen:  '#6b1e3a',
  dark:   '#fbf6f4',
};

const ICON_MAP: Record<string, string> = {
  spa: '🌸', eco: '🌿', water_drop: '💧', opacity: '🫧', face_retouching_natural: '✨',
  blur_circular: '⭕', sunny: '☀️', bedtime: '🌙', filter_hdr: '🏔', auto_awesome: '✨',
  grain: '🌾', wb_sunny: '☀️', science: '🧬', shield: '🛡', hive: '🍯', diamond: '💎',
  soap: '🧼', visibility: '👁', nutrition: '🌿', grass: '🌱', favorite: '💋',
};

type Props = {
  label: string;
  sub?: string;
  variant?: Variant;
  icon?: string;
  style?: ViewStyle;
};

export function Placeholder({ label, sub, variant = 'linen', icon = 'spa', style }: Props) {
  const bg = BG[variant];
  const fg = FG[variant];
  const emoji = ICON_MAP[icon] ?? '🌸';

  return (
    <View style={[styles.root, { backgroundColor: bg }, style]}>
      <Text style={[styles.icon]}>{emoji}</Text>
      <Text style={[styles.label, { color: fg }]} numberOfLines={2}>{label}</Text>
      {sub ? <Text style={[styles.sub, { color: fg }]} numberOfLines={1}>{sub}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    padding: 16,
  },
  icon: { fontSize: 28 },
  label: { fontSize: 12, fontWeight: '500', textAlign: 'center' },
  sub: { fontSize: 10, textAlign: 'center', opacity: 0.7 },
});
