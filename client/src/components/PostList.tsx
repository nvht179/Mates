import Panel from "./Panel";
import CommentList from "./CommentList";
import ReactionList from "./ReactionList";
import { Post } from "../interfaces/Post";

import AddComment from "./AddComment";
import PostDisplay from "./PostDisplay";

interface PostListProps {
  posts: Post[];
}

function PostList({ posts }: PostListProps) {
  const renderedPostList = posts.map((post) => {
    return (
      <div key={post.id} className="pt-4">
        <Panel>
          <div className="p-4">
            <PostDisplay post={post} />
            {/* display attachment */}

            {/* display reaction */}
            <div className="mt-4">
              <ReactionList post={post} />
            </div>
          </div>
          <div className="border-b-2" />
          {/* display Comment */}
          <CommentList post={post} />
          {/* display Add comment */}
          <AddComment post={post} />
        </Panel>
      </div>
    );
  });

  return <div className="px-44">{renderedPostList}</div>;
}

export default PostList;
export type { Post };
