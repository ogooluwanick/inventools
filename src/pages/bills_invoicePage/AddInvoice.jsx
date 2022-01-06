import React from 'react'
import "./AddVendor.css"


export default function AddInvoice() {
    return (
        <div className="AddVendor">
            <h1 className="newVendorTitle">New Vendor</h1>

            <form action="#" className="newVendorForm">
                <div className="vendorItem">
                    <label htmlFor=""> Company ID</label>
                    <input type="text" 
                        placeholder="Company ID..."/>
                </div>
                <div className="vendorItem">
                    <label htmlFor="">Company Name</label>
                    <input type="text" placeholder="Company Name..."/>
                </div>
                <div className="vendorItem">
                    <label htmlFor="">Password</label>
                    <input  type="password"  placeholder="password"/>
                </div>
                
                <div className="vendorItem">
                    <label htmlFor="">Email</label>
                    <input type="email" placeholder="Email..."/>
                </div>
                <div className="vendorItem">
                    <label htmlFor="">Phone No</label>
                    <input type="number" placeholder="Phone No..."/>
                </div>
                <div className="vendorItem">
                    <label htmlFor="">Website</label>
                    <input type="text" placeholder="Website..."/>
                </div>
                <div className="vendorItem">
                    <label htmlFor="">Shipping Address</label>
                    <input type="text" placeholder="Shipping Address..."/>
                </div>
                <div className="vendorItem">
                    <label htmlFor="">Billing Address</label>
                    <input type="text" placeholder="Billing Address..."/>
                </div>
            
                <button className="newVendorBtn">Create</button>
            </form>
        </div>
    )
}
