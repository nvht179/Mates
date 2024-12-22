import { useEffect, useState } from "react";
import { Post } from "./PostList";
import Reaction from "./Reaction";
import { ReactionType } from "../interfaces/Post";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import {
  useCreateReactionMutation,
  useEditReactionMutation,
  useDeleteReactionMutation,
} from "../store";

interface ReactionListProps {
  post: Post;
}

function ReactionList({ post }: ReactionListProps) {
  const user = useSelector((state: RootState) => state.user);
  const reactions = post.reactions;
  const [reactionType, setReactionType] = useState<string | null>(null);
  const [ReactionId, setReactionId] = useState<number | null>(null);

  const [
    createReaction,
    { data: createReactionData, isSuccess: isCreateSuccess },
  ] = useCreateReactionMutation();
  const [editReaction, { data: editReactionData, isSuccess: isEditSuccess }] =
    useEditReactionMutation();
  const [deleteReaction, { isSuccess: isDeleteSuccess }] =
    useDeleteReactionMutation();

  useEffect(() => {
    const getCurrentUserReactionType = (): ReactionType | null => {
      const userReaction = reactions.find(
        (reaction: ReactionType) => reaction.personId === user.id,
      );
      return userReaction ? userReaction : null;
    };
    const reaction = getCurrentUserReactionType();
    setReactionType(reaction?.type ?? null);
    setReactionId(reaction?.id ?? null);
  }, [reactions, user.id]);

  useEffect(() => {
    if (isCreateSuccess) {
      setReactionType(createReactionData?.data.type);
      setReactionId(createReactionData?.data.id);
    }
  }, [isCreateSuccess, createReactionData]);

  useEffect(() => {
    if (isEditSuccess) {
      setReactionType(editReactionData?.data.type);
      setReactionId(editReactionData?.data.id);
    }
  }, [isEditSuccess, editReactionData]);

  useEffect(() => {
    if (isDeleteSuccess) {
      setReactionType(null);
      setReactionId(null);
    }
  }, [isDeleteSuccess]);

  const handleReactionClick = (type: string) => {
    if (reactionType === null) {
      // Logic to add the reaction
      createReaction({
        personId: post.personID,
        type,
        postId: post.id,
      });
    } else if (reactionType === type) {
      deleteReaction({ id: ReactionId as number });
    } else {
      // Logic to edit the reaction
      editReaction({
        id: ReactionId as number,
        newType: type,
      });
    }
  };
  
  const types: Array<"like" | "love"> = ["like", "love"];
  const renderedReactionList = () => {
    let like = 0;
    let love = 0;
    reactions.forEach((reaction: ReactionType) => {
      if (reaction.personId === user.id) {
        return;
      }
      if (reaction.type === "love") {
        love++;
      } else {
        like++;
      }
    });
    return (
      <div className="flex flex-row items-center">
        {types.map((type, index) => {
          const isReacted = reactionType === type;
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
