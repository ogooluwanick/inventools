import  Axios  from "axios";
import { 
    RETURN_DETAILS_FAIL,
    RETURN_DETAILS_REQUEST,
    RETURN_DETAILS_SUCCESS,
    RETURN_LIST_FAIL, 
    RETURN_LIST_REQUEST, 
    RETURN_LIST_SUCCESS } from "../constants/returnConstants"

export const listReturns =()=> async (dispatch) => {
    dispatch({
        type: RETURN_LIST_REQUEST
    });

    try{
        const {data} = await Axios.get("https://inventools.herokuapp.com/api/returns");
        dispatch({type: RETURN_LIST_SUCCESS, payload: data});
    }
    catch(error){
        dispatch({type: RETURN_LIST_FAIL, payload: error.message  })

    }
};

export const detailsReturns =(returnsID)=> async (dispatch) => { 
    dispatch({
        type: RETURN_DETAILS_REQUEST, payload: returnsID
    });

    try{
        const {data} = await Axios.get(`https://inventools.herokuapp.com/api/returns/${returnsID}`);
        dispatch({type: RETURN_DETAILS_SUCCESS, payload: data});
    }
    catch(error){
        dispatch({
            type: RETURN_DETAILS_FAIL,
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message, 
      })
    }
}


