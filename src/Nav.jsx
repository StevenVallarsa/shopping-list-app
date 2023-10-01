import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <ul id="navbar-buttons">
        <li>
          <NavLink to="/">Make List</NavLink>
        </li>
        <li>
          <NavLink to="/shop">Shop</NavLink>
        </li>
        <li>
          <NavLink to="/settings">Settings</NavLink>
        </li>
      </ul>
    </nav>
  );
}
