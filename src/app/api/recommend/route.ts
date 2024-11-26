import { auth } from 'auth';
import { getRecommendUsers } from '@/lib/github';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await auth();

    // 未登录用户返回空数组
    if (!session?.user) {
      return NextResponse.json({ users: [] });
    }
    // 获取推荐用户
    const users = await getRecommendUsers(session.user);

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Failed to fetch recommended users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recommended users' },
      { status: 500 },
    );
  }
}
