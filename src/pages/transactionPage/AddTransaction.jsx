import React, { useState } from 'react'
import "./AddTransaction.css"
import {customerRows} from "../customerPage/customerData"
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


export default function AddTransaction() {
    const [product_name,setproduct_name]= useState('')
    const [STOCK,setSTOCK]= useState('')
    const [PRICE,setPRICE]= useState('')

    let location = useLocation();
    const dispatch=useDispatch();
    const nav = useNavigate();

    const customerCreate=useSelector((state)=> state.customerCreate);
    const {productInfo,error,loading }= customerCreate;

    console.log(location.search)

    const CATEGORY = String(new URLSearchParams(location.search).get("category"))
                ? String(new URLSearchParams(location.search).get("category"))
                : null;

                console.log(CATEGORY)


    const submitHandler=(e)=>{
        e.preventDefault();
        if (productInfo){
            nav("/ProductList")
        }
        else
        {
            //dispatch(createProduct(product_name,STOCK,CATEGORY,PRICE))
            alert("Product Created") 
            nav("/ProductList")
        }
    }

    return (
        <div className="addTransactionPage">
             <div> <h1 className="newTransactionTitle">New Transaction</h1></div>

            <form onSubmit={submitHandler} className="newTransactionForm">
               
                <div className="newTransactionFormLeft">
                    <div className="transactionItem">
                        <label htmlFor="">Customer ID</label>
                        <select name="CustomerID" id="CustomerID" className="newTransactionSelect">
                            {customerRows.map((customerRows)=>(
                                <option value="" >{customerRows.USERNAME}</option>
                            ))}
                        </select>
                    </div>
                    <div className="transactionItem">
                        <label htmlFor="">Order Date</label>
                        <input type="text" placeholder="Order Date..."/>
                    </div>
                    <div className="transactionItem">
                        <label htmlFor="">Shipping Address</label>
                        <input  type="text"  placeholder="Shipping Address..."/>
                    </div>
                    <div className="transactionItem">
                        <label htmlFor="">Status</label>
                        <select name="status" id="active" className="newTransactionSelect">
                            <option value="Approved" >Approved</option>
                            <option value="Declined" >Declined</option>
                            <option value="Pending" >Pending</option>
                        </select>
                    </div>
                    <div className="transactionItem">
                        <label htmlFor="">Value</label>
                        <input  type="number"  placeholder="Value..."/>
                    </div>
                    
                    <button className="newTransactionBtn" id='majorBtnHoverStyle'>Create</button>
                </div>
                
            </form>
        </div>
    )
}
