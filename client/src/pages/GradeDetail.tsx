
import Button from "../components/Button";
import { GrTextAlignFull } from "react-icons/gr";
import Grade from "../interfaces/Grade";
import Assignment from "../interfaces/Assignment";


export default function GradeDetail() {
    const grade: Grade = {
        name: "Meow Meow",
        status: "Submitted",
        submittedOn: "23:00, 14/12/2024",
        feedback: "So bad",
        weight: 2,
        score: "100/100",
    };

    const assignment: Assignment = {
        id: 1,
        title: "Meow Meow",
        dueTime: "2022-12-12 15:30",
        description: "Dear friend across the river, my hands are cold and bare. Dear friend across the river, I’ll take what you can spare. I ask of you a penny. My fortune, it will be.",
        href: "/assignment/1",
        isSubmitted: true,
        submission: "Submission.pdf",
    };

    return (
        <div className="max-w mx-auto">
            <div className="my-10 w-2/3 px-10 justify-between items-center flex">
                <h1 className="text-l font-bold">Grade Detail</h1>
                <Button secondary>Close</Button>
            </div>
            <div className="my-10 w-2/3 px-10 justify-between items-center flex">
                <div className="flex w-1/2 flex-row">
                    <h1 className="mr-5 font-semibold">Submission</h1>
                    <h1>Turned in {grade.submittedOn}</h1>
                </div>
                <Button secondary className="border-none bg-bg-dark">{assignment.submission}</Button>
            </div>

            <div className="my-10 max-w px-10 items-center flex">

                <h1 className="mr-5 font-semibold">Assignment</h1>
                <h1>{grade.name}</h1>

            </div>

            <div className="my-10 max-w px-10 items-center flex">

                <h1 className="mr-12 pr-5 font-semibold">Point</h1>
                <h1 className="font-semibold">{grade.score}</h1>

            </div>
            {/* Description */}
            <div className="my-10 px-10 flex items-center w-2/3">
                <GrTextAlignFull className="mr-10 text-xl flex-shrink-0" />  
                <p className="text-lg ml-11">
                    {assignment.description}
                </p>
            </div>
        </div>
    );

}

