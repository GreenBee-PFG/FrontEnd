import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FeedBackGPT } from "../api/feedbackapi"

import Spinner from "../component/Spinner";
import Button from "../component/Button";

const BodyContent = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Btnarea = styled.div`
 
`

const InterviewFeedBack = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const ans = location.state.ans;
    const job = location.state.job;
    const question = location.state.question;

    const [data, setData] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleClickRegenerate = () => {
        navigate('/interviewContent', {state: job}); 
    }

    useEffect(() => {
        const handleClickFeedBackCall = async() => {
            try {
                setIsLoading(true);
                const message = await FeedBackGPT({job, ans, question});
                setData(JSON.parse(message));
                console.log(message);
            } catch (e){
                console.error(e)
            } finally {
                setIsLoading(false);
            }
        };
    
        handleClickFeedBackCall();
    }, [ans, job, question]);
    


    return (
        <>
            <BodyContent>
                {!isLoading && (
                    <>
                        <div>질문 : {question}</div>
                        <br />
                        <div>사용자 답변 : {data?.response}</div>
                        <br />
                        <div>A.I 조언 : {data?.added}</div>
                        <Btnarea>
                            <Button onClick={() => handleClickRegenerate()}>Regenerate</Button>
                            <Button>공유?</Button>
                            <Button onClick={() => handleClickRegenerate()}>꼬리질문 (지금은 재생성)</Button>
                        </Btnarea>
                        
                    </>
                )}
                {isLoading && <Spinner />}

            </BodyContent>
        </>
    );
}
  
export default InterviewFeedBack;