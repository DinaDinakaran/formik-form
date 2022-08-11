import React, { useState,useEffect } from 'react'
import "./searchbar.css"
import axios from 'axios';
import {url} from "../../../App"
import { useNavigate } from 'react-router-dom';
//icons-search
import SearchIcon from '@mui/icons-material/Search';


function Searchbar() {
  const navigate = useNavigate()
    const [studata, setStudata] = useState([])
    async function value (){
       const allstu = await axios.get(url)
       setStudata(allstu.data)
     }
    
      useEffect(()=>{
    value();
      },[])
 const [query ,setQuery]= useState('')
  const handlechange =(id)=>{
    navigate(`/edit/${id}`)
    setQuery("")
  }

  return (
    <div>
        <div className="searchbar">
                <input type="text" placeholder='Search..' className="searchbox" onChange={e=>setQuery(e.target.value)} />
                <SearchIcon className='searchbtn'/>
                <div className="list">
                    <ul className="itemlist">
                        { query ?
                            studata.filter(ele=>ele.name.toLowerCase().includes(query))
                            .map(element=>{
                                return(
                                    <li className='listitem' >
                                      <button key={element.id} className="listitem" onClick={()=>handlechange(element.id)}>{element.name}</button>
                                    </li>
                                )
                            })
                            :null
                        }
                    </ul>
                </div>
              </div>
    </div>
  )
}

export default Searchbar