import { useState, useContext, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { GlobalCtx } from "../App"
import {CgShoppingCart} from "react-icons/cg"
import {BsFillTrashFill} from "react-icons/bs"
const Show2 = (props) =>{
    const {gState, setGState} = useContext(GlobalCtx)
    const {url, token} = gState
    const params = useParams()
    const id = params.id
    const navigate = useNavigate()

    const [wishlist, setWishlist] = useState(null)
    const [editForm, setEditForm] = useState({})
    const getWishlist = async () =>{
        const response = await fetch(url + "/wishlist/" + id,{
            method:"get",
            headers: {
                Authorization: "bearer " + token
            }
        })
        const json = await response.json()
        .then((data)=>{
            setWishlist([data])
            setEditForm(data)
        })
    }

useEffect(()=>{
    getWishlist()
},[])

// handleChange function for form
const handleChange = (event) => {
    // create a copy of the state
    const newState = {...editForm}
    // update the newState
    newState[event.target.name] = event.target.value
    // update the state
    setEditForm(newState)
}

// handleSubmit for form
const handleSubmit = (event) => {
    event.preventDefault()

    fetch(url + "/wishlist/" + id, {
        method: "put",
        headers: {
            "Content-type": "application/json",
            "Authorization": "bearer " + token
        },
        body: JSON.stringify(editForm)
        })
        .then((response) => {response.json()})
        .then((data)=>{
            setEditForm({
                name: "",
                image: "",
                price: "",
                url: ""
            })
            getWishlist()
            navigate("/")
        })
}

const handleDelete = (event) =>{
    event.preventDefault()
    fetch(url+"/wishlist/" + id, {
        method: "delete",
        headers: {
            "Authorization": "bearer " + token
        }
    })
    .then((response)=>{response.json()})
    .then((data)=>{navigate("/")})
}

const form = (
<form className="editUserForm" onSubmit={handleSubmit}>
    <input
        type="text"
        value={editForm.name}
        name="name"
        placeholder="name"
        onChange={handleChange}
    />
    <input
        type="text"
        value={editForm.image}
        name="image"
        placeholder="image"
        onChange={handleChange}
    />
    <input
        type="text"
        value={editForm.price}
        name="price"
        placeholder="price"
        onChange={handleChange}
    />
    <input
        type="text"
        value={editForm.url}
        name="url"
        placeholder="URL"
        onChange={handleChange}
    />
    <input className="addItem" type="submit" value="Update Item" />
</form>
      );
    

const loaded = () => {
    return wishlist.map((singleWishlist)=>{
        return <div className="showImg" style={{marginTop:"-30px"}} key={singleWishlist._id}>
            <h1>{singleWishlist.name}</h1>
            <img src={singleWishlist.image} alt={singleWishlist.name}/>
            <h1>${singleWishlist.price}</h1>
            <div className="buttons">
            <a target="_blank" href={singleWishlist.url}><button className="showPurchase"><CgShoppingCart/></button></a>
            <button className="showTrash" onClick={()=>{handleDelete(singleWishlist._id)}}><BsFillTrashFill/></button>
            </div>
        </div>
    })
}


return <div className="section">
<div className="viewProfile">
    <div className="viewProfile">
        {wishlist ? loaded() : null}
    </div>
    <div className="vertical"></div>
    <div className="viewProfileInfo2">
        {form}
    </div>
</div>
</div>
}
export default Show2