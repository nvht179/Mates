import { useEffect, useState, useRef } from "react"; // Add useRef import
import { useLocation, useNavigate } from "react-router-dom";
import { LuPencil } from "react-icons/lu";
import { BiDetail } from "react-icons/bi";
import Input from "../components/Input";
import Textarea from "../components/TextArea";
import { useCreateLectureMutation, useEditLectureMutation } from "../store";
import { ClassState } from "../interfaces/Class";
import { Lecture } from "../interfaces/Lecture";
import { MdAttachment } from "react-icons/md";
import FileList from "../components/FileList";

function LectureDetails() {
  const { state } = useLocation();
  const { cla, lecture } = state as {
    cla: ClassState;
    lecture: Lecture | null;
  };
  const { code } = cla;
  const navigate = useNavigate();

  const [title, setTitle] = useState(lecture?.title ?? "");
  const [content, setContent] = useState(lecture?.content ?? "");
  const [fileList, setFileList] = useState<FileList | null>(null);
  const [createLecture, { isSuccess: isCreateLectureSuccess }] =
    useCreateLectureMutation();
  const [editLecture, { isSuccess: isEditLectureSuccess }] =
    useEditLectureMutation();
  const fileInputRef = useRef<HTMLInputElement>(null); // Add ref

  useEffect(() => {
    if (lecture?.attachments) {
      const attachments = lecture.attachments.map((attachment) => {
        return new File([attachment.link], attachment.linkTitle);
      });
      const dataTransfer = new DataTransfer();
      attachments.forEach((file) => dataTransfer.items.add(file));
      setFileList(dataTransfer.files);
    }
  }, [lecture]);

  useEffect(() => {
    if (isCreateLectureSuccess || isEditLectureSuccess) {
      const eventSuccess = new CustomEvent("SaveLectureSuccess");
      window.dispatchEvent(eventSuccess);
      navigate(`/class/${code}/lecture`, {
        state: { ...state, title: "Lecture", display: null },
      });
    }
  }, [isCreateLectureSuccess, isEditLectureSuccess, navigate, code, state]);

  useEffect(() => {
    const handleSaveLecture = () => {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("classID", cla.classID.toString());

      if (fileList) {
        Array.from(fileList).forEach((file) => {
          formData.append("files", file);
        });
      }
      if (lecture) {
        formData.append("lectureId", lecture.id.toString());
        editLecture(formData);
      } else {
        createLecture(formData);
      }
    };
    window.addEventListener("saveLecture", handleSaveLecture);
    return () => {
      window.removeEventListener("saveLecture", handleSaveLecture);
    };
  }, [
    title,
    content,
    fileList,
    cla.classID,
    createLecture,
    editLecture,
    lecture,
  ]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const dataTransfer = new DataTransfer();
      
      // Add existing files if any
      if (fileList) {
        Array.from(fileList).forEach(file => {
          dataTransfer.items.add(file);
        });
      }
      
      // Add new files
      Array.from(e.target.files).forEach(file => {
        dataTransfer.items.add(file);
      });

      setFileList(dataTransfer.files);
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const fileNumber = fileList?.length || 0;

  console.log("fileList", fileList);

  return (
    <div className="flex h-full w-full flex-col p-12 px-20 pr-72">
      <div className="flex w-full flex-row items-center">
        <LuPencil className="text-xl" />
        <Input
          className="ml-4 w-full py-2 border-fg-alt bg-bg-dark"
          onChange={(e) => handleTitleChange(e)}
          value={title}
          placeholder="Lecture title"
        />
      </div>
      <div className="mt-8 flex w-full flex-row items-start">
        <BiDetail className="mt-1 text-xl" />
        <Textarea
          className="ml-4 h-44 border-fg-alt bg-fg-alt"
          onChange={(e) => handleContentChange(e)}
          value={content}
          placeholder="Add content"
        />
      </div>
      <div className="my-4 flex items-center">
        <MdAttachment className="text-xl text-fg-soft" />
        <label
          htmlFor="attachment"
          className="cursor-pointer select-none text-primary-default mx-4"
        >
          Attach files
        </label>
        <input
          ref={fileInputRef} // Add ref to input
          id="attachment"
          className="bg-bg-dark"
          type="file"
          multiple
          hidden
          onChange={(e) => handleFileChange(e)}
        />
        {fileNumber > 0 && (
          <p className="ml-4 select-none text-primary-default">{fileNumber}</p>
        )}
      </div>
        {fileList && <FileList fileList={fileList} setFileList={setFileList} className="ml-8"/>}
    </div>
  );
}

export default LectureDetails;
