import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { gptAPI } from "../api/gptAPI"

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

  &::placeholder {
    text-align: left;
}
`

const Btnarea = styled.div`
 
`

const AIQuestion = styled.div`
    width : 60%;
    padding: 10px;
    margin: 50px;
    border-radius: 10px;
    border: 1px solid #ccc;
    position: relative;
    text-align: left;

    &:after {
        content: "AI";
        color: #fff;
        background-color: #343439;
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 27px;
        border-radius: 50px;
        position: absolute;
        top: 7px;
        left: -10%;
    }
`

const IntrvTail = () => {
    const navigate = useNavigate();
    const location = useLocation();

    //preans = 사용자 답변, data?.added = ai 조언, job = 직무
    const ans = location.state.ans;
    const job = location.state.job;
    
    const [data, setData] = useState("");
    const [tailans, setTailans] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleClickAPICall = useCallback(async() => {
        try {
            setIsLoading(true);
            const message = await gptAPI({ job: job, ans: ans, question: null, value: 3 });
            setData(JSON.parse(message));
        } catch (e){
            console.error(e)
        } finally {
            setIsLoading(false);
        }
    }, [job, ans]);
    const handleClickRegenerate = () => {
        navigate('/intrvcontent', {state: job}); 
    }

    const handleClickFeedBackCall = () => {
        navigate('/intrvfeedback', {state: {ans: tailans, job: job, question: data?.response}});
    }

    const handleAnswerChange = (e) => {
        setTailans(e.target.value);
      };

    useEffect(() => {
        handleClickAPICall();
    }, [handleClickAPICall]);

    return (
        <>
            <BodyContent>
                {!isLoading && (
                    <>
                        <AIQuestion>{data?.response}</AIQuestion>
                        <Textarea
                            id="textarea_content"
                            placeholder="질문에 대한 답변을 적어주세요"
                            onChange={handleAnswerChange}
                            value={tailans}
                        />
                        <Btnarea>
                            <Button onClick={() => handleClickRegenerate()} style={{margin: "5px"}}>질문 재생성</Button>
                            <Button onClick={() => handleClickFeedBackCall()} style={{margin: "5px"}}>A.I FeedBack</Button>
                        </Btnarea>
                        
                    </>
                )}
                {isLoading && <Spinner />}
            </BodyContent>
        </>
    );
}
  
export default IntrvTail;