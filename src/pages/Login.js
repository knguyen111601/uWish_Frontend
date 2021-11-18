import { GlobalCtx } from "../App"
import {useState, useContext} from "react"
import {useNavigate} from "react-router-dom"
const Login = (props) =>{
    const { gState, setGState, token } = useContext(GlobalCtx);
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
        fetch(`${url}/auth/login`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `bearer ${token}`
        }, 
        body: JSON.stringify({username, password})
    })
    .then((response)=> response.json())
    .then((data)=>{
        console.log(data)
        // local storage to keep token so it doesn't disappear when refreshing
        window.localStorage.setItem("token", JSON.stringify(data))
        setGState({...gState, token: data.token})
        setForm({
            username: "",
            password: ""
        })
        navigate("/")
    })
    }

    return <div>
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" value={form.username} onChange={handleChange}/>
            <input type="password" name="password" value={form.password} onChange={handleChange}/>
            <input type="submit" value="Login" onChange={handleChange}/>
        </form>
    </div>
}

export default Login
