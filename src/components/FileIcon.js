import React from 'react';
import { Icon } from '@chakra-ui/react';
import { getFileType, getFileIcon } from '../utils/fileUtils';

const FileIcon = ({ fileName }) => {
  const extension = fileName.split('.').pop();
  const fileType = getFileType(extension);
  const IconComponent = getFileIcon(fileType);

  return <Icon as={IconComponent} />;
};

export default FileIcon;
