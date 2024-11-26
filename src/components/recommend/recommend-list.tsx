'use client';

import { useEffect, useState } from 'react';
import { DeveloperCard } from './developer-card';
import { RecommendSkeleton } from './recommend-skeleton';

export function RecommendList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecommendUsers() {
      try {
        const res = await fetch('/api/recommend');
        const data = await res.json();
        setUsers(data.users);
      } catch (error) {
        console.error('Failed to fetch recommended users:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendUsers();
  }, []);

  if (loading) {
    return <RecommendSkeleton />;
  }

  if (!users.length) {
    return <div>No recommendations available</div>;
  }

  return (
    <div className="grid grid-cols-5 gap-8 justify-center justify-items-center">
      {users.map((user: any) => (
        <DeveloperCard key={user.id} developer={user} />
      ))}
    </div>
  );
}
