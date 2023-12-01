import React, {useContext} from 'react';
import { Context } from '../index';
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container"
import {useNavigate} from "react-router-dom";

const NavBarAdmin = observer(() =>{
    const {isAuth} = useContext(Context);
    const history = useNavigate();
    const exit = async() =>{
      isAuth.setIsAuth(false);
      isAuth.setIsAdmin(false);
      history("/");
      }
    return(
     
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Container> 
       {isAuth.isAdmin ?
    <ul className="navbar-nav">
      <li className="nav-item" style={{color: 'white'}}>
        <a className="nav-link" href="/controlbook">Control book</a>
      </li> 
      <li className="nav-item" style={{color: 'white'}}>
        <a className="nav-link" href="/orders">Order</a>
      </li>
      <li className="nav-item" style={{color: 'white'}}>
        <a className="nav-link" href="/comments">Comments</a>
      </li>
      <li className="nav-item" style={{color: 'white'}}>
        <a className="nav-link" href="/statistics">Statistics</a>
      </li>
    </ul>
    
     :
    <div></div>   
}
    <div>
    <button variant={"outline-light"} onClick={exit}>Exit</button>
    </div>
</Container>

</nav>
    );
    
}
);

export default NavBarAdmin;