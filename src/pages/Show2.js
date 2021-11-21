import { useState, useContext, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { GlobalCtx } from "../App"

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
<form className="editForm" onSubmit={handleSubmit}>
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
    <input type="submit" value="Update Bookmark" />
</form>
      );
    

const loaded = () => {
    return wishlist.map((singleWishlist)=>{
        return <div key={singleWishlist._id}>
            <Link to={`/${singleWishlist._id}/`}>
            <h1>{singleWishlist.name}</h1>
            </Link>
            <img src={singleWishlist.image} alt={singleWishlist.name}/>
            <h1>${singleWishlist.price}</h1>
            <a target="_blank" href={singleWishlist.url}><h1>Purchase Link</h1></a>
            <button onClick={handleDelete}>DELETE</button>
        </div>
    })
}

return <div>
        {form}
        {wishlist ? loaded() : null}
    </div>
}

export default Show2