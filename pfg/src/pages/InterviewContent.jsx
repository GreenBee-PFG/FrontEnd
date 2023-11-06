import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
  width: 70%;
  height: 250px;
  resize: none;
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`

const InterviewContent = () => {
    const [data, setData] = useState("");
    const [ans, setAns] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const job = location.state;

    const handleClickAPICall = async() => {
        try {
            setIsLoading(true);
            const message = await CallGPT({prompt: job});
            setData(JSON.parse(message));
        } catch (e){
            console.error(e)
        } finally {
            setIsLoading(false);
        }
    };

    const handleAnswerChange = (e) => {
        setAns(e.target.value);
      };

    useEffect(() => {
        handleClickAPICall();
    }, [job]);

    return (
        <>
            <BodyContent>
                {!isLoading && (
                    <>
                        <div>{data?.response}</div>
                        <Textarea
                            id="textarea_content"
                            placeholder="질문에 대한 답변을 적어주세요"
                            onChange={handleAnswerChange}
                            value={ans}
                        />
                        <Button onClick={() => handleClickAPICall()}>질문 재생성</Button>
                    </>
                )}
                {isLoading && <Spinner />}

            </BodyContent>
        </>
    );
}
  
export default InterviewContent;