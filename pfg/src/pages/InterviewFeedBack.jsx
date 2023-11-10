import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FeedBackGPT } from "../api/feedbackapi"

import Spinner from "../component/Spinner";
import Button from "../component/Button";
import preBodyContent from "../component/BodyContent";

const BodyContent = styled(preBodyContent)`
  width: 80%;
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

    //ans = 사용자 답변, data?.added = ai 조언, job = 직무
    const handleClickTailQuestion = () => {
        navigate('/interviewtailquestion', {state: {ans : ans}}); 
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
                        <div>사용자 답변 : {ans}</div>
                        <br />
                        <div>A.I 조언 : {data?.added}</div>
                        <Btnarea>
                            <Button onClick={() => handleClickRegenerate()}>Regenerate</Button>
                            <Button>공유?</Button>
                            <Button onClick={() => handleClickTailQuestion()}>꼬리질문 생성</Button>
                        </Btnarea>
                        
                    </>
                )}
                {isLoading && <Spinner />}

            </BodyContent>
        </>
    );
}
  
export default InterviewFeedBack;