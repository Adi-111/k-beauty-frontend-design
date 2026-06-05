import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { CartProvider } from '@/context/cart-context';
import '@/global.css';

export default function RootLayout() {
  return (
    <CartProvider>
      <StatusBar style="dark" />
      <AnimatedSplashOverlay />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#fbf6f4' } }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="product/[slug]" options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="checkout/index" options={{ headerShown: false, presentation: 'modal' }} />
        <Stack.Screen name="loyalty/index" options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="quiz/index" options={{ headerShown: false, animation: 'slide_from_right' }} />
      </Stack>
    </CartProvider>
  );
}
