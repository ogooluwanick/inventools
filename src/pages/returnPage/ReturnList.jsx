import React, { useEffect, useState } from 'react'
import "./ReturnList.css"
import { Link } from 'react-router-dom'
import {DataGrid} from '@material-ui/data-grid';
import {DeleteRounded,AddCircleOutlineSharp} from '@material-ui/icons';
import LoadingBox from '../../components/loadingbox/LoadingBox';
import MessageBox from '../../components/messagebox/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listReturns } from '../../actions/returnActions';

export default function ReturnList() {
    const dispatch= useDispatch();
    const returnList= useSelector((state) => state.returnList);
    const {loading, error, returns}= returnList

    useEffect(()=>{
        dispatch(listReturns());
    },[dispatch]);





    const [data, setData]= useState({/*returnRows*/})

    const handleDelete=(id)=>{
        setData(data.filter(item=>item.id !== id))
    };



    const StatusText=({Status})=>{
        return <div className={"productlistStatusTextColor "+ Status}>{Status}</div>
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'customer_NAME',
          headerName: 'CUSTOMER NAME',
          width: 190,
          renderCell:(param)=>{
              return(
                  <div className="returnlistInfo">
                      <Link to={"/Return/"+param.row.id}  className="returnlistInfo">
                        {param.row.customer_NAME}
                      </Link>
                  </div>
              )
          }
        },
        {
            field: 'date',
            headerName: 'DATE',
            editable: true, 
            width: 150,
        },
        {
            field: 'transactionID',
            headerName: 'TRANSACTION#',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 150,
          
          },
        
        {
          field: 'STATUS',
          headerName: 'STATUS',
          width: 130,
          editable: true,
          renderCell:(param)=>{
            return(
                <div className="returnlistInfo">
                        <StatusText Status={param.row.STATUS}/>  
                </div>
                
            )
          }
        },

        {
            field: 'RECEIVE_STATUS',
            headerName: 'RECEIVE STATUS',
            width: 130,
            editable: true,
            renderCell:(param)=>{
              return(
                  <div className="returnlistInfo">
                          <StatusText Status={param.row.RECEIVE_STATUS}/>  
                  </div>
                  
              )
            }
          },

          {
            field: 'REFUND_STATUS',
            headerName: 'REFUND STATUS',
            width: 130,
            editable: true,
            renderCell:(param)=>{
              return(
                  <div className="returnlistInfo">
                          <StatusText Status={param.row.REFUND_STATUS}/>  
                  </div>
                  
              )
            }
          },
          {
            field: 'AMOUNT_REFUNDED',
            headerName: 'AMOUNT REFUNDED',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 170,
          
          },
        
        {
          field: 'actions',
          headerName: 'ACTIONS',
          width: 140,
          renderCell:(param)=>{
              return(
                <>
                    <Link to={"/Return/"+param.row.id}>
                        <button className="returnListEditBtn">Edit</button>
                    </Link>
                    <DeleteRounded className="returnListDeleteIcon" onClick={()=>handleDelete(param.row.id)}/>
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
                    <div className='returnListPage'>
                        <div className="returnListPage">
                            <div className="returnListHeaderControls">
                                <div className="returnListHeaderWrap">    
                                    <div className="returnListHeaderLeft" onClick>
                                        All Returns
                                    </div>

                                    <div className="returnListHeaderRight">
                                        <Link to="/NewReturn" className="returnListLinks">
                                            <button  className="returnListHeaderAddBtn">
                                                <AddCircleOutlineSharp className="returnListHeaderAddIcon"/>
                                                New 
                                            </button>
                                        </Link>
                                    </div>
                                </div> 
                            </div>

                            <div className="returnList" style={{ height: 400, width: '100%' }}>
                                
                                <DataGrid
                                    rows={returns}
                                    columns={columns}
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

