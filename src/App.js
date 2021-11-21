import React from 'react';
import { createContext, useState, useEffect} from 'react';
import Main from "./components/Main"
import Header from "./components/Header"
import Profile from "./components/Profile"
import Modal from "./pages/Modal"


export const GlobalCtx = createContext(null)



function App() {
  const [gState, setGState] = useState({url:"https://project-3-backend-wishlist.herokuapp.com", token: null})

  // seeing if already logged in
  useEffect(()=>{
    const token = JSON.parse(window.localStorage.getItem("token"))
    console.log(token)
    if (token) {
      setGState({...gState, token: token.token})
    }
  }, [])


  return (
    <GlobalCtx.Provider value={{gState, setGState}}>
    <div className="App">
      <Modal/>

       <Header />
      <Profile />
      <Main />
    </div>
    </GlobalCtx.Provider>
  );
}

export default App;
