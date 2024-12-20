import Assignment from "../interfaces/Assignment";
import Panel from "./Panel";
import { SlOptions } from "react-icons/sl";
import Button from "./Button";

interface AssignmentListProps extends React.HTMLAttributes<HTMLDivElement> {
  assignments: Assignment[];
}

type Role = "student" | "teacher" | "parent";

function AssignmentList({ assignments }: AssignmentListProps) {
  const role: Role = "student" as Role; // Change this value to test different roles

  const renderedAssignment = assignments.map((assignment) => {
    return (
      <Panel key={assignment.id} className="my-6 p-4">
        <div className="flex flex-row items-center justify-between">
          <div className="flex w-2/5 items-center justify-between">
            <p className="font-semibold text-fg-default">
              {"#" + assignment.id + " " + assignment.title}
            </p>
            <div className="flex flex-row items-center">
              <p className="mx-2 inline text-sm font-bold text-fg-soft">
                Due Time:{" "}
              </p>
              <span className="text-fg-softer">{assignment.dueTime}</span>
            </div>
          </div>
          <SlOptions className="cursor-pointer active:opacity-30" />
        </div>
        <div className="mt-4 border-b-2" />
        <div className="mt-2 flex flex-row">
          <div className="flex-2">
            <p className="mr-2 inline text-sm font-bold">Description:</p>
            <span className="text-fg-softer">{assignment.description}</span>
            {/* submission */}
            {assignment.isSubmitted && (
              <div className="mt-10">
                <p className="mr-2 inline text-sm font-bold">Submission: </p>
                <span className="text-fg-softer">{assignment.submission}</span>
              </div>
            )}

            {role === "student" && <Button className="mt-4">Submit</Button>}
          </div>
          <div className="flex-1 pl-16 pr-8">
            <p className="mr-2 inline text-sm font-bold">Attachment: </p>
            <a
              href={assignment.href}
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              {assignment.href}
            </a>
          </div>
        </div>
      </Panel>
    );
  });

  return <div>{renderedAssignment}</div>;
}

export default AssignmentList;
