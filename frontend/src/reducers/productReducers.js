import {
    All_PRODUCT_REQUEST,
    All_PRODUCT_SUCCESS,
    All_PRODUCT_FAIL,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,
    CLEAR_ERRORS
} from '../constants/productConstants';

export const productsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case All_PRODUCT_REQUEST:
            return {
                loading: true,
                products: []
            }
        case All_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
                resPerPage: action.payload.resPerPage
            }
        case All_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload,

            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null

            }
        default:
            return state;
    }
}
export const productDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {

        case PRODUCT_DETAIL_REQUEST:
            return {
                ...state,
                loading: true
            }

        case PRODUCT_DETAIL_SUCCESS:
            return {
                loading: false,
                product: action.payload
            }

        case PRODUCT_DETAIL_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}
