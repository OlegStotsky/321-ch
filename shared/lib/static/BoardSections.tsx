import { IBoardSection } from "../types/BoardSection";
import { IBoardCredentials } from "../types/BoardCredentials";
import BoardName from "../types/BoardName";
import * as R from "ramda";

export const japaneseCultureSection: IBoardSection = {
  name: "Japanese Culture",
  boardList: [
    { name: "Anime", link: "/a", shortName: BoardName.a },
    { name: "Anime/Wallpapers", link: "/aw", shortName: BoardName.aw },
    { name: "Mecha", link: "/mech", shortName: BoardName.mech },
    { name: "Otaku Culture", link: "/otaku", shortName: BoardName.otaku }
  ]
};

export const techSection: IBoardSection = {
  name: "Tech",
  boardList: [
    { name: "Programming", link: "/pr", shortName: BoardName.pr },
    { name: "Software & Technology", link: "/s", shortName: BoardName.s },
    { name: "Science & Math", link: "/sci", shortName: BoardName.sci },
    { name: "Web Design", link: "/wd", shortName: BoardName.wd }
  ]
};

export const miscSection: IBoardSection = {
  name: "Misc",
  boardList: [
    { name: "Random", link: "/b", shortName: BoardName.b },
    { name: "Politics", link: "/po", shortName: BoardName.po },
    { name: "International", link: "/int", shortName: BoardName.int },
    { name: "Meet ups", link: "/soc", shortName: BoardName.soc }
  ]
};

export const allSections: IBoardSection[] = [japaneseCultureSection, techSection, miscSection];
export const allBoards: IBoardCredentials[] = R.flatten(allSections.map(x => x.boardList));