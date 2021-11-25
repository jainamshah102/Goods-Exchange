import { StylesContext } from '@material-ui/styles'
import React from 'react'
import '../css/styles.css'
const Chat = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm" style={{border:"2px solid black"}}>
                    Chats
            
                    <ul className="list-group my-4" style={{width: "500px"}}>
                        <li className="list-group-item">Jainam</li>
                        <li className="list-group-item">Swanand</li>
                        <li className="list-group-item">Dhairya</li>
                        <li className="list-group-item">A</li>
                        <li className="list-group-item">B</li>
                    </ul>
                    
                </div>
                <div className="col-sm">
                    <div className="container2">
                    </div> 
                    <div className="send">
                        <form action="#" id="send-container" style={{float:'right'}}>
                            <input type="text" name="messageInp" id="messageInp"/>
                            <button className="btn" type="submit">Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
        // <div className="mx-4 my-5 mw-50px" style={{border:"2px solid black"},{width:"600px"}}>
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
        // </div>
        
    )
}

export default Chat
