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
    
    const [data, setData] = useState("");
    const [tailans, setTailans] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleClickAPICall = async() => {
        try {
            setIsLoading(true);
            const message = await GPTTailAPI({job, ans});
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
        navigate('/intrvfeedback', {state: {ans: tailans, job: job, question: data?.response}});
    }

    const handleAnswerChange = (e) => {
        setTailans(e.target.value);
      };

    useEffect(() => {
        handleClickAPICall();
    }, []);

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
                            value={tailans}
                        />
                        <Btnarea>
                            <Button onClick={() => handleClickRegenerate()}>질문 재생성</Button>
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