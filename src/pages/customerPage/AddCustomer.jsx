import React from 'react'
import  './AddCustomer.css'


export default function AddCustomer() {
    return (
        <div className="AddCustomer">
            <h1 className="newCustomerTitle">New Customer</h1>

            <form action="#" className="newCustomerForm">
                <div className="customerItem">
                    <label htmlFor="">Username</label>
                    <input type="text" 
                        placeholder="Username..."/>
                </div>
                <div className="customerItem">
                    <label htmlFor="">Full Name</label>
                    <input type="text" placeholder="Full Name..."/>
                </div>
                <div className="customerItem">
                    <label htmlFor="">Customer ID</label>
                    <input type="text" placeholder="Customer ID..."/>
                </div>
                <div className="customerItem">
                    <label htmlFor="">Date of Date</label>
                    <input  type="date"  placeholder=""/>
                </div>
                <div className="customerItem">
                    <label htmlFor="">PassWord</label>
                    <input  type="password"  placeholder="password"/>
                </div>
                <div className="customerItem">
                    <label htmlFor="">Gender</label>
                    <div className="newCustomerGender">
                        <input  type="radio"  name="customer_gender" id='male' value="male"/>
                        <label for="Male">Male</label>
                        <input  type="radio"  name="customer_gender" id='female' value="female"/>
                        <label for="Female">Female</label>
                        <input  type="radio"  name="customer_gender" id='other' value="other"/>
                        <label for="Other">Other</label>
                    </div>
                </div> 
                <div className="customerItem">
                    <label htmlFor="">Email</label>
                    <input type="email" placeholder="Email..."/>
                </div>
                <div className="customerItem">
                    <label htmlFor="">Phone No</label>
                    <input type="text" placeholder="Phone No..."/>
                </div>
                <div className="customerItem">
                    <label htmlFor="">Address</label>
                    <input type="text" placeholder="Address..."/>
                </div>
                <div className="customerItem">
                    <label htmlFor="">Company</label>
                    <input type="text" placeholder="Company..."/>
                </div>
                <div className="customerItem">                            <label htmlFor="">Position</label>
                    <input type="text" placeholder="Position..."/>
                </div>
                <div className="customerItem">
                    <label htmlFor="">Active</label>
                    <select name="active" id="active" className="newCustomerSelect">
                        <option value="yes" >Yep</option>
                        <option value="no" >Nop</option>
                    </select>
                </div>
                
                <button className="newCustomerBtn">Create</button>
            </form>
        </div>
    )
}
