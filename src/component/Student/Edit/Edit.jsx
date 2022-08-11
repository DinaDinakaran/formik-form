import React, { useState, useEffect } from 'react'
import {url } from "../../../App"
import { useParams, useNavigate } from "react-router-dom"
import "./edit.css"
import axios from 'axios'

export default function Edit() {
  const navigate = useNavigate()
  const params = useParams();
  const id = params.id
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState(0)
  const [age, setAge] = useState(0)
  const [rank, setRank] = useState(0)
  const [name, setName] = useState('')

  
  
  async function value (){
  const result = await axios.get(url+"/"+id)
  
  setEmail(result.data.email)
  setPhone(result.data.phone)
  setAge(result.data.age)
  setRank(result.data.rank)
  setName(result.data.name)
}

useEffect(() => {
value();
}, [])




const handleupdate = async() => {
  await axios.put(`${url}/${id}`,  {
    name,
    email,
    age,
    phone,
    rank
  })
  navigate("/allstudents")
}

  return (
    <div className='Edit'>
      <>
        <label className='title'>Name:</label><br />
        <input className='inputval' type="text" value={name} onChange={(e) => setName(e.target.value)} /><br />
        <label className='title'>Email:</label><br />
        <input className='inputval' type="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
        <label className='title'>Age:</label><br />
        <input className='inputval' type="number" value={age} onChange={(e) => setAge(e.target.value)} /><br />
        <label>phon Number:</label><br />
        <input className='inputval' type="text" value={phone} onChange={(e) => setPhone(e.target.value)} /><br />
        <label className='title'>Rank:</label><br />
        <input className='inputval' type="text" value={rank} onChange={(e) => setRank(e.target.value)} />
        <br />
        <button className='submit-btn' onClick={() => handleupdate()}>Update</button>
      </>

    </div>
  )
}
