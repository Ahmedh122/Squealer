import { createContext, useEffect, useState,  } from "react";


export const MuteContext = createContext();



export const MuteContextProvider = ({children}) =>{
    const [isMuted, setMuted]= useState(
        JSON.parse(localStorage.getItem("mute")) || true
  );



const toggleMute = ()=>{
    setMuted(!isMuted)
}

useEffect(() => {
  localStorage.setItem("mute", JSON.stringify(isMuted));
}, [isMuted]);


 return (
   <MuteContext.Provider value={{ isMuted,toggleMute }}>
    {children}
   </MuteContext.Provider>
 );

}