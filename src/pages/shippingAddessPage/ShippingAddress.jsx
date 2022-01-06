import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { saveShippingAddress } from '../../actions/cartActions'
import CheckoutSteps from '../../components/checkoutSteps/CheckoutSteps'
import "./ShippingAddress.css"


export default function ShippingAddress() {
    const nav = useNavigate()
    //const userSignin= useSelector((state) => state.userSignin)
    //const {userInfo} =userSignin;
    const cart =useSelector(state => state.cart)
    const {shippingAddress}=cart
    // if (!userInfo){
    //    nav("/signin")
    //}

    
    const [fullName, setFullName] = useState(shippingAddress.fullName)
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postCode, setPostCode] = useState(shippingAddress.postCode)
    const [country, setCountry] = useState(shippingAddress.country)
    const dispatch=useDispatch()
    const submitShippingHandler= (e)=> {
        e.preventDefault();
        dispatch(saveShippingAddress({fullName,address,city,postCode,country}))
        nav('/payment');
    };
    
    return (
        <div className='UserLogin'>
           <CheckoutSteps step1 step2></CheckoutSteps>
           <form action="form" className="shippingForm" onSubmit={submitShippingHandler}>
               <div>  
                   <h1>Shipping Address</h1>
               </div>
               <div>
                   <label htmlFor="fullName">Full Name</label>
                   <input type="text" 
                          id='shippingFullname' 
                          placeholder='Enter Full Name...' 
                          value={fullName} 
                          onChange={(e)=>setFullName(e.target.value)} 
                          required />
               </div>
               <div>
                   <label htmlFor="address">Address</label>
                   <input type="text" 
                          id='shippingAddress' 
                          placeholder='Enter Address...' 
                          value={address} 
                          onChange={(e)=>setAddress(e.target.value)} 
                          required />
               </div>
               <div>
                   <label htmlFor="city">City</label>
                   <input type="text" 
                          id='shippingCity' 
                          placeholder='Enter City...' 
                          value={city} 
                          onChange={(e)=>setCity(e.target.value)} 
                          required />
               </div>
               <div>
                   <label htmlFor="postCode">PostCode</label>
                   <input type="text" 
                          id='shippingPostCode' 
                          placeholder='Enter PostCode...' 
                          value={postCode} 
                          onChange={(e)=>setPostCode(e.target.value)} 
                          required />
               </div>
               <div>
                   <label htmlFor="country">Country</label>
                   <input type="text" 
                          id='shippingCountry' 
                          placeholder='Enter Country...' 
                          value={country} 
                          onChange={(e)=>setCountry(e.target.value)} 
                          required />
               </div>
               <div>
                   <button className='checkoutBtn'  type='submit' >Proceed</button>
               </div>
           </form>
        </div>
    )
}

