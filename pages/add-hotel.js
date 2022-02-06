import React from "react";
import { useState } from "react";
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'

//Contract Address
import { ContractAddress } from '../config'

//ABI
import CrypTripABI from '../ABI/CrypTripABI.json'

const AddHotel = () => {
    const [name, funName] = useState("") 
    const [Address, funAddress] = useState("") 
    const [Pincode, funPincode] = useState("") 
    const [City, funCity] = useState("")
    const [Contact, funContact] = useState("")
    const [p2, fun2Person] = useState("") 
    const [p3, fun3Person] = useState("")
    const [p5, fun5Person] = useState("")
    const [pr2, fun2Price] = useState("") 
    const [pr3, fun3Price] = useState("")
    const [pr5, fun5Price] = useState("")
    // console.log(name)
    // console.log(Address)
    // console.log(Pincode)
    // console.log(p2)

    const CreateHotel = async() => {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)    
        const signer = provider.getSigner()

        let contract = new ethers.Contract(ContractAddress, CrypTripABI, signer)
        let transaction = await contract.createHotel(name, Address, Number(Pincode), City, Number(Contact), Number(p2), Number(p3), Number(p5), Number(pr2), Number(pr3), Number(pr5))
        console.log(transaction)
        alert("Hotel Added")
    }


    return(
        <div className="body">
                <div className="navbar"></div>
                <div className="content-form">
                    <div className="cont">
                        <div className="ins"><input type="text" className="text" placeholder="Enter hotel name" onChange={(e)=>{ funName(e.target.value) }}></input> </div>
                        <div className="ins"><textarea rows="10" className="text" placeholder="Enter hotel Address" onChange={(e)=>{ funAddress(e.target.value) }}></textarea> </div>
                        
                        <div className="ins"><input type="number" className="text"  placeholder="Enter  Pincode" onChange={(e)=>{ funPincode(e.target.value) }}></input> </div>
                    
                        <div className="ins"><input type="text" className="text" placeholder="Enter City name" onChange={(e)=>{ funCity(e.target.value) }}></input> </div>

                        <div className="ins"><input type="number" className="text" placeholder="Enter Contact Number" onChange={(e)=>{ funContact(e.target.value) }}></input> </div>
                    
                        <div>
                            <div className="ins"><input type="number" className="text" placeholder="Room 2 person" onChange={(e)=>{ fun2Person(e.target.value) }}/></div>
                            <span className="ins"><input type="number" className="text" placeholder="Price" onChange={(e)=>{ fun2Price(e.target.value) }}></input></span>
                        </div>
                        <div className="Room3">
                            <div><input type="number" className="text" placeholder="Room 3 person" onChange={(e)=>{ fun3Person(e.target.value) }}/></div>
                            <span><input type="number" className="text" placeholder="Price" onChange={(e)=>{ fun3Price(e.target.value) }}></input></span>
                        </div>
                        <div>
                            <div className="ins"><input type="number" className="text" placeholder="Room 5 person" onChange={(e)=>{ fun5Person(e.target.value) }}/></div>
                            <span className="ins"><input type="number" className="text" placeholder="Price" onChange={(e)=>{ fun5Price(e.target.value) }}></input></span>
                        </div>
                        <div>
                        <button className="btn2" onClick={()=>{ CreateHotel(); }} >Add Hotel</button>
                        </div>
                    </div>
                </div>
        </div>
    )
}
export default AddHotel;