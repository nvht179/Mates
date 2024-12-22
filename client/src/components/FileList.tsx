interface FileListProps {
  fileList: FileList | null;
  setFileList: React.Dispatch<React.SetStateAction<FileList | null>>;
}

function FileList({ fileList, setFileList }: FileListProps) {
  return (
    <div className="mt-4">
      {fileList &&
        Array.from(fileList).map((file, index) => (
          <div key={index} className="mt-2 flex items-center">
            <span>{file.name}</span>
            <button
              className="ml-2 text-red-500"
              onClick={() => {
                const newFileList = Array.from(fileList).filter(
                  (_, i) => i !== index,
                );
                const dataTransfer = new DataTransfer();
                newFileList.forEach((file) => dataTransfer.items.add(file));
                setFileList(dataTransfer.files);
              }}
            >
              Delete
            </button>
          </div>
        ))}
    </div>
  );
}

export default FileList;
