import { useState } from "react";
import { readBase64 } from "../lib/utils/fileHandler";

interface TUseFileUploadConfig {
  mimeTypes: string[];
  maxSize?: number;
}

interface TUseFileUploadError {
  type: "size" | "mimeType";
  file: File;
}

const useFileUpload = (config: TUseFileUploadConfig) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<TUseFileUploadError | null>(null);

  const validateFile = (file: File) => {
    if (!config.mimeTypes.includes(file?.type)) {
      setFileError({ type: "mimeType", file });
      return false;
    }

    if (config.maxSize && file.size > config.maxSize) {
      return false;
    }

    if (fileError) {
      setFileError(null);
    }

    return true;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files) return;

    const file = e.currentTarget.files[0];
    const isValid = validateFile(file);

    if (isValid) setSelectedFile(file);
  };

  const onDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();

    let file: File | null;

    if (e.dataTransfer.items) {
      const [item] = Array.from(e.dataTransfer.items);

      file = item.getAsFile();
    } else {
      const [item] = Array.from(e.dataTransfer.files);

      file = item;
    }

    const isValid = file && validateFile(file);

    if (isValid) setSelectedFile(file!);
  };

  const onDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
  };

  const clear = () => {
    setSelectedFile(null);
    setFileError(null);
  };

  const toBase64 = () => {
    if (!selectedFile) return Promise.resolve("");

    return readBase64(selectedFile);
  };

  return {
    file: selectedFile,
    error: fileError,
    onChange,
    onDrop,
    onDragOver,
    clear,
    toBase64,
  };
};

export default useFileUpload;
