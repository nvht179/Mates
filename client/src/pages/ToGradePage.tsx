import ToGradeList from "../components/ToGradeList";
import Grade from "../interfaces/Grade";

function ToGradePage() {

    const grades: Grade[] = [
        {
            name: "Dao Xuan Thanh",
            assignment: "Meow Meow",
            status: "Submitted",
            submittedOn: "23:00, 14/12/2024",
            feedback: "So bad",
            weight: 2,
            score: "100/100",
        },
        {
            name: "Dao Xuan Thanh",
            assignment: "Gau Gau",
            status: "Submitted",
            submittedOn: "23:00, 14/12/2024",
            feedback: "Very goo...",
            weight: 2,
            score: "100/100",
        },
    ];

    return (
        <div className="mx-10">
            <ToGradeList grades={grades} />

        </div>
    )
}

export default ToGradePage;