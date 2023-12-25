import React, { useContext } from "react";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import basketImg from "../image/basketImg.com.png";
import exitImage from "../image/320140.png";
import { useLocation } from "react-router-dom";
import { authorization } from "../http/UserAPI";
import { Link } from "react-router-dom";
import '../CSS/navMenu.css'


const NavBar = observer(() => {
  const { isAuth } = useContext(Context);
  const history = useNavigate();
  const location = useLocation();
  const exit = async () => {
    authorization("guest@gmail.com", "guest");
    isAuth.setIsAuth(false);
    history("/shop");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Container>
        <Link className="navbar-brand" to="/shop">
          BookShop
        </Link>
        {isAuth.isAuth ? (
          <ul className="navbar-nav">
            <li className={`nav-item ${location.pathname === "/shop" ? 'active' : ''}`}>
              <Link className="nav-link" to="/shop">
                Home
              </Link>
            </li>
            <li className={`nav-item ${location.pathname === "/userorders" ? 'active' : ''}`} >
              <Link className="nav-link" to="/userorders">
                Orders
              </Link>
            </li>
            <li className={`nav-item ${location.pathname === "/messageForAdmin" ? 'active' : ''}`} >
              <Link className="nav-link" to="/messageForAdmin">
                Contacts
              </Link>
            </li>
          </ul>
        ) : (
          <div></div>
        )}
        {isAuth.isAuth ? (
          <div>
            <Link to="/basket">
              <img
                style={{ height: 40, marginRight: 20 }}
                src={basketImg}
                alt="basket"
              />
            </Link>
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

export default NavBar;
