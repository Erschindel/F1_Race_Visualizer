import React from 'react';
import { getLatestRace, getAllRaces, getRaceLaps } from '../store/allRaces';
import { connect } from 'react-redux';
import RaceMap from './RaceMap';

class Races extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: '',
      raceRound: '',
      raceName: '',
      lap: '',
    };
    this.handleYear = this.handleYear.bind(this);
    this.handleRace = this.handleRace.bind(this);
    this.handleLap = this.handleLap.bind(this);
  }
  componentDidMount() {
    this.props.getAllFromYear();
    this.props.getLatest();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.races !== this.props.races) {
      this.setState({
        year: this.props.races[0].season || '',
        raceRound: this.props.laps.number || '',
      });
    }
  }
  handleYear(e) {
    e.preventDefault();
    this.setState({
      year: e.target.value,
      raceRound: '-- select race --',
    });
    this.props.getAllFromYear(e.target.value);
  }
  handleRace(e) {
    e.preventDefault();
    console.log();
    this.setState({
      raceRound: e.target.value,
      raceName: e.target.children[e.target.value].innerText,
    });
    if (e.target.value !== '-- select race --') {
      this.props.getRace(
        this.state.year,
        e.target.value,
        e.target.children[e.target.value].innerText
      );
    }
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
    const { races, latest, laps } = this.props;
    const { year, raceRound } = this.state;
    console.log(laps);
    console.log('props:', this.props);
    // console.log('state:', this.state);
    return (
      <div className="container">
        <h1>{latest.raceName}</h1>
        {/* <h1>{allRaces[0].season}</h1> */}
        <select name="year" id="" onChange={this.handleYear} value={year}>
          {/* <option value="none">(select year)</option> */}
          {Array(9)
            .fill(0)
            .map((_, i) => {
              return (
                <option key={i} value={String(i + 2014)}>
                  {i + 2014}
                </option>
              );
            })}
        </select>
        <select name="race" id="" onChange={this.handleRace} value={raceRound}>
          <option value={null}>-- select race --</option>
          {races.map((x, i) => {
            return (
              <option key={i} value={i + 1}>
                {x.raceName}
              </option>
            );
          })}
        </select>

        {laps.race && this.state.raceRound !== '-- select race --' && (
          <div>
            <select name="lap" id="" onChange={this.handleLap}>
              {Array(10)
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
            <br />
            <RaceMap race={laps.race} handleLap={this.handleLap} />
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
    laps: state.laps,
    // shape: state.laps.shape,
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
