import React from "react";
import { useState } from "react";
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import { useRouter } from "next/router";

//Contract Address
import { ContractAddress } from '../config'

//ABI
import CrypTripABI from '../ABI/CrypTripABI.json'

const Booking = () => {

    const router = useRouter();

    const [hotelName, setHotel] = useState("")
    const [allHotels, setAllHotels] = useState([])
    const [loading, setLoading] = useState(true)
    
    const searchHotel = async() => {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)    
        const signer = provider.getSigner()

        let contract = new ethers.Contract(ContractAddress, CrypTripABI, signer)
        let transaction = await contract.search(hotelName)
        const hotelData = await Promise.all(transaction.map(async(i)=>{
            // console.log(i.id)
            const Hotels = await contract.hotel(i.id)
            var allHotels = {}

            console.log(Hotels)
            // var roomNumber = Hotels.roomsFive
            // console.log(Hotels.roomsFive.toNumber())

            allHotels = {
                id : i.id,
                name : Hotels.name,
                address : Hotels.addr,
                city : Hotels.city,
                contact : Hotels.contactNumber.toNumber(),
                name : Hotels.name,
                owner : Hotels.ownerAddr,
                pincode : Hotels.pincode.toNumber(),
                room5 : Hotels.roomsFive.toNumber(),
                room5price : Hotels.roomsFivePrice.toNumber(),
                room3 : Hotels.roomsThree.toNumber(),
                room3price : Hotels.roomsThreePrice.toNumber(),
                room2 : Hotels.roomsTwo.toNumber(),
                room2price : Hotels.roomsTwoPrice.toNumber(),
            }

            console.log(allHotels)

            return allHotels;
        }))

        setLoading(false)

        setAllHotels(hotelData);
        // const id = transaction[id];
        // console.log(id)
    }
    return(
        <div>
            <div className="navbar">
            </div>
            
               <div className="search-bar"> 
                   <input  type="text" className="text" onChange={(e) => { setHotel(e.target.value)  }} placeholder="Search hotel here" ></input> <br/>
                   <button className="btn3" onClick={() => {searchHotel()}}>Search</button>
                </div>
                
                <div>
                    {
                        loading === true && !allHotels.length ? 
                            <div style={{ padding:'20px', fontSize:"30px" }}>No hotels to display</div>
                        :
                            <div className="all-hotels">
                                <div className="single-hotel">
                                    {
                                        allHotels.map( (hotel, i) => (
                                            <div className="single" onClick={()=>{ router.push(`/Hotels/${hotel.id}`) } } key={i}>
                                                {hotel.name}
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                    }
                </div>
        </div>
    )
}
export default Booking;