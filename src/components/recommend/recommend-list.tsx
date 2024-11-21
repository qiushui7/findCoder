import { DeveloperCard } from './developer-card'

export async function RecommendList() {
  //   const developers = await getRecommendDevelopers()
  const developers = [
    {
      id: 1,
      name: 'John Doe',
      avatar: 'https://github.com/john-doe.png',
    },
  ]
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {developers.map((developer) => (
        <DeveloperCard key={developer.id} developer={developer} />
      ))}
    </div>
  )
} 