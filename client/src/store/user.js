// ACTIONS

const GET_USER = 'GET_USER';
const SET_FETCHING_STATUS = 'SET_FETCHING_STATUS';
const SET_USER_ERROR_NULL = 'SET_USER_ERROR_NULL';

// ACTION CREATORS

export const gotUser = user => {
  return {
    type: GET_USER,
    user,
  };
};

export const setFetchingStatus = isFetching => ({
  type: SET_FETCHING_STATUS,
  isFetching,
});

export const setUserErrorNull = () => ({
  type: SET_USER_ERROR_NULL,
});

// REDUCER

const reducer = (state = { isFetching: true }, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case SET_FETCHING_STATUS:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case SET_USER_ERROR_NULL:
      return { ...state, error: null };
    default:
      return state;
  }
};

export default reducer;
