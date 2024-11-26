import { RecommendList } from '@/components/recommend/recommend-list';

export const revalidate = 3600;

export default async function HomePage() {
  return (
    <main className="container mx-auto p-4">
      <RecommendList />
    </main>
  );
}
