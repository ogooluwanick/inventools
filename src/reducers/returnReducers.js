const { RETURN_LIST_FAIL, RETURN_LIST_REQUEST, RETURN_LIST_SUCCESS, RETURN_DETAILS_REQUEST, RETURN_DETAILS_SUCCESS, RETURN_DETAILS_FAIL, RETURN_CREATE_REQUEST, RETURN_CREATE_SUCCESS, RETURN_CREATE_FAIL } =require("../constants/returnConstants");

export const returnListReducer =(state = {
    loading: true,
    returns: []}, 
    action
    ) =>{
        switch(action.type){
            case RETURN_LIST_REQUEST:
                return {loading: true};
            case RETURN_LIST_SUCCESS:
                return {loading: false, returns: action.payload};
            case RETURN_LIST_FAIL:
                return {loading: false, error: action.payload};
            default:
                return state;
        }
    
    };


export const returnDetailsReducer =(state = {
    loading: true,
    returns: []}, 
    action
    ) =>{
        switch(action.type){
            case RETURN_DETAILS_REQUEST:
                return {loading: true};
            case RETURN_DETAILS_SUCCESS:
                return {loading: false, returns: action.payload};
            case RETURN_DETAILS_FAIL:
                return {loading: false, error: action.payload};
            default:
                return state;
        }
        
    };

    export const returnCreateReducer=(state={},action)=>{
        switch(action.type)
        {
            case RETURN_CREATE_REQUEST:
                return {loading:true};
            case RETURN_CREATE_SUCCESS:
                return {loading:false, returnInfo:action.payload};
            case RETURN_CREATE_FAIL:
                return {loading:false , error:action.payload}
            default:
                return state;
        }
    }