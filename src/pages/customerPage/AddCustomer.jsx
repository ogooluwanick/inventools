import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  useNavigate } from 'react-router-dom'
import { createCustomer } from '../../actions/customerActions'
import LoadingBox from '../../components/loadingbox/LoadingBox'
import MessageBox from '../../components/messagebox/MessageBox'
import  './AddCustomer.css'


export default function AddCustomer() {
    const [USERNAME,setUSERNAME]= useState('')
    const [FullName,setFullName]= useState('')
    const [EMAIL,setEMAIL]= useState('')
    const [Phone_No,setPhone_No]= useState('')
    const [DOB,setDOB]= useState('')
    const [Address,setAddress]= useState('')
    const [Company,setCompany]= useState('')
    const [Position,setPosition]= useState('')

    const dispatch=useDispatch();
    //let location = useLocation();
    const nav = useNavigate();

   // const redirect=location.search ?location.search.split('=')[1] :"/home";


    const productCreate=useSelector((state)=> state.productCreate);
    const {customerInfo,error,loading }= productCreate;


    const submitHandler=(e)=>{
        e.preventDefault();
        if (customerInfo){
            nav("/CustomerList")
        }
        else
        {
            dispatch(createCustomer(USERNAME,FullName,EMAIL,Phone_No,DOB,Address,Company,Position))
            alert("Customer Created") 
            nav("/CustomerList")
        }
    }

    useEffect(()=>{
        if (customerInfo){
            nav("/CustomerList")
        }
    },[nav,customerInfo])
                



    return (
        <div className="AddCustomer">
            <h1 className="newCustomerTitle">New Customer</h1>
                    {loading && <div className='formBoxes' >  <LoadingBox></LoadingBox> </div> }
                    {error && <div className='formBoxes'> <MessageBox variant="danger">{error}</MessageBox></div>}
            <form action="" className="newCustomerForm" onSubmit={submitHandler}>
                    
                <div className="customerItem">
                    <label htmlFor="">Username</label>
                    <input type="text" 
                        placeholder="Username..."
                        required onChange={(e)=>setUSERNAME(e.target.value)}
                    />
                </div>
                <div className="customerItem">
                    <label htmlFor="">Full Name</label>
                    <input type="text" 
                           placeholder="Full Name... "
                           required  onChange={(e)=>setFullName(e.target.value)}
                    />
                </div>
                <div className="customerItem">
                    <label htmlFor="">Date of Date</label>
                    <input  type="text"  placeholder="DOB..."
                            required  onChange={(e)=>setDOB(e.target.value)}/>
                </div>
                <div className="customerItem">
                    <label htmlFor="">Email</label>
                    <input type="email" placeholder="Email..."
                           required  onChange={(e)=>setEMAIL(e.target.value)}/>
                </div>
                <div className="customerItem">
                    <label htmlFor="">Phone No</label>
                    <input type="number" placeholder="Phone No..."
                           required  onChange={(e)=>setPhone_No(e.target.value)}/>
                </div>
                <div className="customerItem">
                    <label htmlFor="">Address</label>
                    <input type="text" placeholder="Address..."
                            required  onChange={(e)=>setAddress(e.target.value)}/>
                </div>
                <div className="customerItem">
                    <label htmlFor="">Company</label>
                    <input type="text" placeholder="Company..."
                            required  onChange={(e)=>setCompany(e.target.value)}/>
                </div>
                <div className="customerItem">                            
                    <label htmlFor="">Position</label>
                    <input type="text" placeholder="Position..."
                            required  onChange={(e)=>setPosition(e.target.value)}/>
                </div>
                
                
                <button className="newCustomerBtn" id='majorBtnHoverStyle'>Create</button>
            </form>
        </div>
    )
}
