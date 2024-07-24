import React from 'react';
import {
    Box,
    Heading,
    Text,
    VStack,
    HStack,
    Container,
    Button,
    useColorModeValue,
    Icon,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    useColorMode,
    Flex,
    Spacer,
    Tooltip,
    SimpleGrid,
    Link,
    UnorderedList,
    ListItem,
} from '@chakra-ui/react';
import { FaGithub, FaMoon, FaSun, FaRocket, FaCog } from 'react-icons/fa';
import { Highlight, themes } from 'prism-react-renderer';
import GitRepo from 'github-embed-repo';


const GitRepoShow = ({ user, repo, options }) => (
    <Box border="1px solid" borderColor={useColorModeValue('gray.200', 'gray.700')} p={4} borderRadius="md">
        <Text>GitHub Embed Repo Component</Text>
        <Text>User: {user}</Text>
        <Text>Repo: {repo}</Text>
        <Text>Options:
            <CodeBlock language="javascript">
                {JSON.stringify(options, null, 2)}
            </CodeBlock>
        </Text>
    </Box>
);

const CodeBlock = ({ children, language }) => {
    const theme = useColorModeValue(themes.github, themes.nightOwl);

    return (
        <Box position="relative" mb={4}>
            <Highlight theme={theme} code={children.trim()} language={language}>
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <pre className={className} style={{ ...style, padding: '1em', borderRadius: '0.3em', overflow: 'auto' }}>
                        {tokens.map((line, i) => (
                            <div key={i} {...getLineProps({ line, key: i })}>
                                {line.map((token, key) => (
                                    <span key={key} {...getTokenProps({ token, key })} />
                                ))}
                            </div>
                        ))}
                    </pre>
                )}
            </Highlight>
        </Box>
    );
};

const ProjectPage = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const options = {
        showProfile: true,
        showStats: true,
        theme: colorMode,
        statsToShow: ['stars', 'forks', 'watchers', 'issues', 'pull_requests', 'contributors'],
        component: 'card'
    };

    return (
        <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
            <Container maxW="container.xl" py={10}>
                <Flex mb={12} align="center" wrap="wrap">
                    <HStack spacing={4}>
                        <Heading as="h1" size="2xl" bgGradient="linear(to-r, teal.500, blue.500)" bgClip="text">
                            GitHub Embed Repo
                        </Heading>
                    </HStack>
                    <Spacer />
                    <HStack spacing={4}>
                        <Tooltip label="View on GitHub">
                            <Link href="https://github.com/Oct4Pie/github-embed-repo" isExternal>
                                <Icon as={FaGithub} boxSize={6} color={useColorModeValue('gray.600', 'gray.300')} />
                            </Link>
                        </Tooltip>
                        <Tooltip label={`Switch to ${colorMode === 'light' ? 'Dark' : 'Light'} Mode`}>
                            <Button onClick={toggleColorMode} variant="ghost">
                                <Icon as={colorMode === 'light' ? FaMoon : FaSun} />
                            </Button>
                        </Tooltip>
                    </HStack>
                </Flex>

                <Text fontSize="xl" mb={12} color={useColorModeValue('gray.600', 'gray.300')} maxW="container.md" textAlign="center" mx="auto">
                    Seamlessly embed GitHub repository information in your web applications.
                </Text>

                <Tabs variant="soft-rounded" colorScheme="teal" mb={12}>
                    <TabList justifyContent="center" mb={8}>
                        <Tab mr={4}><Icon as={FaRocket} mr={2} />Getting Started</Tab>
                        <Tab><Icon as={FaCog} mr={2} />Configuration</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <VStack spacing={8} align="stretch">
                                <Box p={8} shadow="xl" borderRadius="lg" bg={useColorModeValue('white', 'gray.800')}>
                                    <Heading as="h2" size="lg" mb={6}>
                                        Installation
                                    </Heading>
                                    <Text mb={4}>Install the GitHub Embed Repo package using npm or yarn:</Text>
                                    <CodeBlock language="bash">
                                        {`# Using npm
npm install github-embed-repo

# Using yarn
yarn add github-embed-repo`}
                                    </CodeBlock>
                                </Box>
                                <Box p={8} shadow="xl" borderRadius="lg" bg={useColorModeValue('white', 'gray.800')}>
                                    <Heading as="h2" size="lg" mb={6}>
                                        Quick Start
                                    </Heading>
                                    <Text fontSize="large" mb={4}>For vanilla JavaScript, include the script and use it as follows:</Text>
                                    <Text mb={2}>From jsDelivr:</Text>
                                    <CodeBlock language="html">
                                        {`<script src="https://cdn.jsdelivr.net/npm/github-embed-repo/dist/github_embed_repo.min.js"></script>`}
                                    </CodeBlock>
                                    <Text mb={2}>Use as:</Text>
                                    <CodeBlock language="html">
                                        {`<script>
  github_embed_repo.default('repo-details', 'Oct4Pie', 'github-embed-repo', {
    showProfile: true,
    showStats: true,
    theme: 'dark',
    statsToShow: ['stars', 'forks', 'watchers', 'issues', 'pull_requests', 'contributors']
  });
</script>`}
                                    </CodeBlock>
                                    <Text mt={6} mb={4}>For React applications:</Text>
                                    <CodeBlock language="jsx">
                                        {`import React from 'react';
import GitRepo from 'github-embed-repo';

const MyComponent = () => (
  <GitRepo 
    user="Oct4Pie" 
    repo="github-embed-repo" 
    options={{
      showProfile: true,
      showStats: true,
      theme: 'dark',
      statsToShow: ['stars', 'forks', 'watchers', 'issues', 'pull_requests', 'contributors'],
      component: 'card'
    }} 
  />
);`}
                                    </CodeBlock>
                                </Box>
                            </VStack>
                        </TabPanel>
                        <TabPanel>
                            <Box p={8} shadow="xl" borderRadius="lg" bg={useColorModeValue('white', 'gray.800')}>
                                <Heading as="h2" size="lg" mb={6}>
                                    Configuration Options
                                </Heading>
                                <Text mb={4}>Customize the component with these options:</Text>
                                <CodeBlock language="javascript">
                                    {`const options = {
  showProfile: true,
  showStats: true,
  theme: 'dark',
  statsToShow: ['stars', 'forks', 'watchers', 'issues', 'pull_requests', 'contributors'],
  component: 'card'
};`}
                                </CodeBlock>
                                <Text mt={6} mb={4}>Options explained:</Text>
                                <UnorderedList spacing={2} pl={4}>
                                    <ListItem><strong>showProfile:</strong> Boolean to show or hide the repository owner's profile.</ListItem>
                                    <ListItem><strong>showStats:</strong> Boolean to show or hide repository statistics.</ListItem>
                                    <ListItem><strong>theme:</strong> 'light' or 'dark' to set the color scheme.</ListItem>
                                    <ListItem><strong>statsToShow:</strong> Array of statistics to display.</ListItem>
                                    <ListItem><strong>component:</strong> 'card' for a compact view or 'repo' for a detailed view.</ListItem>
                                </UnorderedList>
                            </Box>
                        </TabPanel>
                    </TabPanels>
                </Tabs>

                <Box p={8} shadow="xl" borderRadius="lg" bg={useColorModeValue('white', 'gray.800')} mb={12}>
                    <Heading as="h2" size="lg" mb={6}>
                        Live Demo
                    </Heading>
                    <Text mb={6}>Here's how the GitHub Embed Repo component looks with the configurations:</Text>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
                        <GitRepoShow user="Oct4Pie" repo="github-embed-repo" options={{ ...options, component: 'repo' }} />
                        <GitRepoShow user="Oct4Pie" repo="github-embed-repo" options={options} />
                        <GitRepo user="Oct4Pie" repo="github-embed-repo" options={{
                            ...options, component: 'repo'
                        }} />
                        <Box p={4}>
                            <GitRepo user="Oct4Pie" repo="github-embed-repo" options={{
                                ...options, component: 'card'
                            }} />
                        </Box>
                    </SimpleGrid>
                </Box>
            </Container>
        </Box>
    );
};

export default ProjectPage;
