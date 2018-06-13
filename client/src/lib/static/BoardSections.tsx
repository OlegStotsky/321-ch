import { IBoardSection } from "../types/BoardSection";

const animeSection: IBoardSection = {
  name: "Japanese Culture",
  boardList: [
    ["Anime", "/a"],
    ["Anime/Wallpapers", "/aw"],
    ["Mecha", "/mech"],
    ["Otaku Culture", "/otaku"]
  ]
};

const techSection: IBoardSection = {
  name: "Tech",
  boardList: [
    ["Programming", "/pr"],
    ["Software & Technology", "/s"],
    ["Science & Math", "/sci"],
    ["Web Design", "/wd"]
  ]
};

const miscSection: IBoardSection = {
  name: "Misc",
  boardList: [
    ["Random", "/b"],
    ["Politics", "/po"],
    ["International", "/int"],
    ["Meet ups", "/soc"]
  ]
};
