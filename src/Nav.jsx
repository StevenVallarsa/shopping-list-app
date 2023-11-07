import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <ul id="navbar-buttons">
        <li>
          <NavLink className={({ isActive }) => (isActive ? "active" : "inActive")} to="/">
            Make List
          </NavLink>
        </li>
        <li>
          <NavLink className={({ isActive }) => (isActive ? "active" : "inActive")} to="/shop">
            Shop
          </NavLink>
        </li>
        <li>
          <NavLink className={({ isActive }) => (isActive ? "active" : "inActive")} to="/settings">
            Modify Items
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
