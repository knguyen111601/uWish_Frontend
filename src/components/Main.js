import {useContext, useEffect, useState} from "react"
import {Route, Routes} from "react-router-dom"
import Index from "../pages/Index"
import Show2 from "../pages/Show2"
import Signup from "../pages/Signup"
import Login from "../pages/Login"
import Home from "../pages/Home"
import { GlobalCtx } from "../App"
import EditUser from "../pages/EditUser"
import ViewProfile from "../pages/ViewProfile"
const Main = (props) => {
const {gState, setGState} = useContext(GlobalCtx)
const {token} = gState
// State to hold our list of wishlist
const [wishlist, setWishlist] = useState([])

// your deployed heroku URL
const URL = "https://project-3-backend-wishlist.herokuapp.com/wishlist/"

    const loggedIn = () =>{
        return <Routes>
                    <Route path="/" element={<Index />}/>
                    <Route path="/:id" element={<Show2 />}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/user" element={<ViewProfile />}/>
                    <Route path="/user/edit" element={<EditUser/>}/>
            </Routes>
    }

    const notLoggedIn = () =>{
        return <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
    }

    return <main className="main">
            {gState.token ? loggedIn() : notLoggedIn()}
        </main>
}

export default Main;