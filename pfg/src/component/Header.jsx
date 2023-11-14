import React from "react";
import {NavLink} from "react-router-dom";
import styled from "styled-components";
import config from "../config";

/* gray #343439 */
const StyledHeader = styled.div `
  position: fixed;
  top: 0;
  align-items: center;
  background-color: #343439;
  color: white;
  display: flex;
  height: ${config.HeaderHeight};
  width: 100%;
  z-index: 9999;
`

const Headerdiv = styled.div `
  display: flex;
  width: 100%;
  height: 100%;
  max-width: ${config.BodyWidth};
  margin: 0 auto;
`

const Logo = styled.h1 `
  color: white;
  text-decoration: none;
  margin: auto;
  margin-left : 20px;
`

function Header() {

    return (
        <StyledHeader>
            <Headerdiv>
                <Logo>
                    <NavLink
                        to="/"
                        style={{
                            color: "white",
                            textDecoration: "none"
                        }}>
                        TalkMate
                    </NavLink>
                </Logo>
            </Headerdiv>
        </StyledHeader>
    );
}

export default Header;