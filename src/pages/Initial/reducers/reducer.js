import {RECEIVE_PRODUCTS, SUCCESS_RECEIVE_PRODUCTS} from "../../../app/constants/actionTypes";

const initialState = {

  availableItems: [
    'как+выучить+js',
    'somePath',
    'Картина',
    'anotherPath',
  ],
};

export default (state = initialState,action)=>{// {type, payload}) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
    case SUCCESS_RECEIVE_PRODUCTS:
      console.log("success case",action.payload);
      return {
        ...state,
      }
    default: {
    //  console.log("help");
      return state;
    }
  }
}
