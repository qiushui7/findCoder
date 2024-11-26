'use client';

import { useEffect, useState } from 'react';
import { DeveloperCard } from './developer-card';
import { RecommendSkeleton } from './recommend-skeleton';
import { RecommendTabs } from './recommend-tabs';

type TabType = 'personalized' | 'trending';

export function RecommendList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('trending');
  const [filters, setFilters] = useState({ language: '', since: 'daily' });

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      try {
        const endpoint =
          activeTab === 'personalized'
            ? '/api/recommend'
            : `/api/trending?language=${filters.language}&since=${filters.since}`;
        const res = await fetch(endpoint);
        const data = await res.json();
        setUsers(data.users);
      } catch (error) {
        console.error(`Failed to fetch ${activeTab} users:`, error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [activeTab, filters]);

  const handleFilterChange = (language: string, since: string) => {
    setFilters({ language, since });
  };

  if (loading) {
    return (
      <div>
        <RecommendTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onFilterChange={handleFilterChange}
        />
        <RecommendSkeleton />
      </div>
    );
  }

  if (!users.length) {
    return (
      <div>
        <RecommendTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onFilterChange={handleFilterChange}
        />
        <div className="text-center py-8">暂无推荐内容</div>
      </div>
    );
  }

  return (
    <div>
      <RecommendTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onFilterChange={handleFilterChange}
      />
      <div className="grid grid-cols-5 gap-8 justify-center justify-items-center">
        {users.map((user: any) => (
          <DeveloperCard key={user.id} type={activeTab} developer={user} />
        ))}
      </div>
    </div>
  );
}
