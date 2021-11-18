import { useContext } from "react"
import {Link} from "react-router-dom"
import { GlobalCtx } from "../App"
const Header = (props) =>{
    const {gState, setGState} = useContext(GlobalCtx)

    const logout = (
        <Link to="/">
            <h1 onClick={()=>{
                window.localStorage.removeItem("token")
                setGState({...gState, token: null})
            }}>Logout</h1>
        </Link>
    )

    return <nav className="header">
        <Link to="/"><h1>Home</h1></Link>
        <Link to="/signup"><h1>Signup</h1></Link> 
        <Link to="/login"><h1>Login</h1></Link>
        {gState.token ? logout : null}
    </nav>
}

export default Header