import {useContext, useEffect, useState} from "react";
import {CONNECTION, SocketContext} from "../../context/socket";
import {useParams} from "react-router-dom";
import {ArrowBack, Send} from "@mui/icons-material";
import './ChatRoom.css'
import {addMessageToLocalStorage} from "../../components/navBar/NavBar";
import MessageBox from "./MessageBox";

const ChatRoom = () => {
    const [newMessage, setNewMessage] = useState(""); // Message to be sent
    const socket = useContext(SocketContext);
    const {rideId} = useParams()
    const [allMessages, setAllMessages] = useState([])

    useEffect(() => {
        const newMessages = JSON.parse(localStorage.getItem('messages'))
        newMessages && setAllMessages(newMessages)
    },[])



    useEffect(() => {
        // check if socket is connected
        socket.on(CONNECTION, data => {
            console.log('connected to socket on chatRoom')
        })

        socket.off('private-message').on('private-message', function (newMessage) {
            let messageToStore = {rideId: newMessage.rideId, text: newMessage.text, own: false}
            setAllMessages([...allMessages, messageToStore])
        })
    })

    const handleSendMessage = () => {
        console.log('HOLAAAA')
        if (newMessage === '') return
        const message = {rideId: rideId, text: newMessage, own: true}
        addMessageToLocalStorage(message)
        socket.emit('private-message', {rideId: rideId, text: newMessage})
        setAllMessages([...allMessages, message])
        setNewMessage("");
    };

    return (
        <div className="chat-room-container">
            <div className="messages-container">
                {
                    allMessages.filter(message => message.rideId === rideId).map(message => {
                        return <MessageBox text={message.text} own={message.own} />
                    })
                }
            </div>
            <div className="new-message">
                <textarea
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    placeholder="Write message..."
                    className="new-message-input-field"
                />
                <button onClick={handleSendMessage} className="send-message-button">
                    <Send />
                </button>
            </div>
        </div>
);
};

const getMessagesFromLocalStorage = () => {
    const storedMessages = window.localStorage.getItem('messages')
    return(JSON.parse(storedMessages))
}

export default ChatRoom;
