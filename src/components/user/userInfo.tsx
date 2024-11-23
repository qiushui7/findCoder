import { auth, signIn, signOut } from 'auth';
import { Button } from '@/components/ui/button';
import { GitHubIcon } from '../ui/icons';
import { UserDropdown } from './userDropdown';
import { LogOut } from 'lucide-react';

export default async function UserInfo() {
  const session = await auth();

  if (!session?.user) {
    return (
      <div>
        <SignInButton />
      </div>
    );
  }

  return (
    <UserDropdown user={session.user}>
      <SignOutButton />
    </UserDropdown>
  );
}

// 登录按钮
function SignInButton() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn();
      }}
    >
      <Button
        variant="outline"
        className="flex items-center h-9 gap-2 border border-borderColor hover:bg-hoverBgColor"
      >
        <GitHubIcon className="h-4 w-4" />
        <span>使用 GitHub 登录</span>
      </Button>
    </form>
  );
}

function SignOutButton() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <Button
        variant="ghost"
        className="w-full flex items-center gap-2 px-4 py-2 hover:bg-hoverBgColor"
      >
        <LogOut className="h-4 w-4" />
        <span>退出登录</span>
      </Button>
    </form>
  );
}
