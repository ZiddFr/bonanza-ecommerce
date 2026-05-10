// Hooks
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Js
import { logInRegister } from "../services/logInRegister";
// Jsx
import { Logo } from "./Logo";
import { InputForm } from "./InputForm.jsx";
import { TextLink } from "./TextLink.jsx";
// Css
import './Loginregisterform.css'
export function Loginregisterform(){
  const navigate = useNavigate()
  const [userName,setUserName] = useState("")
  const [userPassword,setUserPassword] = useState("")
  const [formMessage,setFormMessage] = useState("")
  const [messageContent,setMessageContent] = useState("")
  const [showLogin,setShowLogin] = useState(true)
  const [passConfirmation,setPassConfirmation] = useState("")
  const [userEmail,setUserEmail] = useState("")
  const handleInputChange = (setter,target) => {
    setter(target)
    setFormMessage("")
    setMessageContent("")
  }

  const handleLoginSubmit = async (e) =>{
    e.preventDefault()
    const userData = await logInRegister("logIn",userName,userPassword)
    if(userData){
      document.cookie = `access_token=${userData["accessToken"]}; SameSite=Strict; Secure`
      navigate('/')
    } else {
      console.log("Error trying to log in.")
      setFormMessage("Error")
      setMessageContent("Invalid username or password.")
    }
  }
  const handleRegisterSubmit = async (e) =>{
    e.preventDefault()
    if(userName.length <= 10){
      setFormMessage("Error")
      setMessageContent("Username must be at least 10 characters in length")
      return
    }
    if(userPassword.length <= 4){
      setFormMessage("Error")
      setMessageContent("Password must be at least 4 characters in length")
      return  
    }
    if(userPassword !== passConfirmation){
      console.log("Error trying to confirm password.")
      setFormMessage("Error")
      setMessageContent("Passwords don't match.")
      return
    }
    if(!userEmail.includes("@")){
      console.log("Error trying to register email.")
      setFormMessage("Error")
      setMessageContent("Invalid email direction.")
      return
    }
    const registerUserData = await logInRegister("register",userName,userPassword,userEmail)
    if(registerUserData != null){
      const loggedUserData = await logInRegister("login",userName,userPassword)
      if(loggedUserData){
        document.cookie = `access_token=${loggedUserData["accessToken"]}; SameSite=Strict; Secure`
        navigate('/')
      } else {
        console.log("Error trying to register new user.")
        setFormMessage("Error")
        setMessageContent("Invalid username or password.")
      }
    } else {
      console.log("Error trying to register new user.")
      setFormMessage("Error")
      setMessageContent("Couldn't complete registration, please try again.")
    }
  }
  if( showLogin == true ){
    return(
      <>
        <span className={"faddingEmerald"}>
          <div id="fullBody">
            <Logo />
            <div className="logContainer">
              <form className="form" id="login" onSubmit={handleLoginSubmit}>
                <h1 className="form__title">Login</h1>
                <div className={`form__message--${formMessage}`}>{messageContent}</div>
                <InputForm inputType={"text"} inputId={"loginUsername"} textPlaceholder={"Username"} focused={true} 
                onChange={(e)=> 
                  handleInputChange(setUserName,e.target.value)
                }
                value={userName}/>
                <InputForm inputType={"password"} inputId={"loginPassword"} textPlaceholder={"Password"} 
                onChange={(e)=>
                  handleInputChange(setUserPassword,e.target.value)
                }
                value={userPassword}/>
                <button type="submit" href="./" className="form__button">Log in</button>
                <TextLink linkTo={"#"} textInsideLink={"Forgot your password?"}/>
                <TextLink linkId={"linkCreateAccount"} textInsideLink={"Don't have an account? Create account."} onClick={()=>{setShowLogin(false)}}/>
              </form>
            </div>
          </div>
        </span>
      </>
    )
  } else {
    return(
      <>
        <span className={"faddingEmerald"}>
          <div id="fullBody">
            <Logo />
            <div className="registerContainer">
              <form className="form" id="createAccount" onSubmit={handleRegisterSubmit}>
                <h1 className="form__title">Create Account</h1>
                <div className={`form__message--${formMessage}`}>{messageContent}</div>
                <InputForm inputType={"text"} inputId={"signupUsername"} textPlaceholder={"Username"} focused={true} 
                onChange={(e)=>
                  handleInputChange(setUserName,e.target.value)
                }
                value={userName}
                />
               <InputForm inputType={"text"} inputId={"signupEmail"} textPlaceholder={"Email Address"} 
                onChange={(e)=>{
                  handleInputChange(setUserEmail,e.target.value)
                }}
                value={userEmail}
                /> 
                <InputForm inputType={"password"} inputId={"signupPassword"} textPlaceholder={"Password"} 
                onChange={(e)=>
                  handleInputChange(setUserPassword,e.target.value)
                }
                  value={userPassword}
                  />  
                <InputForm inputType={"password"} inputId={"signupConfirPassword"} textPlaceholder={"Confirm password"} 
                onChange={(e)=>
                  handleInputChange(setPassConfirmation,e.target.value)
                }
                value={passConfirmation}
                />
                <button type="submit" href="./" className="form__button">Register</button>
                <TextLink linkId={"linkRegister"} textInsideLink={"Already have an account? Sign in."} onClick={()=>{setShowLogin(true)}}/>
              </form>
            </div>
          </div>
        </span>
      </>
    )
  }
}