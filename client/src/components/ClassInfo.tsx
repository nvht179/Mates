import { useEffect, useRef, useState } from "react";
// import { SlOptions } from "react-icons/sl";
import { ClassState } from "../interfaces/Class";
import { ReactNode } from "react";
import { MdInfo } from "react-icons/md";
import { useViewClassInfoQuery } from "../store";

interface ClassInfoProps extends React.HTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    cla: ClassState;
}

function ClassInfo({
    cla,
    className: additionalClassName,
}: ClassInfoProps) {

    const cID = cla.classID.toString();
    const classInfoQuery = useViewClassInfoQuery(cID);
    const { data } = classInfoQuery;

    // useEffect(() => {
    //     responseErrorHandler(
    //         CIIsError,
    //         CIError as FetchBaseQueryError,
    //         setErrorMessage,
    //     );
    // }, [CIIsError, CIError]);

    const [isOpen, setIsOpen] = useState(false);
    const divEl = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (divEl.current && !divEl.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("click", handleClick, true);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    const UIclassName = additionalClassName;

    return (
        <div ref={divEl} className="relative">
            <MdInfo
                className={UIclassName}
                onClick={() => setIsOpen(true)}
            />
            <div className="absolute left-0">
                {isOpen ? (
                    <div className="z-10 w-80 mx-auto p-4 bg-white rounded-lg shadow-md border border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">{cla.className}</h2>
                        <div className="text-sm text-gray-600 mb-2">
                            <p>
                                <span className="font-medium">Class code:</span> {cla.code}
                            </p>
                            <div>
                                <span className="font-medium">Schedule:</span>
                                <ul className="ml-4 list-disc">
                                    {data?.classEvents.map((item, index) => {
                                        const startTime = new Date(item.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                        const endTime = new Date(item.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                        const dayOfWeek = new Date(item.startTime).toLocaleDateString([], { weekday: 'long' });
                                        return (
                                            <li key={index} className="mt-1">
                                                {dayOfWeek}, {startTime} - {endTime}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                            <p className="mt-2">
                                <span className="font-medium">Frequency:</span> {data?.classEvents[0].repeatTime}
                            </p>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default ClassInfo;
