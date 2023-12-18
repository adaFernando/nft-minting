import {
    GET_FAQS,
    CREATE_NEW_FAQ,
    CREATE_NEW_FAQ_SUCCESS,
    SET_CREATESUCCESS_DEFAULT,
    CREATE_NEW_FAQ_FAILED,
    UPDATE_FAQ_SUCCESS,
    SET_UPDATESUCCESS_DEFAULT
} from '../types';
  
  const initialState = {
    loading: true,
    newFap: {},
    faqs: [],
    error: {},
    createSuccess: 2,
    updateSuccess: 2
  };
  
  function faqReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
      case GET_FAQS:
        return {
          ...state,
          faqs: payload,
          loading: false
        };
      case CREATE_NEW_FAQ: 
         return {
            ...state,
            newFap: payload,
            faqs: [payload, ...state.faqs], 
         }
      case CREATE_NEW_FAQ_SUCCESS:
        return {
          ...state,
          createSuccess: 1
        }
      case SET_CREATESUCCESS_DEFAULT: 
        return {
          ...state,
          createSuccess: 2
        } 
      case CREATE_NEW_FAQ_FAILED: 
        return {
          ...state,
          createSuccess: false
        }
      case UPDATE_FAQ_SUCCESS:
        return {
          ...state,
          updateSuccess: 1
        }
      case SET_UPDATESUCCESS_DEFAULT:
        return {
          ...state,
          updateSuccess: 2
        }
      default:
        return state;
    }
  }
  
  export default faqReducer;
  