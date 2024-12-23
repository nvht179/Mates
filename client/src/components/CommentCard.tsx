import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import OptionDropdown from "./OptionDropdown";
import DefaultAvatar from "../assets/default-avatar.png";
import { useEditCommentMutation, useDeleteCommentMutation } from "../store";
import Input from "./Input";
import Button from "./Button";
import { useGetUserByIdQuery } from "../store";

interface Comment {
  id: number;
  content: string;
  postId: number;
  personId: number;
  createAt: string;
  personID: number;
}

function CommentCard({ comment }: { comment: Comment}) {
  const currentUser = useSelector((state: RootState) => state.user);

  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(comment.content);
  const formEl = useRef<HTMLFormElement>(null);

  const [editComment, {isLoading}] = useEditCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (formEl.current && !formEl.current.contains(e.target as Node)) {
        setContent(comment.content);
        setIsEditing(false);
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [comment]);

  const {data} = useGetUserByIdQuery(comment.personID);

  const user = data?.user;
  const avatar =
    user?.avatar === ""
      ? DefaultAvatar
      : (user?.avatar ?? DefaultAvatar);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = (comment: Comment) => {
    deleteComment({ commentId: comment.id });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const onSubmitEditComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editComment({ id: comment.id, content });
    setIsEditing(false);
  };

  const handleSaveComment = () => {
    editComment({ id: comment.id, content });
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setContent(comment.content);
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <img
            className="h-6 w-6 rounded-full object-cover"
            src={avatar}
            alt={user?.name}
          />
          <p className="ml-4 text-sm">{user?.name}</p>
          <p className="ml-4 text-sm font-light">
            {new Date(comment.createAt).toLocaleString()}
          </p>
        </div>
        {user?.id == currentUser.id && (
          <OptionDropdown
            handleEditClick={() => handleEditClick()}
            handleDeleteClick={() => handleDeleteClick(comment)}
          />
        )}
      </div>
      <div className="mt-4">
        {!isEditing ? (
          <p className="mt-2 text-sm">{content}</p>
        ) : (
          <form ref={formEl} onSubmit={onSubmitEditComment}>
            <div className="flex flex-row items-center">
              <Input
                className="w-2/3"
                value={content}
                onChange={handleContentChange}
              />
              <Button primary disabled={isLoading} className="ml-4 w-20" onClick={handleSaveComment}>
                Save
              </Button>
              <Button
                secondary
                className="ml-4 w-20"
                onClick={handleCancelClick}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default CommentCard;
