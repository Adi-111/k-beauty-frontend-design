import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#000000',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
  },
  dark: {
    text: '#ffffff',
    background: '#000000',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;

// Rosé Noir palette
export const RoseNoir = {
  primary:                    '#6b1e3a',
  onPrimary:                  '#fbf6f4',
  primaryContainer:           '#e6a8b7',
  onPrimaryContainer:         '#4a2530',
  primaryFixed:               '#f5d4dc',
  primaryFixedDim:            '#e6a8b7',
  secondary:                  '#4a2530',
  onSecondary:                '#fbf6f4',
  secondaryContainer:         '#f0dde0',
  onSecondaryContainer:       '#6e4a50',
  background:                 '#fbf6f4',
  onBackground:               '#2b1a1f',
  surface:                    '#fbf6f4',
  surfaceBright:              '#fbf6f4',
  surfaceDim:                 '#e2d6d7',
  surfaceVariant:             '#ebdedf',
  onSurface:                  '#2b1a1f',
  onSurfaceVariant:           '#7a4f5a',
  inverseSurface:             '#3a2a30',
  inverseOnSurface:           '#f5e9ec',
  surfaceContainerLowest:     '#ffffff',
  surfaceContainerLow:        '#f6ecec',
  surfaceContainer:           '#f0e4e5',
  surfaceContainerHigh:       '#e9dadc',
  surfaceContainerHighest:    '#e2d0d3',
  outline:                    '#c4a0a8',
  outlineVariant:             '#ddc0c8',
  tertiaryFixed:              '#f9e8d0',
  onTertiaryFixed:            '#4a2530',
  error:                      '#ba1a1a',
  onError:                    '#ffffff',
} as const;
