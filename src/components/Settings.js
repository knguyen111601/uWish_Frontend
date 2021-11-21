import { BsGearFill } from "react-icons/bs"
import { Link } from "react-router-dom"
const Settings = () =>{
    return <Link to="/user/edit" className="settings">
        <h1><BsGearFill/></h1>
    </Link>
}
export default Settings