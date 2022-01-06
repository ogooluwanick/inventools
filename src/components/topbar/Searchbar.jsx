import React,{useState} from 'react'
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';


export default function Searchbar({placeholder, data}) {
    const [filteredData, setFilteredData]=useState([]);
    const [wordEntered, setwordEntered]=useState("");

    const handleFilter=(event)=>{
        const searchWord= event.target.value
        setwordEntered(searchWord);
        const newFilter= data.filter((value)=>{
            return value.title.toLowerCase().includes(searchWord.toLowerCase())
        });

        if (searchWord===""){
            setFilteredData([]);
        }
        else {
        setFilteredData(newFilter);
        }
    };

    const clearInput=()=>{
        setFilteredData([]);
        setwordEntered("")
    };


    return (
        <div className='searchBar'>
            <div className="searchInput">
                <input type="text" placeholder={placeholder} data={data} onChange={handleFilter} value={wordEntered}/>
                <div className="searchIcon"> {filteredData.length===0 ? <SearchIcon ></SearchIcon> : <CloseIcon id='clearBtn' onClick={clearInput}></CloseIcon> }
                </div>
                
            </div>
            {filteredData.length !== 0 && (
            <div className="dataResult">
                {
                    filteredData.slice(0,15).map((value,key)=>{
                        return <Link to={value.link}>
                       
                            <p className="dataItem"> {value.title}</p>
                        
                        </Link>
                })}
            </div>
            )}
        </div>
    );
}
