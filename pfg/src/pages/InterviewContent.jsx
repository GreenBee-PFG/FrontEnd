import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CallGPT } from "../api/gpt"

import Spinner from "../component/Spinner";
import Button from "../component/Button";
import preTextarea from "../component/Textarea";
import preBodyContent from "../component/BodyContent"

const BodyContent = styled(preBodyContent)`
  width: 80%;
  justify-content: center;
  align-items: center;
`
const Textarea = styled(preTextarea)`
  width: 70%;
  height: 250px;
`

const Btnarea = styled.div`
 
`

const InterviewContent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const job = location.state;

    const [data, setData] = useState("");
    const [ans, setAns] = useState("");
    const [isLoading, setIsLoading] = useState(false);

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

    const handleClickFeedBackCall = () => {
        navigate('/interviewfeedback', {state: {ans: ans, job: job, question: data?.response}});
    }
    const handleAnswerChange = (e) => {
        setAns(e.target.value);
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
                            value={ans}
                        />
                        <Btnarea>
                            <Button onClick={() => handleClickAPICall()}>Regenerate</Button>
                            <Button onClick={() => handleClickFeedBackCall()}>A.I FeedBack</Button>
                        </Btnarea>
                        
                    </>
                )}
                {isLoading && <Spinner />}

            </BodyContent>
        </>
    );
}
  
export default InterviewContent;