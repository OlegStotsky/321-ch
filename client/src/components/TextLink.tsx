import * as React from "react";

interface ITextLinkProps {
  data: string;
  href: string;
}

const TextLink: React.SFC<ITextLinkProps> = ({ data, href }) => {
  return (
    <a className="text-link" href={href}>
      {data}
    </a>
  );
};

export default TextLink;
