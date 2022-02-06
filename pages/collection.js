import Image from 'next/image'
const Collection = () => {
    return(
        <div className='standings'>
        <div className="img">
            <Image src="/images/Artboard39.jpg" width={1924} height={414}/>
            <div className='user-info'>
              MY COLLECTION
            </div>
            <div className='content-mc'>
                <div className='nft-owned'>
                    NFTS'S owned
                </div>
                <div className='nfts'>
                    <span className='img1'><Image src="/images/Artboard20.jpg" width={109} height={106}/></span>
                    <span className='img1'><Image src="/images/Artboard21.jpg" width={109} height={106}/></span>
                    <span className='img1'><Image src="/images/Artboard22.jpg" width={109} height={106}/></span>
                    <span className='img1'><Image src="/images/Artboard23.jpg" width={109} height={106}/></span>
                </div>
                <div className='nft-owned'>
                    NFTS'S Created
                </div>
                <div className='nfts-created'>
                    <span><Image src="/images/Artboard 40.jpg" width={300} height={200}/></span>
                    <span><Image src="/images/Artboard 42.jpg" width={300} height={200}/></span>
                    <span><Image src="/images/Artboard 43.jpg" width={300} height={200}/></span>
                    <span><Image src="/images/Artboard 45.jpg" width={300} height={200}/></span>
                    <span><Image src="/images/Artboard 44.jpg" width={300} height={200}/></span>
                </div>
            </div>
        </div>
        
    </div>
    )
}

export default Collection;