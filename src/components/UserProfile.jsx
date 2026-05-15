// Context
import { UserStatus } from "../context/UserContext.jsx"
// Services
import { userInfo } from "../services/userInfo.js"
// Hooks
import { useContext,useState,useEffect } from "react"
// Jsx
import { NavBar } from "./NavBar.jsx"
import { InputForm } from "./InputForm.jsx"
// Css
import "./UserProfile.css"
// TODO: implementar edición de datos cuando tenga mi DB.
export function UserProfile(){
  const allUserStatus = useContext(UserStatus)
  const [userData,setUserData] = useState({})
  useEffect(()=>{
    ;(async function (){
       const data = await userInfo(allUserStatus.userId)
       setUserData(data)
    })()
  },[])
  return(
    <>
      <section className={`profileSettings ${allUserStatus.pageTheme}`} style={{display:"flex",flexDirection:"column"}}>
        <NavBar />
        <div className="commonBar">
          <h1>Profile</h1>
        </div>
        <div className="userInformation" style={{display:"flex"}}>
          <form className="form" id="userInformation">
            <div id="userData">
              <img className="userImg" src={userData.image} alt={`Profile picture of ${userData.firstName} ${userData.lastName}`} />
              <div className="divTexts">
                <label htmlFor="completeName">Name:</label>
                <InputForm inputType={"text"} name={"completeName"} value={`${userData.firstName} ${userData.lastName}`} readOnly />
                <label htmlFor="userName">Username:</label>
                <InputForm inputType={"text"} name={"userName"} readOnly value={userData.username ?? ""} />
                <label htmlFor="userEmail">Email</label>
                <InputForm inputType={"text"} name={"userEmail"} readOnly value={userData.email ?? ""} />
                <label htmlFor="userRole">Role:</label>
                <InputForm inputType={"text"} name={"userRole"} readOnly value={userData.role ?? ""} />
                <label htmlFor="userGender">Gender:</label>
                <InputForm inputType={"text"} name={"userGender"} readOnly value={userData.gender ?? ""} />
              </div>
              <button type="submit" className="form__button">Change</button>
            </div>
          </form>
          <div className="others" style={{display:"flex",flexDirection:"column"}}>
            <div id="userHistorial">
              <p>Order history:</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse eius dolor atque ratione quo odio natus perferendis? Libero neque ipsum pariatur reprehenderit sunt eligendi incidunt cumque ratione, iusto obcaecati rem?</p>
            </div>
            <div className="notifications" style={{display:"flex",justifyContent:"center",alignContent:"center"}}>
              <h2>Preferences:</h2>
              <InputForm inputType={"checkbox"} name={"Notifications"} inputId={"pref-notifications"} defaultChecked={true}/>
              <label name="Notifications">
                You'll receive notifications about Hot Deals in your home page.
              </label>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}