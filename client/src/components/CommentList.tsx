import { useState } from "react";
import { Post } from "./PostList";

interface CommentListProps {
  post: Post;
}

function CommentList({ post }: CommentListProps) {
  const [showComment, setShowComment] = useState(false);

  const renderedCommentList = (post: Post) => {
    return post.comment.map((comment) => {
      return (
        <div key={comment.user} className="p-4">
          <div className="flex flex-row items-center">
            <img
              className="h-6 w-6 rounded-full object-cover"
              src={comment.image}
              alt={comment.user}
            />
            <p className="ml-4 text-sm">{comment.user}</p>
            <p className="ml-4 text-sm font-light">{comment.time}</p>
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
      <div className="p-4">
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
