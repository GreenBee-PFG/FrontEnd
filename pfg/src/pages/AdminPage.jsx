import React from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

import preBtn from "../component/Button";
import preBodyContent from "../component/BodyContent";

const AdminPage = (props) => {
    const navigate = useNavigate();

const Button = styled(preBtn)`
    margin: 10px;
  `

const MainContent = styled(preBodyContent)`
    margin: 3px;
    padding: 20px;
    text-align: left;
`

const handleMoveClick = (pagelink) => {
    navigate(`/${pagelink}`);
  };

	return (
		<>
        <MainContent>
          <div>
            <h1>게시판 관련</h1>
            <Button onClick={() => handleMoveClick('board')}>게시판</Button>            
            <Button onClick={() => handleMoveClick('detail/:id')}>게시글 페이지</Button>
            <Button onClick={() => handleMoveClick('createpost')}>글쓰기 페이지</Button>
            <Button onClick={() => handleMoveClick('updatepost')}>게시글 수정 페이지</Button>
          </div>
          <div>
            <h1>ChatGPT AI 관련</h1>
            <Button onClick={() => handleMoveClick('devapi')}>api 개발 페이지</Button>
            <Button onClick={() => handleMoveClick('intrv')}>AI 인터뷰 페이지</Button>            
          </div>
        </MainContent>

		</>
	);
};


export default AdminPage;