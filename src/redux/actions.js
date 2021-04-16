export const ADD_WEATHER = 'ADD_WEATHER';
export const DELETE_WEATHER = 'DELETE_WEATHER';

export function createAddWeather(weather) {
  return {
    type: ADD_WEATHER,
    weather,
  };
}

export function createDeleteWeather(city) {
  return {
    type: DELETE_WEATHER,
    city,
  };
}

export const SET_LOADING = 'SET_LOADING';

export function setLoading(value) {
  return {
    type: SET_LOADING,
    value,
  };
}

export const SET_DATA = 'SET_DATA';

export function setData(data) {
        return {
            type: SET_DATA,
            data: data
        }

    }

