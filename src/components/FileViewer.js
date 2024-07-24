import React from 'react';
import { Box, Code, Image, AspectRatio, Center } from '@chakra-ui/react';
import { getFileType } from '../utils/fileUtils';

const FileViewer = ({ fileName, fileContent }) => {
  if (!fileName) return null;

  const sp = fileName.split('.');
  const extension = sp.pop();
  const fileType = getFileType(extension);

  if (fileType === 'text' || fileType === 'code' || fileType === 'web' || sp === '') {
    return (
      <Box whiteSpace="pre-wrap" p={4} borderRadius='inherit' overflowY="auto">
        <Code p={4} borderRadius='md'>{atob(fileContent)}</Code>
      </Box>
    );
  }

  if (fileType === 'image') {
    return (
      <Center overflow='scroll'>
        <Image src={`data:image/${extension};base64,${fileContent}`} alt={fileName} maxW="50%" />
      </Center>
    );
  }

  if (fileType === 'audio') {
    return (
      <Center>
        <Box>
          <audio controls>
            <source src={`data:audio/${extension};base64,${fileContent}`} type={`audio/${extension}`} />
            Your browser does not support the audio element.
          </audio>
        </Box>
      </Center>
    );
  }

  if (fileType === 'video') {
    return (
      <Center>
        <AspectRatio maxW="80%" ratio={16 / 9}>
          <video controls>
            <source src={`data:video/${extension};base64,${fileContent}`} type={`video/${extension}`} />
            Your browser does not support the video element.
          </video>
        </AspectRatio>
      </Center>
    );
  }

  return (
    <Box whiteSpace="pre-wrap" p={4} borderRadius='inherit' overflowY="auto">
      <Code p={4} borderRadius='md'>{atob(fileContent)}</Code>
    </Box>
  );
};

export default FileViewer;
