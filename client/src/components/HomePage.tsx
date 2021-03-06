import * as React from "react";
import Box from "./Box";
import Column from "./Column";
import TextLink from "./TextLink";
import {
  techSection,
  japaneseCultureSection,
  miscSection
} from "../../../shared/lib/static/BoardSections";
import { IBoardCredentials } from "../../../shared/lib/types/BoardCredentials";
import toListOfLinks from "../helpers/toListOfLinks";

const HomePage = () => {
  const firstColumnItems = toListOfLinks(japaneseCultureSection.boardList);
  const secondColumnItems = toListOfLinks(techSection.boardList);
  const thirdColumnItems = toListOfLinks(miscSection.boardList);

  return (
    <div className="home-page">
      <header className="home-page__header">
        <h1 className="home-page__header-main">321.ch</h1>
        <h3 className="home-page__header-sub">Just another imageboard</h3>
      </header>

      <Box headerMessage="Boards">
        <Column
          headingMessage={japaneseCultureSection.name}
          items={firstColumnItems}
        />
        <Column headingMessage={techSection.name} items={secondColumnItems} />
        <Column headingMessage={miscSection.name} items={thirdColumnItems} />
      </Box>
    </div>
  );
};

export default HomePage;
