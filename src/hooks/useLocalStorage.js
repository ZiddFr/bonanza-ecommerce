import { useState, useEffect } from "react";
//ui -> user interface --> cambiarlo a userPreferences(?)
export function useLocalStorage(uiKey,uiInitialValue){
  const [value,setValue] = useState(()=>{
    try {
      const storedValue = localStorage.getItem(uiKey)
      return storedValue ? JSON.parse(storedValue) : uiInitialValue
    } catch (error) {
      console.log("Error reading localStorage ui-key: ", uiKey )
      return uiInitialValue
    }
  })
  useEffect(()=>{
    try {
      localStorage.setItem(uiKey, JSON.stringify(value))
    } catch (error) {
      console.log("Error reading localStorage ui-key: ", uiKey )
    }
  },[uiKey,value])
  return [value,setValue]
}