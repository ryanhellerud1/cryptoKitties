import {GET_KITTY} from './actionCreators';

const initialState = {
  kitty: null
}
export default function rootReducer(state= initialState, action){
  switch(action.type){
    case GET_KITTY:
    console.log('dispatch kity')
      let newState = {kitty: action.kitty, ...state}
      return {...newState}
    default:
      return state;
  }
}
