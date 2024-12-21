import { useState } from "react";
import { Post } from "../interfaces/Post";
import CommentCard from "./CommentCard";
import { useViewCommentsQuery } from "../store";

interface CommentListProps {
  post: Post;
}

function CommentList({ post }: CommentListProps) {
  const [showComment, setShowComment] = useState(false);
  const { data } = useViewCommentsQuery({ postId: post.id });

  const comments = data?.data || [];
  if (comments.length === 0) {
    return <div></div>;
  }

  const renderedCommentList = comments.map((comment) => {
    const commentWithPersonID = { ...comment, personID: comment.personId };
    return (
      <div key={comment.id} className="p-4">
        <CommentCard comment={commentWithPersonID} />
      </div>
    );
  });
  const contentButton = showComment ? "Hide Comments" : "View Comments";

  return (
    <div>
      <div>{showComment && <div>{renderedCommentList}</div>}</div>
      <div className="px-4 pt-4">
        <button
          onClick={() => setShowComment(!showComment)}
          className="text-sm text-primary-default underline"
        >
          {contentButton}
        </button>
      </div>
    </div>
  );
}

export default CommentList;
