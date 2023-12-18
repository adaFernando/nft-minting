import {
    LOAD_MININSERVERS
} from '../types';
  
  const initialState = {
    loading: true,
    miningServers: [],
    error: {}
  };
  
  function miningServerReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case LOAD_MININSERVERS:
        return {
          ...state,
          miningServers: payload,
          loading: false
        };
      default:
        return state;
    }
  }
  
  export default miningServerReducer;
  