import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { StarRating } from '@/components/ui/star-rating';
import { formatDistanceToNow } from 'date-fns';
import { GitHubIcon } from '@/components/ui/icons';

interface DeveloperCardProps {
  developer: {
    id: string;
    login: string;
    name: string;
    avatarUrl: string;
    bio: string;
    followers: {
      totalCount: number;
    };
  };
}

export function DeveloperCard({ developer }: DeveloperCardProps) {
  return (
    <Card
      className="relative w-64 h-80 box-border bg-bgColor 
      border border-borderColor rounded-2xl p-6 transition-all duration-300 cursor-pointer
      hover:border-blueBorderColor hover:translate-y-[-5px] hover:shadow-xl"
    >
      <div>
        <div className="flex flex-col items-center mb-4">
          <div className="w-24 h-24 rounded-full border-[3px] border-blueBorderColor cursor-pointer overflow-hidden">
            <Avatar
              src={developer.avatarUrl}
              alt={developer.login}
              width={96}
              height={96}
              className="hover:scale-110 transition-all duration-300"
            />
          </div>
          <h3 className="mt-4 text-xl font-semibold">{developer.name}</h3>
          <a
            href={`https://github.com/${developer.login}`}
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            @{developer.login}
          </a>
        </div>

        <div className="min-h-[50px]">
          {developer.bio ? (
            <p
              className="text-textColor text-sm text-center text-ellipsis line-clamp-2"
              title={developer.bio}
            >
              {developer.bio}
            </p>
          ) : (
            <p className="text-gray-400 italic text-sm text-center">
              This user has no bio
            </p>
          )}
        </div>
        <div className="flex flex-col items-center justify-center text-textColor text-[0.8rem]">
          <div>Followers</div>
          <div>{developer.followers.totalCount.toLocaleString()}</div>
        </div>
      </div>
    </Card>
  );
}
