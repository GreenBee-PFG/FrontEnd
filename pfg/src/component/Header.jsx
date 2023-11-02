import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import HeaderItem from "./Header-NavItem";
import config from "../config";

/* gray #343439 */
const StyledHeader = styled.div`
  position: fixed;
  top: 0;
  align-items: center;
  background-color: #343439;
  color: white;
  display: flex;
  height: ${config.HeaderHeight};
  width: 100%;
  z-index: 9999; /* 필요에 따라 적절한 z-index 값을 설정하세요 */
`;

const Menu = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: auto;
`;

const Headerdiv = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  max-width: ${config.BodyWidth};
  margin: 0 auto;
`;

const Logo = styled.h1`
  color: white;
  text-decoration: none;
  margin: auto;
  margin-left : 20px;
`;

function Header() {
  const menus = [
  ];

  return (
    <StyledHeader>
      <Headerdiv>
        <Logo>
          <NavLink to="/" style={{ color: "white", textDecoration: "none" }}>
            LOGO
          </NavLink>
        </Logo>
        <Menu>
          {menus.map((menu, index) => {
            return (
              <NavLink
                exact
                style={{ color: "white", textDecoration: "none", margin: "auto 20px auto 0" }}
                to={menu.path}
                key={index}
                activeStyle={{ color: "black" }}
              >
                <HeaderItem menu={menu} />
              </NavLink>
            );
          })}
        </Menu>
      </Headerdiv>
    </StyledHeader>
  );
}

export default Header;