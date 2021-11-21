import { useState, useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { GlobalCtx } from "../App"
import {BsFillTrashFill} from "react-icons/bs"
import {CgShoppingCart} from "react-icons/cg"
import Modal from "./Modal"

const Index = (props) => {

    const {gState, setGState} = useContext(GlobalCtx)
    const {url, token, username} = gState

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
            return <div key={singleWishlist._id} className="singleItem">
                <Link to={`/${singleWishlist._id}/`}>
                <img src={singleWishlist.image} alt={singleWishlist.name}/>
                </Link>
                <div className="singleItemInfo">
                <Link to={`/${singleWishlist._id}/`}>
                <h1>{singleWishlist.name}</h1>
                </Link>
                <h1>${singleWishlist.price}</h1>
                <div className="buttons">
                <a target="_blank" className="purchase" href={singleWishlist.url}><button className="purchase"><CgShoppingCart/></button></a>
                <button className="trash" onClick={()=>{handleDelete(singleWishlist._id)}}><BsFillTrashFill/></button>
                </div>
                </div>
            </div>
        })
    }

    // const loading = () => {
    //     return <img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" alt="Loading..."/>
    //     // CHANGE THIS TO SOMETHING BETTER ^^^
    // }
    
    const [isOpen, setIsOpen] = useState(false)

    return <div>
    <div>
    <button className="makeWish" onClick={()=> setIsOpen(true)}><span>Make a Wish!</span></button>
    <Modal open={isOpen} onClose={()=> setIsOpen(false)}>
    <form className="createForm" onSubmit={handleClick}>
            <input type="text" value={createForm.name} name="name" placeholder="Name" onChange={handleChange}/><br></br>
            <input type="text" value={createForm.image} name="image" placeholder="Image URL" onChange={handleChange}/><br></br>
            <input type="text" value={createForm.price} name="price" placeholder="Price" onChange={handleChange}/><br></br>
            <input type="text" value={createForm.url} name="url" placeholder="Item URL" onChange={handleChange}/><br></br>
            <input className="addItem" type="submit" value="Add Item"/>
        </form>
    </Modal>
        </div>
        <div className="section">
        {wishlist ? loaded() : null}
        </div>
    </div>
}

export default Index