// src/App.js
import React, { Suspense } from 'react';
import { Box, VStack } from '@chakra-ui/react';

// const GitHubRepo = React.lazy(() => import('./GitHubRepo'));
const RepoCard = React.lazy(() => import('./RepoCard'));

const App = () => {
  return (
    <Box p={5}>
      <VStack spacing={4}>
        {/* <Suspense fallback={<div>Loading...</div>}>
          <GitHubRepo
            user="Oct4Pie"
            repo="github-embed-repo"
            options={{
              showProfile: true,
              showStats: true,
              theme: 'dark',
              statsToShow: ['stars', 'forks', 'watchers', 'issues', 'pull_requests', 'contributors']
            }}
          />
        </Suspense> */}
        <Suspense fallback={<div>Loading...</div>}>
          <RepoCard user={"oct4pie"} repo={"github-embed-repo"} />
        </Suspense>
      </VStack>
    </Box>
  );
};

export default App;
