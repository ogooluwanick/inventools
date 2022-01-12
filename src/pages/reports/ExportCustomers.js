import React, {Component} from 'react'
import {CSVLink} from "react-csv"
import LoadingBox from '../../components/loadingbox/LoadingBox';
import exportFromJSON from "export-from-json";


class  ExportCustomers extends Component {
    constructor(props){ 
        super(props);
        this.state={
            data:[],
            loading:false
        }
        this.CSVLinkEle=React.createRef();
        this.headers=[
            {label:"Username", key: "USERNAME"},
            {label:"Full name ", key: "FullName"},
            {label:"Avater", key: "AVATER"},
            {label:"Email", key: "EMAIL"},
            {label:"Phone No", key: "Phone_No"},
            {label:"Status", key: "STATUS"},
            {label:"DOB", key: "DOB"},     
            {label:"Address", key: "Address"},
            {label:"Company", key: "Company"},
            {label:"Position", key: "Position"},
            {label:"Transaction Totals", key: "TRANSACTIONS_COUNT"},
        ];

    
    } 

    getCustomerData=()=>{
        return fetch ("https://inventools.herokuapp.com/api/customers").then(res=>res.json())

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
        let filename='Customer Exports'
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
                        value="Customers XML Exports"
                        onClick={this.downloadXMLReports}
                        disabled={loading}
                        data={data}
                        filename='Customers Exports'
                        
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
                        value="Customers CSV Exports"
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
                         filename='Customers Exports'
                         ref={this.CSVLinkEle}
                         
                         
                >Customers CSV Exports </CSVLink>
        </div>
    )
    }
}


export default ExportCustomers;