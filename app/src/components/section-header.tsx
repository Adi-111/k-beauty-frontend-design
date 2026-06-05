import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RoseNoir } from '@/constants/theme';

type Props = {
  eyebrow?: string;
  title: string;
  viewAllLabel?: string;
  onViewAll?: () => void;
};

export function SectionHeader({ eyebrow, title, viewAllLabel, onViewAll }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.text}>
        {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
        <Text style={styles.title}>{title}</Text>
      </View>
      {onViewAll ? (
        <TouchableOpacity onPress={onViewAll}>
          <Text style={styles.link}>{viewAllLabel ?? 'View all'} →</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 12 },
  text: { gap: 2 },
  eyebrow: { fontSize: 11, fontWeight: '600', letterSpacing: 1.5, textTransform: 'uppercase', color: RoseNoir.primary },
  title: { fontSize: 22, fontWeight: '600', color: RoseNoir.onBackground, fontFamily: 'ui-serif' },
  link: { fontSize: 13, color: RoseNoir.primary, fontWeight: '500' },
});
