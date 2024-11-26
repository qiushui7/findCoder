const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';

// GitHub API 请求头
const headers = {
  Accept: 'application/vnd.github.v3+json',
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
};

// 获取用户关注的人
async function getFollowing(username: string) {
  const res = await fetch(`${GITHUB_API_BASE}/users/${username}/following`, {
    headers,
  });
  return res.json();
}

// 获取用户的仓库
async function getRepos(username: string) {
  const res = await fetch(
    `${GITHUB_API_BASE}/users/${username}/repos?sort=updated`,
    { headers },
  );
  return res.json();
}

// 根据语言搜索用户
async function searchUsersByLanguage(language: string, limit: number = 20) {
  console.log(language);
  // GraphQL Query
  const query = `
    query($language: String!, $first: Int!) {
      search(query: $language, type: USER, first: $first) {
        edges {
          node {
            ... on User {
              id
              login
              name
              bio
              avatarUrl
              followers {
                totalCount
              }
            }
          }
        }
      }
    }
  `;
  // Query Variables
  const variables = {
    language: `language:${language}`,
    first: limit,
  };
  const res = await fetch(GITHUB_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });
  return res.json();
}

// 获取推荐用户
export async function getRecommendUsers(user: any) {
  try {
    // 1. 获取用户的仓库，分析主要使用的语言
    const repos = await getRepos(user.login);
    const languages = repos
      .map((repo: any) => repo.language)
      .filter(Boolean)
      .reduce((acc: any, curr: string) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
      }, {});

    // 获取用户最常用的语言
    const topLanguages = Object.entries(languages)
      .sort(([, a]: any, [, b]: any) => b - a)
      .slice(0, 3)
      .map(([lang]) => lang);

    // 2. 根据用户常用语言搜索推荐用户
    const recommendPromises = topLanguages.map((lang) =>
      searchUsersByLanguage(lang),
    );
    const recommendResults = await Promise.all(recommendPromises);
    // 3. 整合推荐结果
    const recommendUsers = recommendResults
      .flatMap((result: any) => result.data.search.edges || [])
      .map((edge: any) => edge.node)
      // // 过滤掉空对象 // 去重
      .filter(
        (recUser: any, index: number, self: any[]) =>
          Object.keys(recUser).length !== 0 &&
          index === self.findIndex((u) => u.id === recUser.id),
      )
      // // 限制推荐数量
      .slice(0, 25);
    return recommendUsers;
  } catch (error) {
    console.error('Error getting recommend users:', error);
    return [];
  }
}
