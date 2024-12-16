import {Post} from "./PostList";
import Reaction from "./Reaction";

interface ReactionListProps {
  post: Post;
}

function ReactionList({ post }: ReactionListProps) {
  const types: Array<"like" | "love"> = ["like", "love"];
  const renderedReactionList = (post: Post) => {
    let like = 0;
    let love = 0;
    post.reaction.forEach((reaction) => {
      if (reaction.reaction === 1) {
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
              <Reaction reactType={type} initNumber={type === "like" ? like : love} initActive={false}/>
            </div>
          );
        })}
      </div>
    );
  };

  return <div>{renderedReactionList(post)}</div>;
}

export default ReactionList;
