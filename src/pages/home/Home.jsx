import React, { useEffect } from 'react'
import Chart from '../../components/chart/Chart'
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo'
import "./Home.css"
import WidgetLarge from '../../components/widget/WidgetLarge'
import WidgetSmall from '../../components/widget/WidgetSmall'
import { useDispatch, useSelector } from 'react-redux'
import { listCustomerActivityData } from '../../actions/customerActivityDataActions'
import LoadingBox from '../../components/loadingbox/LoadingBox'
import MessageBox from '../../components/messagebox/MessageBox'


export default function Home() {
    const dispatch= useDispatch();
    const customerActivityDataList= useSelector((state) => state.customerActivityDataList);
    const {loading, error, customersActivityData}= customerActivityDataList


    useEffect(()=>{
        dispatch(listCustomerActivityData());
    },[dispatch]);



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
                <div className="homeMain">
                    <FeaturedInfo/>
                    <Chart data={customersActivityData}
                        title="Customer Analytics"
                        grid  
                        dataKey="month"/>

                    <div className="homeWidget">
                        <WidgetSmall/>
                        <WidgetLarge/>
                        
                    </div>
                    
                </div>  

            }
        </>
    )
}
