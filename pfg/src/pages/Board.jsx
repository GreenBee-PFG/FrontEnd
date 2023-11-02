import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 800px;
  margin: 0 auto;
`
const HeadContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center; 
`

const Title = styled.h1`
  margin-bottom: 20px;
`

const Pagenum = styled.div`
  width: 600px;
  height: 100Px;
  margin: auto;
`


const BoardItem = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  height: fit-content;
  background-color: #f0f0f0;
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

  return (
    <Container>
      <HeadContainer>
        <Title>게시판</Title>
        <CreateButton>글쓰기</CreateButton>
      </HeadContainer>
      
        <BoardItem>
          <BoardTitle>게시글 제목</BoardTitle>
        </BoardItem>
      
    </Container>
  );
};

export default Board;