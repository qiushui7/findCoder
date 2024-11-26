// File: scrapeTrendingDevelopers.ts
import { IncomingMessage } from 'http';
import * as https from 'https';
import * as cheerio from 'cheerio';

interface Developer {
  id: string;
  name: string;
  login: string;
  avatarUrl: string;
  repo: {
    name: string;
    url: string;
    description: string;
  };
}

// 获取指定 URL 的 HTML 内容
function fetchHTML(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res: IncomingMessage) => {
        let data = '';

        // 收集数据块
        res.on('data', (chunk: Buffer) => {
          data += chunk;
        });

        // 数据接收完成时解析
        res.on('end', () => {
          resolve(data);
        });
      })
      .on('error', (err: Error) => {
        reject(err);
      });
  });
}

// 抓取热门开发者信息
export async function scrapeTrendingDevelopers(params: {
  language: string;
  since: string;
}): Promise<Developer[]> {
  try {
    const url = `https://github.com/trending/developers${params.language ? `/${params.language}` : ''}${params.since ? `?since=${params.since}` : ''}`;
    const html = await fetchHTML(url);
    const $ = cheerio.load(html);

    const developers: Developer[] = [];
    console.log('scrapeTrendingDevelopers');
    $('.Box-row').each((_, element) => {
      const $element = $(element);
      const id = $element.attr('id') || '';
      const name = $element.find('h1.h3 a').text().trim();
      const login =
        $element.find('h1.h3 a').attr('href')?.replace('/', '').trim() || '';
      const avatarUrl = $element.find('img.avatar-user').attr('src') || '';
      const repoName = $element.find('.h4 a').text().trim();
      const repoUrl = `https://github.com${$element.find('.h4 a').attr('href') || ''}`;
      const repoDescription = $element.find('h1.h4 + div').text().trim();

      developers.push({
        id,
        name,
        login,
        avatarUrl,
        repo: {
          name: repoName,
          url: repoUrl,
          description: repoDescription,
        },
      });
    });

    return developers;
  } catch (error) {
    console.error(
      '获取开发者信息失败:',
      error instanceof Error ? error.message : error,
    );
    return [];
  }
}
