import React, {Component} from 'react'
import {CSVLink} from "react-csv"
import LoadingBox from '../../components/loadingbox/LoadingBox';
import exportFromJSON from "export-from-json";



class  ExportUser extends Component {
    constructor(props){ 
        super(props);
        this.state={
            data:[],
            loading:false
        }
        this.CSVLinkEle=React.createRef();
        this.headers=[
            {label:"Full name", key: "name"},
            {label:"Username", key: "username"},
            {label:"Avater", key: "avater"},
            {label:"Email", key: "email"},
            {label:"isAdmin", key: "isAdmin"},
            {label:"createdAt", key: "createdAt"},
            {label:"updatedAt", key: "updatedAt"},     
            
        ];

    
    } 

    getUsersData=()=>{
        return fetch ("https://inventools.herokuapp.com/api/users/seed").then(res=>res.json())

    }
    downloadReports= async()=>{
        this.setState({loading:true, })
        const data= await this.getUsersData(); 
        
       
        this.setState({data:data,loading:false},()=>{
            setTimeout(()=>{
                this.CSVLinkEle.current.link.click();
            })
        })

    }


    downloadXMLReports= async()=>{
        this.setState({loading:true, })
        const data= await this.getUsersData(); 
        let exportType = 'xml';
        let filename='Users Exports'
        let  fieldsAsStrings = [
            "Full name",
            "Username",
            "Avater",
            "Email",
            "isAdmin",
            "AVATER",
            "createdAt",
            "updatedAt",
           ] 
            
        
        this.setState({data:data,loading:false},()=>{
            setTimeout(()=>{
                exportFromJSON({data, filename, fieldsAsStrings, exportType})
            })
        })

    }

    render(){
        const {data,loading}=this.state
    return (
        <div className='reportBtnStylSpace'>
            {
                loading?
                (<LoadingBox></LoadingBox>):
                (
                    <input
                        className='exportImportLinks'
                        type="button"
                        value="Users XML Exports"
                        onClick={this.downloadXMLReports}
                        disabled={loading}
                        data={data}
                        filename='Users Exports'
                        
                        
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
                        value="Users CSV Exports"
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
                         filename='Users Exports'
                         ref={this.CSVLinkEle}
                         
                         
                >Users CSV Exports </CSVLink>
        </div>
    )
    }
}


export default ExportUser;