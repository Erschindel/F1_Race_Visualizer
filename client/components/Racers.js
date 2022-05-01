import React from "react";
import { connect } from "react-redux";

class Racers extends React.Component {
  render() {
    const { laps } = this.props;
    const fastest = {};
    const times = [];
    let loadedRace = false;

    laps.race && laps.race.Timings && (loadedRace = true);

    if (loadedRace) {
      laps.race.Timings.forEach((x, i) => {
        const timeStr = x.time;
        const min = Number(timeStr.split(":")[0]);
        const [sec, milli] = timeStr.split(":")[1].split(".");
        const totalMillis =
          min * 60 * 1000 + Number(sec) * 1000 + Number(milli);
        times.push(totalMillis);
        if (!fastest.totalMillis || fastest.totalMillis > totalMillis) {
          fastest.totalMillis = totalMillis;
          fastest.i = i;
          fastest.time = timeStr;
        }
      });
    }
    return (
      <div>
        {loadedRace && (
          <div className={"container"}>
            <p>Fastest lap: {fastest.time}</p>
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
            <p>Number - race position</p>
            <p>
              <span className={"fastest"}>Green</span> - fastest lap
            </p>
          </div>
        )}
      </div>
    );
  }
}

function getStateFromProps(state) {
  return {
    races: state.races,
    latest: state.latest,
    laps: state.laps.race,
  };
}

function getDispatchFromProps(dispatch) {
  return {
    getLatest: () => dispatch(getLatestRace()),
    getAllFromYear: (year = 2022) => dispatch(getAllRaces(year)),
    getRace: (year, round, name, lap = 1) =>
      dispatch(getRaceLaps(year, round, name, lap)),
  };
}

export default connect(getStateFromProps, getDispatchFromProps)(Racers);
