import React from 'react';
import { Button, Container, Dropdown, DropdownButton, Nav, Navbar } from 'react-bootstrap';
import logo from '../../images/logo.png';
import { useLogged } from '../../pages/auth/Hooks';
import { useNavigate, useLocation } from 'react-router-dom';
import './style.css'
import { logout } from '../../services/authentification';
import { MdFavoriteBorder, MdOutlineLogout, MdOutlineAccountCircle } from 'react-icons/md';


const TopNavbar = () => {

  const location = useLocation();

  const [currentClass, setCurrentClass] = React.useState('');
  const { logged, setLogged } = useLogged();

  const navigate = useNavigate();

  const loadNav = React.useCallback(() => {
    if (location.pathname === '/login' ||
      location.pathname === '/register'
    ) return setCurrentClass("notShowNav")
    return setCurrentClass("ShowNav")
  }, [location.pathname]);

  React.useEffect(() => loadNav(), [loadNav]);

  const handleNavigateToProfilPage = () => {
    navigate("/profil")
  }

  const handleDisconnect = () => {
    logout();
    setLogged(false)
    navigate('/');
    window.location.reload();
  }

  return (
    <div className={currentClass}>
      <Navbar collapseOnSelect expand="lg" className='design-navbar'>
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt='logo' className='logo' />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/crypto">crypto-monnaies</Nav.Link>
              <Nav.Link href="/feed">Actualités</Nav.Link>
              <Nav.Link href="/watchlist">Liste de suivi</Nav.Link>
            </Nav>
            <Nav>
              {logged || location.search=== "?justLogged=true"
                ?
                <DropdownButton
                  align="end"
                  title="Mon compte"
                  id="dropdown-menu-align-end"
                >
                  <Dropdown.Item eventKey="1" href='/watchlist'>
                    <MdFavoriteBorder style={{ marginRight: '0.5rem' }} />
                    Favoris
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="2" onClick={handleNavigateToProfilPage}>
                    <MdOutlineAccountCircle style={{ marginRight: '0.5rem' }} />
                    Voir le profil
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item eventKey="3" onClick={handleDisconnect}>
                    <MdOutlineLogout style={{ marginRight: '0.5rem' }} />
                    Déconnexion
                  </Dropdown.Item>
                </DropdownButton>
                :
                <>
                <Nav.Link eventKey={2} href="/login">
                  <Button variant="light" className='navbar-button' style={{ width: "100%", paddingLeft: "3rem", paddingRight: "3rem", borderColor: '#0d6efd', color: '#0d6efd'  }}>Connexion</Button>
                </Nav.Link>
                <Nav.Link eventKey={2} href="/register">
                  <Button variant="primary" className='navbar-button' style={{ width: "100%", paddingLeft: "3rem", paddingRight: "3rem" }}>Créer un compte</Button>
                </Nav.Link>
              </>
                // <Nav.Link eventKey={2}>
                //   <Button variant="primary">Mon compte</Button>
                
                // </Nav.Link>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default TopNavbar;