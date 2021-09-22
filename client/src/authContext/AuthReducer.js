const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      console.log('context LOGIN_START');
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case 'LOGIN_SUCCESS':
      console.log('context LOGIN_SUCCESS');
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case 'LOGIN_FAILURE':
      console.log('context LOGIN_FAILURE');
      return {
        user: null,
        isFetching: false,
        error: true,
      };
    case 'LOGOUT':
      console.log('context LOGIN_LOGOUT');
      return {
        user: null,
        isFetching: false,
        error: false,
      };
    default:
      return { ...state };
  }
};

export default AuthReducer;
