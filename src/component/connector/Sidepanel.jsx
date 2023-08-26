import React, { useState } from "react";
import './sidepanel.css'
import Contactus from "../../pages/contactus/contactus";
import LineGraph from "../../pages/chart&map/graph&map";




export default function Sidepanel() {



    const [page, setpage] = useState(1)
    const [Sidepanelshow,Setsidepanel] =useState(false)


    const openSidepanel =()=>{
        Setsidepanel(!Sidepanelshow)
        console.log("open")
    }
    return (

        <div>
            <main>
               


                <div className="sidebarBox">

                        <div className={Sidepanelshow? 'mainbox':'mainsidebaropen'} >

                               {/* ******************logo and sidepanel******************** */}
                            <div>
                                <div  className={Sidepanelshow?'mainBoxlogoclose':'mainBoxlogo'}>
                                    <div style={Sidepanelshow?{display:"none"}:{display:"block"}}>
                                         <h3>LOGO</h3>

                                    </div>
                                    <div onClick={()=>{openSidepanel()}} >
                                        <i className="fa fa-bars fonticon" aria-hidden="true"></i>

                                    </div>
                                </div>
                                   
                                   {/* *************************Sidepanel Name Link************************ */}
                                <div className="sidepanelmaincontentbox">
                                    <div className={Sidepanelshow?'opencontentitem':'contentitem'} onClick={() => { setpage(0) }}>
                                        <div className="fonticonbox">
                                            <i className="fa fa-user fonticon" aria-hidden="true"></i>

                                        </div>
                                        <label  className={Sidepanelshow?'labelname':'contentitemlabel'}>Contact</label>

                                    </div>

                                    <div className={Sidepanelshow?'opencontentitem':'contentitem'} onClick={() => { setpage(1) }}>
                                        <div className="fonticonbox">
                                            <i className="fa fa-map-marker fonticon" aria-hidden="true"></i>

                                        </div>
                                        <label className={Sidepanelshow?'labelname':'contentitemlabel'}  >Charts & Map</label>

                                    </div>
                                   

                                </div>
                            </div>




                        </div>
                    

                    <div style={{width:"100%"}}>
                        {
                            page === 0 ?
                                <Contactus />
                                :
                                page === 1?
                                <LineGraph/>
                                : null
                        }

                    </div>
                </div>


            </main>



        </div>
    )
}