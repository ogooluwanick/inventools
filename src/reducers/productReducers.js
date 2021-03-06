import { 
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS } from "../constants/productConstants";


export const productListReducer =(state = {
    loading: true,
    products: []}, 
    action
    ) =>{
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return {loading: true};
        case PRODUCT_LIST_SUCCESS:
            return {loading: false, products: action.payload};
        case PRODUCT_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }

};

export const productDetailsReducer =(state = {
    loading: true,
    products: []}, 
    action
    ) =>{
        switch(action.type){
            case PRODUCT_DETAILS_REQUEST:
                return {loading: true};
            case PRODUCT_DETAILS_SUCCESS:
                return {loading: false, products: action.payload};
            case PRODUCT_DETAILS_FAIL:
                return {loading: false, error: action.payload};
            default:
                return state;
        }
        
    };

    export const productCreateReducer=(state={},action)=>{
        switch(action.type)
        {
            case PRODUCT_CREATE_REQUEST:
                return {loading:true};
            case PRODUCT_CREATE_SUCCESS:
                return {loading:false, productInfo:action.payload};
            case PRODUCT_CREATE_FAIL:
                return {loading:false , error:action.payload}
            default:
                return state;
        }
    }
    