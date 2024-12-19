
import Grade from "../interfaces/Grade";
import TopBarTab from "./TopBarTab";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ClassState } from "../interfaces/Class";


interface GradeListProps {
    grades: Grade[];
}

type ButtonClicked = "tograde" | "graded";

//   type Role = "student" | "teacher" | "parent";

function GradedList({ grades }: GradeListProps) {

    const { state } = useLocation();
    const { cla } = state as { cla: ClassState; image: string, title: string };
    const { code } = cla;
    const navigate = useNavigate();
    const [buttonClicked, setButtonClicked] = useState<ButtonClicked>("tograde");

    const handleClickToGrade = () => {
        navigate(`/class/${code}/grade`, { state: { ...state, title: "Assignment" } });
        setButtonClicked("tograde");
    };
    const handleClickGraded = () => {
        navigate(`/class/${code}/grade`, { state: { ...state, title: "Assignment" } });
        setButtonClicked("graded");
    };


    return (
        <div className="mt-10 overflow-x-auto rounded-md border-fg-border">
            <div className="flex flex-row h-full items-center">
                <TopBarTab
                    className="border-b-fg-softer"
                    onClick={handleClickToGrade}
                    active={buttonClicked === "tograde"}>
                    ToGrade
                </TopBarTab>
                <TopBarTab
                    className="border-b-fg-softer"
                    onClick={handleClickGraded}
                    active={buttonClicked === "graded"}>
                    Graded
                </TopBarTab>
            </div>
            <table className="min-w-full bg-bg-softer rounded-lg shadow-md border-t">
                <thead>
                    <tr className="bg-bg-soft">
                        <th className="py-2 px-4 border-b text-sm font-medium text-fg-soft">
                            Name
                        </th>
                        <th className="py-2 px-4 border-b text-sm font-medium text-fg-soft">
                            Assignment
                        </th>
                        <th className="py-2 px-4 border-b text-sm font-medium text-fg-soft">
                            Status
                        </th>
                        <th className="py-2 px-4 border-b text-sm font-medium text-fg-soft">
                            Submitted on
                        </th>
                        <th className="py-2 px-4 border-b text-sm font-medium text-fg-soft">
                            Feedback
                        </th>
                        <th className="py-2 px-4 border-b text-sm font-medium text-fg-soft">
                            Weight
                        </th>
                        <th className="py-2 px-4 border-b text-sm font-medium text-fg-soft">
                            100/100
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {grades.map((grade, index) => (
                        <tr
                            key={index}
                            className="hover:bg-gray-50 transition duration-150 ease-in-out"
                        >
                            <td className="py-2 px-4 border-b text-fg-soft text-center">{grade.name}</td>
                            <td className="py-2 px-4 border-b text-fg-soft text-center">{grade.assignment}</td>
                            <td className="py-2 px-4 border-b text-fg-soft text-center">{grade.status}</td>
                            <td className="py-2 px-4 border-b text-fg-soft text-center">{grade.submittedOn}</td>
                            <td className="py-2 px-4 border-b text-fg-soft text-center">{grade.feedback}</td>
                            <td className="py-2 px-4 border-b text-fg-soft text-center">{grade.weight}</td>
                            <td className="py-2 px-4 border-b text-fg-soft text-center">{grade.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GradedList;
