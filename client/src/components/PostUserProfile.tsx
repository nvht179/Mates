import { useGetUserByIdQuery } from "../store";
import { Post } from "./PostList";
import defaultAvatar from "../assets/default_ava.png";

interface PostUserProfileProps {
  post: Post;
}

function PostUserProfile({ post } : PostUserProfileProps) {
  const {data} = useGetUserByIdQuery(post.personID);
  const user = data?.user || {
    name: "Unknown",
    avatar: defaultAvatar,
  };
  return (
    <div className="flex flex-row items-center">
      <img
        className="h-12 w-12 rounded-full object-cover"
        src={user.avatar === "" ? defaultAvatar : user.avatar}
        alt={user.name}
      />
      <p className="ml-4">{user.name}</p>
    </div>
  );
}

export default PostUserProfile;
