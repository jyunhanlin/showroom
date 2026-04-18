'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

export const Container = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('bg-gray-50 text-black dark:bg-gray-700 dark:text-white', className)} {...props} />
);
