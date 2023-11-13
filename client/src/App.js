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
import Order from './pagesAdmin/Orders';
import { observer } from 'mobx-react-lite';
import { Spinner } from 'react-bootstrap';
import {check} from "./http/UserAPI";
import Contacts from './pages/Contacts';
import Userorder from './pages/userOrders';


const App = observer (() =>{
  const { isAuth } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    check().then(data => {
      if(data.role === 'admin'){
        isAuth.setIsAdmin(true)
        isAuth.setIsAuth(true)
        console.log("-------" + data.id)
      }else if(data.role === 'USER'){
        isAuth.setIsAuth(true)
      }
        
    }).finally(() => setLoading(false))
}, [isAuth])

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
                <Route path="/controlbook" element={<ControlBooks />} />
                <Route path="/statistics" element={<Statistics />} />
                <Route path="/orders" element={<Order />} />
              </Route>
            )}
            <Route path="/shop" element={<Shop />} />
            <Route path="/userorders" element={<Userorder/>}/>
            <Route path="/basket" element={<Basket />} />
            <Route path="/shop/:id" element={<BookPage />} />
            <Route path="/messageForAdmin" element={<Contacts />} />
          </>
        ) : null}
      </Routes>
    </BrowserRouter>
  );
});

export default App;
