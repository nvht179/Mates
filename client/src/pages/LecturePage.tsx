import LectureList from "../components/LectureList";
import Button from "../components/Button";

function LecturePage() {
  const lectures = [
    {
      id: 1,
      title: "Lecture 1",
      description: "Dear friend across the river, my hands are cold and bare. Dear friend across the river, I’ll take what you can spare. I ask of you a penny. My fortune, it will be.",
      href: "/lecture/1",
    },
    {
      id: 2,
      title: "Lecture 2",
      description: "Dear friend across the river, my hands are cold and bare. Dear friend across the river, I’ll take what you can spare. I ask of you a penny. My fortune, it will be.",
      href: "/lecture/2",
    },
    {
      id: 3,
      title: "Lecture 3",
      description: "Dear friend across the river, my hands are cold and bare. Dear friend across the river, I’ll take what you can spare. I ask of you a penny. My fortune, it will be.",
      href: "/lecture/3",
    },
  ];
  return (
    <div className="mx-20">
      <LectureList lectures={lectures} />
      <Button>
        Create Lecture
      </Button>
    </div>
  );
}

export default LecturePage;
