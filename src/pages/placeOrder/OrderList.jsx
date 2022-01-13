import React, { useEffect, useState } from 'react'
import "./OrderList.css"
import { Link } from 'react-router-dom';
import {DataGrid} from '@material-ui/data-grid';
import {DeleteRounded,AddCircleOutlineSharp} from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../../components/loadingbox/LoadingBox';
import MessageBox from '../../components/messagebox/MessageBox';
import { listOrders } from '../../actions/orderActions';
import { productRows } from '../productPage/productData';




export default function OrderList() {
    const dispatch =useDispatch();
    const orderList =useSelector((state) => state.orderList);
    const { loading, error, orders}= orderList


    useEffect(()=>{
        dispatch(listOrders());
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
                    <Link to={"/order/"+param.row._id}  className="productlistInfo">
                        
                        {param.row.orderItems.map((ProductImgs)=>(
                            <img src={ProductImgs.img} alt="product Img" className="productlistImg" />
                               
                        ))}
                        
                    </Link>
                  </div>
              )
          }
        },
        {
            field: 'user',
            headerName: 'USER',
            width: 200,
        },
        {
            field: 'shippingAddress',
            headerName: 'ADDRESS',
            editable: true, 
            width: 150,
            renderCell:(param)=>{
                return(
                    <div className="productlistInfo">
                      {param.row.shippingAddress.address},
                                        {param.row.shippingAddress.city} ,
                                        {param.row.shippingAddress.postCode},
                                        {param.row.shippingAddress.country} <br />
                    </div>
                )
            }
          },
        {
          field: 'paymentMethod',
          headerName: 'PAYMENT METHOD',
          width: 160,
        },
        {
            field: 'isPaid',
            headerName: 'PAYMENT STATUS',
            width: 160,
            renderCell:(param)=>{
              return(
                  <div className="transactionlistInfo">
                          <StatusText Status={String(param.row.isPaid)}>{String(param.row.isPaid)}</StatusText>
                  </div>
              )}
  
        },
        {
            field: 'isDelivered',
            headerName: 'DELIVERY STATUS',
            width: 160,
            renderCell:(param)=>{
              return(
                  <div className="transactionlistInfo">
                          <StatusText Status={String(param.row.isDelivered)}>{String(param.row.isDelivered)}</StatusText>
                  </div>
              )}
  
        },

        {
          field: 'totalPrice',
          headerName: 'PRICE',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 150,
          renderCell:(param)=>{
            return(
                <div className="transactionlistInfo">
                    {param.row.totalPrice}TL
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
                    <Link to={"/order/"+param.row._id}>
                        <button className="productListEditBtn">View</button>
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
                                All Orders
                            </div>

                            <div className="productListHeaderRight">
                                <Link to="/cart" className="productListLinks">
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
                            rows={orders}
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
