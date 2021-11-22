import { useParams, useNavigate } from "react-router-dom";
import {useState, useEffect} from "react"

const Show = (props) => {
  // grab the navigate function
  const navigate = useNavigate()
  // get the params object
  const params = useParams();
  // grab the id from params
  const id = params.id;
  // grab wishlist from props
  const wishlist = props.wishlist;
  // create state for form
  const [editForm, setEditForm] = useState({})
  // useEffect to set state to the existing wishlist, when the data is available
  useEffect(() => {
      if(props.wishlist){
          const singleWishlist = wishlist.find((w) => w._id === id);
          setEditForm(singleWishlist)
      }
  }, [props.wishlist])

  if (props.wishlist) {
    // grab the target wishlist from the wishlist array
    const singleWishlist = wishlist.find((w) => w._id === id);
    
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
            // prevent the refresh
            event.preventDefault()
            // pass the form data to updateWishlist
            props.updateWishlist(editForm, id)
            // redirect wishlist back to index
            navigate("/")
        }

        
    const removeWishlist = (event) => {
        event.preventDefault()
        props.deleteWishlist(id)
        navigate("/")
    }

    const form = (
        <form className="editForm" onSubmit={handleSubmit}>
          <input
            type="text"
            value={editForm.image}
            name="image"
            placeholder="image"
            onChange={handleChange}
          />
          <input
            type="text"
            value={editForm.name}
            name="name"
            placeholder="name"
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

    return (
      <div>
        <div className="showCard">
        <img src={singleWishlist.image} alt={singleWishlist.name}/>
        <h1>{singleWishlist.name}</h1>
        <h2>URL : <a href={singleWishlist.url}>{singleWishlist.url}</a></h2>
        </div>
        {form}
        <button className="deleteButton" onClick={removeWishlist}>Delete Wishlist Item</button>
      </div>
    );
  } else {
    return <h1>No Wishlist</h1>;
  }
};

export default Show;