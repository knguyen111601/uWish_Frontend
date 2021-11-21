import { Link } from "react-router-dom"

const Home = (props) =>{
    return <div>
        <h1>Welcome</h1>
        <p>Pease signup and then login to view your dashboard</p>
        <Link to="/signup">
            <h1>Signup</h1>
        </Link>
        <Link to="/login">
            <h1>Login</h1>
        </Link>
    </div>
}

export default Home