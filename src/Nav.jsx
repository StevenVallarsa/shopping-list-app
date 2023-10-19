import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <ul id="navbar-buttons">
        <li>
          <NavLink className="main-buttons" to="/">
            Make List
          </NavLink>
        </li>
        <li>
          <NavLink className="main-buttons" to="/shop">
            Shop
          </NavLink>
        </li>
        <li>
          <NavLink className="main-buttons" to="/settings">
            Modify Items
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
