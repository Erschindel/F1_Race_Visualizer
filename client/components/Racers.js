import React from "react";
import { connect } from "react-redux";

const Racers = (props) => {
  const { laps, handleLap } = props;
  const fastest = {};
  const times = [];
  let lapCount = 0,
    circuitLength = 0,
    raceLength = 0;
  let loadedRace = false;

  laps.race && laps.race.Timings && (loadedRace = true);

  if (props.track) {
    lapCount = Number(props.track.Laps);
    circuitLength = props.track["Circuit length"];
    raceLength = props.track["Race length"];
  }

  if (loadedRace) {
    laps.race.Timings.forEach((x, i) => {
      const timeStr = x.time;
      const min = Number(timeStr.split(":")[0]);
      const [sec, milli] = timeStr.split(":")[1].split(".");
      const totalMillis = min * 60 * 1000 + Number(sec) * 1000 + Number(milli);
      times.push({ driver: x.driverId, totalMillis });
      if (!fastest.totalMillis || fastest.totalMillis > totalMillis) {
        fastest.totalMillis = totalMillis;
        fastest.i = i;
        fastest.time = timeStr;
        fastest.driver = x.driverId;
      }
    });
  }

  return (
    <div className="mapLeft">
      {loadedRace && (
        <div>
          <div>
            <button
              className="circuitButton btn btn-info btn-sm"
              onClick={props.showInfo}
            >
              {props.showCircuitInfo
                ? "Show circuit info"
                : "Hide circuit info"}
            </button>
            <div className={props.showCircuitInfo ? "hidden" : "marginTop"}>
              <p>Circuit length - {circuitLength}</p>
              <p>Total laps - {lapCount}</p>
              <p>Total race length - {raceLength}</p>
            </div>
            <p className="marginTop">
              <span className={"fastest"}>Fastest</span> lap - {fastest.time}
            </p>
            <select
              name="lap"
              className="form-select form-select-sm"
              onChange={handleLap}
            >
              {Array(lapCount)
                .fill(0)
                .map((_, i) => {
                  return (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
            </select>
            <br />
          </div>
          <div className={"container"}>
            <ol>
              {laps.race.Timings.map((x, i) => {
                return (
                  <li
                    key={Number(x.position)}
                    className={i === fastest.i ? "fastest" : undefined}
                  >
                    {x.driverId}
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};

function getStateFromProps(state) {
  return {
    races: state.races,
    latest: state.latest,
    laps: state.laps.race,
    track: state.track,
  };
}

function getDispatchFromProps(dispatch) {
  return {
    getLatest: () => dispatch(getLatestRace()),
    getAllFromYear: (year = 2022) => dispatch(getAllRaces(year)),
    getRace: (year, round, name, lap = 1) =>
      dispatch(getRaceLaps(year, round, name, lap)),
    getWiki: (slug) => dispatch(getWiki(slug)),
  };
}

export default connect(getStateFromProps, getDispatchFromProps)(Racers);
