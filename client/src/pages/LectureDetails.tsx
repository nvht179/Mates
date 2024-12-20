import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LuPencil } from "react-icons/lu";
import { BiDetail } from "react-icons/bi";
import Input from "../components/Input";
import Textarea from "../components/TextArea";
import { useCreateLectureMutation, useEditLectureMutation } from "../store";
import { ClassState } from "../interfaces/Class";
import { Lecture } from "../interfaces/Lecture";

function LectureDetails() {
  const { state } = useLocation();
  const { cla, lecture } = state as {
    cla: ClassState;
    lecture: Lecture | null;
  };
  const { code } = cla;
  const navigate = useNavigate();

  const [title, setTitle] = useState(lecture?.title ?? "");
  const [content, setcontent] = useState(lecture?.content ?? "");
  const [fileList, setFileList] = useState<FileList | null>(null);
  const [createLecture, { isSuccess: isCreateLectureSuccess }] = useCreateLectureMutation();
  const [editLecture, {isSuccess: isEditLectureSuccess}] = useEditLectureMutation();

  useEffect(() => {
    if (lecture?.attachments) {
      const attachments = lecture.attachments.map((attachment) => {
        const file = new File([attachment.link], attachment.linkTitle);
        return file;
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
  }, [title, content, fileList, cla.classID, createLecture, editLecture, lecture]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setcontent(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileList(e.target.files);
    }
  };

  return (
    <div className="flex h-full w-full flex-col p-12 px-20 pr-72">
      <div className="flex w-full flex-row items-center">
        <LuPencil className="text-xl" />
        <Input
          className="ml-4 w-full py-2"
          onChange={(e) => handleTitleChange(e)}
          value={title}
          placeholder="Lecture title"
        />
      </div>
      <div className="mt-8 flex w-full flex-row items-start">
        <BiDetail className="mt-1 text-xl" />
        <Textarea
          className="ml-4 h-44"
          onChange={(e) => handleContentChange(e)}
          value={content}
          placeholder="Add content"
        />
      </div>
      <div className="ml-8 mt-8">
        <input
          id="fileInput"
          className="hidden w-64"
          type="file"
          multiple
          onChange={(e) => handleFileChange(e)}
        />
        <label
          htmlFor="fileInput"
          className="w-64 cursor-pointer text-primary-default active:text-fg-default"
        >
          Select Files
        </label>
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
      </div>
    </div>
  );
}

export default LectureDetails;
