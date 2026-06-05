import { Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import type { PressableProps } from 'react-native';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = PressableProps & { children: React.ReactNode };

export function PressableScale({ children, style, ...props }: Props) {
  const scale = useSharedValue(1);
  const anim = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <AnimatedPressable
      {...props}
      style={[anim, style as any]}
      onPressIn={e => { scale.value = withSpring(0.96, { damping: 15 }); props.onPressIn?.(e); }}
      onPressOut={e => { scale.value = withSpring(1, { damping: 15 }); props.onPressOut?.(e); }}
    >
      {children}
    </AnimatedPressable>
  );
}
