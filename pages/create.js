import Image from 'next/image'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import { useState } from 'react'

//Contract Address
import { ContractAddress } from '../config'

//ABI
import CrypTripABI from '../ABI/CrypTripABI.json'

const Create = () => {
    const [nftName, setNFT] = useState("")

    console.log(nftName);

    const CreateNFT = async() => {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)    
        const signer = provider.getSigner()

        let contract = new ethers.Contract(ContractAddress, CrypTripABI, signer)
        //let transaction = await contract.createHotel('Manav', 'abc', 123, 'Manali', 123, 10, 9, 7, 2000, 5000, 7000)
        let transaction = await contract.search(nftName)
        console.log(transaction)
        // let tx = await transaction.wait()

        // console.log(tx)

        // const price = ethers.utils.parseUnits(formInput.price, 'ether')
  
        /* then list the item for sale on the marketplace */
        // contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
        // transaction = await contract.createMarketItem(nftaddress, tokenId, price, { value: listingPrice })
        // await transaction.wait()
        // router.push('/')
    }

    return(
        <div className='standings'>
            <div className="img">
                <Image src="/images/Artboard31.jpg" width={1924} height={414}/>
                <div className='standing'>
                    CREATE NFTS
                </div>
                <div className='content-create'>
                    <div className='options'>
                        <div><input className = "custom-file-input" type="file" /></div>
                       <div> <input className='text' type="text" onChange={(e)=>{ setNFT(e.target.value) }} placeholder="Your name.." ></input></div>
                       <div> <input className='text' type="text" placeholder="Description.."></input></div>
                       <div> <input className='text' type="text" placeholder="Price.."></input></div>
                       <div><button className='upload-btn' onClick={ ()=>{ CreateNFT(nftName) } } >Submit</button></div>
                    </div>
                    <div className='examples'>
                        <div className='corrousal'>
                        <Image src="/images/Artboard32.png" width={500} height={219}/>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
export default Create;