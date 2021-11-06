const cities = (state = [], action) => {
  switch (action.type) {
    case 'ADD_CITY':
    case 'add_city':
      return action.payload ? [...state, action.payload] : state;
    case 'DELETE_CITY':
    case 'delete_city':
      return state.filter(city => city !== action.payload);
    case 'set_cities':
    case 'SET_CITIES':
      if (action.payload && action.payload.constructor.name === 'Array') {
        return action.payload;
      }

      return state;
    default:
      return state;
  }
};

export default cities;
