import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Platform, StyleSheet, View } from 'react-native';
import { Text } from 'react-native';
import { RoseNoir } from '@/constants/theme';
import { useCart } from '@/context/cart-context';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

function TabIcon({ name, nameFocused, focused }: { name: IoniconName; nameFocused: IoniconName; focused: boolean }) {
  return (
    <View style={styles.tabItem}>
      <Ionicons name={focused ? nameFocused : name} size={24} color={focused ? RoseNoir.primary : '#b0a0a5'} />
      {focused && <View style={styles.activeDot} />}
    </View>
  );
}

function CartTabIcon({ focused }: { focused: boolean }) {
  const { itemCount } = useCart();
  return (
    <View style={styles.tabItem}>
      <View>
        <Ionicons name={focused ? 'bag' : 'bag-outline'} size={24} color={focused ? RoseNoir.primary : '#b0a0a5'} />
        {itemCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{itemCount > 9 ? '9+' : itemCount}</Text>
          </View>
        )}
      </View>
      {focused && <View style={styles.activeDot} />}
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.06,
          shadowRadius: 16,
          elevation: 12,
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? 4 : 10,
          height: Platform.OS === 'ios' ? 82 : 66,
        },
        tabBarActiveTintColor: RoseNoir.primary,
        tabBarInactiveTintColor: '#b0a0a5',
        tabBarLabelStyle: { fontSize: 10, fontWeight: '600', marginTop: 1 },
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
  tabItem: { alignItems: 'center', gap: 3 },
  activeDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: RoseNoir.primary },
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: RoseNoir.primary,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  badgeText: { fontSize: 9, color: '#fff', fontWeight: '800' },
});
