import { Link } from "react-router-dom"

const Home = (props) =>{
    return <div className="section">
        <div className="home">
        <div className="welcomes">
        <h1>Welcome</h1>
        <p>Pease signup and / or login to view your dashboard</p>
        </div>
        <div className="signupCards">
        <Link to="/signup">
            <h1 className="loginAnim">Signup</h1>
        </Link>
        
        <Link to="/login">
            <h1 className="loginAnim">Login</h1>
        </Link>
        </div>
        </div>
    </div>
}

export default Home