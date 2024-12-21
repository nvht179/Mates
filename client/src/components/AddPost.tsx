import { useState } from "react";
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

function AddPost() {
  const [addPostActive, setAddPostActive] = useState(false);
  const [subject, setSubject] = useState("");
  const [postContent, setPostContent] = useState("");

  const [createPost] = useCreatePostMutation();

  const user = useSelector((state: RootState) => state.user);
  const { state } = useLocation();
  const { cla } = state as { cla: ClassState };

  const addPostButton = () => {
    return (
      <Button onClick={() => setAddPostActive(true)} className="w-36">
        <MdOutlinePostAdd className="mr-2 text-xl" />
        New Post
      </Button>
    );
  };

  const handleSavePost = () => {
    setAddPostActive(false);
    createPost({
      classID: cla.classID,
      title: subject,
      content: postContent,
      personID: user.id || 0,
    });
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
            onClick={() => setAddPostActive(false)}
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
        <div className="m-4 mt-2 flex flex-col items-end">
          <Button onClick={handleSavePost} className="w-36">
            Post
          </Button>
        </div>
      </Panel>
    );
  };

  const content = addPostActive ? addPostArea() : addPostButton();

  return <div className="mx-44 my-8">{content}</div>;
}

export default AddPost;
