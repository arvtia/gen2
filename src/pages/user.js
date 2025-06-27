import { useEffect, useState } from "react";
import UserDashboard from "../components/userPageClient/UserPage/User";


const UserPanel =() =>{

    const [ user , setUser] = useState([]);
    const [ data , setData] = useState([]);



    useEffect(()=>{
        fetch("http://localhost:3001/users")
        .then((res)=>res.json())
        .then((data)=>setData(data))
    })

    const checkUser = () =>{
        if (data==! user) {
            // location.replace("/login")
        } else {
            
        }
    }

    

    return(
        <>
        <UserDashboard />
        </>
    )
}

export default UserPanel;
