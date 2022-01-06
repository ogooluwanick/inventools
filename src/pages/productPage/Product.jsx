import "./Product.css"
import React, { useEffect, useState } from 'react'
import {GetApp,AddShoppingCart} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Chart from "../../components/chart/Chart"
import { productRows } from './productData';
import  {detailsProducts} from '../../actions/productActions'
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../../components/loadingbox/LoadingBox';
import MessageBox from '../../components/messagebox/MessageBox';
import { useParams } from 'react-router';
import { useNavigate} from 'react-router-dom';




export default function Product() {
    const dispatch =useDispatch();
    const { ProductId } = useParams()
    const productDetails =useSelector((state) => state.productDetails);
    const { loading, error, products}= productDetails

    


    useEffect(()=>{
        dispatch(detailsProducts(ProductId));
    },[dispatch,ProductId]);


    const [qty, setQty]= useState(1)
    let navigate = useNavigate ();
    return (  
        <>
            {
                loading? <div className="customerPage">
                    <div className='LoadingBoxcustomerPage'>
                        <LoadingBox ></LoadingBox>
                    </div>
                </div>
                :
                error?  <div className="customerPage">
                            <div className="MessageBoxcustomerPage">
                                <MessageBox  variant='danger'> {error}</MessageBox>
                            </div>
                        </div>
                :
                        
                <div className="productPage"  key={products._id}>
                    <div className="productTitleContainer">
                        <h1 className="productTitle">Edit Product</h1>
                        <Link to="/NewProduct">
                            <button className="productAddBtn" onClick>Create</button>
                        </Link>
                    </div>

                    <div className="productTop">
                        <div className="productTopLeft">
                            <Chart data={products.productSalesPerformace} title="Sales Perfromance" dataKey='month'  />
                        </div>
                        <div className="productTopRight">
                            <div className="productInfoTop">
                                <img src={products.product_img} alt="product Img" className='PImg'  />
                                <span className="productName">{products.product_name}</span>
                            </div>
                            <div className="productInfoBottom">

                                <div class="productInfoBottomRow">
                                    <div class="productInfoBottomRowColumn">
                                        <div className="productInfoKey">ID:       </div>
                                        <div className="productInfoKey">Sales:    </div>
                                        <div className="productInfoKey">Status:   </div>
                                        <div className="productInfoKey">Stock:    </div>
                                    </div>
                                    <div class="productInfoBottomRowColumn" >
                                        <div className="productInfoValue">{products._id.slice(10,17)}     </div>
                                        <div className="productInfoValue">{products.SALES}     </div>
                                        <div className="productInfoValue">{products.STATUS}     </div>
                                        <div className="productInfoValue">{products.STOCK}     </div>
                                    </div>
                                </div>

                                <div class="productInfoBottomRow">
                                    <div class="productInfoBottomRowColumn">
                                    <div className="productInfoKey">Price:      </div>
                                    <div className="productInfoKey">Category:   </div>
                                    </div>
                                    <div class="productInfoBottomRowColumn" >
                                        <div className="productInfoValue">{products.PRICE}TL   </div>
                                        <div className="productInfoValue">{products.CATEGORY}     </div>
                                    </div>
                                </div>
                                {   products.STOCK > 0 && ( 

                                    <div class="productInfoBottomRow">
                                        <div class="productInfoBottomRowColumn" style={{marginLeft:"30px"}}>
                                            <span>Qty</span>
                                            <div>
                                                <select value={qty} onChange={e=>setQty(e.target.value)} className="qtySelect">
                                                    {
                                                        [...Array(products.STOCK).keys()].map(x=>(
                                                            <option key={x+1} value={x+1} >{x+1}</option>
                                                        ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div class="productInfoBottomRowColumn" >
                                            <div className="productListCartActivities">
                                                <button  className="productListCartBtn"  onClick={()=>{navigate(`/cart/${products._id}?qty=${qty}`);}}>
                                                    <AddShoppingCart style={{ fontSize: 15 }}/> Cart 
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                   
                                )
                                }
                                


                            </div>
                        </div>
                    </div>

                    <div className="productBottom">
                        <span className="customerUpdateTitle">Edit</span>
                        <form action=""  className='productForm'>
                            <div className="productFormLeft">
                                <label htmlFor="">Product Name</label>
                                <input type="text" placeholder={products.product_name}/>
                                <label htmlFor="">Product ID</label>
                                <input type="text" placeholder={products._id} value={products._id}/>
                                <label htmlFor="">Stock</label>
                                <input type="number"  placeholder={products.STOCK}/>
                                <label htmlFor="">Category</label>
                                <select name="CustomerID" id="CustomerID" className="newTransactionSelect">
                                    {productRows.map((productRows)=>(
                                        <option value="" >{productRows.CATEGORY}</option>
                                    ))}
                                </select>
                                <label htmlFor="">Status</label>
                                <select name="status" id="status"  className="newTransactionSelect" >
                                    <option value="Unavailable">Unavailable</option>
                                    <option value="Available">Available</option>
                                </select>
                                <label htmlFor="">Price</label>
                                <input type="number"  placeholder={products.PRICE}/>
                                
                            </div>
                            <div className="productFormRight">
                                <div className="productUpload">
                                    <img src={products.product_img} alt="product Img" className="productImgUpload" />
                                    <label For="file"><GetApp/> </label>
                                    <input type="file" id="file" style={{display:"none"}}/>

                                </div>
                                <button className="customerUpdateBtn">Update</button>                    
                            </div>
                            
                        </form>

                    </div>
                
                
                </div>
            }
        </>
        
    )
}
