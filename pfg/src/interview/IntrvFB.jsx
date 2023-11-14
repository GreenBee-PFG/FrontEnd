import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FeedBackGPT } from "../api/feedbackapi"
import axios from 'axios';

import Spinner from "../component/Spinner";
import Button from "../component/Button";
import preBodyContent from "../component/BodyContent";

const BodyContent = styled(preBodyContent)`
  width: 80%;
  justify-content: center;
  align-items: center;
`

const AIQuestion = styled.div`
    width : 60%;
    padding: 10px;
    margin: 30px;
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

const IntrvFB = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const ans = location.state.ans;
    const job = location.state.job;
    const question = location.state.question;

    const [data, setData] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleClickRegenerate = () => {
        navigate('/intrvcontent', {state: job}); 
    }

    //ans = 사용자 답변, data?.added = ai 조언, job = 직무
    const handleClickTailQuestion = () => {
        navigate('/intrvtail', {state: {ans : ans, job : job}}); 
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

    const handleShareClick = async () => {
        const requestData = {
            job: job,
            question: question,
            answer: ans,
            feedback: data?.response
        };
    
        try {
            setIsLoading(true); // 로딩 상태 시작
            const response = await axios.post('/api/interview-feedback', requestData);
            if (response.status === 201) {
                alert('면접 피드백이 성공적으로 공유되었습니다.');
                navigate('/board'); // 게시판 경로로 이동
            } else {
                alert('면접 피드백을 공유하는 데 문제가 발생했습니다.');
            }
        } catch (error) {
            console.error('면접 피드백 공유 중 오류 발생: ', error);
            alert('면접 피드백 공유 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false); // 로딩 상태 종료
        }
    };
    
    return (
        <>
            <BodyContent>
                {!isLoading && (
                    <>
                        <AIQuestion>{question}</AIQuestion>
                        <AIQuestion>{data?.response}</AIQuestion>
                        <br />
                        <div>사용자 답변 : {ans}</div>
                        <br />
                        <div>
                            <Button onClick={() => handleClickRegenerate()} style={{margin: "5px"}}>질문 재생성</Button>
                            <Button onClick={() => handleShareClick()} style={{margin: "5px"}}>공유</Button>
                            <Button onClick={() => handleClickTailQuestion()} style={{margin: "5px"}}>꼬리질문 생성</Button>
                        </div>
                        
                    </>
                )}
                {isLoading && <Spinner />}

            </BodyContent>
        </>
    );
}
  
export default IntrvFB;