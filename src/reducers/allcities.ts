import { ActionType, ICity } from '../action-types';
import { Action } from '../actions';

const allCities = (state: ICity[] = [], action: Action): ICity[] => {
  switch (action.type) {
    case ActionType.SET_ALL_CITIES:
      if (action.payload && Array.isArray(action.payload)) {
        return action.payload;
      }

      return state;
    default:
      return state;
  }
};

export default allCities;
