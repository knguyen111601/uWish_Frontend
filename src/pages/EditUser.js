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
        return <form onSubmit={handleSubmit}>
        <input type="text" name="pfp" value={editForm.pfp} placeholder="Profile Picture" onChange={handleChange}/>
        <input type="text" name="bio" value={editForm.bio} placeholder="Biography" onChange={handleChange}/>
        <input type="submit" value="Update Profile"/> 
        </form>
    }
    
    
    return <div>
        <h1>Edit Form</h1>
        <img src={editForm.pfp} alt="Profile Picture"/>
        {form()}
        </div>
}

export default EditUser
