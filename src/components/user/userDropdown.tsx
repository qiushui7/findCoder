import Image from 'next/image';

export function UserDropdown({
  user,
  children,
}: {
  user: any;
  children: React.ReactNode;
}) {
  return (
    <div className="relative group">
      <button className="flex items-center gap-2 hover:opacity-80 w-10 h-10">
        <Image
          src={user.image || ''}
          alt={user.name || ''}
          width={40}
          height={40}
          className="rounded-full border border-borderColor"
        />
      </button>

      {/* 下拉菜单 - 使用group-hover显示 */}
      <div
        className="absolute translate-x-[-50%] left-[50%] mt-2 w-48 py-2 bg-bgColor rounded-lg shadow-lg border border-borderColor 
        invisible opacity-0 group-hover:visible group-hover:opacity-100 
        transition-all duration-200 ease-in-out
        before:content-[''] before:absolute before:translate-x-[-50%] before:left-[50%] before:top-[-16px]
        before:border-[8px] before:border-transparent before:border-b-bgColor"
      >
        {/* 用户信息 */}
        <div className="px-4 py-2 border-b border-borderColor">
          <p className="font-medium">{user.name}</p>
          <p className="text-sm opacity-70">{user.email}</p>
        </div>
        {children}
      </div>
    </div>
  );
}
