import React, { useState, useEffect, useRef } from 'react';
import {
    Box, Link, Spinner, Alert, AlertIcon, IconButton, Flex,
    Breadcrumb, BreadcrumbItem, BreadcrumbLink, useColorMode, useColorModeValue, Text, Avatar,
    Divider
} from '@chakra-ui/react';
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import FileTable from './components/FileTable';
import RepoStats from './components/RepoStats';
import FileViewer from './components/FileViewer';

const GitHubRepo = ({ user, repo, options }) => {
    const [repoData, setRepoData] = useState(null);
    const [fileData, setFileData] = useState([]);
    const [currentPath, setCurrentPath] = useState('');
    const [fileContent, setFileContent] = useState(null);
    const [fileName, setFileName] = useState('');
    const [error, setError] = useState(null);
    const [languageColors, setLanguageColors] = useState({});
    const [repoLanguages, setRepoLanguages] = useState({});
    const { colorMode, toggleColorMode } = useColorMode();

    const cache = useRef(new Map());

    const fetchData = async (url, cacheKey) => {
        if (cache.current.has(cacheKey)) {
            return cache.current.get(cacheKey);
        } else {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error fetching ${url}: ${response.statusText}`);
            }
            const data = await response.json();
            cache.current.set(cacheKey, data);
            return data;
        }
    };

    useEffect(() => {
        const fetchRepoData = async () => {
            try {
                const repoUrl = `https://api.github.com/repos/${user}/${repo}`;
                const contentsUrl = `https://api.github.com/repos/${user}/${repo}/contents/${currentPath}`;
                const languagesUrl = `https://api.github.com/repos/${user}/${repo}/languages`;

                const repoResponse = await fetchData(repoUrl, repoUrl);
                setRepoData(repoResponse);

                const contentsResponse = await fetchData(contentsUrl, contentsUrl);
                setFileData(contentsResponse);

                const languagesResponse = await fetchData(languagesUrl, languagesUrl);
                setRepoLanguages(languagesResponse);

                setFileContent(null); // Reset file content when navigating
            } catch (err) {
                setError(err);
            }
        };
        fetchRepoData();
    }, [user, repo, currentPath]);

    useEffect(() => {
        const fetchAdditionalRepoData = async () => {
            try {
                const issuesUrl = `https://api.github.com/repos/${user}/${repo}/issues?state=open`;
                const pullRequestsUrl = `https://api.github.com/repos/${user}/${repo}/pulls?state=open`;
                const contributorsUrl = `https://api.github.com/repos/${user}/${repo}/contributors`;

                const issuesResponse = await fetchData(issuesUrl, issuesUrl);
                const pullRequestsResponse = await fetchData(pullRequestsUrl, pullRequestsUrl);
                const contributorsResponse = await fetchData(contributorsUrl, contributorsUrl);

                setRepoData(prevRepoData => ({
                    ...prevRepoData,
                    open_issues_count: issuesResponse.length,
                    pull_requests_count: pullRequestsResponse.length,
                    contributors_count: contributorsResponse.length
                }));
            } catch (err) {
                setError(err);
            }
        };
        fetchAdditionalRepoData();
    }, [user, repo]);

    useEffect(() => {
        const fetchLanguageColors = async () => {
            try {
                const colorsUrl = 'https://raw.githubusercontent.com/ozh/github-colors/master/colors.json';
                const colorsResponse = await fetchData(colorsUrl, colorsUrl);
                setLanguageColors(colorsResponse);
            } catch (err) {
                setError(err);
            }
        };
        fetchLanguageColors();
    }, []);

    const handleFolderClick = (path) => {
        setCurrentPath(path);
    };

    const handleFileClick = async (path, name) => {
        try {
            const fileUrl = `https://api.github.com/repos/${user}/${repo}/contents/${path}`;
            const response = await fetchData(fileUrl, fileUrl);
            const content = response.content;
            setFileContent(content);
            setFileName(name);
        } catch (err) {
            setError(err);
        }
    };

    const handleBackClick = () => {
        if (fileContent) {
            setFileContent(null); // If viewing file content, go back to file list
        } else {
            const newPath = currentPath.split('/').slice(0, -1).join('/');
            setCurrentPath(newPath);
        }
    };


    const bg = useColorModeValue('gray.50', 'gray.800');
    // const color = useColorModeValue('gray.800', 'white');
    useEffect(() => {
        if (options.theme && colorMode !== options.theme) {
          toggleColorMode();
        }
      }, [options.theme, colorMode, toggleColorMode]);

    if (error) {
        return (
            <Alert status="error" mt={4}>
                <AlertIcon />
                Error: {error.message}
            </Alert>
        );
    }

    if (!repoData || !fileData.length) {
        return <Spinner mt={4} />;
    }

    return (
        <Box
            p={4}
            maxWidth="900px"
            width="100%"
            height="calc(100vh - 32px)"
            mx="auto"
            mt={4}
            bg={bg}
            borderColor={colorMode === 'light' ? 'gray.200' : 'gray.600'}
            borderWidth="1px"
            borderRadius="md"
            boxShadow="md"
            display="flex"
            flexDirection="column"
            overflow="hidden"
        >
            <Box flexShrink={0}>
                <Flex align="center" mb={4}>
                    {options.showProfile &&
                        (<Avatar name={repoData.owner.login} src={repoData.owner.avatar_url} size='lg' mr={4} />)
                    }
                    <Box>
                        <Text fontSize="md" fontWeight="bold">{repoData.owner.login}/{repoData.name}</Text>
                        <Text>{repoData.description}</Text>
                        <Link href={repoData.html_url} isExternal color="teal.500">GitHub</Link>
                    </Box>
                </Flex>

                <Flex ml={2} mt={2} align="center" mb={3} overflow="scroll">
                    {Object.keys(repoLanguages).map(language => (
                        <Box key={language} display="flex" alignItems="center" mr={2}>
                            <Box
                                w={3}
                                h={3}
                                borderRadius="50%"
                                bg={languageColors[language] ? languageColors[language].color : 'gray'}
                                mr={1}
                            />
                            <Text fontSize="sm">{language}</Text>
                        </Box>
                    ))}
                </Flex>

                {options.showStats && (
                    <RepoStats repoData={repoData} options={options} />
                )}
                <Divider opacity={1} borderWidth={1} />
                <Breadcrumb mt={1} spacing="8px" separator={<MdArrowForward color="gray.500" />} mb={4}>
                    <BreadcrumbItem>
                        {currentPath !== '' && (<BreadcrumbLink onClick={() => setCurrentPath('')}>
                            Home
                        </BreadcrumbLink>)}

                    </BreadcrumbItem>
                    {currentPath.split('/').filter(Boolean).map((folder, index, array) => (
                        <BreadcrumbItem key={index}>
                            <BreadcrumbLink onClick={() => setCurrentPath(array.slice(0, index + 1).join('/'))}>
                                {folder}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    ))}
                </Breadcrumb>
                {(currentPath || fileContent) && (
                    <IconButton
                        aria-label="Back"
                        icon={<MdArrowBack />}
                        variant="outline"
                        onClick={handleBackClick}
                        mb={4}
                    />
                )}
            </Box>
            {fileContent ? (
                <FileViewer fileName={fileName} fileContent={fileContent} />
            ) : (
                <Box flexGrow={1} overflowY="auto">
                    <FileTable fileData={fileData} handleFileClick={handleFileClick} handleFolderClick={handleFolderClick} languageColors={languageColors} />
                </Box>
            )}
        </Box>
    );
};

export default GitHubRepo;
