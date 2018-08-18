import TextLink from "../components/TextLink";
import { IBoardCredentials } from "../../../shared/lib/types/BoardCredentials";
import * as React from "react";

const toListOfLinks = (a: IBoardCredentials[]): React.ReactNode[] => {
  return a.map((item, i) => (
    <TextLink key={i} href={item.link} color="green">
      {item.name}
    </TextLink>
  ));
};

export default toListOfLinks;
