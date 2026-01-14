import { createStore, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'

const initialState = {
  noteDetails: {
    data: {},
    loading: false
  }
}
function counterReducer(state = initialState, action) {
    // 逻辑处理
    switch (action.type) {
        case 'FETCH_NOTE_DETAILS_SUCCESS':
          return {...state, noteDetails: { data: action.payload, loading: false }};
        case 'START_FETCH_NOTE_DETAILS':
          return {...state, noteDetails: { data: [], loading: true }};
        default:
          return state;
      }
      
  }

 const store = createStore(counterReducer, applyMiddleware(thunk));
 export default store