import * as React from "react";
import Box from "./Box";
import Column from "./Column";
import TextLink from "./TextLink";

const HomePage = () => {
  const japaneseCultureSection: Array<[string, string]> = [
    ["Anime", "/a"],
    ["Anime/Wallpapers", "/aw"],
    ["Mecha", "mech"],
    ["Otaku Culture", "otaku"]
  ];

  const techSection: Array<[string, string]> = [
    ["Programming", "/pr"],
    ["Software & Technology", "/s"],
    ["Science & Math", "/sci"],
    ["Web Design", "/wd"]
  ];

  const misc: Array<[string, string]> = [
    ["Random", "/b"],
    ["Politics", "/po"],
    ["International", "/int"],
    ["Meet ups", "/soc"]
  ];

  const toListOfLinks = (a: Array<[string, string]>): React.ReactNode[] => {
    return a.map((item, i) => (
      <TextLink key={i} data={item[0]} href={item[1]} />
    ));
  };

  const firstColumnItems = toListOfLinks(japaneseCultureSection);
  const secondColumnItems = toListOfLinks(techSection);
  const thirdColumnItems = toListOfLinks(misc);

  return (
    <div className="home-page">
      <header className="home-page__header">
        <h1 className="home-page__header-main">321.ch</h1>
        <h3 className="home-page__header-sub">Just another imageboard</h3>
      </header>

      <Box headerMessage="Boards">
        <Column headingMessage="Japanese Culture" items={firstColumnItems} />
        <Column headingMessage="Tech" items={secondColumnItems} />
        <Column headingMessage="Misc" items={thirdColumnItems} />
      </Box>
    </div>
  );
};

export default HomePage;
