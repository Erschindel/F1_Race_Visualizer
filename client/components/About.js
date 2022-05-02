import React from "react";

const About = () => {
  return (
    <div className="container">
      <h1>About this project</h1>
      <br />
      {/* <p>
        This is my submission for my Async week project for Fullstack Academy.
      </p> */}
      <p>
        A few friends have recently gotten me interested in the world of Formula
        1 racing. F1 is an international motorsport competition that puts the
        best drivers in the world into some of the fastest land vehicles in the
        world and then has them race around different courses. Each race has ten
        teams with two drivers each for a total of 20 participants, and each
        season generally includes 20-25 races. Most races are about 50-80 laps.
      </p>
      <p>
        The goal of this project is to create a visual representation of each
        race.
      </p>
      <br />
      <h2>Data and tools</h2>
      <p>
        The <a href="http://ergast.com/mrd/">Ergast API</a> is my primary source
        of race data. Each race is connected to a set of laps, and each lap has
        a set of lap times for each driver. While this source doesn't provide
        second-by-second data, it is enough to present{" "}
        <strong>normalized</strong> representations of each lap. Note that the
        data seems to only include vehicles that are still competing for points
        (only the top 10 finishers receive points), so the last few laps of each
        race will generally only include the fastest ~12 cars.
      </p>
      <p>My database contains custom SVG files of each track.</p>
      <p>
        I used <a href="https://d3js.org/">d3.js</a> to animate drivers around
        the chosen track.
      </p>
      <p>Other tools: React, Redux, Express, Node, Postgres.</p>
      <br />
      <h2>Coming soon (maybe)</h2>
      <ul>
        <li>
          My database is set up to contain drivers and races as well as tracks.
          I can migrate data into my database to remove my dependency on
          external sources
        </li>
        <li>Adding more tracks</li>
        <li>Better analysis of racer performance</li>
      </ul>
    </div>
  );
};

export default About;
