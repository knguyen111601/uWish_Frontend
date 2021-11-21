import { GlobalCtx } from "../App"
import {useState, useContext} from "react"
import {useNavigate} from "react-router-dom"
const Signup = (props) =>{
    const { gState, setGState } = useContext(GlobalCtx);
    const { url } = gState;
    const navigate = useNavigate()
    const [form, setForm] = useState({
        username: "",
        password: ""
    })

    const handleChange = (event) => {
        const newForm = {...form}
        newForm[event.target.name] = event.target.value
        setForm(newForm)
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        const {username, password} = form
        fetch(`${url}/auth/signup`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({username, password})
    })
    .then((response)=> response.json())
    .then((data)=>{
        console.log(data)
        setForm({
            username: "",
            password: ""
        })
        navigate("/login")
    })
    }


    return <div className="section">
        <div className="login">
        <h1 style={{fontSize:"5em", color: "rgba(0,0,0,0.5)"}}>Signup</h1>
        <form className="editUserForm" onSubmit={handleSubmit}>
            <input type="text" name="username" value={form.username} placeholder="Signup" onChange={handleChange}/>
            <input type="password" name="password" value={form.password} placeholder="Password" onChange={handleChange}/>
            <input className="addItem" type="submit" value="Signup" onChange={handleChange}/>
        </form>
        </div>
    </div>
}

export default Signup
