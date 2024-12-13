import { useLocation } from "react-router-dom";
import Panel from "../components/Panel";
import PostList from "../components/PostList";
import Button from "../components/Button";

function DiscussionPage() {
  const { state } = useLocation();
  const { name, image, classCode } = state;

  const posts = [
    {
      id: 1,
      user: "John Doe",
      image: "../../public/vite.svg",
      title: "First Post",
      content: "Hello World!",
      time: "15/11/2024 13:00",
      comment: [
        {
          user: "Jane Doe",
          content: "Nice post!",
          time: "15/11/2024 13:00",
        },
        {
          user: "Tim",
          content: "I agree!",
          time: "15/11/2024 13:00",
        },
      ],
    },
    {
      id: 2,
      user: "Jane Doe",
      image: "../../public/vite.svg",
      title: "Second Post",
      content: "This is the second post.",
      time: "15/11/2024 13:00",
      comment: [
        {
          user: "Jane Doe",
          content: "Nice post!",
          time: "15/11/2024 13:00",
        },
        {
          user: "Tim",
          content: "I agree!",
          time: "15/11/2024 13:00",
        },
      ],
    },
    {
      id: 3,
      user: "Tim",
      image: "../../public/vite.svg",
      title: "Third Post",
      content: "This is the third post.",
      time: "15/11/2024 13:00",
      comment: [
        {
          user: "Jane Doe",
          content: "Nice post!",
          time: "15/11/2024 13:00",
        },
        {
          user: "Tim",
          content: "I agree!",
          time: "15/11/2024 13:00",
        },
      ],
    },
  ];

  return (
    <div className="flex h-full w-full flex-col">
      <Panel className="flex h-16 flex-row items-center py-4">
        <img
          src={image}
          alt={name}
          className="ml-4 h-8 w-8 rounded object-cover"
        />
        <h1 className="ml-4 text-lg font-bold">Discussion</h1>
      </Panel>
      <PostList posts={posts} />
      <Button className="my-4 ml-44 w-36">Start a post</Button>
    </div>
  );
}

export default DiscussionPage;
