import { useState, useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { GlobalCtx } from "../App"
import { BsGearFill } from 'react-icons/bs';


const Profile = (props) => {

    const {gState, setGState} = useContext(GlobalCtx)
    const {url, id, pfp, bio} = gState

    const [user, setUser] = useState(null)

    const getUser = async ()=>{
        const response = await fetch(url + `/auth/${id}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const json = await response.json()
        .then((data)=>{
            setUser(data)
        })
    }

    useEffect(()=>{
        if(gState.token){
            getUser()
        } 
    })

    const loaded = () =>{
       return <div className="profileSection">
           {user ? <img src={user.pfp} alt="Profile Picture"/> : <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="Profile Picture"/>}
           <h1>{user.username}</h1>
           <p>{user.bio}</p>
           <div className="horizontal"></div>
            <Link to="/">
                <h1>Home</h1>
            </Link>
            <div className="horizontal"></div>
            <Link to="/user">
                <h1>Profile</h1>
            </Link>
       </div>
    }

    const notLoaded = () =>{
        return <div className="profileSection">
        </div>
    }

    const logout = (
        <Link to="/">
            <h1 onClick={()=>{
                window.localStorage.removeItem("token")
                window.localStorage.removeItem("username")
                setGState({...gState, token: null, username: null, pfp: null, bio: null, id: null})
                setUser(null) 
                window.location.reload()
                }}>Logout</h1>
            <Link to="/user/edit">
                <h3><BsGearFill /></h3>
            </Link>
        </Link>
    )

    return <div className="profile">
        <div>
            {user ? loaded() : notLoaded()}
        </div>
        <div className="bottomProfile">
            {gState.token ? logout : null}
        </div>
    </div>
}

export default Profile