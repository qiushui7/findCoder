import { Avatar } from '@/components/ui/avatar';
import { formatNumber } from '@/lib/utils';

interface UserProfileProps {
  userInfo: {
    name: string;
    login: string;
    avatar_url: string;
    bio: string;
    location: string;
    followers: number;
    totalStars?: number;
    repos?: number;
    following?: number;
  };
}

export function UserProfile({ userInfo }: UserProfileProps) {
  return (
    <div className="w-[300px] flex-shrink-0">
      <div className="box-border h-full rounded-2xl bg-bgColor border border-borderColor flex flex-col items-center px-6 py-8">
        <Avatar
          src={userInfo.avatar_url}
          alt={userInfo.name}
          width={200}
          height={200}
          className="w-[200px] h-[200px] border-4 border-blueBorderColor"
        />
        <div className="w-full flex flex-col items-center my-auto">
          <h2 className="mt-6 text-2xl font-semibold">
            {userInfo.name || userInfo.login}
          </h2>

          <a
            href={`https://github.com/${userInfo.login}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline mt-1"
          >
            @{userInfo.login}
          </a>

          {userInfo.location ? (
            <div className="mt-4 flex items-center gap-1 text-muted-foreground">
              <span>📍</span>
              {userInfo.location}
            </div>
          ) : (
            <p className="mt-4 text-gray-400 italic text-muted-foreground text-center">
              This user has no location
            </p>
          )}

          {userInfo.bio ? (
            <p
              className="mt-4 text-textColor text-muted-foreground text-center text-ellipsis line-clamp-3"
              title={userInfo.bio}
            >
              {userInfo.bio}
            </p>
          ) : (
            <p className="mt-4 text-gray-400 italic text-muted-foreground text-center">
              This user has no bio
            </p>
          )}
        </div>

        <div className="w-full mt-auto">
          <div className="mt-6 py-4 w-full flex justify-around border-y border-borderColor">
            <div className="text-center">
              <div className="text-xl font-bold">
                {formatNumber(userInfo.totalStars || 0)}
              </div>
              <div className="text-sm opacity-80 text-muted-foreground mt-1">
                Stars
              </div>
            </div>
            <div className="w-[1px] h-10 bg-borderColor mx-4"></div>
            <div className="text-center">
              <div className="text-xl font-bold">
                {formatNumber(userInfo.followers || 0)}
              </div>
              <div className="text-sm opacity-80 text-muted-foreground mt-1">
                Followers
              </div>
            </div>
          </div>
          <div className="mb-6 py-4 w-full flex justify-around border-b border-borderColor">
            <div className="text-center">
              <div className="text-xl font-bold">
                {formatNumber(userInfo.repos || 0)}
              </div>
              <div className="text-sm opacity-80 text-muted-foreground mt-1">
                Repos
              </div>
            </div>
            <div className="w-[1px] h-10 bg-borderColor mx-4"></div>
            <div className="text-center">
              <div className="text-xl font-bold">
                {formatNumber(userInfo.following || 0)}
              </div>
              <div className="text-sm opacity-80 text-muted-foreground mt-1">
                Following
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
