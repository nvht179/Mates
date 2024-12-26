import { useEffect, useRef, useState } from "react";
// import { SlOptions } from "react-icons/sl";
import { ClassState } from "../interfaces/Class";
import { ReactNode } from "react";
import { MdInfo, MdInfoOutline } from "react-icons/md";
import { useViewClassInfoQuery } from "../store";

interface ClassInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  cla: ClassState;
  hoveredIcon: string;
}

function ClassInfo({ cla, hoveredIcon, ...rest }: ClassInfoProps) {
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

  return (
    <div ref={divEl} className="relative m-0">
      <div {...rest} className="cursor-pointer text-2xl">
        {hoveredIcon === `${cla.classID}_info` ? (
          <MdInfo
            className="select-none hover:text-primary-default"
            onClick={() => setIsOpen((prev) => !prev)}
          />
        ) : (
          <MdInfoOutline
            className="select-none text-fg-soft"
            onClick={() => setIsOpen((prev) => !prev)}
          />
        )}
      </div>

      <div className="absolute left-0">
        {isOpen ? (
          <div className="z-10 mx-auto w-80 rounded-lg border border-gray-200 bg-white p-4 shadow-md">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              {cla.className}
            </h2>
            <div className="mb-2 text-sm text-gray-600">
              <p>
                <span className="font-medium">Class code:</span> {cla.code}
              </p>
              <div>
                <span className="font-medium">Schedule:</span>
                <ul className="ml-4 list-disc">
                  {data?.classEvents.map((item, index) => {
                    const startTime = new Date(
                      item.startTime,
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    });
                    const endTime = new Date(item.endTime).toLocaleTimeString(
                      [],
                      { hour: "2-digit", minute: "2-digit" },
                    );
                    const dayOfWeek = new Date(
                      item.startTime,
                    ).toLocaleDateString([], { weekday: "long" });
                    return (
                      <li key={index} className="mt-1">
                        {dayOfWeek}, {startTime} - {endTime}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <p className="mt-2">
                <span className="font-medium">Frequency:</span>{" "}
                {data?.classEvents[0].repeatTime}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ClassInfo;
