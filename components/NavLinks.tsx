'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Client-side only so it can read the current path: the header has to say which
 * page you are on, and a server component cannot know that. Comparison is exact
 * because the hrefs come from the same slug table the router matched.
 */
export function NavLinks({
  items,
  label,
}: {
  items: { href: string; label: string }[];
  label: string;
}) {
  const pathname = usePathname();

  return (
    <nav className="nav" aria-label={label}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={pathname === item.href ? 'page' : undefined}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
