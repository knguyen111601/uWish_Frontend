import React from 'react';
import { createContext, useState, useEffect} from 'react';
import Main from "./components/Main"
import Header from "./components/Header"
import Profile from "./components/Profile"
export const GlobalCtx = createContext(null)

function App() {
  const [gState, setGState] = useState({url:"https://project-3-backend-wishlist.herokuapp.com", token: null, username: null, pfp: null, bio: null, id: null})

  // seeing if already logged in
  useEffect(()=>{
    const token = JSON.parse(window.localStorage.getItem("token"))
    console.log(token)
    if (token) {
      setGState({...gState, token: token.token, username: token.username, pfp: token.pfp, bio: token.bio, id: token.id})
    }
  }, [])

  return (
    <GlobalCtx.Provider value={{gState, setGState}}>
    <div className="App">
      <Header />
      <Profile />
      <Main />
    </div>
    </GlobalCtx.Provider>
  );
}

export default App;
