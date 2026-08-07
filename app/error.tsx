'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App Error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#07090E] text-[#FEF7E0] p-6 text-center">
      <div className="max-w-md p-8 rounded-2xl bg-[#0f1420]/80 border border-amber-500/30 shadow-[0_0_50px_rgba(212,175,55,0.2)]">
        <h2 className="text-2xl font-bold text-amber-400 mb-4">Something went wrong</h2>
        <p className="text-amber-200/70 mb-6 text-sm">
          An unexpected error occurred while rendering the page.
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-2.5 rounded-full bg-amber-500/20 border border-amber-500/50 text-amber-300 font-semibold hover:bg-amber-500/30 transition-all cursor-pointer"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
