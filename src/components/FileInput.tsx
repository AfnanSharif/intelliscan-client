// components/FileInput.tsx
import React from 'react';

interface FileInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: React.FC<FileInputProps> = ({ onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-lg font-semibold mb-2">Upload Files:</label>
      <input
        type="file"
        multiple
        onChange={onChange}
        className="border border-gray-300 p-2 rounded w-full"
      />
    </div>
  );
};

export default FileInput;
