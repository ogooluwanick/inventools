import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { createReturn } from '../../actions/returnActions'
import LoadingBox from '../../components/loadingbox/LoadingBox'
import MessageBox from '../../components/messagebox/MessageBox'
import "./AddReturn.css"


export default function AddReturn() {
    const [id,setID]= useState('')
    const [date,setDate]= useState('')
    const [transactionID,setTransactionID]= useState('')
    const [customer_NAME,setCustomer_NAME]= useState('')
    const [AMOUNT_REFUNDED,setAMOUNT_REFUNDED]= useState('')


    let location = useLocation();
    const dispatch=useDispatch();
    const nav = useNavigate();

    const customerCreate=useSelector((state)=> state.customerCreate);
    const {returnInfo,error,loading }= customerCreate;

    console.log(location.search)

    const STATUS = String(new URLSearchParams(location.search).get("status"))
                ? String(new URLSearchParams(location.search).get("status"))
                : "Pending";

                console.log(STATUS)

    const RECEIVE_STATUS = String(new URLSearchParams(location.search).get("RECEIVE_STATUS"))
                ? String(new URLSearchParams(location.search).get("RECEIVE_STATUS"))
                : "Pending";

                console.log(RECEIVE_STATUS)

    const REFUND_STATUS = String(new URLSearchParams(location.search).get("REFUND_STATUS"))
                ? String(new URLSearchParams(location.search).get("REFUND_STATUS"))
                : "Pending";

                console.log(REFUND_STATUS)

    const submitHandler=(e)=>{
        e.preventDefault();
        if (returnInfo){
            nav("/ProductList")
        }
        else
        {
            dispatch(createReturn(id,date,transactionID,customer_NAME,STATUS,RECEIVE_STATUS,REFUND_STATUS,AMOUNT_REFUNDED))
            alert("Product Created") 
            if (returnInfo){
            nav("/ProductList")
        }
        }
    }

    useEffect(()=>{
        if (returnInfo){
            nav("/ProductList")
        }
    },[nav,returnInfo])
                
    return (
        <div className="AddReturn">
            <h1 className="newReturnTitle">New Return</h1>
                {loading && <div className='formBoxes' >  <LoadingBox></LoadingBox> </div> }
                {error && <div className='formBoxes'> <MessageBox variant="danger">{error}</MessageBox></div>}
            <form onSubmit={submitHandler} className="newReturnForm">
                <div className="newReturnFormLeft">
                    <div className="returnItem">
                        <label htmlFor="">Return ID</label>
                        <input type="text" 
                                placeholder="Return ID..."
                                required
                                onChange={(e)=>setID(e.target.value)}/>
                    </div>
                    <div className="returnItem">
                        <label htmlFor="">Transaction ID</label>
                        <input type="text" placeholder="Transaction ID..." onChange={(e)=> setTransactionID(e.target.value)}/>
                    </div>
                    <div className="returnItem">
                        <label htmlFor="">Customer Name</label>
                        <input type="text"  placeholder="Customer Name..." onChange={(e)=>setCustomer_NAME(e.target.value)} />
                    </div>
                    <div className="returnItem">
                        <label htmlFor="">Return Date</label>
                        <input type="text" placeholder="Return Date..." onChange={(e)=>setDate(e.target.value)}/>
                    </div>
                    <div className="returnItem">
                        <label htmlFor="">Status</label>
                        <select name="status" id="status" className="newTransactionSelect">
                            <option value="Approved" >Approved</option>
                            <option value="Rejected" >Rejected</option>
                            <option value="Pending" >Pending</option>
                        </select>
                    </div>
                    <div className="returnItem">
                        <label htmlFor="">RECEIVE STATUS</label>
                        <select name="RECEIVE_STATUS" id="RECEIVE_STATUS" className="newTransactionSelect">
                            <option value="Approved" >Approved</option>
                            <option value="Declined" >Declined</option>
                            <option value="Pending" >Pending</option>
                        </select>
                    </div>
                    <div className="returnItem">
                        <label htmlFor="">REFUND STATUS</label>
                        <select name="REFUND_STATUS" id="REFUND_STATUS" className="newTransactionSelect">
                            <option value="Approved" >Approved</option>
                            <option value="Declined" >Declined</option>
                            <option value="Pending" >Pending</option>
                        </select>
                    </div> 

                    
                    <div className="returnItem">
                        <label htmlFor="">AMOUNT REFUNDED</label>
                        <input  type="number"  placeholder="AMOUNT REFUNDED..." onChange={(e)=>setAMOUNT_REFUNDED(e.target.value)}/>
                    </div>
                    
                    <button className="newReturnBtn">Create</button>
                </div>
                
            </form>
        </div>
    )
}
