import { ADD_WEATHER, DELETE_WEATHER, SET_DATA, SET_LOADING } from "./actions";



export const weatherReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_WEATHER:
            return [...state, action.weather]
        case DELETE_WEATHER: 
            return state.filter((weather) => weather.city !== action.city)
        default:
            return state;
    }
}

export const loadingReducer = (state = false, action) => {
    switch (action.type) {
      case SET_LOADING:
        return action.value
  
      default:
        return state
    }
  }
  
  export function dataReducer(state = null, action) {
    switch(action.type) {
      case SET_DATA:
        return action.data
      default:
        return state;
    }
  }