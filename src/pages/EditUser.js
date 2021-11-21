import { useState, useContext, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { GlobalCtx } from "../App"

const EditUser = (props) =>{
    const {gState, setGState} = useContext(GlobalCtx)
    const {url, token, username, pfp, bio, id} = gState
    const navigate = useNavigate()
    const [editForm, setEditForm] = useState({})
    
    const getUser = async () => {
        const response = await fetch(url + `/auth/${id}`, {
            method: "get",
            headers: {
                "Content-type": "application/json"
            }
        })
        const json = await response.json()
        .then((data)=>{
            setEditForm(data)
        })
    }

useEffect(()=>{getUser()}, [])

    const handleSubmit = (event) =>{
        event.preventDefault()
        fetch(url + `/auth/${id}`, {
            method: "put",
            headers: {
                "Content-type": "application/json",
                Authorization: "bearer " + token 
            },
            body: JSON.stringify(editForm)
        })
        .then((response) => {response.json()})
        .then((data)=>{
            setEditForm(gState)
            navigate("/")
        })
    }

    const handleChange = (event) =>{
        const newForm = {...editForm}
        newForm[event.target.name] = event.target.value
        setEditForm(newForm) 
    }
    
    const form = () =>{
        return <form className="editUserForm" onSubmit={handleSubmit}>
            <h3>Image URL</h3>
        <input type="text" name="pfp" value={editForm.pfp} placeholder="Profile Picture" onChange={handleChange}/>
            <h3>Biography</h3>
        <input type="text" name="bio" value={editForm.bio} placeholder="Biography" onChange={handleChange} maxLength="20"/>
        <input className="addItem" type="submit" value="Update Profile"/> 
        </form>
    }

    return <div className="section">
    <div className="viewProfile">
        <div className="viewProfileImg">
            <img src={editForm.pfp}/>
            <p className="updateBio">{editForm.bio}</p>
        </div>
        <div className="vertical"></div>
        <div className="viewProfileInfo">
            {form()}
        </div>
    </div>
</div>
}

export default EditUser
