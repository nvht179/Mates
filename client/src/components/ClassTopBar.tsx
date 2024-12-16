import Panel from "./Panel";
import { useLocation } from "react-router-dom";

function ClassTopBar() {
  const { state } = useLocation();
  const { title, cla } = state;
  const { name, image } = cla;
  return (
    <Panel className="flex h-16 flex-row items-center bg-bg-alt py-4">
    <img
      src={image}
      alt={name}
      className="ml-4 h-8 w-8 rounded object-cover"
    />
    <h1 className="ml-4 text-lg font-bold">{title}</h1>
  </Panel>
  );
}

export default ClassTopBar;