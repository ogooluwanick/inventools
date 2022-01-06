const { 
    CUSTOMER_ACTIVITY_DATA_FAIL, 
    CUSTOMER_ACTIVITY_DATA_REQUEST, 
    CUSTOMER_ACTIVITY_DATA_SUCCESS } =require("../constants/customerActivityDataConstants");



export const customerActivityDataReducer =(state = {
    loading: true,
    customersActivityData: []}, 
    action
    ) =>{
        switch(action.type){
            case CUSTOMER_ACTIVITY_DATA_REQUEST:
                return {loading: true};
            case CUSTOMER_ACTIVITY_DATA_SUCCESS:
                return {loading: false, customersActivityData: action.payload};
            case CUSTOMER_ACTIVITY_DATA_FAIL:
                return {loading: false, error: action.payload};
            default:
                return state;
        }
    
    };
