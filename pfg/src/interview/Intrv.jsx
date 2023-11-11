import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
const Button = styled.button`
  padding: 10px 20px;
  background-color: #f0f0f0;
  color: 333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    color: white;
    background-color: #555;
  }
`

const Intrv = () => {
    const navigate = useNavigate();
    const [job, setJob] = useState("");

    const handleJobChange = (e) => {
        setJob(e.target.value);
      };

    const handleClickPlay = () => {
        if (job.trim() ===""){
            alert("직무를 입력해주세요.");
            return;
        }
        else {
            navigate('/intrvcontent', {state: job});      
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
                <br />
                <Button onClick={() => handleClickPlay()}>면접 보기</Button>
            </BodyContent>
        </>
    );
  }
  
  export default Intrv;
