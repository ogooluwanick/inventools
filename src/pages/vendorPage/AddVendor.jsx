import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { createVendor } from '../../actions/vendorActions'
import LoadingBox from '../../components/loadingbox/LoadingBox'
import MessageBox from '../../components/messagebox/MessageBox'
import "./AddVendor.css"


export default function AddVendor() {
    const [id,setID]= useState('')
    const [Primary_Contact,setPrimary_Contact]= useState('')
    const [company_NAME,setCompany_NAME]= useState('')
    const [company_EMAIL,setEMAIL]= useState('')
    const [phone_No,setPhone_No]= useState('')
    const [Website,setWebsite]= useState('')
    const [Shipping_Address,setShipping_Address]= useState('')
    const [BILLING_Address,setBILLING_Address]= useState('')

    const dispatch=useDispatch();
    let location = useLocation();
    const nav = useNavigate();



    const vendorCreate=useSelector((state)=> state.vendorCreate);
    const {vendorInfo,error,loading }= vendorCreate;

    const STATUS = String(new URLSearchParams(location.search).get("status"))
                ? String(new URLSearchParams(location.search).get("status"))
                : "Offline";


    const submitHandler=(e)=>{
        e.preventDefault();
        if (vendorInfo){
            //nav("/VendorList")
        }
        else
        {
            dispatch(createVendor(id,Primary_Contact,company_NAME,company_EMAIL,phone_No,Website,Shipping_Address,BILLING_Address,STATUS))
            alert("Vendor Created") 
            nav("/VendorList")
        }
    }

    useEffect(()=>{
        if (vendorInfo){
             nav("/VendorList")
        }
    },[nav,vendorInfo])
                


    return (
        <div className="AddVendor">
            <h1 className="newVendorTitle">New Vendor</h1>
                {loading && <div className='formBoxes' >  <LoadingBox></LoadingBox> </div> }
                {error && <div className='formBoxes'> <MessageBox variant="danger">{error}</MessageBox></div>}

            <form onSubmit={submitHandler} className="newVendorForm">
                <div className="vendorItem">
                    <label htmlFor="">Company ID</label>
                    <input type="text" 
                            placeholder="Company ID..."
                            required onChange={(e)=>setID(e.target.value)}/>
                </div>
                <div className="vendorItem">
                    <label htmlFor="">Company Name</label>
                    <input type="text" 
                            placeholder="Company Name..."
                            required onChange={(e)=>setCompany_NAME(e.target.value)}/>
                </div>
                <div className="vendorItem">
                    <label htmlFor="">Primary Contact</label>
                    <input  type="text"  placeholder="Primary Contact..."
                            required onChange={(e)=>setPrimary_Contact(e.target.value)}/>
                </div>
                
                <div className="vendorItem">
                    <label htmlFor="">Email</label>
                    <input type="email" placeholder="Email..."
                            required onChange={(e)=>setEMAIL(e.target.value)}/>
                </div>
                <div className="vendorItem">
                    <label htmlFor="">Phone No</label>
                    <input type="number" placeholder="Phone No..."
                            required onChange={(e)=>setPhone_No(e.target.value)}/>
                </div>
                <div className="vendorItem">
                    <label htmlFor="">Website</label>
                    <input type="text" placeholder="Website..."
                            required onChange={(e)=>setWebsite(e.target.value)}/>
                </div>
                <div className="vendorItem">
                    <label htmlFor="">Shipping Address</label>
                    <input type="text" placeholder="Shipping Address..."
                            required onChange={(e)=>setShipping_Address(e.target.value)}/>
                </div>
                <div className="vendorItem">
                    <label htmlFor="">Billing Address</label>
                    <input type="text" placeholder="Billing Address..."
                            required onChange={(e)=>setBILLING_Address(e.target.value)}/>
                </div>
                <div className="productItem">
                        <label htmlFor="">Status</label>
                        <select name="status" id="status" className="newProductSelect">
                            <option value="Online" >Online</option>
                            <option value="Offline" >Offline</option>
                        </select>
                    </div>
                <div className="vendorItem">
                     <button  id='majorBtnHoverStyle' className="newVendorBtn">Create</button>
                </div>
                
            </form>
        </div>
    )
}
