import React from 'react';
import {
  Table, Thead, Tbody, Tr, Th, Td, IconButton, Button
} from '@chakra-ui/react';
import { FiFolder } from 'react-icons/fi';
import FileIcon from './FileIcon';

const FileTable = ({ fileData, handleFileClick, handleFolderClick }) => {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Type</Th>
          <Th>Name</Th>
        </Tr>
      </Thead>
      <Tbody>
        {fileData.map(file => (
          <Tr key={file.sha}>
            <Td>
              <IconButton
                aria-label={file.type}
                icon={file.type === 'dir' ? <FiFolder /> : <FileIcon fileName={file.name} />}
                variant="link"
                onClick={() => file.type === 'file' ? handleFileClick(file.path, file.name) : handleFolderClick(file.path)}
              />
            </Td>
            <Td>
              <Button variant="link" onClick={() => file.type === 'file' ? handleFileClick(file.path, file.name) : handleFolderClick(file.path)}>
                {file.name}
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default FileTable;
