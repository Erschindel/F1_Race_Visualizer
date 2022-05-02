import axios from "axios";

const GET_RACES_FROM_YEAR = "GET_RACES_FROM_YEAR";
const GET_MOST_RECENT = "GET_MOST_RECENT";
const GET_LAPS = "GET_LAPS";

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

const getLaps = (laps) => {
  return {
    type: GET_LAPS,
    laps,
  };
};

export const getLatestRace = () => {
  return async (dispatch) => {
    try {
      const external = await axios.get(
        "https://ergast.com/api/f1/current/last/results.json"
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
      const external = await axios.get(
        `https://ergast.com/api/f1/${year}.json`
      );
      dispatch(getAllFromYear(external.data.MRData.RaceTable.Races));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getRaceLaps = (year, round, name, lap) => {
  return async (dispatch) => {
    try {
      // get data from ergast
      // if that works, get data from my server
      const external = await axios.get(
        `https://ergast.com/api/f1/${year}/${round}/laps/${lap}.json`
      );
      const slug = name.replace(/\s/g, "_");
      const internal = await axios.get(`/api/tracks/${slug}`);
      external.data.MRData.RaceTable.Races[0]
        ? dispatch(
            getLaps({
              race: external.data.MRData.RaceTable.Races[0].Laps[0],
              shape: internal.data.shape,
            })
          )
        : dispatch(
            getLaps({
              race: external.data.MRData.RaceTable.Races,
              shape: internal.data.shape,
            })
          ); // conditional in case selected race hasn't occurred yet (empty array)
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = {
  races: [],
  latest: {},
  laps: {
    race: {},
    shape: "",
  },
};

const raceReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RACES_FROM_YEAR:
      return { ...state, races: action.races };
    case GET_MOST_RECENT:
      return { ...state, latest: action.race };
    case GET_LAPS:
      return { ...state, laps: { race: action.laps, shape: action.shape } };
    default:
      return state;
  }
};

export default raceReducer;
