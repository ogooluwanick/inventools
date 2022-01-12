import {applyMiddleware, createStore, compose, combineReducers} from "redux";
import thunk from "redux-thunk";
import { customerActivityDataReducer } from "./reducers/customerActivityDataReducers";
import { customerDetailsReducer, customerListReducer } from "./reducers/customerReducers";
import { vendorDetailsReducer, vendorListReducer } from "./reducers/vendorReducers";
import {  productDetailsReducer, productListReducer } from "./reducers/productReducers";
import {transactionDetailsReducer, transactionListReducer} from "./reducers/transactionReducers"
import { returnDetailsReducer, returnListReducer } from "./reducers/returnReducers";
import { cartReducer } from "./reducers/cartReducers";
import { userDetailsReducer, userRegisterReducer, userSigninReducer } from "./reducers/userReducers";
import { orderCreatedReducer, orderDetailsReducer } from "./reducers/orderReducers";


const initialState= {

    userSignin:{
        userInfo:localStorage.getItem('userInfo')
        ?JSON.parse(localStorage.getItem('userInfo'))
        :null,
    },
    cart:{
        cartItems:localStorage.getItem('cartItems')
        ?JSON.parse(localStorage.getItem('cartItems'))
        :[],
        shippingAddress:localStorage.getItem('shippingAddress')
        ?JSON.parse(localStorage.getItem('shippingAddress'))
        :{},

    },
};
const reducer= combineReducers({
    customerList: customerListReducer,
    customerDetails:customerDetailsReducer,
    productList:productListReducer,
    productDetails:productDetailsReducer,
    transactionList: transactionListReducer,
    transactionDetails:  transactionDetailsReducer,
    vendorList: vendorListReducer,
    vendorDetails:  vendorDetailsReducer,
    returnList: returnListReducer,
    returnDetails:  returnDetailsReducer,
    customerActivityDataList:customerActivityDataReducer,
    cart :cartReducer,
    userSignin: userSigninReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    orderCreate:orderCreatedReducer,
    orderDetails:orderDetailsReducer




});


const composeEnhancer= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;



const store = createStore(
    reducer, 
    initialState, 
    composeEnhancer(applyMiddleware(thunk))
);


export default store;