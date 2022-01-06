import React from 'react'
import "./AddProduct.css"


export default function AddProduct() {
    return (
        <div className="AddProduct">
            <h1 className="newProductTitle">New Product</h1>

            <form action="#" className="newProductForm">
                <div className="newProductFormLeft">
                    <div className="productItemImg" style={{border:"none"}}>
                        <label For="file">Image</label>
                        <input type="file"/>
                    </div>
                    <div className="productItem">
                        <label htmlFor="">Product Name</label>
                        <input type="text" 
                            placeholder="Product Name..."/>
                    </div>
                    <div className="productItem">
                        <label htmlFor="">Product ID</label>
                        <input type="text" placeholder="Product ID..."/>
                    </div>
                    <div className="productItem">
                        <label htmlFor="">Stock</label>
                        <input type="number" />
                    </div>
                    <div className="productItem">
                        <label htmlFor="">Category</label>
                        <select name="category" id="category" className="newProductSelect">
                            <option value="approved" >Vacuums</option>
                            <option value="declined" >Air Tools</option>
                            <option value="pending" >Power Tools</option>
                            <option value="approved" >Lasers</option>
                            <option value="declined" >Jobsite Equipment</option>
                            <option value="pending" >Hand Tools</option>
                            <option value="pending" >Cordless Tools</option>
                            <option value="pending" >Fasteners</option>

                        </select>
                    </div>
                    <div className="productItem">
                        <label htmlFor="">Active</label>
                        <select name="active" id="active" className="newProductSelect">
                            <option value="yes" >Yep</option>
                            <option value="no" >Nop</option>
                        </select>
                    </div>
                    <div className="productItem">
                        <label htmlFor="">Price</label>
                        <input  type="number"  placeholder="Price..."/>
                    </div>
                    
                    <button className="newProductBtn">Create</button>
                </div>
                
            </form>
        </div>
    )
}
