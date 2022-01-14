import Axios  from "axios";
import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT } from "../constants/userConstants"


export const listUsers=()=> async (dispatch) => {
    dispatch({
        type: USER_LIST_REQUEST
    });

    try{
        
        const {data} = await Axios.get("https://inventools.herokuapp.com/api/users/display");
        dispatch({type: USER_LIST_SUCCESS, payload: data});
    }
    catch(error){
        dispatch({type: USER_LIST_FAIL, payload: error.message  })

    }
};

export const siginin=(email,passWord)=> async(dispatch)=>{
    dispatch ({type:USER_SIGNIN_REQUEST, payload:{email,passWord}})
    try {
        const {data}= await Axios.post("https://inventools.herokuapp.com/api/users/signin",{email,passWord})
        dispatch({type:USER_SIGNIN_SUCCESS, payload: data})
        localStorage.setItem("userInfo",JSON.stringify(data))
    }
    catch(error){
        dispatch({type:USER_SIGNIN_FAIL,
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message, })
    }
};


export const register=(name,email,passWord,username)=> async(dispatch)=>{
    dispatch ({type:USER_REGISTER_REQUEST, payload:{name,email,passWord,username}})
    try {
        const {data}= await Axios.post("https://inventools.herokuapp.com/api/users/register",{name,email,passWord,username})
        dispatch({type:USER_REGISTER_SUCCESS, payload: data})
        dispatch({type:USER_SIGNIN_SUCCESS, payload: data})

        localStorage.setItem("userInfo",JSON.stringify(data))
    }
    catch(error){
        dispatch({type:USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message, })
    }
};

export const signout=()=>(dispatch)=>{
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    dispatch({type:USER_SIGNOUT})

}


export const detailsUser=(userId)=>async(dispatch,getState)=>{
    dispatch ({type:USER_DETAILS_REQUEST, payload:userId})
    const {userSignin:{userInfo}}=getState();
    try{
        const {data}= await Axios.get(`https://inventools.herokuapp.com/api/users/${userId}`,{
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        })
        dispatch({type:USER_DETAILS_SUCCESS, payload: data});
    }
    catch(error){
        dispatch ({type:USER_DETAILS_FAIL, payload: error.response && error.response.data.message 
                                                    ? error.response.data.message 
                                                    : error.message,})
    }
}