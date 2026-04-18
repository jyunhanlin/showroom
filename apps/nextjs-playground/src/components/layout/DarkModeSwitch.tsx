'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { Switch } from '@/components/ui/switch';

export const DarkModeSwitch = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <Switch
      className="fixed top-4 right-4"
      checked={isDark}
      onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
    />
  );
};
