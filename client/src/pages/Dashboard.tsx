import Button from "../components/Button";
import ClassCardList from "../components/ClassCardList";

function Dashboard() {
  const classes = [
    {
      name: "Introduction to Software Engineering",
      classCode: "CS400",
      image: "https://picsum.photos/1920/1080/",
    },
    {
      name: "Science",
      classCode: "SCI",
      image: "https://picsum.photos/1920/1080/",
    },
    {
      name: "Literature",
      classCode: "LTT",
      image: "https://picsum.photos/1920/1080/",
    },
    {
      name: "English",
      classCode: "Eng",
      image: "https://picsum.photos/1920/1080/",
    },
    {
      name: "Computer Science",
      classCode: "CS",
      image: "https://picsum.photos/1920/1080/",
    },
    {
      name: "Artificial Intelligence",
      classCode: "AI",
      image: "https://picsum.photos/1920/1080/",
    },
  ];

  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <p className="ml-8 text-xl font-bold">My classes</p>
        <Button className="m-4">Create or join Class</Button>
      </div>
      <div className="border-b-2"></div>
      <ClassCardList classes={classes} />
    </div>
  );
}

export default Dashboard;
