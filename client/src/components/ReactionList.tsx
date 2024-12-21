import { useEffect, useState } from "react";
import { Post } from "./PostList";
import Reaction from "./Reaction";
import { ReactionType } from "../interfaces/Post";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface ReactionListProps {
  post: Post;
}

function ReactionList({ post }: ReactionListProps) {
  const user = useSelector((state: RootState) => state.user);
  const reactions = post.reactions;
  const [activeReactionType, setActiveReactionType] = useState<string>("");

  useEffect(() => {
    const getCurrentUserReactionType = (): string => {
      const userReaction = reactions.find(
        (reaction: ReactionType) => reaction.personId === user.id,
      );
      return userReaction ? userReaction.type : "";
    };

    setActiveReactionType(getCurrentUserReactionType());
  }, [reactions, user.id]);

  const handleReactionClick = (type: string) => {
    setActiveReactionType((prevType) => (prevType === type ? "" : type));
  };

  const types: Array<"like" | "love"> = ["like", "love"];
  const renderedReactionList = () => {
    let like = 0;
    let love = 0;
    reactions.forEach((reaction: ReactionType) => {
      if (reaction.type === "love") {
        love++;
      } else {
        like++;
      }
    });
    return (
      <div className="flex flex-row items-center">
        {types.map((type, index) => {
          const isReacted = activeReactionType === type;
          return (
            <div key={index} className="mr-2">
              <Reaction
                reactType={type}
                number={type === "like" ? like : love}
                active={isReacted}
                handleClick={() => handleReactionClick(type)}
              />
            </div>
          );
        })}
      </div>
    );
  };

  return <div>{renderedReactionList()}</div>;
}

export default ReactionList;
