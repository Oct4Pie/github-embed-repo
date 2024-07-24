import React, { Suspense } from 'react';
import { ChakraProvider } from '@chakra-ui/provider';
import { extendTheme, ColorModeScript } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const GitHubRepo = React.lazy(() => import('./GitHubRepo'));
const RepoCard = React.lazy(() => import('./RepoCard'));

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});

const GitRepo = ({ user, repo, options }) => {
  if (options === undefined) {
    options = {
      component: 'repo',
    };
  }
  else if (options.component === undefined) {
    options.component = 'repo';
  }

  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Suspense fallback={<div>Loading...</div>}>
        {options.component === "card" ? <RepoCard user={user} repo={repo} options={options} /> : <GitHubRepo user={user} repo={repo} options={options} />}
      </Suspense>
    </ChakraProvider>
  );
};

GitRepo.propTypes = {
  user: PropTypes.string.isRequired,
  repo: PropTypes.string.isRequired,
  options: PropTypes.shape({
    showProfile: PropTypes.bool,
    showStats: PropTypes.bool,
    theme: PropTypes.oneOf(['light', 'dark']),
    statsToShow: PropTypes.arrayOf(
      PropTypes.oneOf(['stars', 'forks', 'watchers', 'issues', 'pull_requests', 'contributors'])
    ),
    component: PropTypes.oneOf(['card', 'repo']),
  }).isRequired,
};

export default GitRepo;
