import { CART_ADD_ITEM ,CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS} from "../constants/cartConstants";
import  Axios  from "axios";

export const addToCart =(ProductId, qty) => async(dispatch, getState)=>{
    const {data}= await Axios.get (`/api/products/${ProductId}`);
    dispatch({
        type: CART_ADD_ITEM,
        payload:{
            name: data.product_name,
            img: data.product_img,
            price: data.PRICE,
            stock:data.STOCK,
            product:data._id,
            qty,

        }

    });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart =(ProductId) => async(dispatch, getState)=>{
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: ProductId
    });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress =(data) => async(dispatch, getState)=>{
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    });
    localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod =(data) => async(dispatch, getState)=>{
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data
    });
    localStorage.setItem('paymentMethod', JSON.stringify(data));
};