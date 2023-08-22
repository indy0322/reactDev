import React from "react";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { json } from "react-router-dom";
import SockJS from "sockjs-client";
import {over} from 'stompjs'

var stompClient = null
function Test2(){
    
    const [publicChat, setPublicChat] = useState('')
    const [chats, setChats] = useState([])
    const inputRef = useRef()
    const inputPrivateRef = useRef()
    const usernameRef = useRef()
    const receiverRef = useRef()
    const fff = []

    const handleEnter = () => {
        let sockjs = new SockJS('http://localhost:8080/ws')
        stompClient = over(sockjs)
        stompClient.connect({},onConnect,onError)
    }

    const onConnect = () => {
        stompClient.subscribe('/chatroom/public',onPublicMessageReceived)
        stompClient.subscribe('/user/' + usernameRef.current.value + '/private',(payload) => {
            let payloadData = JSON.parse(payload.body)
            if(payloadData.status == "PRIVATE"){
                chats.push(payloadData)
                setChats([...chats])
            }})
        userJoin()
    }

    const onError = (err) => {
        console.log(err)
    }

    const userJoin = () => {
        let joinMessage = {
            senderName: usernameRef.current.value,
            status: "JOIN"
        }
        stompClient.send('/app/message',{},JSON.stringify(joinMessage))
    }

    const sendMessage = () => {
        if(stompClient){
            let sendMessage = {
                senderName: usernameRef.current.value,
                status: "MESSAGE",
                message: inputRef.current.value
            }
            stompClient.send('/app/message',{},JSON.stringify(sendMessage))
        }
    }
    const sendPriavetMessage = () => {
        if(stompClient){
            let sendMessage = {
                senderName: usernameRef.current.value,
                receiverName: receiverRef.current.value,
                status: "PRIVATE",
                message: inputPrivateRef.current.value
            }
            stompClient.send('/app/private-message',{},JSON.stringify(sendMessage))
        }
    }

    const onPublicMessageReceived = (payload) => {
        let payloadData = JSON.parse(payload.body)
        if(payloadData.status == "MESSAGE"){
            chats.push(payloadData)
            setChats([...chats])
        }
    }

    return(
        <div>
            <input type="text" ref={usernameRef}></input>
            <input type="text" ref={receiverRef} placeholder="받는 사람 지정"></input>
            <button onClick={handleEnter}>입장</button>
            <input type="text" ref={inputRef}></input>
            <button onClick={sendMessage}>전송</button>
            <input type="text" ref={inputPrivateRef} placeholder="개인 문자 내용"></input>
            <button onClick={sendPriavetMessage}>개인 전송</button>

            <ul>
                {chats.map((chat,index) => (chat.status == "PRIVATE" ?
                    <li key={index}>
                        <div style={{color:"red"}}>{chat.senderName} :  {chat.message}</div>
                    </li> :
                    <li key={index}>
                        <div>{chat.senderName} :  {chat.message}</div>
                    </li>
                ))}
            </ul>
        </div>
    )   
}

export default Test2;