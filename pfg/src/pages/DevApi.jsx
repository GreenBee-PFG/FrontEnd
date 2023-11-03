import React, { useState } from "react";
import styled from "styled-components";
import { CallGPT } from "../api/gpt"

import Button from "../component/Button";

const BodyContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const DevApi = () => {
    const [data, setData] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleClickAPICall = async() => {
        try {
            setIsLoading(true);
            const message = await CallGPT();
            setData(message);
        } catch (e){
            console.error(e)
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <BodyContent>
                <h1>dev gpt api</h1>
                <Button onClick={() => handleClickAPICall()}>GPT API call</Button>
                <div>data : {data}</div>
                <div>isLoading : {isLoading ? "loading.." : "fin"}</div>
            </BodyContent>
        </>
    );
  }
  
  export default DevApi;