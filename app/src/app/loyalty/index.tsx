import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { RoseNoir } from '@/constants/theme';
import { api, type ApiLoyalty, type ApiLoyaltyTransaction } from '@/lib/api';
import { useAuth } from '@/context/auth-context';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const TIERS: { name: string; min: number; max: number | null; icon: IoniconName; perks: string[] }[] = [
  { name: 'Glow', min: 0, max: 499, icon: 'leaf-outline', perks: ['Early access to new drops', 'Birthday gift', 'Free samples'] },
  { name: 'Radiance', min: 500, max: 1499, icon: 'flash-outline', perks: ['All Glow perks', '5% store credit', 'Free express shipping'] },
  { name: 'Luminance', min: 1500, max: null, icon: 'diamond-outline', perks: ['All Radiance perks', '10% store credit', 'Dedicated beauty advisor'] },
];

const EARN: { icon: IoniconName; label: string; pts: string }[] = [
  { icon: 'bag-handle-outline', label: 'Shop', pts: '+10 pts per $1' },
  { icon: 'star-outline', label: 'Review', pts: '+50 pts' },
  { icon: 'people-outline', label: 'Refer a Friend', pts: '+200 pts' },
  { icon: 'camera-outline', label: 'Share on Social', pts: '+30 pts' },
];

export default function LoyaltyScreen() {
  const { token, user } = useAuth();
  const [loyalty, setLoyalty] = useState<ApiLoyalty | null>(null);
  const [transactions, setTransactions] = useState<ApiLoyaltyTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) { setLoading(false); return; }
    Promise.all([
      api.get<ApiLoyalty>('/loyalty', token),
      api.get<ApiLoyaltyTransaction[]>('/loyalty/transactions', token),
    ]).then(([l, t]) => {
      if (l) setLoyalty(l);
      setTransactions(t ?? []);
    }).catch(() => {}).finally(() => setLoading(false));
  }, [token]);

  const CURRENT_PTS = loyalty?.points ?? 0;
  const tierName = loyalty?.tier ?? 'Glow';
  const CURRENT_TIER = TIERS.find(t => t.name === tierName) ?? TIERS[0];
  const NEXT_TIER = TIERS[TIERS.findIndex(t => t.name === tierName) + 1] ?? null;
  const progress = NEXT_TIER
    ? (CURRENT_PTS - CURRENT_TIER.min) / (NEXT_TIER.min - CURRENT_TIER.min)
    : 1;

  if (loading) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={20} color={RoseNoir.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>O'Circle Rewards</Text>
          <View style={{ width: 40 }} />
        </View>
        <ActivityIndicator color={RoseNoir.primary} style={{ flex: 1 }} />
      </SafeAreaView>
    );
  }

  if (!token) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={20} color={RoseNoir.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>O'Circle Rewards</Text>
          <View style={{ width: 40 }} />
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, padding: 32 }}>
          <Ionicons name="diamond-outline" size={56} color={RoseNoir.primary} />
          <Text style={{ fontSize: 22, fontWeight: '800', color: RoseNoir.onBackground, fontFamily: 'ui-serif', textAlign: 'center' }}>
            Join O'Circle Rewards
          </Text>
          <Text style={{ fontSize: 14, color: RoseNoir.onSurfaceVariant, textAlign: 'center', lineHeight: 22 }}>
            Sign in to view your points, tier status, and earn rewards on every order.
          </Text>
          <TouchableOpacity
            style={{ backgroundColor: RoseNoir.primary, paddingHorizontal: 32, paddingVertical: 14, borderRadius: 28, marginTop: 8 }}
            onPress={() => router.push('/(tabs)/account')}
          >
            <Text style={{ color: '#fff', fontWeight: '700', fontSize: 15 }}>Sign In →</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={20} color={RoseNoir.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>O'Circle Rewards</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Points card */}
        <View style={styles.pointsCard}>
          <LinearGradient
            colors={[RoseNoir.primary, '#3a0f20']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.pointsTop}>
            <View>
              <Text style={styles.welcomeText}>Welcome back</Text>
              <Text style={styles.memberName}>{user?.name ?? 'Member'}</Text>
            </View>
            <View style={styles.tierBadge}>
              <Ionicons name={CURRENT_TIER.icon} size={13} color="#fbf6f4" />
              <Text style={styles.tierBadgeName}>{CURRENT_TIER.name}</Text>
            </View>
          </View>
          <Text style={styles.pointsValue}>{CURRENT_PTS.toLocaleString()}</Text>
          <Text style={styles.pointsLabel}>Circle Points</Text>
          {NEXT_TIER && (
            <>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
              </View>
              <Text style={styles.progressText}>
                {NEXT_TIER.min - CURRENT_PTS} pts to reach {NEXT_TIER.name}
              </Text>
            </>
          )}
        </View>

        {/* Tiers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Membership Tiers</Text>
          {TIERS.map(tier => {
            const active = tier.name === CURRENT_TIER.name;
            return (
              <View key={tier.name} style={[styles.tierCard, active && styles.tierCardActive]}>
                <View style={styles.tierHeader}>
                  <View style={[styles.tierIconWrap, active && styles.tierIconWrapActive]}>
                    <Ionicons name={tier.icon} size={18} color={active ? '#fff' : RoseNoir.onSurfaceVariant} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.tierName}>{tier.name}</Text>
                    <Text style={styles.tierRange}>
                      {tier.max ? `${tier.min}–${tier.max} pts` : `${tier.min}+ pts`}
                    </Text>
                  </View>
                  {active && <View style={styles.activePill}><Text style={styles.activePillText}>Current</Text></View>}
                </View>
                <View style={styles.perksWrap}>
                  {tier.perks.map(p => (
                    <Text key={p} style={styles.perk}>✓ {p}</Text>
                  ))}
                </View>
              </View>
            );
          })}
        </View>

        {/* Ways to earn */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ways to Earn</Text>
          {EARN.map(e => (
            <View key={e.label} style={styles.earnRow}>
              <View style={styles.earnIconWrap}>
                <Ionicons name={e.icon} size={18} color={RoseNoir.primary} />
              </View>
              <Text style={styles.earnLabel}>{e.label}</Text>
              <Text style={styles.earnPts}>{e.pts}</Text>
            </View>
          ))}
        </View>

        {/* Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {transactions.length === 0 ? (
            <Text style={{ fontSize: 13, color: RoseNoir.onSurfaceVariant }}>No activity yet. Start shopping to earn points!</Text>
          ) : transactions.slice(0, 8).map(t => {
            const isNeg = t.type === 'redeem';
            const pts = `${isNeg ? '-' : '+'}${Math.abs(t.points)}`;
            const date = new Date(t.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
            return (
              <View key={t.id} style={styles.activityRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.activityLabel}>{t.reason}</Text>
                  <Text style={styles.activityDate}>{date}</Text>
                </View>
                <Text style={[styles.activityPts, isNeg && styles.activityPtsNeg]}>{pts}</Text>
              </View>
            );
          })}
        </View>

        {/* Redeem */}
        <View style={[styles.section, styles.redeemBanner]}>
          <Text style={styles.redeemTitle}>Ready to redeem?</Text>
          <Text style={styles.redeemSub}>Use your {CURRENT_PTS} points for ${(CURRENT_PTS * 0.01).toFixed(2)} off your next order.</Text>
          <TouchableOpacity style={styles.redeemBtn}>
            <Text style={styles.redeemBtnText}>Redeem Points →</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: RoseNoir.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: RoseNoir.surfaceContainerLow, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: RoseNoir.onBackground, fontFamily: 'ui-serif' },
  scroll: { padding: 20, gap: 24 },
  pointsCard: { borderRadius: 24, padding: 24, gap: 6, overflow: 'hidden' },
  pointsTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  welcomeText: { fontSize: 13, color: 'rgba(251,246,244,0.7)' },
  memberName: { fontSize: 20, fontWeight: '700', color: '#fbf6f4', fontFamily: 'ui-serif' },
  tierBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(251,246,244,0.15)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
  tierBadgeName: { fontSize: 12, color: '#fbf6f4', fontWeight: '700' },
  pointsValue: { fontSize: 48, fontWeight: '700', color: '#fbf6f4', fontFamily: 'ui-serif', lineHeight: 52 },
  pointsLabel: { fontSize: 14, color: 'rgba(251,246,244,0.7)', marginBottom: 12 },
  progressTrack: { height: 4, backgroundColor: 'rgba(251,246,244,0.25)', borderRadius: 2, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#fbf6f4', borderRadius: 2 },
  progressText: { fontSize: 12, color: 'rgba(251,246,244,0.7)', marginTop: 6 },
  section: { gap: 10 },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: RoseNoir.onBackground, fontFamily: 'ui-serif', marginBottom: 4 },
  tierCard: { backgroundColor: '#fff', borderRadius: 18, padding: 18, shadowColor: '#6b1e3a', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  tierCardActive: { backgroundColor: RoseNoir.surfaceContainerLowest, shadowOpacity: 0.1 },
  tierHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  tierIconWrap: { width: 40, height: 40, borderRadius: 20, backgroundColor: RoseNoir.surfaceContainerLow, alignItems: 'center', justifyContent: 'center' },
  tierIconWrapActive: { backgroundColor: RoseNoir.primary },
  tierName: { fontSize: 16, fontWeight: '700', color: RoseNoir.onBackground },
  tierRange: { fontSize: 12, color: RoseNoir.onSurfaceVariant },
  activePill: { backgroundColor: RoseNoir.primary, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  activePillText: { fontSize: 11, color: RoseNoir.onPrimary, fontWeight: '700' },
  perksWrap: { gap: 4 },
  perk: { fontSize: 13, color: RoseNoir.onSurfaceVariant },
  earnRow: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: RoseNoir.outlineVariant },
  earnIconWrap: { width: 38, height: 38, borderRadius: 19, backgroundColor: RoseNoir.primaryContainer, alignItems: 'center', justifyContent: 'center' },
  earnLabel: { flex: 1, fontSize: 14, fontWeight: '500', color: RoseNoir.onBackground },
  earnPts: { fontSize: 14, fontWeight: '700', color: RoseNoir.primary },
  activityRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: RoseNoir.outlineVariant },
  activityLabel: { fontSize: 14, fontWeight: '500', color: RoseNoir.onBackground },
  activityDate: { fontSize: 12, color: RoseNoir.onSurfaceVariant, marginTop: 2 },
  activityPts: { fontSize: 15, fontWeight: '700', color: '#4a7c59' },
  activityPtsNeg: { color: RoseNoir.error },
  redeemBanner: { backgroundColor: RoseNoir.primaryContainer, borderRadius: 20, padding: 20 },
  redeemTitle: { fontSize: 20, fontWeight: '700', color: RoseNoir.onPrimaryContainer, fontFamily: 'ui-serif' },
  redeemSub: { fontSize: 13, color: RoseNoir.secondary, lineHeight: 20 },
  redeemBtn: { alignSelf: 'flex-start', backgroundColor: RoseNoir.primary, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 24 },
  redeemBtnText: { fontSize: 13, fontWeight: '700', color: RoseNoir.onPrimary },
});
