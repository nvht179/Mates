
import Grade from "../interfaces/Grade";


// const grades: Grade[] = [
//   {
//     name: "Meow Meow",
//     status: "Submitted",
//     submittedOn: "23:00, 14/12/2024",
//     feedback: "So bad",
//     weight: 2,
//     score: "100/100",
//   },
//   {
//     name: "Gau Gau",
//     status: "Submitted",
//     submittedOn: "23:00, 14/12/2024",
//     feedback: "Very goo...",
//     weight: 2,
//     score: "100/100",
//   },
// ];

interface GradeListProps {
    grades: Grade[];
}

//   type Role = "student" | "teacher" | "parent";

function GradeList({ grades }: GradeListProps) {

    return (
        <div className="mt-10 overflow-x-auto rounded-md border border-fg-border">
            <table className="min-w-full bg-bg-softer rounded-lg shadow-md">
                <thead>
                    <tr className="bg-bg-soft">
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
                        <th className="py-2 px-4  border-b text-sm font-medium text-fg-soft">
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

export default GradeList;
