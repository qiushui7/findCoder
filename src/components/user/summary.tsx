'use client';

import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';

interface SummaryProps {
  username: string;
}

export function Summary({ username }: SummaryProps) {
  const [summary, setSummary] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSummary = async () => {
      try {
        const res = await fetch(`/api/user/${username}/summary`);
        const data = await res.json();
        setSummary(data.summary);
      } catch (error) {
        console.error('Failed to load summary:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSummary();
  }, [username]);

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🤖</span>
        <h3 className="text-lg font-medium">AI Generated Summary</h3>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6" />
        </div>
      ) : (
        <div className="relative">
          <span className="absolute -top-4 left-0 text-4xl opacity-10">❝</span>
          <p className="text-lg leading-relaxed px-6">{summary}</p>
          <span className="absolute -bottom-4 right-0 text-4xl opacity-10">
            ❞
          </span>
        </div>
      )}
    </Card>
  );
}
