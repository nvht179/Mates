import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useViewReactionQuery } from "../store";
import { Post } from "./PostList";
import Reaction from "./Reaction";

interface ReactionListProps {
  post: Post;
}

function ReactionList({ post }: ReactionListProps) {
  const user = useSelector((state: RootState) => state.user);
  const { data } = useViewReactionQuery({ postId: post.id });
  const [reactions, setReactions] = useState(data ?? []);

  useEffect(() => {
    if (data) {
      setReactions(data);
    }
  }, [data]);
  console.log(reactions);
  console.log(user.id);  

  const isCurrentUserReacted = (reactType: string) => {
    return (
      reactions.some((reaction) => reaction.personId === user.id) &&
      reactions.some((reaction) => reaction.type === reactType)
    );
  };

  const types: Array<"like" | "love"> = ["like", "love"];
  const renderedReactionList = () => {
    let like = 0;
    let love = 0;
    reactions.forEach((reaction) => {
      if (reaction.type === "love") {
        love++;
      } else {
        like++;
      }
    });
    return (
      <div className="flex flex-row items-center">
        {types.map((type, index) => {
          return (
            <div key={index} className="mr-2">
              <Reaction
                reactType={type}
                initNumber={type === "like" ? like : love}
                initActive={isCurrentUserReacted(type)}
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
