import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { createProduct } from '../../actions/productActions'
import LoadingBox from '../../components/loadingbox/LoadingBox'
import MessageBox from '../../components/messagebox/MessageBox'
import "./AddProduct.css"


export default function AddProduct() {
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
            dispatch(createProduct(product_name,STOCK,CATEGORY,PRICE))
            alert("Product Created") 
            nav("/ProductList")
        }
    }

    useEffect(()=>{
        if (productInfo){
            nav("/ProductList")
        }
    },[nav,productInfo])
                



    return (< div className="outterAddProduct">
        <div className="AddProduct">
            <h1 className="newProductTitle">New Product</h1> <br />
                    {loading && <div className='formBoxes' >  <LoadingBox></LoadingBox> </div> }
                    {error && <div className='formBoxes'> <MessageBox variant="danger">{error}</MessageBox></div>}
            <form onSubmit={submitHandler} className="newProductForm">
                <div className="newProductFormLeft">
                    <div className="productItem">
                        <label htmlFor="">Product Name</label>
                        <input type="text" 
                            placeholder="Product Name..."
                            required
                            onChange={(e)=>setproduct_name(e.target.value)}/>
                    </div>
                    <div className="productItem">
                        <label htmlFor="">Stock</label>
                        <input type="number" 
                                required
                                onChange={(e)=>setSTOCK(e.target.value)}/>
                    </div>
                    <div className="productItem">
                        <label htmlFor="">Category</label>
                        <select name="category" id="category" className="newProductSelect">
                            <option value="Vacuums" >Vacuums</option>
                            <option value="Air Tools" >Air Tools</option>
                            <option value="Power Tools" >Power Tools</option>
                            <option value="Lasers" >Lasers</option>
                            <option value="Jobsite Equipment" >Jobsite Equipment</option>
                            <option value="Hand Tools" >Hand Tools</option>
                            <option value="Cordless Tools" >Cordless Tools</option>
                            <option value="Fasteners" >Fasteners</option>

                        </select>
                    </div>
                    <div className="productItem">
                        <label htmlFor="">Price</label>
                        <input  type="number"  placeholder="Price..."
                                required
                                onChange={(e)=>setPRICE(e.target.value)}/>
                    </div>
                    
                    <button className="newProductBtn" id='majorBtnHoverStyle'>Create</button>
                </div>
                
            </form>
        </div>
        </div> )
}
