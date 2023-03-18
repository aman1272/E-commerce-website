import axios from 'axios'
import {
    All_PRODUCT_REQUEST,
    All_PRODUCT_SUCCESS,
    All_PRODUCT_FAIL,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,
    CLEAR_ERRORS
} from '../constants/productConstants';


export const getProducts = (keyword = '', currentPage = 1) => async (dispatch) => {
    try {
        dispatch({ type: All_PRODUCT_REQUEST });
        const { data } = await axios.get(`/api/v1/products?keyword=${keyword}&page=${currentPage}`);
        dispatch({
            type: All_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: All_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAIL_REQUEST });
        const { data } = await axios.get(`/api/v1/product/${id}`);
        dispatch({
            type: PRODUCT_DETAIL_SUCCESS,
            payload: data.product
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAIL_FAIL,
            payload: error.response.data.message
        })
    }
}
//Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}