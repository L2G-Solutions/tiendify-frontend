/**
 * Properties required for file validation.
 */
type validateFilesProps = {
  files: File[];
  maxFiles: number;
  maxSize: number;
};

/**
 * Checks whether the files exceed the allowed number and size.
 * @param files - Array of File objects to validate
 * @param maxFiles - Max number of files
 * @param maxSize - Max file size in bytes
 * @returns An error message or null if validation passes
 */
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
