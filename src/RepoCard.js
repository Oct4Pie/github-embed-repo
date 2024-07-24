import React, { useEffect, useState } from 'react';
import { Box, Flex, Heading, Text, Link, Spinner, Icon, useColorMode } from '@chakra-ui/react';
import { FaCircle, FaStar } from 'react-icons/fa';
import { VscRepoForked } from 'react-icons/vsc';
import { GoRepo } from 'react-icons/go';

const RepoCard = ({ user, repo, options }) => {
  const [repoData, setRepoData] = useState(null);
  const [error, setError] = useState(null);
  const [languageColor, setLanguageColor] = useState('gray');
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    if (options.theme && colorMode !== options.theme) {
      toggleColorMode();
    }
  }, [options.theme, colorMode, toggleColorMode]);

  useEffect(() => {
    const fetchRepoData = async () => {
      try {
        const repoResponse = await fetch(`https://api.github.com/repos/${user}/${repo}`);
        const repoData = await repoResponse.json();
        setRepoData(repoData);

        const colorsResponse = await fetch('https://raw.githubusercontent.com/ozh/github-colors/master/colors.json');
        const colorsData = await colorsResponse.json();
        const language = repoData.language;

        if (language && colorsData[language]) {
          setLanguageColor(colorsData[language].color);
        }
      } catch (err) {
        setError(err);
      }
    };

    fetchRepoData();
  }, [user, repo]);

  if (error) {
    return (
      <Box p={4}>
        <Text color="red.500">Error: {error.message}</Text>
      </Box>
    );
  }

  if (!repoData) {
    return (
      <Box p={4}>
        <Spinner />
      </Box>
    );
  }

  return (
    <Box
      p={6}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
      position="relative"
      overflow="hidden"
      bg={colorMode === 'light' ? 'white' : 'gray.800'}
      color={colorMode === 'light' ? 'gray.800' : 'white'}
      borderColor={colorMode === 'light' ? 'gray.200' : 'gray.600'}
      transition="0.3s"
    >
      <Flex mb={4} alignItems="center" justifyContent="space-between">
        <Heading as="h5" size="md" isTruncated>
          <Link href={repoData.html_url} isExternal color={colorMode === 'light' ? 'blue.600' : 'blue.300'}>
            <Flex alignItems="center">
              <Icon as={GoRepo} boxSize={5} mr={2} /> {repoData.full_name}
            </Flex>
          </Link>
        </Heading>
      </Flex>
      <Text fontSize="md" mb={4}>
        {repoData.description}
      </Text>
      <Flex alignItems="center" mb={4}>
        <Icon as={FaCircle} color={languageColor} boxSize={3} mr={2} />
        <Text fontSize="sm" mr={4}>
          {repoData.language}
        </Text>
        <Flex alignItems="center" cursor="pointer" mr={3}>
          <Icon as={FaStar} color="yellow.400" mr={1} />
          <Text>{repoData.stargazers_count}</Text>
        </Flex>
        <Flex alignItems="center" cursor="pointer">
          <Icon as={VscRepoForked} color="blue.400" mr={1} />
          <Text>{repoData.forks_count}</Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default RepoCard;
