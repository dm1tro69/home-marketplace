import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Explore from "./pages/Explore";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Navbar from "./components/Navbar";


const App = () => {

  return (

      <>
          <BrowserRouter>
              <Routes>
                  <Route path={'/'} element={<Explore/>}/>
                  <Route path={'/offer'} element={<Offers/>}/>
                  <Route path={'/profile'} element={<Profile/>}/>
                  <Route path={'/sign-in'} element={<SignIn/>}/>
                  <Route path={'/sign-up'} element={<SignUp/>}/>
                  <Route path={'/forgot-password'} element={<ForgotPassword/>}/>
              </Routes>
              <Navbar/>
          </BrowserRouter>
      </>


  )
}

export default App;
