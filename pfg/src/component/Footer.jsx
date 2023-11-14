import React from "react";
import styled from "styled-components";
import config from "../config";

const StyledFooter = styled.div ` 
    display : flex;
    background-color: #343439;
    color: white;
    height: ${config.FooterHeight};
    width: 100%;
    justify-content: center;
    text-align: center;
    align-items: center;
    margin: auto;
`
const P = styled.p `
    margin: 10px 0 10px 20px;
    font-size: small;
`

const Footer = () => {
    return (
        <StyledFooter>
            <div>
                <P>TalkMate</P>
                <P>Copyright 2023. TalkMate All pictures cannot be copied without permission.</P>
            </div>
        </StyledFooter>
    )
}

export default Footer