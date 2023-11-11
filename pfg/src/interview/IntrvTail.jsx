import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GPTTailAPI } from "../api/tailgptapi"

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

const Btnarea = styled.div`
 
`

const IntrvTail = () => {
    const navigate = useNavigate();
    const location = useLocation();

    //preans = 사용자 답변, data?.added = ai 조언, job = 직무
    const ans = location.state.ans;
    const job = location.state.job;
    const question = location.state.question;
    
    const [data, setData] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleClickAPICall = async() => {
        try {
            setIsLoading(true);
            const message = await GPTTailAPI({job, ans, question});
            setData(JSON.parse(message));
        } catch (e){
            console.error(e)
        } finally {
            setIsLoading(false);
        }
    };
    const handleClickRegenerate = () => {
        navigate('/intrvcontent', {state: job}); 
    }

    const handleClickFeedBackCall = () => {
        navigate('/interviewfeedback', {state: {ans : ans, job : job, question: question}});
    }

    useEffect(() => {
        handleClickAPICall();
    }, []);

    return (
        <>
            <BodyContent>
                {!isLoading && (
                    <>
                        <div>{data?.response}</div>

                        <Btnarea>
                            <Button onClick={() => handleClickRegenerate()}>Regenerate</Button>
                            <Button onClick={() => handleClickFeedBackCall()}>A.I FeedBack</Button>
                        </Btnarea>
                        
                    </>
                )}
                {isLoading && <Spinner />}
            </BodyContent>
        </>
    );
}
  
export default IntrvTail;