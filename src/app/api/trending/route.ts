import { NextResponse, NextRequest } from 'next/server';
import { getTrendingUsers } from '@/lib/github';

export async function GET(request: NextRequest) {
  try {
    // 获取语言和时间范围
    const language = request.nextUrl.searchParams.get('language') || '';
    const since = request.nextUrl.searchParams.get('since') || 'daily';
    console.log(language, since);
    const users = await getTrendingUsers(language, since);
    return NextResponse.json({ users });
  } catch (error) {
    console.error('Failed to fetch trending users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trending users' },
      { status: 500 },
    );
  }
}
