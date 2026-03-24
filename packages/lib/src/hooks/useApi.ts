'use client';

import { useCallback, useRef, useState } from 'react';
import { ApiClient } from '@repo/lib/api';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useApi<T>(baseUrl?: string) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const client = useRef(new ApiClient(baseUrl));

  const call = useCallback(
    async (path: string, config?: any) => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await client.current.request<T>(path, config);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    []
  );

  return { ...state, call };
}
