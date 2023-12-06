import React, { useContext } from "react";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import basketImg from "../image/basketImg.com.png";
import exitImage from "../image/profile.png";
import { useLocation } from "react-router-dom";
import '../CSS/navMenu.css'


const NavMenu = observer(() => {
  const { isAuth } = useContext(Context);
  const history = useNavigate();
  const location = useLocation();
  const exit = async () => {
    history("/autorization");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Container>
      {!isAuth.isAuth && !isAuth.isAdmin && <a className="navbar-brand" href="/shop">
          BookShop
        </a>}
        {isAuth.isAuth ? (
          <ul className="navbar-nav">
            <li className={`nav-item ${location.pathname === "/shop" ? 'active' : ''}`}>
              <a className="nav-link" href="/shop">
                Home
              </a>
            </li>
          </ul>
        ) : (
          <div></div>
        )}
        {!isAuth.isAuth && !isAuth.isAdmin ? (
          <div>
             <img
                style={{ height: 30, marginRight: 20 }}
                src={exitImage}
                alt="exit"
                onClick={exit}
              />

          </div>
        ) : (
          <div></div>
        )}
      </Container>
    </nav>
  );
});

export default NavMenu;
