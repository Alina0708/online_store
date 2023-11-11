import React, {useContext} from 'react';
import { Context } from '../index';
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container"
import {useNavigate} from "react-router-dom";

const NavBar = observer(() =>{
  const {isAuth} = useContext(Context);
  const history = useNavigate();
  const exit = async() =>{
    isAuth.setIsAuth(false);
    history("/");
    }

    return(
   
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Container> 
    
     <a className="navbar-brand" href="/shop">BookShop</a>
     {isAuth.isAuth ?
    <ul className="navbar-nav">
      <li className="nav-item" style={{color: 'white'}}>
        <a className="nav-link" href="/shop">Home</a>
      </li>
      <li className="nav-item" style={{color: 'white'}}>
        <a className="nav-link" href="/basket">Basket</a>
      </li>
      <li className="nav-item" style={{color: 'white'}}>
        <a className="nav-link" href="/messageForAdmin">Contacts</a>
      </li>
      
    </ul>
    : <div></div>}
    {isAuth.isAuth ?
    <div>
    <button variant={"outline-light"} onClick={exit}>Exit</button>
    </div>
    :
    <div>
    </div>
}
</Container>

</nav>
);
    
}
);

export default NavBar;