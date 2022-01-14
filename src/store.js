import {applyMiddleware, createStore, compose, combineReducers} from "redux";
import thunk from "redux-thunk";
import { customerActivityDataReducer } from "./reducers/customerActivityDataReducers";
import { customerCreateReducer, customerDetailsReducer, customerListReducer } from "./reducers/customerReducers";
import { vendorCreateReducer, vendorDetailsReducer, vendorListReducer } from "./reducers/vendorReducers";
import {  productCreateReducer, productDetailsReducer, productListReducer } from "./reducers/productReducers";
import {transactionDetailsReducer, transactionListReducer} from "./reducers/transactionReducers"
import { returnCreateReducer, returnDetailsReducer, returnListReducer } from "./reducers/returnReducers";
import { cartReducer } from "./reducers/cartReducers";
import { userDetailsReducer, userListReducer, userRegisterReducer, userSigninReducer } from "./reducers/userReducers";
import { orderCreatedReducer, orderDetailsReducer, orderListReducer } from "./reducers/orderReducers";


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
    customerCreate:customerCreateReducer,
    productList:productListReducer,
    productDetails:productDetailsReducer,
    productCreate:productCreateReducer,
    transactionList: transactionListReducer,
    transactionDetails:  transactionDetailsReducer,
    vendorList: vendorListReducer,
    vendorDetails:  vendorDetailsReducer,
    vendorCreate:vendorCreateReducer,
    returnList: returnListReducer,
    returnDetails:  returnDetailsReducer,
    returnCreate:returnCreateReducer,
    customerActivityDataList:customerActivityDataReducer,
    cart :cartReducer,
    userSignin: userSigninReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userList:userListReducer,
    orderCreate:orderCreatedReducer,
    orderDetails:orderDetailsReducer,
    orderList:orderListReducer,




});


const composeEnhancer= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;



const store = createStore(
    reducer, 
    initialState, 
    composeEnhancer(applyMiddleware(thunk))
);


export default store;