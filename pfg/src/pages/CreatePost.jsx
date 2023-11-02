import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 800px;
  margin: 0 auto;
`
const HeadContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center; 
`

const TitleLabel = styled.h3`
  text-align: left;
  font-size: 20px;
  margin-bottom: 10px;
`

const ContentLabel = styled.h3`
  text-align: left;
  font-size: 20px;
  margin-bottom: 10px;
`

const TitleInput = styled.input`
  width: 100%;
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`

const Textarea = styled.textarea`
  width: 100%;
  height: 300px;
  resize: none;
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`

const Button = styled.input`
  display: inline-block;
  margin-right: 10px;
  padding: 10px 20px;
  background-color: #f0f0f0;
  color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ccc;
  }
`

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleInputClick = async () => {
    if (title.trim() === "" || content.trim() === "") {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    if (title.length > 30) {
      alert("제목은 30글자 이하여야 합니다.");
      return;
    }    
    if (content.length > 8000) {
      alert("내용은 8000자 이하여야 합니다.");
      return;
    }

    const requestData = { title, content };

    try {
      console.log("Registration Data:", requestData);
      const response = await axios.post('/api/create-board', requestData);
      console.log('writeBoard/response: ', response);
      console.log('writeBoard/response.status: ', response.status);

      if (response.status >= 200 && response.status < 400) {
        alert("게시글이 정상적으로 생성되었습니다.");
      } else if (response.status >= 400) {
        alert("게시글 생성이 정상적으로 되지 않았습니다.");
      }

      navigate("/board");
    } catch (error) {
      console.log('CreateBoard/handleInput/err: ', error);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <Container>
      <HeadContainer>
        <TitleLabel>제목</TitleLabel>
        <Button
          type="button"
          value="게시글 생성"
          onClick={handleInputClick}
        />
      </HeadContainer>
      <TitleInput
        id="input_title"
        type="text"
        placeholder="제목을 입력해주세요"
        onChange={handleTitleChange}
        value={title}
      />

      <ContentLabel>내용</ContentLabel>
      <Textarea
        id="textarea_content"
        placeholder="내용을 입력해주세요"
        onChange={handleContentChange}
        value={content}
      />
    </Container>
  );
};

export default CreatePost;
