import  Axios  from "axios";
import { CUSTOMER_ACTIVITY_DATA_FAIL, CUSTOMER_ACTIVITY_DATA_REQUEST, CUSTOMER_ACTIVITY_DATA_SUCCESS } from "../constants/customerActivityDataConstants";


export const listCustomerActivityData =()=> async (dispatch) => {
    dispatch({
        type: CUSTOMER_ACTIVITY_DATA_REQUEST
    });

    try{
        const {data} = await Axios.get("https://inventools.herokuapp.com/api/customerActivityData");
        dispatch({type: CUSTOMER_ACTIVITY_DATA_SUCCESS, payload: data});
    }
    catch(error){
        dispatch({type: CUSTOMER_ACTIVITY_DATA_FAIL, payload: error.message  })

    }
};