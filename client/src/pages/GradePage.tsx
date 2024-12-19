import GradeList from "../components/GradeList";
import Grade from "../interfaces/Grade";

function GradePage() {

    const grades: Grade[] = [
        {
            name: "Meow Meow",
            status: "Submitted",
            submittedOn: "23:00, 14/12/2024",
            feedback: "So bad",
            weight: 2,
            score: "100/100",
        },
        {
            name: "Gau Gau",
            status: "Submitted",
            submittedOn: "23:00, 14/12/2024",
            feedback: "Very goo...",
            weight: 2,
            score: "100/100",
        },
    ];

    return (
        <div className="mx-10">
            <GradeList grades={grades} />

        </div>
    )
}

export default GradePage;