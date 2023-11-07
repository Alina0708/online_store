import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Autorization from './pages/Autorization';
import Basket from './pages/Basket';
import Shop from './pages/Shop';
import BookPage from './pages/BookPage';
import { Context } from './index';
import NavBar from './components/NavBar';
import Registration from './pages/Registration';
import NavBarAdmin from './components/NavBarAdmin';
import Statistics from './pagesAdmin/Statistics';
import ControlBooks from './pagesAdmin/ControlBooks';
import Message from './pagesAdmin/Message';
import Order from './pagesAdmin/Orders';
import { observer } from 'mobx-react-lite';
import { Spinner } from 'react-bootstrap';
import {check} from "./http/UserAPI";

const App = observer (() =>{
  const { isAuth } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    check().then(data => {
      if(data.role === 'admin'){
        isAuth.setIsAdmin(true)
        isAuth.setIsAuth(true)
      }else if(data.role === 'USER'){
        isAuth.setIsAuth(true)
      }
        
    }).finally(() => setLoading(false))
}, [])

if (loading) {
    return <Spinner animation={"grow"}/>
}
console.log(isAuth)
  return (
    <BrowserRouter>
      {isAuth.isAdmin ? <NavBarAdmin /> : <NavBar />}
      <Routes>
        <Route path="/" element={<Autorization />} />
        <Route path="/registr" element={<Registration />} />
        {isAuth.isAuth ? (
          <>
            {isAuth.isAdmin && (
              <Route>
                <Route path="/message" element={<Message />} />
                <Route path="/controlbook" element={<ControlBooks />} />
                <Route path="/statistics" element={<Statistics />} />
                <Route path="/orders" element={<Order />} />
              </Route>
            )}
            <Route path="/shop" element={<Shop />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="/shop/:id" element={<BookPage />} />
          </>
        ) : null}
      </Routes>
    </BrowserRouter>
  );
});

export default App;
