import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`

const HeadContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center; 
`

const Title = styled.h1`
  margin-bottom: 10px;
  color: #333;
  font-size: 24px;
`

const Label = styled.label`
  text-align: left;
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
`

const TitleInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`

const Textarea = styled.textarea`
  width: 100%;
  height: 300px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
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

const UpdatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state.id;
  const oldTitle = location.state.title;
  const oldContent = location.state.content;

  const resetInput = () => {
    setContent("");
    setTitle("");
    document.getElementById('input_title').value = '';
    document.getElementById('textarea_content').value = '';
  };

  const handleInputClick = async (e) => {
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
    
    e.preventDefault();
    console.log('writeBoard');
    const requestData = { id, title, content };
    console.log('requestData: ', requestData);
    try {
      const response = await axios.put('/api/update-board', requestData);
      console.log('writeBoard/response: ', response);
      console.log('writeBoard/response.status: ', response.status);
      setTitle(""); // 제목 초기화
      setContent(""); // 내용 초기화
      navigate(`/detail/${id}`); // 수정 후 상세 페이지로 이동
    } catch (err) {
      console.log('CreateBoard/handleInput/err: ', err);
      resetInput();
    }
  };

  useEffect(() => {
    console.log('UpdateBoard/useEffect()');
    setTitle(oldTitle);
    setContent(oldContent);
  }, [oldContent, oldTitle]);
  
  return (
    <Container>
      <HeadContainer>
        <Title>수정하기</Title>
        <Button type="button" value="게시글 수정" onClick={handleInputClick} />
      </HeadContainer>
      <Label htmlFor="input_title">제목</Label>
      <TitleInput
        id="input_title"
        type="text"
        placeholder="수정할 제목을 입력해주세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Label htmlFor="textarea_content">내용</Label>
      <Textarea
        id="textarea_content"
        placeholder="수정할 내용을 입력해주세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </Container>
  );
};

export default UpdatePost;
