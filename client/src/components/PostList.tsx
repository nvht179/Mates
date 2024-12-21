import Panel from "./Panel";
import CommentList from "./CommentList";
import ReactionList from "./ReactionList";
import Input from "./Input";
import { Post } from "../interfaces/Post";
import AttachmentCardList from "./AttachmentCardList";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import defaultAvatar from "../assets/default-avatar.png";

interface PostListProps {
  posts: Post[];
}

function PostList({ posts }: PostListProps) {
  const user = useSelector((state: RootState) => state.user);

  const userProfileRendered = (
    <div className="flex flex-row items-center">
      <img
        className="h-12 w-12 rounded-full object-cover"
        src={user.avatar ? user.avatar : defaultAvatar}
        alt={user.name || "Unknown"}
      />
      <p className="ml-4">{user.name}</p>
    </div>
  );

  const renderedAddComment = (
    <div className="mt-4 px-4 pb-4">
      <div className="flex flex-row items-center">
        <img
          className="h-8 w-8 rounded-full object-cover"
          src={user.avatar ? user.avatar : defaultAvatar}
          alt={user.name || "Unknown"}
        />
        <Input className="ml-4 w-full" type="text" placeholder="Add comment" />
      </div>
    </div>
  );
  const renderedPostList = posts.map((post) => {
    return (
      <div key={post.id} className="pt-4">
        <Panel>
          <div className="p-4">
            <div className="flex flex-row items-center">
              {userProfileRendered}
              <p className="ml-4 font-light">
                {new Date(post.time).toLocaleString()}
              </p>
            </div>
            <div className="mt-4">
              <p className="text-xl font-bold">{post.title}</p>
              <p className="mt-2">{post.content}</p>
            </div>
            {/* display reaction */}
            <div className="mt-4">
              <AttachmentCardList attachments={post.attachments} />
            </div>
            {/* display reaction */}
            <div className="mt-4">
              <ReactionList post={post} />
            </div>
          </div>
          <div className="border-b-2" />
          {/* display Comment */}
          <CommentList post={post} />
          {/* display Add comment */}
          {renderedAddComment}
        </Panel>
      </div>
    );
  });

  return <div className="px-44">{renderedPostList}</div>;
}

export default PostList;
export type { Post };
