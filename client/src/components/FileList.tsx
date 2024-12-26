interface FileListProps {
  fileList: FileList | null;
  setFileList: React.Dispatch<React.SetStateAction<FileList | null>>;
  className?: string;
}

function FileList({ fileList, setFileList, className: additionalClassName }: FileListProps) {
  return (
    <div className={additionalClassName}>
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
                console.log("in file list", newFileList);
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
