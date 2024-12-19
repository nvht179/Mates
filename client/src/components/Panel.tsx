import classnames from "classnames";

interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function Panel({ children, ...rest }: PanelProps) {
  const finalClassName = classnames(
    "border",
    rest.className,
  );
  return (
    <div {...rest} className={finalClassName}>
      {children}
    </div>
  );
}

export default Panel;
