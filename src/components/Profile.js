import { useState, useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { GlobalCtx } from "../App"

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

    useEffect(()=>{getUser()})

    const loaded = () =>{
       return <div className="profileSection">
           {user.pfp ? <img src={user.pfp} alt="Profile Picture"/> : <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="Profile Picture"/>}
           <h1>{user.username}</h1>
           <p>{user.bio}</p>
       </div>
    }

    const notLoaded = () =>{
        return <div className="profileSection">
        </div>
    }


    return <div className="profile">
        <div>
        {pfp ? loaded() : notLoaded()}
        <div className="horizontal"></div>
        <Link to="/">
            <h1>Home</h1>
        </Link>
        <div className="horizontal"></div>
        </div>
        <div className="settings">
            <p>Gear is gonna go here</p>
        </div>
        <Link to="/user">
            edit
        </Link>
    </div>
}

export default Profile