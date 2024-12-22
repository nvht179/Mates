import { useEffect, useState } from "react";
import { MdOutlinePostAdd } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import Button from "../components/Button";
import Panel from "../components/Panel";
import Input from "./Input";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import defaultAvatar from "../assets/default-avatar.png";
import Textarea from "./TextArea";
import { useCreatePostMutation } from "../store";
import { useLocation } from "react-router-dom";
import { ClassState } from "../interfaces/Class";
import { TbLinkPlus } from "react-icons/tb";

function AddPost() {
  const [addPostActive, setAddPostActive] = useState(false);
  const [subject, setSubject] = useState("");
  const [postContent, setPostContent] = useState("");
  const [fileList, setFileList] = useState<FileList | null>(null);

  const [createPost, { isSuccess, isLoading }] = useCreatePostMutation();

  const user = useSelector((state: RootState) => state.user);
  const { state } = useLocation();
  const { cla } = state as { cla: ClassState };

  useEffect(() => {
    if (isSuccess) {
      setSubject("");
      setPostContent("");
      setFileList(null);
      setAddPostActive(false);
    }
  }, [isSuccess]);

  const addPostButton = () => {
    return (
      <Button onClick={() => setAddPostActive(true)} className="w-36">
        <MdOutlinePostAdd className="mr-2 text-xl" />
        New Post
      </Button>
    );
  };

  const handleCancelClick = () => {
    setAddPostActive(false);
    setSubject("");
    setPostContent("");
    setFileList(null);
  };

  const handleSavePost = () => {
    const formData = new FormData();
    formData.append("classID", cla.classID.toString());
    formData.append("title", subject);
    formData.append("content", postContent);
    if (user.id !== null && user.id !== undefined) {
      formData.append("personID", user.id.toString());
    }
    if (fileList) {
      Array.from(fileList).forEach((file) => {
        formData.append("files", file);
      });
    }
    createPost(formData);
  };

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileList(e.target.files);
    }
  };

  const addPostArea = () => {
    return (
      <Panel className="mt-4 flex flex-col">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center p-4">
            <img
              className="h-8 w-8 rounded-full object-cover"
              src={user.avatar ? user.avatar : defaultAvatar}
              alt={user.name || "Unknown"}
            />
            <p className="ml-4 font-bold">{user.name}</p>
          </div>
          <RxCross2
            onClick={handleCancelClick}
            className="mr-4 cursor-pointer text-2xl text-fg-softer active:opacity-30"
          />
        </div>
        <Input
          className="rounded-none border-x-0 px-4 py-4 text-xl"
          placeholder="Add a subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <Textarea
          className="h-28 border-none px-4"
          placeholder="Type a message"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />
        <div className="m-4 mt-2 flex flex-row items-center justify-end">
          {fileList && <p className="mr-2">{fileList.length} file Selected</p>}
          <label htmlFor="fileInput">
            <TbLinkPlus className="mr-4 cursor-pointer text-2xl active:opacity-30" />
          </label>
          <Input
            className="hidden"
            id="fileInput"
            type="file"
            multiple
            onChange={(e) => handleFilesChange(e)}
          />
          {isLoading ? (
            <Button disabled>Loading...</Button>
          ) : (
            <Button onClick={handleSavePost} className="w-36">
              Post
            </Button>
          )}
        </div>
      </Panel>
    );
  };

  const content = addPostActive ? addPostArea() : addPostButton();

  return <div className="mx-44 my-8">{content}</div>;
}

export default AddPost;
