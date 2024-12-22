import { Attachment } from "../interfaces/Post";

interface AttachmentListProps {
  attachments: Attachment[];
}

function AttachmentList({attachments}: AttachmentListProps) {
  if (!attachments) {
    return null;
  }
  return (
    <div>
      {attachments.map((attachment) => (
        <div key={attachment.id}>
          <a
            href={attachment.link}
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            {attachment.linkTitle}
          </a>
        </div>
      ))}
    </div>
  );
}

export default AttachmentList;