interface AttachmentCardProps {
  link: string;
  linkTitle: string;
}

function AttachmentCard({ link, linkTitle }: AttachmentCardProps) {
  return (
    <div className="attachment-card p-4 border rounded shadow-lg">
      <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
        {linkTitle}
      </a>
    </div>
  );
}

export default AttachmentCard;
