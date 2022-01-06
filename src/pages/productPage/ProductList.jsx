import React, { useEffect, useState } from 'react'
import "./ProductList.css"
import { Link } from 'react-router-dom';
import {DataGrid} from '@material-ui/data-grid';
import {DeleteRounded,AddCircleOutlineSharp} from '@material-ui/icons';
import {productRows} from "./productData"
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../actions/productActions';
import LoadingBox from '../../components/loadingbox/LoadingBox';
import MessageBox from '../../components/messagebox/MessageBox';




export default function ProductList(props) {
    const dispatch =useDispatch();
    const productList =useSelector((state) => state.productList);
    const { loading, error, products}= productList


    useEffect(()=>{
        dispatch(listProducts());
    },[dispatch]);




    const [data, setData]= useState(productRows)

    const handleDelete=(id)=>{
        setData(data.filter(item=>item.id !== id))
    };


    const StatusText=({Status})=>{
        return <div className={"productlistStatusTextColor "+ Status}>{Status}</div>
    }
    


    
     
   

    const columns = [
        { field: '_id', headerName: 'ID', width: 100 },
        {
          field: 'product_name',
          headerName: 'PRODUCT',
          width: 200,
          renderCell:(param)=>{
              return(
                  <div className="productlistInfo">
                    <Link to={"/Product/"+param.row._id}  className="productlistInfo">
                        <img src={param.row.product_img} alt="product Img" className="productlistImg" />
                        {param.row.product_name}
                    </Link>
                  </div>
              )
          }
        },
        {
            field: 'CATEGORY',
            headerName: 'CATEGORY',
            editable: true, 
            width: 200,
        },
        {
            field: 'STOCK',
            headerName: 'STOCK',
            editable: true, 
            width: 150,
          },
        {
          field: 'STATUS',
          headerName: 'STATUS',
          width: 160,
          editable: true,
          renderCell:(param)=>{
            return(
                <div className="transactionlistInfo">
                        <StatusText Status={param.row.STATUS}/>  
                </div>
            )}

        },
        {
          field: 'PRICE',
          headerName: 'PRICE',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 150,
          renderCell:(param)=>{
            return(
                <div className="transactionlistInfo">
                    {param.row.PRICE}TL
                </div>
            )}
        },
        {
          field: 'actions',
          headerName: 'ACTIONS',
          width: 160,
          renderCell:(param)=>{
              return(
                <>
                    <Link to={"/Product/"+param.row._id}>
                        <button className="productListEditBtn">Edit</button>
                    </Link>

                    <DeleteRounded className="productListDeleteIcon" onClick={()=>handleDelete(param.row._id)}/>

                    </>
              );
          }
        },
      ];


    return (
        <>
            {
                loading? <div className="customerPage">
                    <div className='LoadingBoxcustomerPage'>
                        <LoadingBox></LoadingBox>
                    </div>
                </div>
                :
                error?  <div className="customerPage">
                            <div className="MessageBoxcustomerPage">
                                <MessageBox  variant='danger'> {error}</MessageBox>
                            </div>
                        </div>
                :
                <div className="productListPage">
                    <div className="productListHeaderControls">
                        <div className="productListHeaderWrap">    
                            <div className="productListHeaderLeft" >
                                All Products
                            </div>

                            <div className="productListHeaderRight">
                                <Link to="/NewProduct" className="productListLinks">
                                    <button  className="productListHeaderAddBtn">
                                        <AddCircleOutlineSharp className="productListHeaderAddIcon"/>
                                        New 
                                    </button>
                                </Link>
                            </div>
                        </div> 
                    </div>

                    <div className="productList" style={{ height: 400, width: '100%' }}>
                        
                        <DataGrid
                            rows={products}
                            columns={columns}
                            getRowId={(row) => row._id} 
                            pageSize={10}
                            rowsPerPageOptions={[5, 10, 20]}
                            checkboxSelection
                            disableSelectionOnClick
                        />
                    </div>


                </div>
            }
        </>
    )
}
