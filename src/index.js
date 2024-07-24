import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/provider';
import { extendTheme, ColorModeScript } from '@chakra-ui/react';

const GitHubRepo = React.lazy(() => import('./GitHubRepo'));
const RepoCard = React.lazy(() => import('./RepoCard'));

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});

const App = ({ user, repo, options }) => {
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

const GitRepo = (elementId, user, repo, options) => {
  const container = document.getElementById(elementId);
  if (container) {
    const root = createRoot(container);
    root.render(<App user={user} repo={repo} options={options} />);
  } else {
    console.error('Target container is not a DOM element.');
  }
};


export default GitRepo;
