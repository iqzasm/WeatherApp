import { ActionType } from '../action-types';
import { Action } from '../actions';

const cities = (state: string[] = [], action: Action): string[] => {
  switch (action.type) {
    case ActionType.ADD_CITY:
      return action.payload ? [...state, action.payload] : state;
    case ActionType.DELETE_CITY:
      return state.filter(city => city !== action.payload);
    case ActionType.SET_CITIES:
      if (action.payload && Array.isArray(action.payload)) {
        return action.payload;
      }

      return state;
    default:
      return state;
  }
};

export default cities;
