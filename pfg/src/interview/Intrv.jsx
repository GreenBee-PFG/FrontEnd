import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";

const BodyContent = styled.div `
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const OccupationField = styled.div `
  display: flex;
`

const Textarea = styled.textarea `
  text-align: center;
  width: 200px;
  height: 25px;
  resize: none;
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`

const Button = styled.button `
  margin-left: 10px;
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

const Hidden = styled.h1 `
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
`

const AiWrapper = styled.div `
  margin-bottom: 20px;
  position: relative;

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
      top: 22px;
      left: -16%;
  }
`

const AiText = styled.p `
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`

const Intrv = () => {
    const navigate = useNavigate();
    const [job, setJob] = useState("");

    const handleJobChange = (e) => {
        setJob(e.target.value);
    };

    const handleClickPlay = () => {
        if (job.trim() === "") {
            alert("직무를 입력해주세요.");
            return;
        } else {
            navigate('/intrvcontent', {state: job});
        }
    };

    return (
        <> 
          <BodyContent> 
            <Hidden>A.I 면접 질문 생성기</Hidden>
            <AiWrapper>
                <AiText>당신의 직무를 입력해주세요</AiText>
            </AiWrapper>
            <OccupationField>
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
                  value={job}/>
              <br/>
              <Button onClick={() => handleClickPlay()}>면접 보기</Button>
            </OccupationField>
          </BodyContent>
        </>
    );
}

export default Intrv;
