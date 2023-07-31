import React, { useEffect, useState } from "react";

import planets from "../../data.json";

import "./style.css";

interface Planet {
  name: string;
  overview: {
    content: string;
    source: string;
  };
  structure: {
    content: string;
    source: string;
  };
  geology: {
    content: string;
    source: string;
  };
  color: string;
  rotation: string;
  revolution: string;
  radius: string;
  temperature: string;
  images: {
    planet: string;
    internal: string;
    geology: string;
  };
}

const PlanetDetailCard = ({
  title,
  value,
}: {
  title: string;
  value: string | undefined;
}) => {
  return (
    <div className="planet__details__card">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};

const PlanetSectionLink = ({ number, name, id, color, setSection }: {
    number: number;
    name: string;
    id: string;
    color: string;
    setSection: any;
}) => {
    const [hover, setHover] = useState<boolean>(false);

  return (
    <button className="planet__section__link" style={{
        backgroundColor: color,
        opacity: hover ? 0.5 : 1,
        filter: hover ? 'alpha(opacity=50)' : 'brightness(1)'
    }}
        onClick={() => setSection(id)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
    >
      <strong>{number < 10 ? '0' + number.toString() : number.toString()}</strong>
      <span>{name}</span>
    </button>
  );
};

export default ({ name }: { name: string }) => {
  const [planet, setPlanet] = useState<Planet | undefined>();
  const [section, setSection] = useState<string>('overview');

  useEffect(() => {
    const planet = planets.find(
      (planet) => planet.name.toLowerCase() === name.toLowerCase()
    );

    setPlanet(planet);
  }, [name]);

  const getImage = () => {
    switch (section) {
        case "structure":
            return planet?.images.internal;
        default:
            return planet?.images.planet;
    }
  }

  return (
    <div className="planet">
      <div className="planet__hero">
        <div className="planet__hero__image">
            <img className="planet__hero__image__planet" src={`/assets/images/${getImage()}`} alt={name} />
            {section === 'geology' && <img className="planet__hero__geology" src={`/assets/images/${planet?.images.geology}`} alt={`${name} geology`} />}
        </div>
        <div className="planet__hero__content">
            <div className="planet__hero__content__text">
              <h1>{name}</h1>
              <p>{planet && Object.entries(planet[section as keyof Planet]).find(([key, _]) => key === 'content')?.[1]}</p>
              <p className="planet__hero__content__text__source">
                Source:{" "}
                <div className="planet__hero__content__text__source__link">
                    <a href={planet && Object.entries(planet[section as keyof Planet]).find(([key, _]) => key === 'source')?.[1]} target="_blank">
                      Wikipedia
                    </a>
                    <img src="/assets/images/icon-source.svg" alt="source" />
                </div>
              </p>
            </div>
            <ul>
                <li>
                  <PlanetSectionLink number={1} name="Overview" id="overview" color={section === 'overview' ? (planet?.color || '') : "transparent"} setSection={setSection} />
                </li>
                <li>
                    <PlanetSectionLink number={2} name="Internal Structure" id="structure" color={section === 'structure' ? (planet?.color || '') : "transparent"} setSection={setSection} />
                </li>
                <li>
                    <PlanetSectionLink number={3} name="Surface Geology" id="geology" color={section === 'geology' ? (planet?.color || '') : "transparent"} setSection={setSection} />
                </li>
            </ul>
        </div>
      </div>
      <div className="planet__details">
        <ul>
          <li>
            <PlanetDetailCard title="Rotation Time" value={planet?.rotation} />
          </li>
          <li>
            <PlanetDetailCard
              title="Revolution Time"
              value={planet?.revolution}
            />
          </li>
          <li>
            <PlanetDetailCard title="Radius" value={planet?.radius} />
          </li>
          <li>
            <PlanetDetailCard
              title="Average Temp."
              value={planet?.temperature}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};
