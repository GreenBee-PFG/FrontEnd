import React from "react";

function NavItem({ menu }) {
  return (
    <div className="Nav-item">
      <p>{menu.name}</p>
    </div>
  );
}

export default NavItem; 