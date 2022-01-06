import React from 'react'
import "./AddTransaction.css"
import {customerRows} from "../customerPage/customerData"


export default function AddTransaction() {
    return (
        <div className="addTransactionPage">
            <h1 className="newTransactionTitle">New Transaction</h1>

            <form action="#" className="newTransactionForm">
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
                        <label htmlFor="">Order Number</label>
                        <input type="number" 
                            placeholder="Order Number..."/>
                    </div>
                    <div className="transactionItem">
                        <label htmlFor="">Order Date</label>
                        <input type="date" placeholder="Order Date..."/>
                    </div>
                    <div className="transactionItem">
                        <label htmlFor="">Shipping Address</label>
                        <input  type="text"  placeholder="Shipping Address..."/>
                    </div>
                    <div className="transactionItem">
                        <label htmlFor="">Status</label>
                        <select name="status" id="active" className="newTransactionSelect">
                            <option value="approved" >Approved</option>
                            <option value="declined" >Declined</option>
                            <option value="pending" >Pending</option>
                        </select>
                    </div>
                    <div className="transactionItem">
                        <label htmlFor="">Value</label>
                        <input  type="number"  placeholder="Value..."/>
                    </div>
                    
                    <button className="newTransactionBtn">Create</button>
                </div>
                
            </form>
        </div>
    )
}
