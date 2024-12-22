import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useCreateCommentMutation } from "../store";
import { Post } from "./PostList";
import Input from "./Input";
import defaultAvatar from "../assets/default-avatar.png";

interface PostListProps {
  post: Post;
}

function AddComment({ post }: PostListProps) {
  const user = useSelector((state: RootState) => state.user);
  const [currentComment, setCurrentComment] = useState("");

  const [createComment, {isSuccess}] = useCreateCommentMutation();

  useEffect(() => {
    if (isSuccess) {
      setCurrentComment("");
    }
  }, [isSuccess]);
  
  const onsubmitAddComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentComment === "") {
      return;
    }
    await createComment({
      content: currentComment,
      postId: post.id,
      personId: user.id || 0,
    });
  };

  return (
    <div className="mt-4 px-4 pb-4">
      <div className="flex flex-row items-center">
        <img
          className="h-8 w-8 rounded-full object-cover"
          src={user.avatar ? user.avatar : defaultAvatar}
          alt={user.name || "Unknown"}
        />
        <form onSubmit={onsubmitAddComment} className="w-full">
          <Input
            className="ml-4 w-full"
            type="text"
            placeholder="Add comment"
            value={currentComment}
            onChange={(e) => setCurrentComment(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
}

export default AddComment;
