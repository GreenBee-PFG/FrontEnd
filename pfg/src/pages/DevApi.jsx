import React, { useState } from "react";
import styled from "styled-components";
import { CallGPT } from "../api/gpt"

import Spinner from "../component/Spinner";
import Button from "../component/Button";

const BodyContent = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Textarea = styled.textarea`
  text-align: center;
  width: 180px;
  height: 25px;
  resize: none;
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`

const DevApi = () => {
    const [data, setData] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState("");

    const handleClickAPICall = async() => {
        try {
            setIsLoading(true);
            const message = await CallGPT({prompt: content});
            setData(message);
        } catch (e){
            console.error(e)
        } finally {
            setIsLoading(false);
        }
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
      };

    return (
        <>
            <BodyContent>
                <h1>dev gpt api</h1>

                <Button onClick={() => handleClickAPICall()}>GPT API call</Button>
                <div>{data}</div>
                <div>isLoading : {isLoading ?  <Spinner /> : "fin"}</div>
                <Textarea
                    id="textarea_content"
                    placeholder="직무를 입력해주세요"
                    onChange={handleContentChange}
                    value={content}
                />
            </BodyContent>
        </>
    );
  }
  
  export default DevApi;