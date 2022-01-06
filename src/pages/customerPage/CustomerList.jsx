import React, { useEffect } from 'react'
import "./CustomerList.css"
import {DataGrid} from '@material-ui/data-grid';
import {DeleteRounded,AddCircleOutlineSharp} from '@material-ui/icons';
import {customerRows} from "./customerData"
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listCustomers } from '../../actions/customerActions';
import LoadingBox from '../../components/loadingbox/LoadingBox';
import MessageBox from '../../components/messagebox/MessageBox';



  




export default function CustomerList() {
    const dispatch= useDispatch();
    const customerList= useSelector((state) => state.customerList);
    const {loading, error, customers}= customerList


    useEffect(()=>{
        dispatch(listCustomers());
    },[dispatch]);



    const   [data,setData]= useState(customerRows)

    const handleDelete=(id)=>{
        setData(data.filter(item=>item.id !== id))
    };


    const StatusText=({Status})=>{
        return <div className={"productlistStatusTextColor "+ Status}>{Status}</div>
    }

    const columns = [
        { field: '_id', headerName: 'ID', width: 90 },
        {
          field: 'user',
          headerName: 'USER',
          width: 170,
          renderCell:(param)=>{
              return(
                  <div className="customerlistInfo">
                      <Link to={"/Customer/"+param.row._id} className="customerlistInfo">
                        <img src={param.row.AVATER} alt="user Img" className="customerlistImg" />
                        {param.row.USERNAME}
                      </Link>
                  </div>
              )
          }
        },
        {
          field: 'EMAIL',
          headerName: 'EMAIL',
          width: 170,
          editable: false,
        },
        {
            field: 'Phone_No',
            headerName: 'WORK PHONE',
            width: 160,
            editable: false,
          },
        {
          field: 'STATUS',
          headerName: 'STATUS',
          width: 130,
          editable: true,
          renderCell:(param)=>{
            return(
                <div className="transactionlistInfo">
                        <StatusText Status={param.row.STATUS}/>  
                </div>
                
            )
          }
        },
        {
          field: 'TRANSACTIONS_COUNT',
          headerName: 'TRANSACTIONS COUNT',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 200,
        },
        {
          field: 'actions',
          headerName: 'ACTIONS',
          width: 130,
          renderCell:(param)=>{
              return(
                <>
                    <Link to={"/Customer/"+param.row._id}>
                        <button className="UserListEditBtn">Edit</button>
                    </Link>
                    <DeleteRounded className="UserListDeleteIcon" onClick={()=>handleDelete(param.row._id)}/>
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
                                <LoadingBox ></LoadingBox>
                            </div>
                         </div>
                :
                error? <div className="customerPage">
                            <div className="MessageBoxcustomerPage">
                                <MessageBox  variant='danger'> {error}</MessageBox>
                            </div>
                        </div>
                :
                <div className="customerListPage">
                    <div className="customerListHeaderControls">
                        <div className="customerListHeaderWrap">    
                            <div className="customerListHeaderLeft" onClick>
                                All Customers
                            </div>

                            <div className="customerListHeaderRight">
                                <Link to="/NewCustomer">
                                    <button  className="customerListHeaderAddBtn">
                                        <AddCircleOutlineSharp className="customerListHeaderAddIcon"/>
                                        New 
                                    </button>
                                </Link>
                            </div>
                        </div> 
                    </div>

                    <div className="customerList" style={{ height: 400, width: '100%' }}>
                        
                        <DataGrid
                            rows={customers}
                            columns={columns}
                            getRowId={(row) => row._id} 
                            pageSize={10}
                            checkboxSelection
                            disableSelectionOnClick
                        />
                    </div>

                    
                    

                    
                </div>

            }
        </>
    )
}
