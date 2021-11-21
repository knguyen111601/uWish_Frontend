import { GlobalCtx } from "../App"
import {useContext} from "react"
import { useNavigate, Link } from "react-router-dom"
import {useState, useEffect} from "react"


const ViewProfile = (props) =>{

    const {gState} = useContext(GlobalCtx)
    const {username, pfp, bio, url, id} = gState

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

    const loaded  = () =>{
        return <div className="section">
            <div className="viewProfile">
                <div className="viewProfileImg">
                    <img src={user.pfp}/>
                    <h1>Current Profile Picture</h1>
                </div>
                <div className="vertical"></div>
                <div className="viewProfileInfo">
                    <h1>Username: {user.username}</h1>
                    {user.bio ? <div className="bio"><p>Bio: {user.bio}</p></div> : <div className="bio">Bio:</div>}
                    <Link to="/user/edit">
                        <h1>Edit Profile</h1>
                    </Link>
                </div>
            </div>
        </div>
    }

    return <div>
    {user ? loaded() : null}
    </div>
}

export default ViewProfile