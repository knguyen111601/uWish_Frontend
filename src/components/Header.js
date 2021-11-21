import { useContext } from "react"
import {Link} from "react-router-dom"
import { GlobalCtx } from "../App"
import {BsStars} from "react-icons/bs"
const Header = (props) =>{
    const {gState, setGState} = useContext(GlobalCtx)
    const {username} = gState

    const logout = (
        <Link to="/">
            <h1 onClick={()=>{
                window.localStorage.removeItem("token")
                window.localStorage.removeItem("username")
                setGState({...gState, token: null, username: null, pfp: null, bio: null, id: null})
            }}>Logout</h1>
        </Link>
    )

    return <nav className="header">
        <h1 className="logo">uWish<BsStars/></h1>
        {gState.token ? <h1 className="welcome">Welcome, {username}!</h1> : null}
    </nav>
}

export default Header