import React, { useEffect, useState } from 'react'
import "./TransactionList.css"
import { Link } from 'react-router-dom'
import {DataGrid} from '@material-ui/data-grid';
import {DeleteRounded} from '@material-ui/icons';
import LoadingBox from '../../components/loadingbox/LoadingBox';
import MessageBox from '../../components/messagebox/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listTransactions } from '../../actions/transactionActions';
import { transactionRows } from './transactionData';

export default function TransactionList() {
    const dispatch= useDispatch();
    const transactionList= useSelector((state) => state.transactionList);
    const {loading, error, transactions}= transactionList

    useEffect(()=>{
        dispatch(listTransactions());
    },[dispatch]);





    const [data, setData]= useState(transactionRows)

    const handleDelete=(id)=>{
        setData(data.filter(item=>item.id !== id))
    };



    const StatusText=({Status})=>{
        return <div className={"productlistStatusTextColor "+ Status}>{Status}</div>
    }

    const columns = [
        { field: '_id', headerName: 'ID', width: 90 },
        {
          field: 'transaction_name',
          headerName: 'CUSTOMER',
          width: 190,
          renderCell:(param)=>{
              return(
                  <div className="transactionlistInfo">
                      <Link to={"/Transaction/"+param.row._id}  className="transactionlistInfo">
                        <img src={param.row.customer_AVATER} alt="transaction Img" className="transactionlistImg" />
                        {param.row.customer_NAME}
                      </Link>
                  </div>
              )
          }
        },
        {
            field: 'order_placed',
            headerName: 'ORDER DATE',
            editable: true, 
            width: 170,
        },
        {
            field: 'Shipping_Address',
            headerName: 'Address',
            editable: true, 
            width: 160,
          },
        {
          field: 'STATUS',
          headerName: 'STATUS',
          width: 150,
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
          field: 'VALUE',
          headerName: 'VALUE',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 170,
          renderCell:(param)=>{
            return(
                <div className="transactionlistInfo">
                    {param.row.VALUE}TL
                </div>
            )
        }
        },
        {
          field: 'actions',
          headerName: 'ACTIONS',
          width: 150,
          renderCell:(param)=>{
              return(
                <>
                    <Link to={"/Transaction/"+param.row._id}>
                        <button className="transactionListEditBtn">Edit</button>
                    </Link>
                    <DeleteRounded className="transactionListDeleteIcon" onClick={()=>handleDelete(param.row._id)}/>
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
                error?  <div className="customerPage">
                            <div className="MessageBoxcustomerPage">
                                <MessageBox  variant='danger'> {error}</MessageBox>
                            </div>
                        </div>
                :
                    <div className='transactionListPage'>
                        <div className="transactionListPage">
                            <div className="transactionListHeaderControls">
                                <div className="transactionListHeaderWrap">    
                                    <div className="transactionListHeaderLeft" onClick>
                                        All Transaction
                                    </div>

                                   
                                </div> 
                            </div>

                            <div className="transactionList" style={{ height: 400, width: '100%' }}>
                                
                                <DataGrid
                                    rows={transactions}
                                    columns={columns}
                                    getRowId={(row) => row._id} 
                                    pageSize={10}
                                    checkboxSelection
                                    disableSelectionOnClick
                                />
                            </div>


                        </div>
                    </div>
            }
        </>
    )
}

