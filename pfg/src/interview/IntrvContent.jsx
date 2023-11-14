import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { gptAPI } from "../api/gptAPI"

import Spinner from "../component/Spinner";
import Button from "../component/Button";
import preBodyContent from "../component/BodyContent"

const BodyContent = styled(preBodyContent)`
    width: 80%;
    justify-content: center;
    align-items: center;
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

const Textarea = styled.textarea`
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

const IntrvContent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const job = location.state;

    const [data, setData] = useState("");
    const [ans, setAns] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleClickAPICall = async() => {
        try {
            setIsLoading(true);
            const message = await gptAPI({ job: job, ans: null, question: null, value: 1  });
            setData(JSON.parse(message));
        } catch (e){
            console.error(e)
        } finally {
            setIsLoading(false);
        }
    };

    const handleClickFeedBackCall = () => {
        if (ans.trim() ===""){
            alert("답변을 입력해주세요.");
            return;
        }
        else { 
            navigate('/intrvfeedback', {state: {ans: ans, job: job, question: data?.response}});
        }
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
                        <AIQuestion>{data?.response}</AIQuestion>
                        <Textarea
                            id="textarea_content"
                            placeholder="질문에 대한 답변을 적어주세요"
                            onChange={handleAnswerChange}
                            value={ans}
                        />
                        <br />
                        <div>
                            <Button onClick={() => handleClickAPICall()} style={{margin: "5px"}}>질문 재생성</Button>
                            <Button onClick={() => handleClickFeedBackCall()} style={{margin: "5px"}}>AI 피드백</Button>
                        </div>
                    </>
                )}
                {isLoading && <Spinner />}

            </BodyContent>
        </>
    );
}

export default IntrvContent;