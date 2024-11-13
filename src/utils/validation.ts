type validateFilesProps = {
  files: File[];
  maxFiles: number;
  maxSize: number;
};

export const validateFiles = ({ files, maxFiles, maxSize }: validateFilesProps): string | null => {
  if (files.length > maxFiles) {
    return `You can only upload ${maxFiles} files`;
  }

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file.size > maxSize) {
      return `File ${file.name} is too large, please pick a smaller file`;
    }
  }

  return null;
};
