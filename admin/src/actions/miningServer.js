import api from '../utils/api';
import {
    LOAD_MININSERVERS
} from '../types';


export const loadMiningServers = () => async (dispatch) => {
    try {
      const res = await api.get('/miningserver');
      console.log('/miningserver-------------', res.data)
      dispatch({
        type: LOAD_MININSERVERS,
        payload: res.data
      });
    } catch (err) {
    //   dispatch({
    //     type: AUTH_ERROR
    //   });
    }
  };