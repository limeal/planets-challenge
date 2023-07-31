import { useState } from "react";
import "./style.css";

import planets from "../../data.json";

const Menu = ({ setCurrentPlanet }: { setCurrentPlanet: any }) => {
  const [hover, setHover] = useState<boolean[]>([]);

  const mouseEnter = (index: number) => {
    const newHover = [...hover];
    newHover[index] = true;
    setHover(newHover);
  }

  const mouseLeave = (index: number) => {
    const newHover = [...hover];
    newHover[index] = false;
    setHover(newHover);
  }

  return (
    <nav className="navigation">
      <ul>
        {planets.map((planet, index) => (
          <li key={index}>
            <button
              style={{ color: hover[index] ? planet.color : "white" }}
              className={"color-" + planet.name.toLocaleLowerCase()}
              onClick={() => setCurrentPlanet(planet.name)}
              onMouseEnter={() => mouseEnter(index)}
              onMouseLeave={() => mouseLeave(index)}
            >
              {planet.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ({ setCurrentPlanet }: { setCurrentPlanet: any }) => {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="header__content">
        <h1 className="header__content__title">The Planets</h1>
        <div className="header__content__desktop">
          <Menu setCurrentPlanet={setCurrentPlanet} />
        </div>
        <div className="header__content__mobile">
          <button onClick={() => setOpen(!open)}>
            <img src="/assets/images/icon-hamburger.svg" alt="menu" />
          </button>
          {open && (
            <div className="header__content__mobile__menu">
              <Menu
                setCurrentPlanet={(planet: any) => {
                  setOpen(false);
                  setCurrentPlanet(planet);
                }}
              />
            </div>
          )}
        </div>
      </div>
      <hr />
    </header>
  );
};
