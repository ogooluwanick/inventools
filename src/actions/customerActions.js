import  Axios  from "axios";
import { 
    CUSTOMER_CREATE_FAIL,
    CUSTOMER_CREATE_REQUEST,
    CUSTOMER_CREATE_SUCCESS,
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
        const {data} = await Axios.get("https://inventools.herokuapp.com/api/customers");
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
        const {data} = await Axios.get(`https://inventools.herokuapp.com/api/customers/${customersID}`);
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

export const createCustomer=(USERNAME,FullName,EMAIL,Phone_No,DOB,Address,Company,Position)=> async(dispatch)=>{
    dispatch ({type:CUSTOMER_CREATE_REQUEST, payload:{USERNAME,FullName,EMAIL,Phone_No,DOB,Address,Company,Position}})
    try {
        const {data}= await Axios.post("https://inventools.herokuapp.com/api/customers/newCustomer",{USERNAME,FullName,EMAIL,Phone_No,DOB,Address,Company,Position})
        dispatch({type:CUSTOMER_CREATE_SUCCESS, payload: data})
    

        localStorage.setItem("customerInfo",JSON.stringify(data))
    }
    catch(error){
        dispatch({type:CUSTOMER_CREATE_FAIL,
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message, })
    }
};



