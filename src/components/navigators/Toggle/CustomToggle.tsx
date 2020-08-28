import React, { forwardRef, HTMLProps } from 'react';
import { ReactComponent as Arrow } from '../../../assets/icons/svg/nav-icons/dropdown.svg';

type ToggleProps = HTMLProps<HTMLAnchorElement>;

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
export const CustomToggle = forwardRef<HTMLAnchorElement, ToggleProps>(
  ({ children, onClick }, ref) => (
    <a
      href="#"
      ref={ref}
      className="default-dropdown pointer"
      onClick={(e) => {
        e.preventDefault();
        if (onClick) onClick(e);
      }}>
      <Arrow className="mr-3" />
      {children}
    </a>
  ),
);

export default CustomToggle;
