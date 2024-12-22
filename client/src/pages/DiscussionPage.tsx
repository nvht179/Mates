import PostList from "../components/PostList";
import AddPost from "../components/AddPost";
import { useViewPostsQuery } from "../store";
import { useLocation } from "react-router-dom";
import { ClassState } from "../interfaces/Class";

function DiscussionPage() {
  const { state } = useLocation();
  const { cla } = state as { cla: ClassState };
  const { data } = useViewPostsQuery({ classID: cla.classID });

  const posts = [...(data?.data ?? [])];
  posts.sort((a, b) => a.id - b.id);

  return (
    <div>
      <PostList posts={posts} />
      <AddPost />
    </div>
  );
}

export default DiscussionPage;
