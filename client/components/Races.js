import React from "react";
import { getLatestRace, getAllRaces, getRaceLaps } from "../store/allRaces";
import { connect } from "react-redux";
import D3_view from "./D3_view";
import Racers from "./Racers";

class Races extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: "",
      raceRound: "",
      raceName: "",
      lap: "",
    };
    this.handleYear = this.handleYear.bind(this);
    this.handleRace = this.handleRace.bind(this);
    this.handleLap = this.handleLap.bind(this);
    this.reset = this.reset.bind(this);
  }
  componentDidMount() {
    this.reset();
    this.props.getAllFromYear();
    this.props.getLatest();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.races !== this.props.races) {
      this.setState({
        year: this.props.races[0].season || "",
        raceRound: this.props.laps.number || "",
      });
    }
  }
  handleYear(e) {
    e.preventDefault();
    this.setState({
      year: e.target.value,
      raceRound: "-- select race --",
    });
    this.props.getAllFromYear(e.target.value);
  }
  handleRace(e) {
    e.preventDefault();
    const inner = e.target.children[e.target.value];
    this.setState({
      raceRound: e.target.value,
      raceName: inner ? inner.innerText : "-- select race --",
    });
    if (e.target.value === "-- select race --") {
      this.reset();
    } else {
      this.props.getRace(
        this.state.year,
        e.target.value,
        e.target.children[e.target.value].innerText
      );
    }
  }
  reset() {
    this.setState({
      raceRound: "",
      raceName: "",
      lap: "",
    });
  }
  handleLap(e) {
    e.preventDefault();
    this.setState({
      lap: e.target.value,
    });
    this.props.getRace(
      this.state.year,
      this.state.raceRound,
      this.state.raceName,
      e.target.value
    );
  }
  render() {
    const { races, latest } = this.props;
    const { year, raceRound } = this.state;

    return (
      <div className="container">
        <h1>neeEEEAAAaaaawrwrww</h1>
        <br />
        <select
          name="year"
          id=""
          className="form-select form-select-lg mb-3"
          onChange={this.handleYear}
          value={year}
        >
          {Array(9)
            .fill(0)
            .map((_, i) => {
              return (
                <option key={i} value={String(2022 - i)}>
                  {2022 - i}
                </option>
              );
            })}
        </select>
        <select
          name="race"
          id=""
          className="form-select form-select-lg mb-3"
          onChange={this.handleRace}
          value={raceRound}
        >
          <option value={null}>-- select race --</option>
          {races.map((x, i) => {
            return (
              <option key={i} value={i + 1}>
                {x.raceName}
              </option>
            );
          })}
        </select>
        <br />
        {this.state.raceRound !== "" && (
          <section className="mapBox">
            <Racers handleLap={this.handleLap} />
            <D3_view />
          </section>
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

export default connect(getStateFromProps, getDispatchFromProps)(Races);
