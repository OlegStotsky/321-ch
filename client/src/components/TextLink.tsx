import * as React from "react";

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
    <a
      className={`text-link text-link--${color} ${
        classNames ? classNames.join(" ") : null
      }`}
      href={href}
    >
      {data}
    </a>
  );
};

export default TextLink;
