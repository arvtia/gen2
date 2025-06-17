import UserDashboard from "../components/userPageClient/UserPage/User";


const UserPanel =() =>{
    const checkUser = () =>{
        if (data==! user) {
            location.replace("/login")
        }
    }

    return(
        <>
        <UserDashboard />
        </>
    )
}

export default UserPanel;
