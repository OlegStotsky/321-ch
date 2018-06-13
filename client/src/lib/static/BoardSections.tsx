import { IBoardSection } from "../types/BoardSection";

export const japaneseCultureSection: IBoardSection = {
  name: "Japanese Culture",
  boardList: [
    { name: "Anime", link: "/a" },
    { name: "Anime/Wallpapers", link: "/aw" },
    { name: "Mecha", link: "/mech" },
    { name: "Otaku Culture", link: "/otaku" }
  ]
};

export const techSection: IBoardSection = {
  name: "Tech",
  boardList: [
    { name: "Programming", link: "/pr" },
    { name: "Software & Technology", link: "/s" },
    { name: "Science & Math", link: "/sci" },
    { name: "Web Design", link: "/wd" }
  ]
};

export const miscSection: IBoardSection = {
  name: "Misc",
  boardList: [
    { name: "Random", link: "/b" },
    { name: "Politics", link: "/po" },
    { name: "International", link: "/int" },
    { name: "Meet ups", link: "/soc" }
  ]
};
