import { Post } from "./PostList";
import { useSelector } from "react-redux";
import defaultAvatar from "../assets/default-avatar.png";
import { useEffect, useRef, useState } from "react";
import {
  RootState,
  useEditPostMutation,
  useDeletePostMutation,
  useGetUserByIdQuery,
} from "../store";
import OptionDropdown from "./OptionDropdown";
import Input from "./Input";
import Textarea from "./TextArea";
import Button from "./Button";
import { TbLinkPlus } from "react-icons/tb";
import FileList from "./FileList";
import AttachmentList from "./AttachmentList";
import { formatDate } from "../utils/date";

interface PostListProps {
  post: Post;
}

function PostDisplay({ post }: PostListProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [fileList, setFileList] = useState<FileList | null>(null);
  const [attachments, setAttachments] = useState(post.attachments);

  const user = useSelector((state: RootState) => state.user);
  const {data: userProfileQuery} = useGetUserByIdQuery(post.personID);
  const [editPost, { data, isSuccess, isLoading }] = useEditPostMutation();
  const [deletePost] = useDeletePostMutation();

  const divEl = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (divEl.current && !divEl.current.contains(e.target as Node)) {
        setIsEditing(false);
        setTitle(post.title);
        setContent(post.content);
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [post]);

  useEffect(() => {
    if (post.attachments) {
      const attachments = post.attachments.map((attachment) => {
        return new File([attachment.link], attachment.linkTitle);
      });
      const dataTransfer = new DataTransfer();
      attachments.forEach((file) => dataTransfer.items.add(file));
      setFileList(dataTransfer.files);
    }
  }, [post, isEditing]);

  useEffect(() => {
    if (isSuccess) {
      const newAttachments = data.data.attachments;
      setAttachments(newAttachments);
      setIsEditing(false);
    }
  }, [isSuccess, data]);

  const userProfile = userProfileQuery?.user;
  const userProfileRendered = (
    <div className="flex flex-row items-center">
      <img
        className="h-12 w-12 rounded-full object-cover"
        src={userProfile?.avatar === "" ? defaultAvatar : userProfile?.avatar}
        alt={userProfile?.name || "Unknown"}
      />
      <p className="ml-4">{userProfile?.name || "Unknown"}</p>
    </div>
  );

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = () => {
    deletePost({ postId: post.id });
  };

  const viewPostContentRendered = (
    <div>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          {userProfileRendered}
          <p className="ml-4 font-light">
            {formatDate(post.time)}
          </p>
        </div>
        {post.personID == user.id && (
          <OptionDropdown
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
          />
        )}
      </div>
      <div className="mt-4">
        <p className="text-xl font-bold">{post.title}</p>
        <p className="mt-2">{post.content}</p>
      </div>
      <div className="mt-4">
        <AttachmentList attachments={attachments} />
      </div>
    </div>
  );

  const handleCancelClick = () => {
    setIsEditing(false);
    setTitle(post.title);
    setContent(post.content);
  };

  const handleSavePostClick = () => {
    const formData = new FormData();
    formData.append("postId", post.id.toString());
    formData.append("title", title);
    formData.append("content", content);
    if (fileList) {
      Array.from(fileList).forEach((file) => {
        formData.append("files", file);
      });
    }
    console.log(formData);
    editPost(formData);
  };

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileList(e.target.files);
    }
  };

  const editPostContentRendered = (
    <div ref={divEl}>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          {userProfileRendered}
          <p className="ml-4 font-light">
            {formatDate(post.time)}
          </p>
        </div>
        <div className="flex flex-row items-center">
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
          <Button
            primary
            disabled={isLoading}
            className="w-24"
            onClick={handleSavePostClick}
          >
            Save
          </Button>
          <Button secondary className="ml-4 w-24" onClick={handleCancelClick}>
            Cancel
          </Button>
        </div>
      </div>
      <div className="mt-4">
        <Input
          className="text-xl font-bold"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          className="mt-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <FileList fileList={fileList} setFileList={setFileList} />
      </div>
    </div>
  );

  const renderedContent = isEditing
    ? editPostContentRendered
    : viewPostContentRendered;

  return <div>{renderedContent}</div>;
}

export default PostDisplay;
