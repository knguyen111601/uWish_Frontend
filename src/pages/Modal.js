import React from "react"
import {BsXLg} from "react-icons/bs"

const Modal = ({open, children, onClose}) =>{
    if (!open) return null
    return (
    <div className="modalBack">
        <div className="modal">
            <h1 className="close" onClick={onClose}><BsXLg/></h1>
            {children}   
        </div>
    </div>
    )
}

export default Modal