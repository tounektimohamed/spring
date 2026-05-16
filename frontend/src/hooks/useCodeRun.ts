import { useMutation } from '@tanstack/react-query';
import { codeRunApi } from '../api/codeRun';
import type { CodeRunResponse } from '../types';

export function useCodeRun() {
  return useMutation({
    mutationFn: async (code: string): Promise<CodeRunResponse> => {
      const { data } = await codeRunApi.run(code);
      return data.data;
    },
  });
}
