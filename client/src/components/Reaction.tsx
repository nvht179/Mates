import { useReducer } from "react";
import classNames from "classnames";
import { FaRegHeart } from "react-icons/fa6";
import { BiLike } from "react-icons/bi";

interface ReactionProps {
  reactType: "love" | "like";
  initNumber: number;
  initActive: boolean;
}

interface State {
  number: number;
  active: boolean;
}

interface Action {
  type: "increment" | "decrement";
}

const INCREMENT = "increment";
const DECREMENT = "decrement";

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case INCREMENT:
      return { number: state.number + 1, active: true };
    case DECREMENT:
      return { number: state.number - 1, active: false };
    default:
      throw new Error();
  }
};

function Reaction({ reactType, initNumber, initActive }: ReactionProps) {
  const [state, dispatch] = useReducer(reducer, {
    number: initNumber,
    active: initActive,
  });

  const style = classNames({
    "text-red-500": reactType === "love" && state.active,
    "text-yellow-400": reactType === "like" && state.active,
  });

  const handleClick = () => {
    if (state.active) {
      dispatch({ type: DECREMENT });
    } else {
      dispatch({ type: INCREMENT });
    }
  };

  let icon;
  if (reactType === "love") {
    icon = <FaRegHeart className={style} />;
  } else {
    icon = <BiLike className={style} />;
  }
  return (
    <div
      onClick={handleClick}
      className="flex cursor-pointer flex-row items-center rounded-full border border-fg-border px-2"
    >
      {icon}
      <p className="ml-2">{state.number}</p>
    </div>
  );
}

export default Reaction;
