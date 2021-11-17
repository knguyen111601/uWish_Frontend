import { useState } from "react"
import { Link } from "react-router-dom"

const Index = (props) => {

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

    const handleSubmit = (event) =>{
        event.preventDefault();
        props.createWishlist(createForm)
        setCreateForm({
            name: "",
            image: "",
            price: "",
            url: ""
        })
    }


    const loaded = () => {
        return props.wishlist.map((singleWishlist)=>{
            return <div key={singleWishlist._id}>
                <Link to={`/wishlist/${singleWishlist._id}`}>
                <h1>{singleWishlist.name}</h1>
                </Link>
                <img src={singleWishlist.image} alt={singleWishlist.name}/>
                <h1>${singleWishlist.price}</h1>
                <a target="_blank" href={singleWishlist.url}><h1>Purchase Link</h1></a>
            </div>
        })
    }

    const loading = () => {
        return <img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" alt="Loading..."/>
        // CHANGE THIS TO SOMETHING BETTER ^^^
    }
    
    return <div>
        <form onSubmit={handleSubmit}>
            <input type="text" value={createForm.name} name="name" placeholder="Name" onChange={handleChange}/>
            <input type="text" value={createForm.image} name="image" placeholder="Image URL" onChange={handleChange}/>
            <input type="text" value={createForm.price} name="price" placeholder="Price" onChange={handleChange}/>
            <input type="text" value={createForm.url} name="url" placeholder="Item URL" onChange={handleChange}/>
            <input type="submit" value="Add Item"/>
        </form>
        {props.wishlist ? loaded() : loading()}
    </div>
}

export default Index