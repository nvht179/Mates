import { useState } from "react";
import { MdOutlinePostAdd } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import Button from "../components/Button";
import Panel from "../components/Panel";
import Input from "./Input";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import defaultAvatar from "../assets/default-avatar.png";

function AddPost() {
  const [addPostActive, setAddPostActive] = useState(false);

  const user = useSelector((state: RootState) => state.user);

  const addPostButton = () => {
    return (
      <Button onClick={() => setAddPostActive(true)} className="w-36">
        <MdOutlinePostAdd className="mr-2 text-xl" />
        New Post
      </Button>
    );
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
            <p className="ml-4 font-bold">Jane Doe</p>
          </div>
          <RxCross2
            onClick={() => setAddPostActive(false)}
            className="mr-4 cursor-pointer text-2xl text-fg-softer active:opacity-30"
          />
        </div>
        <Input
          className="rounded-none border-x-0 py-4 text-xl"
          placeholder="Add a subject"
        />
        <textarea
          className="h-28 border-0 p-3 text-lg focus:outline-none focus:ring-0"
          placeholder="Type a message"
        />
        <div className="m-4 mt-2 flex flex-col items-end">
          <Button onClick={() => setAddPostActive(false)} className="w-36">
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
