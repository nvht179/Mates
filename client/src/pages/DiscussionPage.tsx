import PostList from "../components/PostList";
import AddPost from "../components/AddPost";

function DiscussionPage() {

  const posts = [
    {
      id: 1,
      user: "John Doe",
      image: "../../public/mates.svg",
      title: "First Post",
      content: "Hello World!",
      time: "15/11/2024 13:00",
      comment: [
        {
          user: "Jane Doe",
          image: "../../public/vite.svg",
          content: "Nice post!",
          time: "15/11/2024 13:00",
        },
        {
          user: "Tim",
          image: "../../public/vite.svg",
          content: "I agree!",
          time: "15/11/2024 13:00",
        },
      ],
      reaction: [
        {
          user: "Jane Doe",
          reaction: 1,
        },
        {
          user: "Tim",
          reaction: 2,
        },
      ],
    },
    {
      id: 2,
      user: "Jane Doe",
      image: "../../public/mates.svg",
      title: "Second Post",
      content: "This is the second post.",
      time: "15/11/2024 13:00",
      comment: [
        {
          user: "Jane Doe",
          image: "../../public/vite.svg",
          content: "Nice post!",
          time: "15/11/2024 13:00",
        },
        {
          user: "Tim",
          image: "../../public/vite.svg",
          content: "I agree!",
          time: "15/11/2024 13:00",
        },
      ],
      reaction: [
        {
          user: "Jane Doe",
          reaction: 1,
        },
        {
          user: "Tim",
          reaction: 2,
        },
      ],
    },
    {
      id: 3,
      user: "Tim",
      image: "../../public/mates.svg",
      title: "Third Post",
      content: "This is the third post.",
      time: "15/11/2024 13:00",
      comment: [
        {
          user: "Jane Doe",
          image: "../../public/vite.svg",
          content: "Nice post!",
          time: "15/11/2024 13:00",
        },
        {
          user: "Tim",
          image: "../../public/vite.svg",
          content: "I agree!",
          time: "15/11/2024 13:00",
        },
      ],
      reaction: [
        {
          user: "Jane Doe",
          reaction: 1,
        },
        {
          user: "Tim",
          reaction: 2,
        },
      ],
    },
  ];

  return (
    <div>
      <PostList posts={posts} />
      <AddPost />
    </div>
  );
}

export default DiscussionPage;
