import React from 'react';
import { Flex, Tag, TagLabel, TagLeftIcon, Text } from '@chakra-ui/react';
import { FaStar, FaEye } from "react-icons/fa";
import { FaCodeFork, FaCodePullRequest } from "react-icons/fa6";
import { PiWarningCircleFill } from "react-icons/pi";
import { MdInsights } from "react-icons/md";

const RepoStats = ({ repoData, options }) => {
    const statsToShow = options.statsToShow || [];

    return (
        <Flex mb={4} wrap="wrap" justifyContent="space-evenly">
            {statsToShow.includes('stars') && (
                <Tag mx={1} size="lg" colorScheme="yellow" borderRadius="full" mb={2}>
                    <TagLeftIcon as={FaStar} />
                    <TagLabel>Stars</TagLabel>
                    <Text ml={2}>{repoData.stargazers_count}</Text>
                </Tag>
            )}
            {statsToShow.includes('forks') && (
                <Tag mx={1} size="lg" colorScheme="blue" borderRadius="full" mb={2}>
                    <TagLeftIcon as={FaCodeFork} />
                    <TagLabel>Forks</TagLabel>
                    <Text ml={2}>{repoData.forks_count}</Text>
                </Tag>
            )}
            {statsToShow.includes('watchers') && (
                <Tag mx={1} size="lg" colorScheme="green" borderRadius="full" mb={2}>
                    <TagLeftIcon as={FaEye} />
                    <TagLabel>Watchers</TagLabel>
                    <Text ml={2}>{repoData.subscribers_count}</Text>
                </Tag>
            )}
            {statsToShow.includes('issues') && (
                <Tag mx={1} size="lg" colorScheme="red" borderRadius="full" mb={2}>
                    <TagLeftIcon as={PiWarningCircleFill} />
                    <TagLabel>Open Issues</TagLabel>
                    <Text ml={2}>{repoData.open_issues_count}</Text>
                </Tag>
            )}
            {statsToShow.includes('pull_requests') && (
                <Tag mx={1} size="lg" colorScheme="purple" borderRadius="full" mb={2}>
                    <TagLeftIcon as={FaCodePullRequest} />
                    <TagLabel>Pull Requests</TagLabel>
                    <Text ml={2}>{repoData.pull_requests_count}</Text>
                </Tag>
            )}
            {statsToShow.includes('contributors') && (
                <Tag mx={1} size="lg" colorScheme="teal" borderRadius="full" mb={2}>
                    <TagLeftIcon as={MdInsights} />
                    <TagLabel>Contributors</TagLabel>
                    <Text ml={2}>{repoData.contributors_count}</Text>
                </Tag>
            )}
        </Flex>
    );
};

export default RepoStats;
