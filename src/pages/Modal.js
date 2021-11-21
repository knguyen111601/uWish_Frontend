import React from "react"

let  MODAL_STYLES ={
    position:"fixed",
    top:'50%',
    left:'50%',
    transform:'translate(-50%, -50%)',
    backgroundColor:"#C73A52",
    padding:'50px',
    zIndex:1000,
    border:"0.17em solid black",
    borderRadius:"7em",
    opacity:"0.9",
    
}

const Modal = ({open, children, onClose}) =>{
    if (!open) return null
    return (
    <div className="modal" style={MODAL_STYLES}>
        <button onClick={onClose}>Close</button>
        {children}   
    </div>
    )
}

export default Modal