import React, {useContext} from 'react';
import { Context } from '../index';
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container"

const NavBar = observer(() =>{
    const {isAuth} = useContext(Context);
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Container> 
    
     <a className="navbar-brand" href="/shop">BookShop</a>

    <ul className="navbar-nav">
      <li className="nav-item" style={{color: 'white'}}>
        <a className="nav-link" href="/shop">Home</a>
      </li>
      
    </ul>
    {isAuth.isAuth ?
    <div>
    <button variant={"outline-light"}>Войти</button>
    <button variant={"outline-light"}>Админ-панель</button>
    </div>
    :
    <div>
    <button variant={"outline-light"} onClick={() => isAuth.setIsAuth(true)}>Авторизация</button>
    </div>
}
</Container>

</nav>
    );
    
}
);

export default NavBar;