import { useEffect } from "react";
import useQuery from "../hooks/useQuery";

import React from "react";
import { useState } from "react";
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import { useRouter } from "next/router";

//Contract Address
import { ContractAddress } from '../../config'

//ABI
import CrypTripABI from '../../ABI/CrypTripABI.json'

const searches = () => {
    
    const query = useQuery()
    const [loading, setLoading] = useState(true)
    const [sHotel, setSingleHotel] = useState([])

    const [room2tot, setRoom2Tot] = useState(0)
    const [room3tot, setRoom3Tot] = useState(0)
    const [room5tot, setRoom5Tot] = useState(0)

    const [room2count, setRoom2Count] = useState(0)
    const [room3count, setRoom3Count] = useState(0)
    const [room5count, setRoom5Count] = useState(0)

    const [checkIn, setCheckIn] = useState(0)
    const [checkOut, setCheckOut] = useState(0)

    const [hotelId, setHotelId] = useState(0)

    const [Total, setTotal] = useState(0)


    useEffect(()=>{
        //console.log(query);
        const hotelData = singleHotel(query).then((result) => {
      console.log(result);
      return result;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
        console.log(hotelData)
    },[query])

    const singleHotel = async(query) => {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)    
        const signer = provider.getSigner()

        let contract = new ethers.Contract(ContractAddress, CrypTripABI, signer)
        let transaction = await contract.hotel(query)
        console.log(transaction)

        var hotelData = {}

        hotelData = {
            id : transaction.Id.toNumber(),
            name : transaction.name,
            address : transaction.addr,
            city : transaction.city,
            contact : transaction.contactNumber.toNumber(),
            name : transaction.name,
            owner : transaction.ownerAddr,
            pincode : transaction.pincode.toNumber(),
            room5 : transaction.roomsFive.toNumber(),
            room5price : transaction.roomsFivePrice.toNumber(),
            room3 : transaction.roomsThree.toNumber(),
            room3price : transaction.roomsThreePrice.toNumber(),
            room2 : transaction.roomsTwo.toNumber(),
            room2price : transaction.roomsTwoPrice.toNumber(),
        }
        // return hotelData;
        setSingleHotel(hotelData);
        setHotelId(hotelData.id)
    }

    const setRoom2Price = (e) => {
        const value = parseInt(e.target.value);

        setRoom2Count(value)

        const totalPrice = sHotel.room2price;

        const total = value * totalPrice;

        // console.log(total)

        setRoom2Tot(total)
    }

    const setRoom3Price = (e) => {
        const value = parseInt(e.target.value);

        setRoom3Count(value)

        const totalPrice = sHotel.room3price;

        const total = value * totalPrice;

        // console.log(total)

        setRoom3Tot(total)
    }

    const setRoom5Price = (e) => {
        const value = parseInt(e.target.value);

        setRoom5Count(value)

        const totalPrice = sHotel.room5price;

        const total = value * totalPrice;

        // console.log(total)

        setRoom5Tot(total)
    }

    const setCheckInDate = (e) => {
        const value = new Date();

        // console.log(value)

        const epoch = value.getTime();

        setCheckIn(epoch);
    }

    const setCheckOutDate = (e) => {
        const value = new Date();

        // console.log(value)

        const epoch = value.getTime();

        const newTime = epoch + 86400000;

        setCheckOut(newTime);
    }

    const BookHotel = async() => {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)    
        const signer = provider.getSigner()

        const hId = hotelId;

        const TotalPrice = room2tot + room3tot + room5tot

        setTotal(TotalPrice)

        console.log(hId, checkIn, checkOut, room2count, room3count, room5count, sHotel.contact, TotalPrice)

        let contract = new ethers.Contract(ContractAddress, CrypTripABI, signer)

        let transaction = await contract.bookHotel(hId, checkIn, checkOut, room2count, room3count, room5count, sHotel.contact, { value: TotalPrice } )
        // console.log(transaction)
        
        alert("Booked Successfully")
    }

    return(
        <div>
            <div className="navbar">
            </div>
            <div className="hotel-details" style={{ margin:'0 auto', width:'80%', background:'#f29100', textAlign:'center' }}>
                <div className="hotel-align">
                    <div className="hotel-name" style={{ fontSize: '20px', padding:'10px'  }}>
                        {sHotel.name}
                    </div>
                    <div className="hotel-name"  style={{ fontSize: '20px', padding:'10px'  }}>
                        {sHotel.address}
                    </div>
                    <div className="hotel-city"  style={{ fontSize: '20px', padding:'10px'  }}>
                        {sHotel.city}
                    </div>
                    <div className="hotel-2-rooms"  style={{ fontSize: '18px', padding:'10px', display:'flex', alignItems:'center', alignContent:'center'  }}>
                        <div className="hotel-2-room-title" style={{padding:'0 10px'}}>
                            2 Person Rooms Current Availability
                        </div>
                        <div className="hotel-2-room-avail" style={{padding:'0 10px'}}>
                            {sHotel.room2}
                        </div>
                        <div className="hotel-2-room-input" style={{padding:'0 10px'}}>
                            <input type="number" placeholder="Enter number of rooms..." onChange={(e)=>{ setRoom2Price(e) }} />
                        </div>
                        <div>
                            {room2tot}💵 
                        </div>
                    </div>
                    <div className="hotel-3-rooms"  style={{ fontSize: '18px', padding:'10px', display:'flex', alignItems:'center', alignContent:'center'  }}>
                        <div className="hotel-3-room-title" style={{padding:'0 10px'}}>
                            3 Person Rooms Current Availability
                        </div>
                        <div className="hotel-3-room-avail" style={{padding:'0 10px'}}>
                            {sHotel.room3}
                        </div>
                        <div className="hotel-3-room-input" style={{padding:'0 10px'}}>
                            <input type="number" placeholder="Enter number of rooms..." onChange={(e)=>{ setRoom3Price(e) }} />
                        </div>
                        <div>
                            {room3tot}💵
                        </div>
                    </div>
                    <div className="hotel-5-rooms"  style={{ fontSize: '18px', padding:'10px', display:'flex', alignItems:'center', alignContent:'center'  }}>
                        <div className="hotel-5-room-title" style={{padding:'0 10px'}}>
                            5 Person Rooms Current Availability
                        </div>
                        <div className="hotel-5-room-avail" style={{padding:'0 10px'}}>
                            {sHotel.room5}
                        </div>
                        <div className="hotel-5-room-input" style={{padding:'0 10px'}}>
                            <input type="number" placeholder="Enter number of rooms..." onChange={(e)=>{ setRoom5Price(e) }} />
                        </div>
                        <div>
                            {room5tot}💵
                        </div>
                    </div>
                    <div className="checkin" style={{ fontSize: '18px', padding:'10px', display:'flex', alignItems:'center', alignContent:'center'  }}>
                        <div style={{padding:'0 10px'}}>
                            Checkin Date:
                        </div>
                        <div style={{padding:'0 10px'}}>
                            <input type="date" onChange={(e)=>{ setCheckInDate(e) }} />
                        </div>
                    </div>
                    <div className="checkout" style={{ fontSize: '18px', padding:'10px', display:'flex', alignItems:'center', alignContent:'center'  }}>
                        <div style={{padding:'0 10px'}}>
                            Checkout Date:
                        </div>
                        <div style={{padding:'0 10px'}}>
                            <input type="date" onChange={(e)=>{ setCheckOutDate(e) }} />
                        </div>
                    </div>
                    <div className="submit">
                        <button className="book-btn" onClick={()=>{ BookHotel() }} style={{ margin:"20px", padding: '10px' }} >Book Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default searches;