
import Button from "../components/Button";
import { GrTextAlignFull } from "react-icons/gr";
import Grade from "../interfaces/Grade";
import Assignment from "../interfaces/Assignment";
import { useState } from "react";
import Input from "../components/Input";


export default function GradingPage() {
    const grade: Grade = {
        name: "Dao Xuan Thanh",
        assignment: "Meow Meow",
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

    const [studentName, setStudentName] = useState("XT");
    const [feedback, setFeedback] = useState("");
    const [score, setScore] = useState("");

    return (
        <div className="max-w mx-auto">
            <div className="my-10 w-2/3 px-10 justify-between items-center flex">
                <select
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="border-fg-alt bg-fg-alt w-full mr-10 rounded border-2 border-fg-border p-2 px-3 transition focus:border-b-primary-default focus:outline-none"
                >
                    <option value="XT">Dao Xuan Thanh</option>
                    <option value="DV">Duc Vua</option>
                </select>
                <div className="flex">
                    <Button secondary className="mr-5">Close</Button>
                    <Button>Save</Button>
                </div>
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
                <Input
                    className="border-fg-alt bg-fg-alt text-left"
                    type="number"
                    value={score}
                    placeholder=""
                    onChange={(e) => setScore(e.target.value)}
                />
                <h1 className="font-semibold">/100</h1>

            </div>
            {/* Description */}
            <div className="my-10 px-10 flex items-center w-2/3">
                <GrTextAlignFull className="mr-10 text-xl flex-shrink-0" />
                <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="border-fg-alt bg-fg-alt w-full ml-11 rounded border-2 border-fg-border p-2 px-3 transition focus:border-b-primary-default focus:outline-none"
                    placeholder="Feed back for this submission"
                    rows={4}
                />
            </div>
        </div>
    );

}

