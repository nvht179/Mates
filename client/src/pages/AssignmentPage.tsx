import AssignmentList from "../components/AssignmentList";
import Button from "../components/Button";
import { RiEditBoxFill } from "react-icons/ri";

function AssignmentPage() {
  const assignments = [
    {
      id: 1,
      title: "Meow Meow",
      dueTime: "2022-12-12 15:30",
      description:
        "Dear friend across the river, my hands are cold and bare. Dear friend across the river, I’ll take what you can spare. I ask of you a penny. My fortune, it will be.",
      href: "/assignment/1",
      isSubmitted: true,
      submission: "Submission.pdf",
    },
    {
      id: 2,
      title: "Lmao Lmao",
      dueTime: "2022-12-12 15:30",
      description:
        "Dear friend across the river, my hands are cold and bare. Dear friend across the river, I’ll take what you can spare. I ask of you a penny. My fortune, it will be.",
      href: "/assignment/2",
      isSubmitted: false,
      submission: "",
    },
    {
      id: 3,
      title: "Loli",
      dueTime: "2022-12-12 15:30",
      description:
        "Dear friend across the river, my hands are cold and bare. Dear friend across the river, I’ll take what you can spare. I ask of you a penny. My fortune, it will be.",
      href: "/assignment/3",
      isSubmitted: false,
      submission: "",
    },
  ];
  return (
    <div className="relative mx-20 flex h-screen flex-col">
      <AssignmentList assignments={assignments} />
      <div className="flex">
        <Button className="items-center">
          <RiEditBoxFill className="mr-2" />
          <label className="text-sm">New Assignment</label>
        </Button>
      </div>
    </div>
  );
}

export default AssignmentPage;
