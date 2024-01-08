'use client';

import { useMemo } from 'react';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

interface MainNavProps {
  className?: string;
}

export function MainNav({ className }: MainNavProps) {
  const pathname = usePathname();
  const params = useParams();

  const routes = useMemo(
    () => [
      {
        href: `/${params.storeId}`,
        label: 'Overview',
        active: pathname === `/${params.storeId}`,
      },
      {
        href: `/${params.storeId}/billboards`,
        label: 'Billboards',
        active: pathname === `/${params.storeId}/billboards`,
      },
      {
        href: `/${params.storeId}/categories`,
        label: 'Categories',
        active: pathname === `/${params.storeId}/categories`,
      },
      {
        href: `/${params.storeId}/settings`,
        label: 'Settings',
        active: pathname === `/${params.storeId}/settings`,
      },
    ],
    [params.storeId, pathname],
  );

  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
      {routes.map(route => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active ? 'text-black dark:text-white' : 'text-muted-foreground',
          )}>
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
