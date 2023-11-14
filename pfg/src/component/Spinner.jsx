import React from "react";
import styled, {keyframes} from 'styled-components';
import loading from "../images/loading.png"

const rotate = keyframes `
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(-180deg);
  }
  100% {
    transform: rotate(-360deg);
  }
`

const Rotate = styled.img `
    animation: ${rotate} 4s infinite linear reverse;
    width:80px;
    height:80px;
    display:block;
    margin:0 auto;
`

function Spinner() {
    return (<> < Rotate src = {
        loading
    }
    alt = "로딩중" /> </>)
}

export default Spinner;