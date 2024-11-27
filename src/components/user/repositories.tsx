'use client';

import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { formatDistance } from 'date-fns';

interface RepositoriesProps {
  username: string;
}

export function Repositories({ username }: RepositoriesProps) {
  const [repos, setRepos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRepos = async () => {
      try {
        const res = await fetch(`/api/user/${username}/repositories`);
        const data = await res.json();
        setRepos(data);
      } catch (error) {
        console.error('Failed to load repositories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRepos();
  }, [username]);

  // if (isLoading) {
  //   return <RepositoriesSkeleton />
  // }

  // if (repos.length === 0) {
  //   return (
  //     <Card className="p-6 text-center">
  //       <div className="text-4xl mb-4">📦</div>
  //       <h3 className="text-lg font-medium mb-2">No repositories</h3>
  //       <p className="text-muted-foreground">This user hasn't created any repositories yet.</p>
  //     </Card>
  //   )
  // }

  return (
    <div className="space-y-4">
      {repos.map((repo) => (
        <Card key={repo.id} className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium hover:text-blue-500"
              >
                {repo.name}
              </a>
              {repo.language && (
                <span className="ml-2 text-sm text-muted-foreground">
                  {repo.language}
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>⭐ {repo.stargazers_count}</span>
              <span>🔀 {repo.forks_count}</span>
              <span>⚠️ {repo.open_issues_count}</span>
            </div>
          </div>
          {repo.description && (
            <p className="mt-2 text-muted-foreground">{repo.description}</p>
          )}
          <div className="mt-4 flex gap-4 text-sm text-muted-foreground">
            <span>
              Created{' '}
              {formatDistance(new Date(repo.created_at), new Date(), {
                addSuffix: true,
              })}
            </span>
            <span>
              Updated{' '}
              {formatDistance(new Date(repo.updated_at), new Date(), {
                addSuffix: true,
              })}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
}
