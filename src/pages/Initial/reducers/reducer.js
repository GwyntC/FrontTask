import {RECEIVE_PRODUCTS, SUCCESS_RECEIVE_PRODUCTS} from "../../../app/constants/actionTypes";

const initialState = {

  availableItems: [
    'как+выучить+js',
    'somePath',
    'Картина',
  ],
};

export default (state = initialState,action)=>{// {type, payload}) => {//problems array of objects
  switch (action.type) {
    case RECEIVE_PRODUCTS:
    case SUCCESS_RECEIVE_PRODUCTS:
      console.log("success case",action.payload);
      return {
        ...state,
        availableItems: action.payload,
      }
    default: {
      console.log("default");
      return state;
    }
  }
}
