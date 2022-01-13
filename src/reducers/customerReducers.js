const { CUSTOMER_LIST_FAIL, CUSTOMER_LIST_REQUEST, CUSTOMER_LIST_SUCCESS, CUSTOMER_DETAILS_REQUEST, CUSTOMER_DETAILS_SUCCESS, CUSTOMER_DETAILS_FAIL, CUSTOMER_CREATE_REQUEST, CUSTOMER_CREATE_SUCCESS, CUSTOMER_CREATE_FAIL } =require("../constants/customerConstants");

export const customerListReducer =(state = {
    loading: true,
    customers: []}, 
    action
    ) =>{
        switch(action.type){
            case CUSTOMER_LIST_REQUEST:
                return {loading: true};
            case CUSTOMER_LIST_SUCCESS:
                return {loading: false, customers: action.payload};
            case CUSTOMER_LIST_FAIL:
                return {loading: false, error: action.payload};
            default:
                return state;
        }
    
    };


export const customerDetailsReducer =(state = {
    loading: true,
    customers: []}, 
    action
    ) =>{
        switch(action.type){
            case CUSTOMER_DETAILS_REQUEST:
                return {loading: true};
            case CUSTOMER_DETAILS_SUCCESS:
                return {loading: false, customers: action.payload};
            case CUSTOMER_DETAILS_FAIL:
                return {loading: false, error: action.payload};
            default:
                return state;
        }
        
    };

    export const customerCreateReducer=(state={},action)=>{
        switch(action.type)
        {
            case CUSTOMER_CREATE_REQUEST:
                return {loading:true};
            case CUSTOMER_CREATE_SUCCESS:
                return {loading:false, customerInfo:action.payload};
            case CUSTOMER_CREATE_FAIL:
                return {loading:false , error:action.payload}
            default:
                return state;
        }
    }
    

