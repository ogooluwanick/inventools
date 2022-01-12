import React from 'react'
import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import "./App.css"
import Home from './pages/home/Home';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"

import CustomerList from './pages/customerPage/CustomerList';
import Customer from './pages/customerPage/Customer';
import AddCustomer from './pages/customerPage/AddCustomer';

import ProductList from './pages/productPage/ProductList';
import Product from './pages/productPage/Product';
import AddProduct from "./pages/productPage/AddProduct"

import TransactionList from "./pages/transactionPage/TransactionList"
import Transaction from './pages/transactionPage/Transaction';
import AddTransaction from "./pages/transactionPage/AddTransaction"

import VendorList from './pages/vendorPage/VendorList';
import Vendor from './pages/vendorPage/Vendor';
import AddVendor from './pages/vendorPage/AddVendor';

import ReturnList from './pages/returnPage/ReturnList';
import AddReturn from './pages/returnPage/AddReturn';
import Return from './pages/returnPage/Return';

import Cart from './pages/cartPage/Cart';


import UserLogin from "./pages/login/UserLogin"
import UserRegister from './pages/register/UserRegister';
import ShippingAddress from './pages/shippingAddessPage/ShippingAddress';
import PaymentMethod from './pages/paymentMethod/PaymentMethod';


import ErrorPage from "./pages/errorPage/ErrorPage"
import PlaceOrder from './pages/placeOrder/PlaceOrder';
import TrackOrder from './pages/trackOrder/TrackOrder';
import UserProfile from './pages/profile/UserProfile';
import { useSelector } from 'react-redux';
import Reports from './pages/reports/Reports';
import Stock from './pages/stock/Stock';





function App() {
  const userSignin = useSelector((state)=>state.userSignin);
  const {userInfo} = userSignin;
  return (
    <Router className="App">
      <Topbar/>     
      <div className="containers">
        <Sidebar className="globalSidebar"/>
        
        <Routes>
         
          <Route path="/ProductList"  element={<ProductList  />}/> 
          <Route path="/Product/:ProductId"  element={<Product/>}/>
         
          <Route path="/VendorList"  element={<VendorList/>}/> 
          <Route path="/Vendor/:VendorId"  element={<Vendor/>}/>
        
          <Route path="/signin"  element={<UserLogin/>}/>
          <Route path="/"  element={<UserLogin/>}/>

          
          <Route path="/register/shipping_address"  element={<ShippingAddress/>}/>
          <Route path="/shipping_address"  element={<ShippingAddress/>}/>
          <Route path="/signin/shipping_address"  element={<ShippingAddress/>}/>
          
          <Route path='/Stock' element={<Stock/>}/>  
          <Route path='/Stock/:StockID' element={<Stock/>}/>        
          
          {
            userInfo &&
            (
              <>
                <Route path="/home" element={<Home/>} exact />
                <Route path="/profile"  element={<UserProfile/>}/>

                <Route path="/CustomerList"  element={<CustomerList/>}/>
                <Route path="/Customer/:CustomerId"  element={<Customer/>} />
                <Route path="/NewCustomer"  element={<AddCustomer/>}/>

                <Route path="/TransactionList"  element={<TransactionList/>}/> 
                <Route path="/Transaction/:TransactionId"  element={<Transaction/>}/>
                <Route path="/NewTransaction"  element={<AddTransaction/>}/>

                <Route path="/payment"  element={<PaymentMethod/>}/>
                <Route path="/place_order"  element={<PlaceOrder/>}/>
                <Route path="/order/:id"  element={<TrackOrder/>}/>

                <Route path="/NewVendor"  element={<AddVendor/>}/>


                <Route path="/ReturnList"  element={<ReturnList/>}/> 
                <Route path="/Return/:ReturnId"  element={<Return/>}/>
                <Route path="/NewReturn"  element={<AddReturn/>}/>

                <Route path="/NewProduct"  element={<AddProduct/>}/>

                
                <Route path='/Reports' element={<Reports/>}/>
              </>
            )

            
          }
          {
            !userInfo &&
            (
              <>
                <Route path="/register"  element={<UserRegister/>}/>
              </>
            )
          }


          <Route path='/cart/:ProductId' element={<Cart/>}/>
          <Route path='/cart' element={<Cart/>}/>
          


          <Route path="*"  element={<ErrorPage/>}/>

        </Routes>

      </div>
    </Router>
  );
}

export default App;
