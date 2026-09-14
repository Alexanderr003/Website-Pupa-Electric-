import type { ReactNode } from 'react';

/**
 * The real <html> lives in app/[locale]/layout.tsx, because the lang attribute
 * depends on the route segment. This layout only passes children through.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
