import { useState, useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { GlobalCtx } from "../App"

const Profile = (props) => {

    const {gState, setGState} = useContext(GlobalCtx)
    const {username, pfp, bio, id} = gState

    const loaded = () =>{
       return <div className="profileSection">
           <img src={pfp} alt="profile picture"/>
           <h1>{username}</h1>
           <p>{bio}</p>
       </div>
    }

    const notLoaded = () =>{
        return <h1>No one yet</h1>
    }

    return <div className="profile">
        <div>
        {username ? loaded() : notLoaded()}
        <h1>Home</h1>
        <div className="horizontal"></div>
        <h1>Home</h1>
        <div className="horizontal"></div>
        <h1>Home</h1>
        <div className="horizontal"></div>
        </div>
        <div className="settings">
            <p>Gear is gonna go here</p>
        </div>
    </div>
}

export default Profile