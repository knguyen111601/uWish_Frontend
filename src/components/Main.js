import {useEffect, useState} from "react"
import {Route, Routes} from "react-router-dom"
import Index from "../pages/Index"
import Show from "../pages/Show"


const Main = (props) => {
// State to hold our list of wishlist
const [wishlist, setWishlist] = useState(null)

// your deployed heroku URL
const URL = "https://project-3-backend-wishlist.herokuapp.com/wishlist/"

 // function to get updated list of wishlist
 const getWishlist = async () => {
    // make the api call
    const response = await fetch(URL)
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
              "Content-Type": "application/json"
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
            "Content-Type": "application/json"
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
        method: "delete"
    })
    // update the list of wishlist
    getWishlist()
}
   
  
  // a useEffect to make a call to getWishlist when page loads
 useEffect(() => {
    getWishlist()
}, [])

    return <main>
        <Routes>
            <Route path="/" element={<Index wishlist={wishlist} createWishlist={createWishlist}/>}/>
            <Route path="/wishlist/:id" element={<Show wishlist={wishlist} updateWishlist={updateWishlist} deleteWishlist={deleteWishlist}/>} />
        </Routes>
    </main>
}

export default Main;