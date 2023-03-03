import config from "../../config";
import {getJson} from "../../requests";
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
        url: `${BASE_URL}${PRODUCTS_SERVICE}/math/examples/count/2`, //check correct url
    }).catch(() => {
        console.log("ERROR GET");
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
const errorProducts = errors => ({
    payload: errors,
    type: ERROR_RECEIVE_PRODUCTS,
});
const successReturn = (products) => ({
    type: SUCCESS_RECEIVE_PRODUCTS,
    payload: products,
});