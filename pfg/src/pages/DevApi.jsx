import React, { useState } from "react";
import styled from "styled-components";
import { CallGPT } from "../api/gpt"

import Spinner from "../component/Spinner";
import Button from "../component/Button";
import BodyCont from "../component/BodyContent";
import StyledTextarea from "../component/Textarea";

const Textarea = styled(StyledTextarea)`
    width: 180px;
    height: 25px;
`

const BodyContent = styled(BodyCont)`
  width: 80%;
  justify-content: center;
  align-items: center;
`

const DevApi = () => {
    const [data, setData] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [job, setJob] = useState("");

    const handleClickAPICall = async() => {
        try {
            setIsLoading(true);
            const message = await CallGPT({prompt: job});
            setData(message);
        } catch (e){
            console.error(e)
        } finally {
            setIsLoading(false);
        }
    };

    const handleContentChange = (e) => {
        setJob(e.target.value);
      };

    return (
        <>
            <BodyContent>
                <h1>ChatGPT API Development Page</h1>
                {isLoading && <Spinner />}
                <div>{data}</div>
                {!isLoading && (
                    <>
                    <Textarea
                        id="textarea_content"
                        placeholder="직무를 입력해주세요"
                        onChange={handleContentChange}
                        value={job}
                    />
                        <Button onClick={() => handleClickAPICall()}>API call</Button>
                    </>
                )}
                
            </BodyContent>
        </>
    );
  }
  
  export default DevApi;