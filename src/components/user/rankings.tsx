'use client';

import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';

interface RankingsProps {
  username: string;
}

export function Rankings({ username }: RankingsProps) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [reposRes, langsRes] = await Promise.all([
          fetch(`/api/user/${username}/repositories`),
          fetch(`/api/user/${username}/languages`),
        ]);

        const [repos, langs] = await Promise.all([
          reposRes.json(),
          langsRes.json(),
        ]);

        setData({
          repos,
          languages: langs,
        });
      } catch (error) {
        console.error('Failed to load rankings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [username]);

  // if (isLoading) {
  //   return <RankingsSkeleton />
  // }

  return <div className="space-y-6"></div>;
}
