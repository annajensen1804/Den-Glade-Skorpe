import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Hamburger from "hamburger-react";
import { toast } from "react-toastify";
import logo from "/logo.png";
import Basket from "../basket/Basket";
import { useAuthContext } from "../../context/useAuthContext";

/* Når brugeren klikker på fx /basket bliver Basket-siden vist - uden at siden
   genindlæses. Det er den samme html-side, men indholdet skifter alt efter url'en. */
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, logout } = useAuthContext();
  const navigate = useNavigate();

  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    toast.success("Du er nu logget ud");
    navigate("/");
  };

  return (
    <nav className='navbar'>
      <Link to='/' onClick={closeMenu}>
        <img src={logo} alt='logo' className='logo' />
      </Link>

      <div className='burger-menu'>
        <NavLink to='/basket' onClick={closeMenu}>
          <Basket />
        </NavLink>
        <Hamburger toggled={isOpen} toggle={setIsOpen} size={28} color='#fff' />
      </div>

      <ul className={isOpen ? "nav-links open" : "nav-links"}>
        <li>
          <NavLink onClick={closeMenu} to='/'>
            Forside
          </NavLink>
        </li>
        <li>
          <NavLink onClick={closeMenu} to='/employees'>
            Personale
          </NavLink>
        </li>
        <li>
          <NavLink onClick={closeMenu} to='/contact'>
            Kontakt
          </NavLink>
        </li>
        <li>
          <NavLink onClick={closeMenu} to='/basket'>
            Kurv
          </NavLink>
        </li>

        {/* Login / Log ud styres af, om man er logget ind (login er bygget). */}
        {isLoggedIn ? (
          <>
            {/* ── TODO (code-along): aktivér, når backoffice-ruten er bygget ──
            <li>
              <NavLink onClick={closeMenu} to='/backoffice'>
                Backoffice
              </NavLink>
            </li>
            ───────────────────────────────────────────────────────────────── */}
            <li>
              <a onClick={handleLogout} style={{ cursor: "pointer" }}>
                Log ud
              </a>
            </li>
          </>
        ) : (
          <li>
            <NavLink onClick={closeMenu} to='/login'>
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
