import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
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
  width: 240px;
  height: 25px;
  resize: none;
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`

const InterviewMain = () => {
    const navigate = useNavigate();
    const [job, setJob] = useState("");

    const handleJobChange = (e) => {
        setJob(e.target.value);
      };

    const play = () => {
        if (job.trim() ===""){
            alert("직무를 입력해주세요.");
            return;
        }
        else {
            navigate('/interviewContent', {state: job});      
        }

    };

    return (
        <>
            <BodyContent>
                <h1>A.I 면접 질문 생성기</h1>
                <Textarea
                    id="textarea_content"
                    placeholder="직무를 입력해주세요"
                    onChange={handleJobChange}
                    onKeyPress={(event) => {
                        if (event.key === 'Enter') {
                            event.preventDefault();
                        }
                    }}
                    maxLength={14}
                    value={job}
                />
                <Button onClick={() => play()}>면접 보기</Button>
            </BodyContent>
        </>
    );
  }
  
  export default InterviewMain;
