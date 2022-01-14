import React, { useEffect } from 'react'
import "./UserList.css"
import { Link } from 'react-router-dom';
import {DataGrid} from '@material-ui/data-grid';
import {AddCircleOutlineSharp} from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../../components/loadingbox/LoadingBox';
import MessageBox from '../../components/messagebox/MessageBox';
import { listUsers } from '../../actions/userActions';




export default function UserList() {
    const dispatch =useDispatch();
    const userList =useSelector((state) => state.userList);
    const { loading, error, users}= userList


    useEffect(()=>{
        dispatch(listUsers());
    },[dispatch]);




    // const [data, setData]= useState(productRows)

    // const handleDelete=(id)=>{
    //     setData(data.filter(item=>item.id !== id))
    // };


    const StatusText=({Status})=>{
        return <div className={"productlistStatusTextColor "+ Status}>{Status}</div>
    }
    


    
     
   

    const columns = [
        { field: '_id', headerName: 'ID', width: 200 },
        {
            field: 'username',
            headerName: 'USERNAME',
            width: 200,
            renderCell:(param)=>{
                return(
                    <div className="productlistInfo">
                            <img src={param.row.avater} alt="product Img" className="productlistImg" />
                            {param.row.username}
                     </div>
                )
            }
        },
        {
          field: 'name',
          headerName: 'FULL NAME',
          width: 200,
        },
        
        {
          field: 'email',
          headerName: 'EMAIL',
          width: 200,
        },
        {
            field: 'isAdmin',
            headerName: 'ADMIN STATUS',
            width: 200,
            renderCell:(param)=>{
              return(
                  <div className="transactionlistInfo">
                          <StatusText Status={String(param.row.isAdmin)}>{String(param.row.isAdmin)}</StatusText>
                  </div>
              )}
  
        },
       
  
        {/*
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
        */},
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
                                <Link to="/register" className="productListLinks">
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
                            rows={users}
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
