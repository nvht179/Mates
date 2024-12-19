import Panel from "./Panel";
import CommentList from "./CommentList";
import ReactionList from "./ReactionList";
import Input from "./Input";
import { Post } from "../interfaces/Post";
import PostUserProfile from "./PostUserProfile";

interface PostListProps {
  posts: Post[];
}

function PostList({ posts }: PostListProps) {

  const renderedAddComment = () => {
    return (
      <div className="px-4 pb-4">
        <div className="flex flex-row items-center">
          <img
            className="h-8 w-8 rounded-full object-cover"
            src="../../public/mates.svg"
            alt="user"
          />
          <Input
            className="ml-4 w-full"
            type="text"
            placeholder="Add comment"
          />
        </div>
      </div>
    );
  };

  const renderedPostList = posts.map((post) => {
    return (
      <div key={post.id} className="pt-4">
        <Panel>
          <div className="p-4">
            <div className="flex flex-row items-center">
              <PostUserProfile post={post} />
              <p className="ml-4 font-light">{post.time}</p>
            </div>
            <div className="mt-4">
              <p className="text-xl font-bold">{post.title}</p>
              <p className="mt-2">{post.content}</p>
            </div>
            {/* display reaction */}
            <div className="mt-4"><ReactionList post={post} /></div>
          </div>
          <div className="border-b-2" />
          {/* display Comment */}
          {/* <CommentList post={post} /> */}
          {/* display Add comment */}
          {renderedAddComment()}
        </Panel>
      </div>
    );
  });

  return <div className="px-44">{renderedPostList}</div>;
}

export default PostList;
export type { Post };
