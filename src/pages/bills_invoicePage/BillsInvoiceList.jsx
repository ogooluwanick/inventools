import React, { useEffect, useState } from 'react'
import "./BillsInvoiceList.css"
import { Link } from 'react-router-dom'
import {DataGrid} from '@material-ui/data-grid';
import {DeleteRounded,AddCircleOutlineSharp} from '@material-ui/icons';
import LoadingBox from '../../components/loadingbox/LoadingBox';
import MessageBox from '../../components/messagebox/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listVendors } from '../../actions/vendorActions';

export default function BillsInvoiceList() {
    const dispatch= useDispatch();
    const vendorList= useSelector((state) => state.vendorList);
    const {loading, error, vendors}= vendorList

    useEffect(()=>{
        dispatch(listVendors());
    },[dispatch]);





    const [data, setData]= useState({/*vendorRows*/})

    const handleDelete=(id)=>{
        setData(data.filter(item=>item.id !== id))
    };



    const StatusText=({Status})=>{
        return <div className={"productlistStatusTextColor "+ Status}>{Status}</div>
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        {
          field: 'company_USERNAME',
          headerName: 'COMPANY NAME',
          width: 210,
          renderCell:(param)=>{
              return(
                  <div className="vendorlistInfo">
                      <Link to={"/Vendor/"+param.row.id}  className="vendorlistInfo">
                        <img src={param.row.company_AVATER} alt="vendor Img" className="vendorlistImg" />
                        {param.row.company_NAME}
                      </Link>
                  </div>
              )
          }
        },
        {
            field: 'company_EMAIL',
            headerName: 'EMAIL',
            editable: true, 
            width: 190,
        },
        {
            field: 'phone_No',
            headerName: 'COMPANY PHONE',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 170,
            renderCell:(param)=>{
              return(
                  <div className="vendorlistInfo">
                      +{param.row.phone_No}
                  </div>
              )
          }
          },
        {
            field: 'Shipping_Address',
            headerName: 'Address',
            editable: true, 
            width: 170,
          },
        {
          field: 'STATUS',
          headerName: 'STATUS',
          width: 130,
          editable: true,
          renderCell:(param)=>{
            return(
                <div className="vendorlistInfo">
                        <StatusText Status={param.row.STATUS}/>  
                </div>
                
            )
          }
        },
        
        {
          field: 'actions',
          headerName: 'ACTIONS',
          width: 140,
          renderCell:(param)=>{
              return(
                <>
                    <Link to={"/Vendor/"+param.row.id}>
                        <button className="vendorListEditBtn">Edit</button>
                    </Link>
                    <DeleteRounded className="vendorListDeleteIcon" onClick={()=>handleDelete(param.row.id)}/>
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
                    <div className='vendorListPage'>
                        <div className="vendorListPage">
                            <div className="vendorListHeaderControls">
                                <div className="vendorListHeaderWrap">    
                                    <div className="vendorListHeaderLeft" onClick>
                                        All Vendor
                                    </div>

                                    <div className="vendorListHeaderRight">
                                        <Link to="/NewVendor" className="vendorListLinks">
                                            <button  className="vendorListHeaderAddBtn">
                                                <AddCircleOutlineSharp className="vendorListHeaderAddIcon"/>
                                                New 
                                            </button>
                                        </Link>
                                    </div>
                                </div> 
                            </div>

                            <div className="vendorList" style={{ height: 400, width: '100%' }}>
                                
                                <DataGrid
                                    rows={vendors}
                                    columns={columns}
                                    pageSize={10}
                                    checkboxSelection
                                    disableSelectionOnClick
                                />
                            </div>
                            <br /> <br />

                            
                            <div className="vendorListHeaderControls">
                                <div className="vendorListHeaderWrap">    
                                    <div className="vendorListHeaderLeft" onClick>
                                        All Vendor
                                    </div>

                                    <div className="vendorListHeaderRight">
                                        <Link to="/NewVendor" className="vendorListLinks">
                                            <button  className="vendorListHeaderAddBtn">
                                                <AddCircleOutlineSharp className="vendorListHeaderAddIcon"/>
                                                New 
                                            </button>
                                        </Link>
                                    </div>
                                </div> 
                            </div>

                            <div className="vendorList" style={{ height: 400, width: '100%' }}>
                                
                                <DataGrid
                                    rows={vendors}
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

