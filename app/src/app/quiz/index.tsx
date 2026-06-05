import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeInRight } from 'react-native-reanimated';
import { RoseNoir } from '@/constants/theme';
import { trendingNow } from '@/lib/products';
import { ProductCard } from '@/components/product-card';

const { width: W } = Dimensions.get('window');
const CARD_W = (W - 52) / 2;

type Question = { q: string; hint: string; options: string[] };

const QUESTIONS: Question[] = [
  {
    q: 'How would you describe your skin type?',
    hint: 'Choose the one that fits most days',
    options: ['Dry & tight', 'Oily & shiny', 'Combination', 'Sensitive & reactive', 'Normal, lucky me!'],
  },
  {
    q: "What's your top skin concern?",
    hint: "Pick your biggest worry right now",
    options: ['Hydration & plumpness', 'Dullness & uneven tone', 'Acne & blemishes', 'Fine lines & firmness', 'Redness & sensitivity'],
  },
  {
    q: 'How many steps is your ideal routine?',
    hint: 'Honest answer, no judgment',
    options: ['1–2 steps (keep it quick)', '3–4 steps (balanced)', '5+ steps (full ritual)', 'Whatever works best'],
  },
  {
    q: 'When do you usually do your skincare?',
    hint: 'Your routine lifestyle',
    options: ['Morning only', 'Night only', 'Both AM & PM', 'Whenever I remember'],
  },
];

const RECOMMENDED = trendingNow(4);

export default function QuizScreen() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const done = step >= QUESTIONS.length;
  const progress = Math.min(step / QUESTIONS.length, 1);

  const handleAnswer = (answer: string) => {
    setAnswers(a => [...a, answer]);
    setStep(s => s + 1);
  };

  const reset = () => { setStep(0); setAnswers([]); };

  if (done) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={20} color={RoseNoir.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Your Ritual</Text>
          <View style={{ width: 40 }} />
        </View>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
          <Animated.View entering={FadeIn} style={styles.resultHero}>
            <Text style={styles.resultEmoji}>✨</Text>
            <Text style={styles.resultTitle}>Your ritual is ready!</Text>
            <Text style={styles.resultSub}>Based on your answers, we've curated the perfect K-beauty routine for you.</Text>
          </Animated.View>

          <Text style={styles.recTitle}>Your Recommended Picks</Text>
          <View style={styles.relatedGrid}>
            {RECOMMENDED.map(p => (
              <ProductCard key={p.slug} product={p} width={CARD_W} />
            ))}
          </View>

          <TouchableOpacity style={styles.shopBtn} onPress={() => router.push('/(tabs)/shop')}>
            <Text style={styles.shopBtnText}>Shop My Routine →</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={reset} style={{ alignItems: 'center', marginTop: 12 }}>
            <Text style={styles.retakeLink}>↺ Retake Quiz</Text>
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  const current = QUESTIONS[step];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => step > 0 ? setStep(s => s - 1) : router.back()}>
          <Ionicons name="chevron-back" size={20} color={RoseNoir.primary} />
        </TouchableOpacity>
        <Text style={styles.stepCounter}>{step + 1} / {QUESTIONS.length}</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Progress */}
      <View style={styles.progressTrack}>
        <Animated.View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInRight.springify()} key={step} style={styles.questionCard}>
          <Text style={styles.stepBadge}>Question {step + 1}</Text>
          <Text style={styles.question}>{current.q}</Text>
          <Text style={styles.hint}>{current.hint}</Text>
        </Animated.View>

        <View style={styles.options}>
          {current.options.map((opt, i) => (
            <Animated.View key={opt} entering={FadeIn.delay(i * 60)}>
              <TouchableOpacity style={styles.optionRow} onPress={() => handleAnswer(opt)}>
                <View style={styles.optionNumBadge}>
                  <Text style={styles.optionNum}>{String.fromCharCode(65 + i)}</Text>
                </View>
                <Text style={styles.optionText}>{opt}</Text>
                <Ionicons name="chevron-forward" size={16} color={RoseNoir.primary} />
              </TouchableOpacity>
            </Animated.View>
          ))}
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
  stepCounter: { fontSize: 14, fontWeight: '600', color: RoseNoir.onSurfaceVariant },
  progressTrack: { height: 3, backgroundColor: RoseNoir.surfaceContainerHigh, marginHorizontal: 20, borderRadius: 2, overflow: 'hidden', marginBottom: 4 },
  progressFill: { height: '100%', backgroundColor: RoseNoir.primary, borderRadius: 2 },
  scroll: { padding: 20, gap: 16 },
  questionCard: { backgroundColor: RoseNoir.primaryContainer, borderRadius: 20, padding: 24, gap: 8 },
  stepBadge: { alignSelf: 'flex-start', backgroundColor: 'rgba(107,30,58,0.15)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, fontSize: 11, fontWeight: '700', color: RoseNoir.primary, letterSpacing: 0.5, textTransform: 'uppercase' },
  question: { fontSize: 22, fontWeight: '700', color: RoseNoir.onPrimaryContainer, fontFamily: 'ui-serif', lineHeight: 30 },
  hint: { fontSize: 13, color: RoseNoir.secondary, lineHeight: 20 },
  options: { gap: 10 },
  optionRow: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#fff', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 16, shadowColor: '#6b1e3a', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
  optionNumBadge: { width: 28, height: 28, borderRadius: 14, backgroundColor: RoseNoir.primaryContainer, alignItems: 'center', justifyContent: 'center' },
  optionNum: { fontSize: 12, fontWeight: '700', color: RoseNoir.primary },
  optionText: { fontSize: 15, fontWeight: '500', color: RoseNoir.onBackground, flex: 1 },
  resultHero: { alignItems: 'center', gap: 10, paddingVertical: 20, backgroundColor: RoseNoir.primaryContainer, borderRadius: 20, marginBottom: 8 },
  resultEmoji: { fontSize: 48 },
  resultTitle: { fontSize: 26, fontWeight: '700', color: RoseNoir.onPrimaryContainer, fontFamily: 'ui-serif' },
  resultSub: { fontSize: 13, color: RoseNoir.secondary, textAlign: 'center', lineHeight: 20, paddingHorizontal: 16 },
  recTitle: { fontSize: 18, fontWeight: '700', color: RoseNoir.onBackground, fontFamily: 'ui-serif' },
  relatedGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  shopBtn: { backgroundColor: RoseNoir.primary, paddingVertical: 16, borderRadius: 28, alignItems: 'center', marginTop: 8 },
  shopBtnText: { fontSize: 15, fontWeight: '700', color: RoseNoir.onPrimary },
  retakeLink: { fontSize: 14, color: RoseNoir.primary, fontWeight: '600' },
});
