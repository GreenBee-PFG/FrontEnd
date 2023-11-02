import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';


const AdminPage = (props) => {
    const navigate = useNavigate();

const Button = styled.button`
    padding: 10px 20px;
    background-color: #f0f0f0;
    color: 333;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin: 10px;
  
    &:hover {
      color: white;
      background-color: #555;
    }
  `

const MainContent = styled.div`
    width: 100%;
    margin: 3px;
    padding: 20px;
    box-sizing: border-box;
    text-align: left;
`

const handleMoveClick = (pagelink) => {
    navigate(`/${pagelink}`);
  };

	return (
		<>
        <MainContent>
            <Button onClick={() => handleMoveClick('board')}>게시판</Button>
            <Button onClick={() => handleMoveClick('createpost')}>글쓰기 페이지</Button>
            <Button onClick={() => handleMoveClick('updatepost')}>게시글 수정 페이지</Button>
            <Button onClick={() => handleMoveClick('detail/:id')}>게시글 페이지</Button>
            <Button onClick={() => handleMoveClick('board')}>게시판</Button>
            <Button onClick={() => handleMoveClick('board')}>게시판</Button>
        </MainContent>

		</>
	);
};


export default AdminPage;