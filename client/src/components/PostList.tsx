import Panel from "./Panel";

interface PostListProps {
  posts: Post[];
}

interface Post {
  id: number;
  user: string;
  image: string;
  title: string;
  content: string;
  time: string;
  comment: Comment[];
}

interface Comment {
  user: string;
  image: string;
  content: string;
  time: string;
}

function PostList({ posts }: PostListProps) {
  const renderedCommentList = (post: Post) => {
    return post.comment.map((comment) => {
      return (
        <div key={comment.user} className="p-4">
          <div className="flex flex-row items-center">
            <img
              className="h-8 w-8 rounded-full object-cover"
              src={comment.image}
              alt={comment.user}
            />
            <p className="ml-4">{comment.user}</p>
            <p className="ml-4 text-xs">{comment.time}</p>
          </div>
          <div className="mt-4">
            <p className="mt-2 text-sm">{comment.content}</p>
          </div>
        </div>
      );
    });
  };

  const renderedPostList = posts.map((post) => {
    return (
      <div key={post.id} className="pt-4">
        <Panel>
          <div className="p-4">
            <div className="flex flex-row items-center">
              <img
                className="h-8 w-8 rounded-full object-cover"
                src={post.image}
                alt={post.user}
              />
              <p className="ml-4">{post.user}</p>
              <p className="ml-4 text-xs">{post.time}</p>
            </div>
            <div className="mt-4">
              <p className="text-xl font-bold">{post.title}</p>
              <p className="mt-2 text-sm">{post.content}</p>
            </div>
          </div>
          <div className="border-b-2" />
          <div>{renderedCommentList(post)}</div>
        </Panel>
      </div>
    );
  });

  return (
    <div className="overflow-y-scroll px-44 h-96">
      {renderedPostList}
    </div>
  );
}

export default PostList;
