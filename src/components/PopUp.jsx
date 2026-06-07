// Css
import { useEffect, useState } from 'react'
import './PopUp.css'
export function PopUp({typeOfMessage}){
	const messages = {
		"registerMessage":["The mock api used in this ecommerce doesn't let register data of any kind but you can log in."],
		"logInMessage": {
      "messagePop": "Please use this information to login:",
      "username": "Username: emilys",
      "password": "Password: emilyspass"
    }
	}
	const [message,setMessage] = useState([])
	useEffect(()=>{
		const currentMessage = messages[typeOfMessage]
		const messageToRender = Object.prototype.toString.call(currentMessage) === '[object Object]'
		? Object.keys(currentMessage).map((key)=>[currentMessage[key]]) : Array.isArray(currentMessage)
		? currentMessage : [currentMessage]
		console.log(messageToRender)
		setMessage(messageToRender)
	},[typeOfMessage])
	return(
		<div className="popUp">
			{
				message.map((msg,ind)=>{
					return(
						<span key={ind}>
							<p>{msg}</p>
						</span>
					)
				})
			}
		</div>
	)
}