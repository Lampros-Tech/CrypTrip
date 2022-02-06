import Image from 'next/image'
const Userinfo = () => {
    return(
        <div className='standings'>
            <div className="img">
                <Image src="/images/Artboard47.jpg" width={1924} height={414}/>
                <div className='user-info'>
                    USER-INFO
                </div>
                <div className='content'>
                    <div className='leadderboard'>
                        <div className='heading'>
                            <div className='rank'>Rank</div>
                            <div className='rank'>Username</div>
                            <div className='rank'>Level</div>
                        </div>
                        <div className='containers'>
                            <div className='rank-c'>
                                1st
                            </div>
                            <div className='username-c'>
                                Prasanna Patel
                            </div>
                            <div className='level-c'>
                            <span className='level3'><Image src="/images/Artboard20.jpg" width={109} height={106}/></span>
                            </div>
                            
                        </div>
                        <div className='transaction'>
                                Transaction
                            </div>
                        <div className='gtu'>
                            Goa to Udaipur
                        </div>
                        <div className='gtu'>
                            Goa to manali
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
export default Userinfo;