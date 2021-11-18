import {useContext, useEffect, useState} from "react"
import {Route, Routes} from "react-router-dom"
import Index from "../pages/Index"
import Show2 from "../pages/Show2"
import Signup from "../pages/Signup"
import Login from "../pages/Login"
import Home from "../pages/Home"
import { GlobalCtx } from "../App"
import Profile from "./Profile"
const Main = (props) => {
const {gState, setGState} = useContext(GlobalCtx)
const {token} = gState
// State to hold our list of wishlist
const [wishlist, setWishlist] = useState([])

// your deployed heroku URL
const URL = "https://project-3-backend-wishlist.herokuapp.com/wishlist/"

 // function to get updated list of wishlist
 const getWishlist = async () => {
    // make the api call
    const response = await fetch(URL, {
        method: "get",
        headers: {
            Authorization: "bearer " + token
        }
    })
    // turn the response in an object
    const data = await response.json()
    // set the state to the api data
    setWishlist(data)
}

  // function that will later be passed data from our new/create form and make the post request to create a new wishlist
  const createWishlist = async (singleWishlist) => {
      // make the post request to our API
      await fetch(URL, {
          method: "post",
          headers: {
              "Content-Type": "application/json",
              Authorization: "bearer " + token
          },
          body: JSON.stringify(singleWishlist)
      })

      // get updated list of wishlist
      getWishlist()
  }

  // function to update a singleWishlist
  const updateWishlist = async (singleWishlist, id) => {
    // make the put request
    await fetch(URL + id, {
        method: "put",
        headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + token
        },
        body: JSON.stringify(singleWishlist)
    })
    // update the list of wishlist
    getWishlist()
}

  // create function to delete a singleWishlist
  const deleteWishlist = async (id) => {
    // make the delete request
    await fetch(URL + id, {
        method: "delete",
        headers: {
            Authorization: "bearer " + token
        }
    })
    // update the list of wishlist
    getWishlist()
}
   
  
//   a useEffect to make a call to getWishlist when page loads
//  useEffect(() => {
//     getWishlist()
// }, [])

    const loggedIn = () =>{
        return <Routes>
                    <Route path="/" element={<Index />}/>
                    <Route path="/:id" element={<Show2 />}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/login" element={<Login/>}/>
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