import React, { FC, ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/userActions';
import UserService from '../../services/userService';
import { Endpoints } from '../../routes/endpoint.config';
import { Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import { ReactComponent as Close } from '../../assets/icons/svg/nav-icons/close-mobile.svg';
import MetroLogo from './Logo/MetroLogo';

const NavigatorPhone: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    dispatch(logout());
    await UserService.logout();
  };

  return (
    <Navbar id="nav-phone" sticky="top" className="justify-content-between nav">
      <Link to={Endpoints.DASHBOARD} className="pl-md-3 pl-0">
        <Navbar.Brand as="div" className="h3 p-md-2 font-paris-bold" bsPrefix="home-title">
          Smart Tracer
        </Navbar.Brand>
      </Link>
      <MetroLogo />
      <Close onClick={handleLogout} />
    </Navbar>
  );
};

export default NavigatorPhone;
