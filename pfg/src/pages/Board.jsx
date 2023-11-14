import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";

const Container = styled.div`
  width: 800px;
  margin: 0 auto;
  position: absolute;
  top: 8%;
`
const HeadContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center; 
  border-bottom: 3px solid #ccc;
  margin-bottom: 10px;
`

const Title = styled.h1`
  margin-bottom: 10px;
`

const BoardItem = styled.div`
  margin-bottom: 5px;
  border-bottom: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
`

const BoardTitle = styled.h3`
  margin-bottom: 5px;
  text-align: left;
`

const CreateButton = styled.button`
  display: inline-block;
  margin-right: 10px;
  padding: 10px 20px;
  background-color: #f0f0f0;
  color: #333;
  border: none;
  border-radius: 5px;
  border: none;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ccc;
  }
`

const Board = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [totalIds, setTotalIds] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    console.log(totalIds);
  }, [totalIds]);

  useEffect(() => {
    const getTotalIds = async () => {
      let response = await axios.get("/api/total-ids");
      const data = parseInt(response.headers.totalcount, 10);
      console.log(data);
      setTotalIds(data || 0);
    };
    getTotalIds();
  }, []);

  useEffect(() => {
    setCurrentPage(0);
  }, []);

  useEffect(() => {
    const getBoardList = async () => {
      console.log('getBoardList()');
      let response = await axios.get(`/api/board-list?pageNumber=${currentPage}`);
      console.log('main/response: ', response);
      setData(response.data.data || []);
    };
    getBoardList();
  }, [currentPage]);

  const handleCreateBoardClick = () => {
    navigate('/createpost');
  };

  const handleBoardItemClick = (id) => {
    navigate(`/detail/${id}`);
  };

 

  return (
    <Container>
      <HeadContainer>
        <Title>게시판</Title>
        <CreateButton onClick={handleCreateBoardClick}>글쓰기</CreateButton>
      </HeadContainer>
      {data.map(board => (
        <BoardItem key={board.id} onClick={() => handleBoardItemClick(board.id)}>
          <BoardTitle>{board.job+") "+board.question}</BoardTitle>
        </BoardItem>
      ))}
    </Container>
  );
};

export default Board;