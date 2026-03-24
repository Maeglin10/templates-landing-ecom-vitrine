'use client';

import { useEffect, useState } from 'react';

export function useConfig() {
  const [config, setConfig] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || '';
    const gaId = process.env.NEXT_PUBLIC_GA_ID || '';
    const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID || '';

    setConfig({ appUrl, gaId, pixelId });
  }, []);

  return config;
}
