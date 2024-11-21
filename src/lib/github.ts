const GITHUB_TOKEN = process.env.GITHUB_TOKEN

interface GitHubUser {
  login: string
  id: number
  avatar_url: string
  html_url: string
  name?: string
  bio?: string
  public_repos: number
  followers: number
}

interface Repository {
  id: number
  name: string
  owner: GitHubUser
  language: string
  stargazers_count: number
}

export async function getPersonalizedRecommendations(username: string) {
  try {
    // 获取用户star的仓库
    const starredRepos = await getStarredRepos(username)
    
    // 获取用户关注的开发者
    const following = await getFollowing(username)
    
    // 分析用户偏好
    const preferences = analyzePreferences(starredRepos, following)
    
    // 基于偏好生成推荐
    return await generateRecommendations(preferences)
  } catch (error) {
    console.error('获取个性化推荐失败:', error)
    throw new Error('获取推荐失败')
  }
}

async function getStarredRepos(username: string): Promise<Repository[]> {
  const res = await fetch(
    `https://api.github.com/users/${username}/starred?per_page=100`,
    {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
      },
      next: { revalidate: 3600 }
    }
  )
  
  if (!res.ok) throw new Error('获取star仓库失败')
  return res.json()
}

async function getFollowing(username: string): Promise<GitHubUser[]> {
  const res = await fetch(
    `https://api.github.com/users/${username}/following?per_page=100`,
    {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
      },
      next: { revalidate: 3600 }
    }
  )
  
  if (!res.ok) throw new Error('获取关注列表失败')
  return res.json()
}

interface UserPreferences {
  languages: Map<string, number>  // 编程语言偏好
  topics: Map<string, number>     // 主题偏好
  followedUsers: Set<string>      // 已关注的用户
}

function analyzePreferences(
  repos: Repository[], 
  following: GitHubUser[]
): UserPreferences {
  const languages = new Map<string, number>()
  const topics = new Map<string, number>()
  const followedUsers = new Set(following.map(user => user.login))

  // 分析star仓库的语言分布
  repos.forEach(repo => {
    if (repo.language) {
      languages.set(
        repo.language,
        (languages.get(repo.language) || 0) + 1
      )
    }
  })

  return {
    languages,
    topics,
    followedUsers
  }
}

async function generateRecommendations(
  preferences: UserPreferences
): Promise<GitHubUser[]> {
  // 获取用户最常用的前3种语言
  const topLanguages = [...preferences.languages.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([lang]) => lang)

  // 构建搜索查询
  const languageQuery = topLanguages
    .map(lang => `language:${lang}`)
    .join(' OR ')

  // 搜索相关开发者
  const res = await fetch(
    'https://api.github.com/search/users?' + new URLSearchParams({
      q: `${languageQuery} followers:>500`,
      sort: 'followers',
      order: 'desc',
      per_page: '10'
    }), {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
      }
    }
  )

  if (!res.ok) throw new Error('搜索推荐开发者失败')
  const data = await res.json()
  
  // 过滤掉已关注的用户
  return data.items.filter(
    (user: GitHubUser) => !preferences.followedUsers.has(user.login)
  )
}