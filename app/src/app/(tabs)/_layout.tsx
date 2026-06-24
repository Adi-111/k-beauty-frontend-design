import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RoseNoir } from '@/constants/theme';
import { useCart } from '@/context/cart-context';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

function TabIcon({ name, nameFocused, focused }: { name: IoniconName; nameFocused: IoniconName; focused: boolean }) {
  const scale = useSharedValue(focused ? 1 : 0.88);

  useEffect(() => {
    scale.value = withSpring(focused ? 1 : 0.88, {
      damping: 10,
      stiffness: 220,
      mass: 0.6,
    });
  }, [focused]);

  const anim = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.tabIcon, focused && styles.tabIconActive, anim]}>
      <Ionicons name={focused ? nameFocused : name} size={22} color={focused ? '#fff' : '#9a8490'} />
    </Animated.View>
  );
}

function CartTabIcon({ focused }: { focused: boolean }) {
  const { itemCount } = useCart();
  const scale = useSharedValue(focused ? 1 : 0.88);

  useEffect(() => {
    scale.value = withSpring(focused ? 1 : 0.88, {
      damping: 10,
      stiffness: 220,
      mass: 0.6,
    });
  }, [focused]);

  const anim = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.tabIcon, focused && styles.tabIconActive, anim]}>
      <Ionicons name={focused ? 'bag' : 'bag-outline'} size={22} color={focused ? '#fff' : '#9a8490'} />
      {itemCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{itemCount > 9 ? '9+' : itemCount}</Text>
        </View>
      )}
    </Animated.View>
  );
}

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: Math.max(insets.bottom, 16),
          left: 24,
          right: 24,
          height: 64,
          borderRadius: 32,
          backgroundColor: '#1a0a10',
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.22,
          shadowRadius: 20,
          elevation: 20,
          paddingBottom: 0,
          paddingTop: 0,
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#9a8490',
        tabBarLabelStyle: { display: 'none' },
        tabBarItemStyle: { justifyContent: 'center' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabIcon name="home-outline" nameFocused="home" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: 'Discover',
          tabBarIcon: ({ focused }) => (
            <TabIcon name="storefront-outline" nameFocused="storefront" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Bag',
          tabBarIcon: ({ focused }) => <CartTabIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ focused }) => (
            <TabIcon name="person-outline" nameFocused="person" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconActive: {
    backgroundColor: RoseNoir.primary,
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#fff',
    borderRadius: 7,
    minWidth: 14,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  badgeText: { fontSize: 8, color: RoseNoir.primary, fontWeight: '800' },
});
