declare module '@huchenme/github-trending' {
  interface Developer {
    username: string;
    name: string;
    url: string;
    avatar: string;
    repo: {
      name: string;
      description: string;
      url: string;
    };
  }

  export function fetchDevelopers(options?: {
    language?: string;
    since?: 'daily' | 'weekly' | 'monthly';
  }): Promise<Developer[]>;
}
