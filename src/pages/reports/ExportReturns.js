import React, {Component} from 'react'
import {CSVLink} from "react-csv"
import LoadingBox from '../../components/loadingbox/LoadingBox';
import exportFromJSON from "export-from-json";


class  ExportReturns extends Component {
    constructor(props){ 
        super(props);
        this.state={
            data:[],
            loading:false
        }
        this.CSVLinkEle=React.createRef();
        this.headers=[
            {label:"ID", key: "id"},
            {label:"Customer Name", key: "customer_NAME"},
            {label:"Date ", key: "date"},
            {label:"Status", key: "STATUS"},
            {label:"RECEIVE STATUS", key: "RECEIVE_STATUS"},     
            {label:"REFUND STATUS", key: "REFUND_STATUS"},
            {label:"AMOUNT REFUNDED", key: "AMOUNT_REFUNDED"},
        ];

    
    } 

    getCustomerData=()=>{
        return fetch ("https://inventools.herokuapp.com/api/returns").then(res=>res.json())

    }
    downloadReports= async()=>{
        this.setState({loading:true, })
        const data= await this.getCustomerData(); 
        this.setState({data:data,loading:false},()=>{
            setTimeout(()=>{
                this.CSVLinkEle.current.link.click();
            })
        })

    }

    downloadXMLReports= async()=>{
        this.setState({loading:true, })
        const data= await this.getCustomerData(); 
        let exportType = 'xml';
        let filename='Vendors Exports'
        let  fieldsAsStrings = [
            "Username",
            "Primary Contact",
            "Company NAME",
            "Phone No",
            "Website",
            "AVATER",
            "Shipping Address",
            "Billing Address",
            "Status",]
        
        this.setState({data:data,loading:false},()=>{
            setTimeout(()=>{
                exportFromJSON({data, filename, fieldsAsStrings, exportType})
            })
        })

    }
    render(){
        const {data,loading}=this.state
    return (
        <div>
            {
                loading?
                (<LoadingBox></LoadingBox>):
                (
                    <input
                        className='exportImportLinks'
                        type="button"
                        value="Returns Sales XML"
                        onClick={this.downloadXMLReports}
                        disabled={loading}
                        data={data}
                        filename='Returns Sales Exports'
                        style={{marginRight:"100px"}}
                        
                    />
                )
            }
            {
                loading?
                (<LoadingBox></LoadingBox>):
                (
                    <input
                        className='exportImportLinks'
                        id='exportImportLinksRight'
                        type="button"
                        value="Returns CSV Exports"
                        onClick={this.downloadReports}
                        disabled={loading}
                        
                    />
                )
            }
            
                <CSVLink
                        hidden 
                         headers={this.headers}
                         className='exportImportLinks'
                         data={data}
                         filename='Returns Exports'
                         ref={this.CSVLinkEle}
                         
                         
                >Returns CSV Exports </CSVLink>
        </div>
    )
    }
}


export default ExportReturns;