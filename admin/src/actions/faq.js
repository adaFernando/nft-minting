import api from '../utils/api';
import {
    GET_FAQS,
    CREATE_NEW_FAQ,
    SET_CREATESUCCESS_DEFAULT,
    CREATE_NEW_FAQ_SUCCESS,
    CREATE_NEW_FAQ_FAILED,
    UPDATE_FAQ_SUCCESS,
    SET_UPDATESUCCESS_DEFAULT
} from '../types';


export const createNewFaq = (data) => async (dispatch) => {
    try {
     dispatch({
      type: SET_CREATESUCCESS_DEFAULT
     }) 
     console.log("data---------------[", data)
      const res = await api.post('/faq', data);
      if(res.data.question){
        dispatch({
          type: CREATE_NEW_FAQ,
          payload: res.data
        });
        dispatch({
          type: CREATE_NEW_FAQ_SUCCESS
        })
      }
      else dispatch({
        type: CREATE_NEW_FAQ_FAILED
      })
    } catch (err) {
      dispatch({
        type: CREATE_NEW_FAQ_FAILED
      })
    }
  };

  export const getFaqs = () => async (dispatch) => {
    try {
        const res = await api.get('/faq');
        if(res.data.status == 'success') {
            console.log("res.data.faqs", res.data.faqs)
            dispatch({
                type: GET_FAQS,
                payload: res.data.faqs
            });
        }
    } catch (error) {
        
    }
  }

  export const updateFaq = (id, question, answer) => async (dispatch) => {
    try {

      console.log("question", question)
      dispatch({
        type: SET_UPDATESUCCESS_DEFAULT
      })
      const res = await api.put(`/faq/${id}`, {question, answer});
      
      console.log("res", res.data)
      if(res.data.status == "Success"){
        dispatch({
          type: UPDATE_FAQ_SUCCESS
        })
      }
      // dispatch({
      //   type: GET_POST,
      //   payload: res.data
      // });
    } catch (err) {
      // dispatch({
      //   type: POST_ERROR,
      //   payload: { msg: err.response.statusText, status: err.response.status }
      // });
    }
  };