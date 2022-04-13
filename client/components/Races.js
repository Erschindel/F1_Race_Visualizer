import React from 'react';
import { getLatestRace, getAllRaces, getSpecificRace } from '../store/allRaces';
import { connect } from 'react-redux';
import RaceMap from './RaceMap';

class Races extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: 2022,
      raceRound: 1,
      lap: '',
    };
    this.handleYear = this.handleYear.bind(this);
    this.handleRace = this.handleRace.bind(this);
  }
  componentDidMount() {
    this.props.getAllFromYear(2022);
    this.props.getLatest();
  }
  handleYear(e) {
    e.preventDefault();
    this.setState({
      year: e.target.value,
    });
    this.props.getAllFromYear(this.state.year);
  }
  handleRace(e) {
    e.preventDefault();
    this.setState({
      raceRound: e.target.value,
    });
    this.props.getRace(this.state.year, this.state.raceRound);
  }
  render() {
    const { races, latest, specific } = this.props;
    // console.log(this.props);
    return (
      <div className="container">
        {/* current race info, default to most recent available */}
        <h1>{latest.raceName}</h1>
        {/* <h1>{allRaces[0].season}</h1> */}
        <select name="year" id="" onChange={this.handleYear}>
          {/* <option value="none">none</option> */}
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2010">2010</option>
        </select>
        <select name="race" id="" onChange={this.handleRace}>
          {races.map((x, i) => {
            return (
              <option key={i} value={i + 1}>
                {x.raceName}
              </option>
            );
          })}
        </select>
        <br />
        {specific.Timings && <RaceMap />}
      </div>
    );
  }
}

function getStateFromProps(state) {
  return {
    races: state.races,
    latest: state.latest,
    specific: state.current,
  };
}

function getDispatchFromProps(dispatch) {
  return {
    getLatest: () => dispatch(getLatestRace()),
    getAllFromYear: (year = 2022) => dispatch(getAllRaces(year)),
    getRace: (year, round, lap = 1) =>
      dispatch(getSpecificRace(year, round, lap)),
  };
}

export default connect(getStateFromProps, getDispatchFromProps)(Races);
