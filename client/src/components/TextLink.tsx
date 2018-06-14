import * as React from "react";
import { Link } from "react-router-dom";

interface ITextLinkProps {
  children: React.ReactNode;
  href: string;
  color?: string;
  classNames?: string[];
}

const TextLink: React.SFC<ITextLinkProps> = ({
  children,
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
      {children}
    </Link>
  );
};

export default TextLink;
