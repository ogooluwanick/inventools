import  Axios  from "axios";
import { 
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL, 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS } from "../constants/productConstants"

export const listProducts=()=> async (dispatch) => {
    dispatch({
        type: PRODUCT_LIST_REQUEST
    });

    try{
        const {data} = await Axios.get("https://inventools.herokuapp.com/api/products");
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
    }
    catch(error){
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message  })

    }
};

export const detailsProducts =(productsID)=> async (dispatch) => { 
    dispatch({
        type: PRODUCT_DETAILS_REQUEST, payload: productsID
    });

    try{
        const {data} = await Axios.get(`https://inventools.herokuapp.com/api/products/${productsID}`);
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data});
    }
    catch(error){
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message, 
      })
    }
}

export const createProduct=(product_name,STOCK,CATEGORY,PRICE)=> async(dispatch)=>{
    dispatch ({type:PRODUCT_CREATE_REQUEST, payload:{product_name,STOCK,CATEGORY,PRICE}})
    try {
        const {data}= await Axios.post("https://inventools.herokuapp.com/api/products/newProduct",{product_name,STOCK,CATEGORY,PRICE})
        dispatch({type:PRODUCT_CREATE_SUCCESS, payload: data})
    

        localStorage.setItem("productInfo",JSON.stringify(data))
    }
    catch(error){
        dispatch({type:PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message, })
    }
};



