import  Axios  from "axios";
import { 
    VENDOR_DETAILS_FAIL,
    VENDOR_DETAILS_REQUEST,
    VENDOR_DETAILS_SUCCESS,
    VENDOR_LIST_FAIL, 
    VENDOR_LIST_REQUEST, 
    VENDOR_LIST_SUCCESS } from "../constants/vendorConstants"

export const listVendors =()=> async (dispatch) => {
    dispatch({
        type: VENDOR_LIST_REQUEST
    });

    try{
        const {data} = await Axios.get("/api/vendors");
        dispatch({type: VENDOR_LIST_SUCCESS, payload: data});
    }
    catch(error){
        dispatch({type: VENDOR_LIST_FAIL, payload: error.message  })

    }
};

export const detailsVendors =(vendorsID)=> async (dispatch) => { 
    dispatch({
        type: VENDOR_DETAILS_REQUEST, payload: vendorsID
    });

    try{
        const {data} = await Axios.get(`/api/vendors/${vendorsID}`);
        dispatch({type: VENDOR_DETAILS_SUCCESS, payload: data});
    }
    catch(error){
        dispatch({
            type: VENDOR_DETAILS_FAIL,
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message, 
      })
    }
}


