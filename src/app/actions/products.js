import config from "../../config";
import {deleteJson, getJson, postJson, putJson} from "../../requests";
import {
    ERROR_RECEIVE_PRODUCT,
    ERROR_RECEIVE_PRODUCTS, ERROR_SIGN_UP,
    RECEIVE_PRODUCTS,
    REQUEST_PRODUCTS, SUCCESS_RECEIVE_PRODUCT, SUCCESS_RECEIVE_PRODUCTS, SUCCESS_SIGN_UP
} from "../constants/actionTypes";

const errorReceiveProducts = () => ({
    type: ERROR_RECEIVE_PRODUCTS,
});

const getProducts = () => {
    const {
        BASE_URL,
        PRODUCTS_SERVICE,
    } = config;

    return getJson({
        url: `${BASE_URL}${PRODUCTS_SERVICE}/api/products/get/`, //check correct url

    }).catch(() => {
        // console.log("ERROR GET");
        const storage = ['ERROR GET'];
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

const getProduct = (id) => {
    const {
        BASE_URL,
        PRODUCTS_SERVICE,
    } = config;
    return getJson({
        url: `${BASE_URL}${PRODUCTS_SERVICE}/api/products/get/`,
        params: id,
    }).catch(() => {
        const storage = ['ERROR GET'];
        return storage;
    });
};

export const fetchProduct = (id) => (dispatch) => {
    return getProduct({
        dispatch,
        id,
    }).then(product => dispatch(successReturnProduct(product)))
        .catch(() => dispatch(errorProduct()));
}

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
//change name and then action
export const deleteProduct = (id) => (dispatch) => {//add reload option
    return delProduct({
            dispatch,
            id,
        }
    ).then(dispatch(fetchProducts()))
        .catch(() => dispatch(errorProducts()));
}
const delProduct = (id) => {
    const {
        BASE_URL,
        PRODUCTS_SERVICE,
    } = config;
    const identifier = id;
    return deleteJson({
        url: `${BASE_URL}${PRODUCTS_SERVICE}/api/products/delete`,
        params: identifier,//check correct url
    }).catch(() => {
        // console.log("ERROR GET");
        const storage = ['ERROR DELETE'];
        return storage;
    });
};

export const fetchCreateProduct = (body) => (dispatch) => {//add reload and redux
    return createProduct({
            dispatch,
            body
        }
    ).then()
        .catch();
}
const createProduct = (body) => {
    const {
        BASE_URL,
        PRODUCTS_SERVICE,
    } = config;//add parameters
    return postJson({
        url: `${BASE_URL}${PRODUCTS_SERVICE}/api/products/create`,
        body,
    }).catch(() => {
        const storage = ['ERROR CREATE'];
        return storage;
    });
};

export const fetchUpdateProduct = ({//syntax importance!!!
                                       body,
                                       id,
                                   }) => (dispatch) => {
    return updateProduct({
        //   dispatch,
        body,
        id,
    }).then((response) => {
    })
        .catch();
}

const updateProduct = ({
                           body,
                           id
                       }) => {//need correct pass parameters
    const {
        BASE_URL,
        PRODUCTS_SERVICE
    } = config;
    return putJson({
        url: `${BASE_URL}${PRODUCTS_SERVICE}/api/products/update`,
        params: id,
        body,
    }).catch(() => {
        const storage = ['ERROR UPDATE'];
        return storage;
    })
}
const errorProducts = errors => ({
    payload: errors,
    type: ERROR_RECEIVE_PRODUCTS,
});
const successReturn = (products) => ({
    type: SUCCESS_RECEIVE_PRODUCTS,
    payload: products,
});

const successReturnProduct = (product) => ({
    type: SUCCESS_RECEIVE_PRODUCT,
    payload: product,
});
const errorProduct = errors => ({
    payload: errors,
    type: ERROR_RECEIVE_PRODUCT,
});
//adding success for product