import  Axios  from "axios";
import { 
    CUSTOMER_DETAILS_FAIL,
    CUSTOMER_DETAILS_REQUEST,
    CUSTOMER_DETAILS_SUCCESS,
    CUSTOMER_LIST_FAIL, 
    CUSTOMER_LIST_REQUEST, 
    CUSTOMER_LIST_SUCCESS } from "../constants/customerConstants"

export const listCustomers =()=> async (dispatch) => {
    dispatch({
        type: CUSTOMER_LIST_REQUEST
    });

    try{
        const {data} = await Axios.get("/api/customers");
        dispatch({type: CUSTOMER_LIST_SUCCESS, payload: data});
    }
    catch(error){
        dispatch({type: CUSTOMER_LIST_FAIL, payload: error.message  })

    }
};

export const detailsCustomers =(customersID)=> async (dispatch) => { 
    dispatch({
        type: CUSTOMER_DETAILS_REQUEST, payload: customersID
    });

    try{
        const {data} = await Axios.get(`/api/customers/${customersID}`);
        dispatch({type: CUSTOMER_DETAILS_SUCCESS, payload: data});
    }
    catch(error){
        dispatch({
            type: CUSTOMER_DETAILS_FAIL,
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message, 
      })
    }
}


