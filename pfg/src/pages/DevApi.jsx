import React from "react";
import styled from "styled-components";
import { CallGPT } from "../api/gpt"

import Button from "../component/Button";

const BodyContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const handleClickAPICall = async() => {
    console.log(">>GPTAPI");
    await CallGPT();
};


const DevApi = () => {
    return (
        <>
            <BodyContent>
                <h1>dev gpt api</h1>
                <Button onClick={() => handleClickAPICall}>GPT API call</Button>
            </BodyContent>
        </>
    );
  }
  
  export default DevApi;