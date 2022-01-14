import  Axios  from "axios";
import { 
    VENDOR_CREATE_FAIL,
    VENDOR_CREATE_REQUEST,
    VENDOR_CREATE_SUCCESS,
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
        const {data} = await Axios.get("https://inventools.herokuapp.com/api/vendors");
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
        const {data} = await Axios.get(`https://inventools.herokuapp.com/api/vendors/${vendorsID}`);
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


export const createVendor=(id,Primary_Contact,company_NAME,company_EMAIL,phone_No,Website,Shipping_Address,BILLING_Address,STATUS)=> async(dispatch)=>{
    dispatch ({type:VENDOR_CREATE_REQUEST, payload:{id,Primary_Contact,company_NAME,company_EMAIL,phone_No,Website,Shipping_Address,BILLING_Address,STATUS}})
    try {
        const {data}= await Axios.post("https://inventools.herokuapp.com/api/vendors/newVendor",{id ,Primary_Contact,company_NAME,company_EMAIL,phone_No,Website,Shipping_Address,BILLING_Address,STATUS})
        dispatch({type:VENDOR_CREATE_SUCCESS, payload: data})
    

        localStorage.setItem("vendorInfo",JSON.stringify(data))
    }
    catch(error){
        dispatch({type:VENDOR_CREATE_FAIL,
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message, })
    }
};


