import React, {useContext} from 'react';
import { BrowserRouter } from 'react-router-dom';
import {Routes, Route} from "react-router-dom";
import Autorization from "./pages/Autorization";
import Basket from "./pages/Basket"
import Admin from "./pages/Admin"
import Shop from "./pages/Shop"
import BookPage from "./pages/BookPage"
import { Context } from './index';
import NavBar from './components/NavBar';
import Registration from "./pages/Registration"

function App() {
  const {isAuth} = useContext(Context);
  console.log(isAuth);

  return (
    <BrowserRouter>
            <NavBar />
      <Routes>
        {isAuth.isAuth ? (
          <>
            <Route path="/admin" element={<Admin />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/book" element={<BookPage />} />
          </>
        ) : (
          <>
          <Route path="*" element={<Autorization />} />
          <Route path="/registr" element={<Registration />} />
          </>
        )}
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
