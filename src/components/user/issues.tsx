'use client';

import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { formatDistance } from 'date-fns';

interface IssuesProps {
  username: string;
}

export function Issues({ username }: IssuesProps) {
  const [issues, setIssues] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadIssues = async () => {
      try {
        const res = await fetch(`/api/user/${username}/issues`);
        const data = await res.json();
        setIssues(data);
      } catch (error) {
        console.error('Failed to load issues:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadIssues();
  }, [username]);

  //   if (isLoading) {
  //     return <IssuesSkeleton />
  //   }

  //   if (issues.length === 0) {
  //     return (
  //       <Card className="p-6 text-center">
  //         <div className="text-4xl mb-4">🔍</div>
  //         <h3 className="text-lg font-medium mb-2">No issues</h3>
  //         <p className="text-muted-foreground">This user hasn't created any issues yet.</p>
  //       </Card>
  //     )
  //   }

  return (
    <div className="space-y-4">
      {issues.map((issue) => (
        <Card key={issue.id} className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm text-muted-foreground mb-1">
                {issue.repository.name}
              </div>
              <a
                href={issue.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium hover:text-blue-500"
              >
                {issue.title}
              </a>
            </div>
            <span
              className={`px-2 py-1 rounded-full text-xs ${
                issue.state === 'open'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {issue.state}
            </span>
          </div>
          <div className="mt-4 flex gap-4 text-sm text-muted-foreground">
            <span>
              Created{' '}
              {formatDistance(new Date(issue.created_at), new Date(), {
                addSuffix: true,
              })}
            </span>
            <span>
              Updated{' '}
              {formatDistance(new Date(issue.updated_at), new Date(), {
                addSuffix: true,
              })}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
}
