import { NextResponse, NextRequest } from 'next/server';
import { getUserProfile } from '@/lib/github';

export async function GET(request: NextRequest) {
  try {
    // 获取语言和时间范围
    const login = request.nextUrl.searchParams.get('login') || '';
    console.log(login);
    const userInfo = await getUserProfile(login);
    return NextResponse.json(userInfo);
  } catch (error) {
    console.error('Failed to fetch user info:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user info' },
      { status: 500 },
    );
  }
}
