/**
import { useState, useContext, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import React from 'react'

import Modal from "./Modal"
import Show2 from './Show2'

import { GlobalCtx } from "../App"
import { useContent } from "react"


const MODAL_STYLES ={
    position:"fixed",
    top:'27%',
    left:'38%',
    bottom:"56%",
    right:"20%",
    transform:'translate(-50%, -50%)',
    backgroundColor:"#Cbc3e3",
    padding:'50px',
    zIndex:1000,
    border:"0.17em solid black",
    borderRadius:"7em",
    opacity:"0.5"

  
  }
  
const OVERLAY_STYLES ={
    position:"fixed",
    top:"17%",
    left:"17%",
    right:"17%",
    bottom:"17%",
    backgroundColor: "rgba(0,0,0, 0.77)",
    zIndex:1000,
    border:"0.3em solid purple",
    borderRadius:"3em"
  
    
}


    const description = function Modal({open, children, onClose}) {
 
    const {gState, setGState} = useContext(GlobalCtx)
    const {url, token} = gState
    const params = useParams()
    const id = params.id
    const navigate = useNavigate()

    const [wishlist, setWishlist] = useState(null)
    const [editForm, setEditForm] = useState({})

    const getWishlist = async () =>{
        const response = await fetch(url + "/wishlist/" + id,{
            method:"get",
            headers: {
                Authorization: "bearer " + token
            }
        })
        const json = await response.json()
        .then((data)=>{
            setWishlist([data])
            setEditForm(data)
        })}
        getWishlist()



//=========================================
const [isOpen, setIsOpen] = useState(false)

//=========================================

    if (!open) return null
return (
    <>
    <div>
        <button onClick ={()=> setIsOpen(true)}>open modal</button>
        <Modal open={isOpen} onClose={()=> setIsOpen(false)}>
          Items description
        </Modal>
    </div>

    <div style={OVERLAY_STYLES}></div>
    <div style={MODAL_STYLES}>
        <button onClick ={onClose}>Close</button>
{children}
    </div>
    </>
)
}

export default description

 */

//styles




import React from "react"

let  MODAL_STYLES ={
    position:"fixed",
    top:'50%',
    left:'50%',
    // bottom:"56%",
    // right:"20%",
    transform:'translate(-50%, -50%)',
    // transition:"300ms easeInOut",
    // transform:'translate(-50%, -50%) scale(1)',

    backgroundColor:"#C73A52",
    padding:'50px',
    zIndex:1000,
    border:"0.17em solid black",
    borderRadius:"7em",
    opacity:"0.9",
    
}





const OVERLAY_STYLES ={
    position:"fixed",
    top:"33%",
    left:"33%",
    right:"33%",
    bottom:"33%",
    backgroundColor: "rgba(0,0,0, 0.77)",
    zIndex:1000,
    border:"0.3em solid #C73A52",
    borderRadius:"11em",
    
  
    
}



const Modal = ({open, children, onClose}) =>{
    if (!open) return null
    return (
       <>
       <div style={OVERLAY_STYLES}></div>
      

    <div style={MODAL_STYLES}>
<button onClick={onClose}>Close</button>
         {children}   
    </div>
    </>
    )

}

export default Modal


