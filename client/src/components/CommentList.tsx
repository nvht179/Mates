import { useState } from "react";
import { Post } from "../interfaces/Post";
import DefaultAvatar from "../assets/default-avatar.png";

interface CommentListProps {
  post: Post;
}

function CommentList({ post }: CommentListProps) {
  const [showComment, setShowComment] = useState(false);
  
  if(post.comments.length === 0) {
    return <div></div>;
  }
  
  const renderedCommentList = (post: Post) => {
    return post.comments.map((comment) => {
      const avatar = comment.person.avatar === "" ? DefaultAvatar : comment.person.avatar ?? DefaultAvatar;
      return (
        <div key={comment.id} className="p-4">
          <div className="flex flex-row items-center">
            <img
              className="h-6 w-6 rounded-full object-cover"
              src={avatar}
              alt={comment.person.name}
            />
            <p className="ml-4 text-sm">{comment.person.name}</p>
            <p className="ml-4 text-sm font-light">{new Date(comment.createAt).toLocaleString()}</p>
          </div>
          <div className="mt-4">
            <p className="mt-2 text-sm">{comment.content}</p>
          </div>
        </div>
      );
    });
  };

  const contentButton = showComment ? "Hide Comments" : "View Comments";

  return (
    <div>
      <div>{showComment && <div>{renderedCommentList(post)}</div>}</div>
      <div className="px-4 pt-4">
        <button
          onClick={() => setShowComment(!showComment)}
          className="text-primary-default underline text-sm"
        >
          {contentButton}
        </button>
      </div>
    </div>
  );
}

export default CommentList;
