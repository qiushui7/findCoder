import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { GitHubIcon } from '@/components/ui/icons';

interface DeveloperCardProps {
  type: 'personalized' | 'trending';
  developer: {
    id: string;
    login: string;
    name: string;
    avatarUrl: string;
    bio?: string;
    followers?: {
      totalCount: number;
    };
    repo?: {
      name: string;
      url: string;
      description: string;
    };
  };
}

export function DeveloperCard({ type, developer }: DeveloperCardProps) {
  return (
    <Card
      className="relative w-64 h-80 box-border bg-bgColor 
      border border-borderColor rounded-2xl p-6 transition-all duration-300 cursor-pointer
      hover:border-blueBorderColor hover:translate-y-[-5px] hover:shadow-xl"
    >
      <div className="flex flex-col h-full">
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
          <h3 className="mt-4 text-xl font-semibold text-center break-words max-w-[200px]">
            {developer.name}
          </h3>
          <a
            href={`https://github.com/${developer.login}`}
            className="text-blue-500 hover:underline text-center break-words max-w-[200px]"
            target="_blank"
            rel="noopener noreferrer"
          >
            @{developer.login}
          </a>
        </div>

        {type === 'personalized' && (
          <div className="flex-1">
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
            {developer.followers && (
              <div className="flex flex-col items-center justify-end flex-1 text-textColor text-[0.8rem]">
                <div>Followers</div>
                <div>{developer.followers.totalCount.toLocaleString()}</div>
              </div>
            )}
          </div>
        )}

        {type === 'trending' && developer.repo && (
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-center">
              <a
                href={developer.repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-500 hover:underline text-sm font-medium mb-2"
              >
                <GitHubIcon className="h-4 w-4" />
                <span className="truncate">{developer.repo.name}</span>
              </a>
            </div>
            <p
              className="text-textColor text-[0.8rem] line-clamp-3 text-center"
              title={developer.repo.description}
            >
              {developer.repo.description}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
