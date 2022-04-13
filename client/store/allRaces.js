import axios from 'axios';

const GET_RACES_FROM_YEAR = 'GET_RACES_FROM_YEAR';
const GET_MOST_RECENT = 'GET_MOST_RECENT';
const GET_RACE = 'GET_RACE';

const getAllFromYear = (races) => {
  return {
    type: GET_RACES_FROM_YEAR,
    races,
  };
};

const getMostRecent = (race) => {
  return {
    type: GET_MOST_RECENT,
    race,
  };
};

const getRace = (race) => {
  return {
    type: GET_RACE,
    race,
  };
};

export const getLatestRace = () => {
  return async (dispatch) => {
    try {
      const external = await axios.get(
        'http://ergast.com/api/f1/current/last/results.json'
      );
      dispatch(getMostRecent(external.data.MRData.RaceTable.Races[0]));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllRaces = (year) => {
  return async (dispatch) => {
    try {
      const external = await axios.get(`http://ergast.com/api/f1/${year}.json`);
      dispatch(getAllFromYear(external.data.MRData.RaceTable.Races));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getSpecificRace = (year, round, lap) => {
  return async (dispatch) => {
    try {
      // get data from ergast
      // if that works, get data from my server
      const external = await axios.get(
        `http://ergast.com/api/f1/${year}/${round}/laps/${lap}.json`
      );
      // const internal = await axios.get('/api/races');
      external.data.MRData.RaceTable.Races[0].Laps
        ? dispatch(getRace(external.data.MRData.RaceTable.Races[0].Laps[0]))
        : dispatch(getRace(external.data.MRData.RaceTable.Races)); // selected race hasn't occurred yet (empty array)
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = {
  races: [],
  latest: {},
  current: {},
};

const raceReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RACES_FROM_YEAR:
      return { ...state, races: action.races };
    case GET_MOST_RECENT:
      return { ...state, latest: action.race };
    case GET_RACE:
      return { ...state, current: action.race };
    default:
      return state;
  }
};

export default raceReducer;
