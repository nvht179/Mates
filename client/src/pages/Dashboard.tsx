import Button from "../components/Button";
import ClassCardList from "../components/ClassCardList";
import { useSelector } from "react-redux";
import { SelectorState, useViewAllClassesQuery } from "../store";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const { email } = useSelector((state: SelectorState) => state.user);
  const { data } = useViewAllClassesQuery({ email });

  // let classes = [
  //   {
  //     classID: 1,
  //     className: "Introduction to Software Engineering",
  //     code: "CS400",
  //     image: "https://picsum.photos/1920/1080/",
  //     description: "This is a class about software engineering. We will learn about software engineering principles and practices.",
  //   },
  //   {
  //     classID: 2,
  //     className: "Science",
  //     code: "SCI",
  //     image: "https://picsum.photos/1920/1080/",
  //     description: "This is a class about science. We will learn about science principles and practices.",
  //   },
  //   {
  //     classID: 3,
  //     className: "Literature",
  //     code: "LTT",
  //     image: "https://picsum.photos/1920/1080/",
  //     description: "This is a class about literature. We will learn about literature principles and practices.",
  //   },
  //   {
  //     classID: 4,
  //     className: "English",
  //     code: "Eng",
  //     image: "https://picsum.photos/1920/1080/",
  //     description: "This is a class about English. We will learn about English principles and practices.",
  //   },
  //   {
  //     classID: 5,
  //     className: "Computer Science",
  //     code: "CS",
  //     image: "https://picsum.photos/1920/1080/",
  //     description: "This is a class about computer science. We will learn about computer science principles and practices.",
  //   },
  //   {
  //     classID: 6,
  //     className: "Artificial Intelligence",
  //     code: "AI",
  //     image: "https://picsum.photos/1920/1080/",
  //     description: "This is a class about artificial intelligence. We will learn about artificial intelligence principles and practices.",
  //   },
  // ];

  const classes = data?.allClassesInfo ?? [];

  const handleCreateClass = () => {
    navigate("/create-class");
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <p className="ml-8 text-xl font-bold">My classes</p>
        <Button onClick={handleCreateClass} className="m-4">Create or join Class</Button>
      </div>
      <div className="border-b-2"></div>
      <ClassCardList classes={classes} />
    </div>
  );
}

export default Dashboard;
