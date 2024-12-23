import classNames from "classnames";
import {
  HiMail,
  HiOutlineMail,
  HiMailOpen,
  HiOutlineMailOpen,
} from "react-icons/hi";

interface MailIconProps extends React.SVGProps<SVGSVGElement> {
  isHovered: boolean;
  isRead: boolean;
}

function MailIcon({ isHovered, isRead, ...rest }: MailIconProps) {
  const style = classNames(rest.className);
  if (isRead) {
    if (isHovered) {
      return <HiMail className={style} {...rest} />;
    } else {
      return <HiOutlineMail className={style} {...rest} />;
    }
  }
  if (isHovered) {
    return <HiMailOpen className={style} {...rest} />;
  } else {
    return <HiOutlineMailOpen className={style} {...rest} />;
  }
}

export default MailIcon;
