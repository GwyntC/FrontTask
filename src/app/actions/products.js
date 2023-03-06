import config from "../../config";
import {deleteJson, getJson} from "../../requests";
import {getToken} from "../../token";
import {
    ERROR_RECEIVE_PRODUCTS, ERROR_SIGN_UP,
    RECEIVE_PRODUCTS,
    REQUEST_PRODUCTS, SUCCESS_RECEIVE_PRODUCTS, SUCCESS_SIGN_UP
} from "../constants/actionTypes";

const errorReceiveProducts = () => ({
    type: ERROR_RECEIVE_PRODUCTS,
});

const getProducts = () => {
    const {
        BASE_URL,
        PRODUCTS_SERVICE,
    } = config;
  //  let res=getJson({
    //    url: `${BASE_URL}${PRODUCTS_SERVICE}/math/examples/count/2`});
   // console.log(res);
    return getJson({
        url: `${BASE_URL}${PRODUCTS_SERVICE}/api/products/get/`, //check correct url

    }).catch(() => {
       // console.log("ERROR GET");
        const storage=['ERROR GET'];
        return storage;
    });
};
const receiveProducts = (products) => ({
    type: RECEIVE_PRODUCTS,
    payload: products,
});

const requestProducts = () => ({
    type: REQUEST_PRODUCTS,
});

export const fetchProducts = () => (dispatch) => {
   // console.log("I m here")
    //if (getToken()) {
    dispatch(requestProducts());
   // console.log(getProducts());
    return getProducts({
        dispatch,
    }).then(products => dispatch(successReturn(products)))
        .catch(() => dispatch(errorProducts()));
    // }
}
export const deleteProduct=(id)=>(dispatch)=>{//add reload option
    return  delProduct({
            dispatch,
            id,}
    ).then(dispatch(fetchProducts()))
        .catch(() => dispatch(errorProducts()));
}
const delProduct=(id)=>{
    const {
        BASE_URL,
        PRODUCTS_SERVICE,
    } = config;
    const identifier=id;
    return deleteJson({
        url: `${BASE_URL}${PRODUCTS_SERVICE}/api/products/delete`,
        params: identifier,//check correct url
    }).catch(() => {
        // console.log("ERROR GET");
        const storage=['ERROR GET'];
        return storage;
    });
};
const errorProducts = errors => ({
    payload: errors,
    type: ERROR_RECEIVE_PRODUCTS,
});
const successReturn = (products) => ({
    type: SUCCESS_RECEIVE_PRODUCTS,
    payload: products,
});