import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { StarRating } from '@/components/ui/star-rating'
import { formatDistanceToNow } from 'date-fns'
import { GitHubIcon } from '@/components/ui/icons'

interface DeveloperCardProps {
  developer: {
    id: number
    login: string
    name: string
    avatar_url: string
    bio: string
    location: string
    followers: number
    public_repos: number
    created_at: string
    score: number
  }
}

export function DeveloperCard({ developer }: DeveloperCardProps) {
  return (
    <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
      {/* Background Logo */}
      <div className="absolute -top-5 -right-5 w-32 h-32 opacity-[0.03] rotate-[-15deg]">
        <GitHubIcon />
      </div>

      <div className="relative z-10 p-6">
        <div className="flex flex-col items-center mb-4">
          <Link href={`/user/${developer.login}`}>
            <Avatar 
              src={developer.avatar_url}
              alt={developer.name}
              className="w-24 h-24 border-4 border-blue-500 transition-transform hover:scale-105 cursor-pointer"
            />
          </Link>
          
          <h3 className="mt-4 text-xl font-semibold">{developer.name}</h3>
          <a 
            href={`https://github.com/${developer.login}`}
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            @{developer.login}
          </a>
          
          {developer.location && (
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
              <span>📍</span>
              {developer.location}
            </div>
          )}
        </div>

        <div className="min-h-[60px] mb-4">
          {developer.bio ? (
            <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
              {developer.bio}
            </p>
          ) : (
            <p className="text-gray-400 italic text-sm text-center">
              This user has no bio
            </p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-sm text-gray-500">Repos</div>
            <div className="font-medium">{developer.public_repos}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500">Followers</div>
            <div className="font-medium">{developer.followers}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500">Score</div>
            <StarRating value={developer.score} readonly />
          </div>
        </div>

        <div className="text-xs text-gray-500 text-center mt-2">
          Joined {formatDistanceToNow(new Date(developer.created_at), { addSuffix: true })}
        </div>
      </div>
    </Card>
  )
} 