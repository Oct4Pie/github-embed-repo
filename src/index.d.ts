declare module 'github-embed-repo' {
    import * as React from 'react';
  
    interface GitRepoOptions {
      showProfile?: boolean;
      showStats?: boolean;
      theme?: 'light' | 'dark';
      statsToShow?: Array<'stars' | 'forks' | 'watchers' | 'issues' | 'pull_requests' | 'contributors'>;
      component: 'card' | 'repo';
    }
  
    interface GitRepoProps {
      user: string;
      repo: string;
      options: GitRepoOptions;
    }
  
    const GitRepo: React.FC<GitRepoProps>;
  
    export default GitRepo;
  }
  