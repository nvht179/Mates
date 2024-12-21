import classNames from "classnames";
import { FaRegHeart } from "react-icons/fa6";
import { BiLike } from "react-icons/bi";

interface ReactionProps {
  reactType: string;
  number: number;
  active: boolean;
  handleClick: () => void;
}

function Reaction({ reactType, number, active, handleClick }: ReactionProps) {
  const style = classNames({
    "text-red-500": reactType === "love" && active,
    "text-yellow-400": reactType === "like" && active,
  });

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
      <p className="ml-2 select-none">{active ? number + 1 : number}</p>
    </div>
  );
}

export default Reaction;
