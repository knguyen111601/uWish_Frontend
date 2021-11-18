import { useState, useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { GlobalCtx } from "../App"

const Index = (props) => {

    const {gState, setGState} = useContext(GlobalCtx)
    const {url, token} = gState

    const [wishlist, setWishlist] = useState(null)

    const getWishlist = async () =>{
        const response = await fetch(url + "/wishlist/",{
            method:"get",
            headers: {
                Authorization: "bearer " + token
            }
        })
        const json = await response.json()
        setWishlist(json)
    }

useEffect(()=>{
    getWishlist()
},[])


    const [createForm, setCreateForm] = useState({
        name: "",
        image: "",
        price: "",
        url: ""
    })

    const handleChange = (event) =>{
        const newForm = {...createForm}
        newForm[event.target.name] = event.target.value
        setCreateForm(newForm)
    }

    // const handleSubmit = (event) =>{
    //     event.preventDefault();
    //     props.createWishlist(createForm)
    //     setCreateForm({
    //         name: "",
    //         image: "",
    //         price: "",
    //         url: ""
    //     })
    // }

    const handleClick = (event) =>{
        event.preventDefault()
        fetch(url + "/wishlist/", {
            method: "post",
            headers: {
                "Content-type": "application/json",
                "Authorization": "bearer " + token
            },
            body: JSON.stringify(createForm)
        })
        .then((response) => {response.json()})
        .then((data)=>{
            setCreateForm({
                name: "",
                image: "",
                price: "",
                url: ""
            })
            getWishlist()
        })
    }

    const handleDelete = (id) =>{
        fetch(url + "/wishlist/" + id, {
            method: "delete",
            headers: {
                Authorization: "bearer " + token,
            }
        })
        .then((response)=>{response.json()})
        .then((data)=>{
            getWishlist();
        })
    }

    const loaded = () => {
        return wishlist.map((singleWishlist)=>{
            return <div key={singleWishlist._id}>
                <Link to={`/${singleWishlist._id}/`}>
                <h1>{singleWishlist.name}</h1>
                </Link>
                <img src={singleWishlist.image} alt={singleWishlist.name}/>
                <h1>${singleWishlist.price}</h1>
                <a target="_blank" href={singleWishlist.url}><h1>Purchase Link</h1></a>
                <button onClick={()=>{handleDelete(singleWishlist._id)}}>Delete</button>
                <Link to={`/${singleWishlist._id}/`}>
                <button>Edit</button>
                </Link>
            </div>
        })
    }

    // const loading = () => {
    //     return <img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" alt="Loading..."/>
    //     // CHANGE THIS TO SOMETHING BETTER ^^^
    // }
    
    return <div>
        <form onSubmit={handleClick}>
            <input type="text" value={createForm.name} name="name" placeholder="Name" onChange={handleChange}/>
            <input type="text" value={createForm.image} name="image" placeholder="Image URL" onChange={handleChange}/>
            <input type="text" value={createForm.price} name="price" placeholder="Price" onChange={handleChange}/>
            <input type="text" value={createForm.url} name="url" placeholder="Item URL" onChange={handleChange}/>
            <input type="submit" value="Add Item"/>
        </form>
        {wishlist ? loaded() : null}
    </div>
}

export default Index