import * as React from "react";

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="home-page__header">
        <h1 className="home-page__header-main">321.ch</h1>
        <h3 className="home-page__header-sub">Just another imageboard</h3>
      </header>
      <div className="box">
        <h1 className="box__header">Boards</h1>
        <div className="box__content">
          <ul className="column">
            <li className="column__heading">Japanese Culture</li>
            <li>
              <a className="text-link" href="/a">
                Anime
              </a>
            </li>
            <li>
              <a className="text-link" href="/aw">
                Anime/Wallpapers
              </a>
            </li>
            <li>
              <a className="text-link" href="/mech">
                Mecha
              </a>
            </li>
            <li>
              <a className="text-link" href="/ot">
                Otaku Culture
              </a>
            </li>
          </ul>
          <ul className="column">
            <li className="column__heading">Tech</li>
            <li>
              <a className="text-link" href="/pr">
                Programming
              </a>
            </li>
            <li>
              <a className="text-link" href="/s">
                Software &amp; Technology
              </a>
            </li>
            <li>
              <a className="text-link" href="/sci">
                Science &amp; Math
              </a>
            </li>
            <li>
              <a className="text-link" href="/wd">
                Web Design
              </a>
            </li>
          </ul>
          <ul className="column">
            <li className="column__heading">Misc</li>
            <li>
              <a className="text-link" href="/wd">
                Random
              </a>
            </li>
            <li>
              <a className="text-link" href="/wd">
                Politics
              </a>
            </li>
            <li>
              <a className="text-link" href="/wd">
                International
              </a>
            </li>
            <li>
              <a className="text-link" href="/wd">
                Meet ups
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
