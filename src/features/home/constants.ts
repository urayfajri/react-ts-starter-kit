/**
 * Home Feature Constants
 * Type-safe, domain-specific constants for the Home feature
 */

// Home page sections
export const HOME_SECTIONS = {
  HERO: "hero",
  FEATURES: "features",
  SHOWCASE: "showcase",
  CTA: "call-to-action",
  FAQ: "faq",
} as const;

// Feature cards data
export const HOME_FEATURES = {
  COUNT: 3,
  TITLES: {
    REACT: "React 19",
    TYPESCRIPT: "TypeScript",
    TAILWIND: "TailwindCSS",
  } as const,
  DESCRIPTIONS: {
    REACT: "Latest React features with server components ready",
    TYPESCRIPT: "Fully typed for safety and better DX",
    TAILWIND: "Utility-first CSS for rapid UI development",
  } as const,
} as const;

// Navigation items
export const HOME_NAVIGATION = {
  HOME: "/",
  PRODUCTS: "/products",
  DOCS: "/docs",
  GITHUB: "https://github.com",
} as const;

// CTA (Call To Action) configuration
export const HOME_CTA = {
  PRIMARY_TEXT: "Get Started",
  PRIMARY_HREF: "/products",
  SECONDARY_TEXT: "Learn More",
  SECONDARY_HREF: "/docs",
} as const;

// Content messaging
export const HOME_MESSAGES = {
  WELCOME_TITLE: "Welcome to React TS Starter",
  WELCOME_SUBTITLE: "A modern, feature-rich React starter kit with TypeScript",
  HERO_DESCRIPTION:
    "Build production-ready React applications with best practices built-in",
  FEATURES_TITLE: "Why Choose This Starter?",
  FEATURES_SUBTITLE: "Everything you need to build modern web applications",
} as const;

// Performance/Cache settings for home page
export const HOME_CACHE = {
  CONTENT_STALE_TIME: 60 * 60 * 1000, // 1 hour
  REFRESH_INTERVAL: 5 * 60 * 1000, // 5 minutes
} as const;

// Animation timings (ms)
export const HOME_ANIMATIONS = {
  FADE_IN: 300,
  SLIDE_UP: 400,
  STAGGER_DELAY: 100,
} as const;

/**
 * Type-safe constant access examples:
 *
 * @example
 * // Navigation
 * import { HOME_NAVIGATION } from "./constants";
 *
 * <Link href={HOME_NAVIGATION.PRODUCTS}>
 *   Go to Products
 * </Link>
 *
 * @example
 * // Rendering features
 * import { HOME_FEATURES } from "./constants";
 *
 * const features = Object.entries(HOME_FEATURES.TITLES).map(([key, title]) => ({
 *   title,
 *   description: HOME_FEATURES.DESCRIPTIONS[key as keyof typeof HOME_FEATURES.DESCRIPTIONS]
 * }));
 *
 * @example
 * // Messages
 * import { HOME_MESSAGES } from "./constants";
 *
 * <h1>{HOME_MESSAGES.WELCOME_TITLE}</h1>
 * <p>{HOME_MESSAGES.WELCOME_SUBTITLE}</p>
 */

// Export type utilities for advanced typing
export type HomeSection = (typeof HOME_SECTIONS)[keyof typeof HOME_SECTIONS];
