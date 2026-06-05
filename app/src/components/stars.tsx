import { StyleSheet, Text, View } from 'react-native';
import { RoseNoir } from '@/constants/theme';

type Props = { rating?: number; size?: number };

export function Stars({ rating = 5, size = 12 }: Props) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <View style={styles.row}>
      {Array.from({ length: 5 }, (_, i) => (
        <Text key={i} style={[styles.star, { fontSize: size, color: i < full || (i === full && half) ? RoseNoir.primary : RoseNoir.outlineVariant }]}>
          ★
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 1 },
  star: { lineHeight: undefined },
});
