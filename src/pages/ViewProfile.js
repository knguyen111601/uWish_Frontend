import { GlobalCtx } from "../App"
import {useContext} from "react"
import { useNavigate } from "react-router-dom"


const ViewProfile = (props) =>{

    const {gState} = useContext(GlobalCtx)

    return <h1>View</h1>
}

export default ViewProfile