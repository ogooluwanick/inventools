import  Axios  from "axios";
import { 
    TRANSACTION_LIST_FAIL,
    TRANSACTION_LIST_REQUEST,
    TRANSACTION_LIST_SUCCESS,
    TRANSACTION_DETAILS_FAIL,
    TRANSACTION_DETAILS_SUCCESS,
    TRANSACTION_DETAILS_REQUEST } from "../constants/transactionConstants"

export const listTransactions =()=> async (dispatch) => {
    dispatch({
        type:  TRANSACTION_LIST_REQUEST
    });

    try{
        const {data} = await Axios.get("/api/transactions");
        dispatch({type: TRANSACTION_LIST_SUCCESS, payload: data});
    }
    catch(error){
        dispatch({type:TRANSACTION_LIST_FAIL, payload: error.message  })

    }
}


export const detailsTransactions =(transactionsID)=> async (dispatch) => { 
    dispatch({
        type: TRANSACTION_DETAILS_REQUEST, payload: transactionsID
    });

    try{
        const {data} = await Axios.get(`/api/transactions/${transactionsID}`);
        dispatch({type: TRANSACTION_DETAILS_SUCCESS, payload: data});
    }
    catch(error){
        dispatch({
            type: TRANSACTION_DETAILS_FAIL,
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message, 
      })
    }
}
