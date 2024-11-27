import { Suspense } from 'react';
import { UserProfile } from '@/components/user/profile';
import { UserContent } from '@/components/user/content';
import { headers } from 'next/headers';
// import { getUserInfo } from '@/lib/github'

interface PageProps {
  params: {
    login: string;
  };
}

export default async function UserPage({ params }: PageProps) {
  const head = await headers();
  const { login } = await params;
  const data = await fetch(
    `http://${head.get('host')}/api/user/info?login=${login}`,
  );
  const userInfo = await data.json();
  return (
    <div className="container mx-auto p-4 flex gap-8 min-h-[80vh]">
      <UserProfile userInfo={userInfo} />
      <div className="flex-1">
        <Suspense fallback={<div>Loading...</div>}>
          <UserContent username={'qiushui'} />
        </Suspense>
      </div>
    </div>
  );
}
