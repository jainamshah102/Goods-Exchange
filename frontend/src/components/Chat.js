import { StylesContext } from '@material-ui/styles'
import React from 'react'
import '../css/styles.css'
import sendbtn from '../sendbtn.png';
import Header from "./layout/Header";
const Chat = () => {
    return (
        <>
        <Header />
        <div className="container my-4">
            <div className="row">
                <div className="col-sm" style={{border:"2px solid black",borderRadius:"13px", maxWidth:"500px"}}>
                    <p style={{textAlign:"center",color:"#008080",opacity:"0.8",fontWeight:"900",fontFamily:"sans-serif"}}>CHATS</p>
            
                    <ul className="list-group my-4">
                        <li className="list-group-item" style={{height:"54px"}}>Jainam</li>
                        <li className="list-group-item" style={{height:"54px"}}>Swanand</li>
                        <li className="list-group-item" style={{height:"54px"}}>Dhairya</li>
                        <li className="list-group-item" style={{height:"54px"}}>A</li>
                        <li className="list-group-item" style={{height:"54px"}}>B</li>
                    </ul>
                    
                </div>
                <div className="col-sm">
                    <div className="container2">
                    </div> 
                    <div className="send">
                        <form action="#" className="d-flex" id="send-container" style={{float:'right'}}>
                            <input type="text" name="messageInp" id="messageInp" style={{width:"720px"}} /> 
                            <button className="btn" type="submit"><img src={sendbtn} style={{width:"20px",height:"20px"}}/></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
        {/* // <div className="mx-4 my-5 mw-50px" style={{border:"2px solid black"},{width:"600px"}}>
        //     <div className="p-4 d-flex flex-row bd-highlight mb-3" style={{color: "blue"},{display:"flex"}}>
        //         Chats
            
        //         <ul className="list-group my-4" style={{width: "500px"}}>
        //             <li className="list-group-item">Jainam</li>
        //             <li className="list-group-item">Swanand</li>
        //             <li className="list-group-item">Dhairya</li>
        //             <li className="list-group-item">A</li>
        //             <li className="list-group-item">B</li>
        //         </ul>
        //     </div>
        //     <div className="container2">
        //     </div> 
        //     <div className="send">
        //         <form action="#" id="send-container">
        //             <input type="text" name="messageInp" id="messageInp"/>
        //             <button className="btn" type="submit">Send</button>
        //         </form>
        //     </div>
        // </div> */}
    </>
    )
}

export default Chat
