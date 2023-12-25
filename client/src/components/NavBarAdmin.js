import React, {useContext} from 'react';
import { Context } from '../index';
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container"
import {Link, useNavigate} from "react-router-dom";
import exitImage from "../image/320140.png";
import { useLocation } from "react-router-dom";
import { authorization } from "../http/UserAPI";
import '../CSS/navMenu.css'

const NavBarAdmin = observer(() =>{
    const {isAuth} = useContext(Context);
    const location = useLocation();
    const history = useNavigate();
    const exit = async() =>{
      authorization("guest@gmail.com", "guest");
      isAuth.setIsAuth(false);
      isAuth.setIsAdmin(false);
      history("/shop");
      }
    return(
     
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Container> 
       {isAuth.isAdmin ?
    <ul className="navbar-nav">
      <li className={`nav-item ${location.pathname === "/controlbook" ? 'active' : ''}`}>
        <Link className="nav-link" to="/controlbook">Control book</Link>
      </li> 
      <li className={`nav-item ${location.pathname === "/orders" ? 'active' : ''}`}>
        <Link className="nav-link" to="/orders">Order</Link>
      </li>
      <li className={`nav-item ${location.pathname === "/comments" ? 'active' : ''}`}>
        <Link className="nav-link" to="/comments">Comments</Link>
      </li>
      <li className={`nav-item ${location.pathname === "/statistics" ? 'active' : ''}`}>
        <Link className="nav-link" to="/statistics">Statistics</Link>
      </li>
    </ul>
    
     :
    <div></div>   
}
    <div>
    <img
                style={{ height: 30, marginRight: 20 }}
                src={exitImage}
                alt="exit"
                onClick={exit}
              />
    </div>
</Container>

</nav>
    );
    
}
);

export default NavBarAdmin;