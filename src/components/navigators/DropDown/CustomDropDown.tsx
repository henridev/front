import React, { FC, ReactElement, memo, useState, SyntheticEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Role } from '../../../models/role.model';
import { logout } from '../../../redux/actions/userActions';
import UserService from '../../../services/userService';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { ReactComponent as Close } from '../../../assets/icons/svg/nav-icons/close.svg';
import { ReactComponent as UserLogo } from '../../../assets/icons/svg/nav-icons/user.svg';
import { ReactComponent as Burger } from '../../../assets/icons/svg/nav-icons/burger.svg';
import { ReactComponent as LookingGlass } from '../../../assets/icons/svg/button-icons/searchglass.svg';
import { Endpoints } from '../../../routes/endpoint.config';
import CustomToggle from '../Toggle/CustomToggle';
import { useTypedSelector } from '../../../services/hooks/useTypedSelector';

type Props = {
  displayState: {
    showNameLogo: boolean;
    showSearchContainer: boolean;
    showLookingGlass: boolean;
  };
  displayHandlers: {
    handleLookingGlassClick: (_: SyntheticEvent<SVGElement, MouseEvent>) => void;
    handleHabilitationsClick: (_: SyntheticEvent<HTMLAnchorElement, MouseEvent>) => void;
  };
};

const CustomDropDown: FC<Props> = ({ displayState, displayHandlers }): ReactElement => {
  const { roles, registrationNumber } = useTypedSelector(({ userState: { user } }) => ({
    registrationNumber: user ? user.registration_number : '',
    roles: user ? user.roles : ([] as Role[]),
  }));
  const dispatch = useDispatch();
  const handleLogout = async () => {
    dispatch(logout());
    await UserService.logout();
  };

  const isRpOrAdmin = roles.includes(Role.ADMIN) || roles.includes(Role.RP);

  return (
    <Dropdown className="h5 p-2 pr-md-3 pr-0" id="custom-nav-dropdown">
      {!displayState.showSearchContainer && (
        <div className="show-mobile pointer d-flex">
          {displayState.showLookingGlass && (
            <LookingGlass
              className="mr-2 svg-searchglas"
              onClick={displayHandlers.handleLookingGlassClick}
            />
          )}
          <Dropdown.Toggle id="burger" as={Burger} className="mx-3" />
        </div>
      )}
      <Dropdown.Toggle as={CustomToggle}>{registrationNumber}</Dropdown.Toggle>
      <Dropdown.Menu>
        {isRpOrAdmin && (
          <>
            <Link to={Endpoints.HABILITATION} onClick={displayHandlers.handleHabilitationsClick}>
              <Dropdown.Item as="div">
                <UserLogo id="svg-user" /> <span className="ml-2">Habilitations</span>
              </Dropdown.Item>
            </Link>
            <Dropdown.Divider />
          </>
        )}
        <Dropdown.Item as="div" onClick={handleLogout} className="pointer">
          <Close id="svg-close" /> <span className="ml-2">Déconnexion</span>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default memo(CustomDropDown);
