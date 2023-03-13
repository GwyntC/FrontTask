import {SUCCESS_RECEIVE_PRODUCT, RECEIVE_PRODUCT} from "../../../app/constants/actionTypes";

const initialState={
availableItems:{
    name:'как+выучить+js'
}
}

export default (state=initialState,action)=>{
    switch (action.type){
        case RECEIVE_PRODUCT:
        case SUCCESS_RECEIVE_PRODUCT:
            return{
                ...state,
                availableItems: action.payload,
            }
        default:
            return state;

    }
}