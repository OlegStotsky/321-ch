import * as React from "react";
import { Link } from "react-router-dom";

interface ITextLinkProps {
  data: string;
  href: string;
  color?: string;
  classNames?: string[];
}

const TextLink: React.SFC<ITextLinkProps> = ({
  data,
  href,
  color,
  classNames
}) => {
  return (
    <Link
      className={`text-link text-link--${color} ${
        classNames ? classNames.join(" ") : null
      }`}
      to={href}
    >
      {data}
    </Link>
  );
};

export default TextLink;
