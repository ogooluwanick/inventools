import React from 'react'
import "./AddReturn.css"


export default function AddReturn() {
    return (
        <div className="AddReturn">
            <h1 className="newReturnTitle">New Return</h1>

            <form action="#" className="newReturnForm">
                <div className="newReturnFormLeft">
                    <div className="returnItemImg" style={{border:"none"}}>
                        <label For="file">Image</label>
                        <input type="file"/>
                    </div>
                    <div className="returnItem">
                        <label htmlFor="">Return ID</label>
                        <input type="text" 
                            placeholder="Return ID..."/>
                    </div>
                    <div className="returnItem">
                        <label htmlFor="">Transaction ID</label>
                        <input type="text" placeholder="Transaction ID..."/>
                    </div>
                    <div className="returnItem">
                        <label htmlFor="">Customer Name</label>
                        <input type="text"  placeholder="Customer Name..." />
                    </div>
                    <div className="transactionItem">
                        <label htmlFor="">Return Date</label>
                        <input type="date" placeholder="Return Date..."/>
                    </div>
                    <div className="returnItem">
                        <label htmlFor="">Status</label>
                        <select name="status" id="active" className="newTransactionSelect">
                            <option value="approved" >Approved</option>
                            <option value="declined" >Declined</option>
                            <option value="pending" >Pending</option>
                        </select>
                    </div>
                    <div className="returnItem">
                        <label htmlFor="">RECEIVE STATUS</label>
                        <select name="RECEIVE_STATUS" id="active" className="newTransactionSelect">
                            <option value="approved" >Approved</option>
                            <option value="declined" >Declined</option>
                            <option value="pending" >Pending</option>
                        </select>
                    </div>
                    <div className="returnItem">
                        <label htmlFor="">REFUND STATUS</label>
                        <select name="REFUND_STATUS" id="active" className="newTransactionSelect">
                            <option value="approved" >Approved</option>
                            <option value="declined" >Declined</option>
                            <option value="pending" >Pending</option>
                        </select>
                    </div> 

                    
                    <div className="returnItem">
                        <label htmlFor="">AMOUNT REFUNDED</label>
                        <input  type="number"  placeholder="AMOUNT REFUNDED..."/>
                    </div>
                    
                    <button className="newReturnBtn">Create</button>
                </div>
                
            </form>
        </div>
    )
}
