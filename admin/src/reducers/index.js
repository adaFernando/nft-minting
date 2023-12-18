import { combineReducers } from 'redux';

import miningServerReducer from './miningServer';
import faqReducer from './faq';
export default combineReducers({
    miningServerReducer,
    faqReducer,
});
