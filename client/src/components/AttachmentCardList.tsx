import { Attachment } from "../interfaces/Post";
import AttachmentCard from "./AttachmentCard";

function AttachmentCardList({ attachments }: { attachments: Attachment[] }) {
  return (
    <div className="flex flex-wrap">
      {attachments.map((attachment) => (
        <AttachmentCard key={attachment.id} link={attachment.link} linkTitle={attachment.linkTitle} />
      ))}
    </div>
  );
}

export default AttachmentCardList;