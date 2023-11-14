import React from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import sampleimg from "../images/samplebanner.png";

import BodyContent from "../component/BodyContent";
import Button from "../component/Button";

const Title = styled.h1`
  font-size: 64px;
  margin-bottom: 10px;
`

const Description = styled.p`
  font-size: 24px;
  margin-bottom: 20px;
`

const Inner = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding: 20px;
  color: white;
`

const Banner = styled.div`
  width: 100%;
  height: auto;
  max-width: 1100px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin: auto;
  margin-bottom: 100px;
  background-image: url(${sampleimg});
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 10%;
`

const BoardListWrapper = styled.div`
  width: 100%;
`

const BoardListUl = styled.ul`
  list-style: none;
  margin: 10px;
  padding: 0;
`

const BoardList = styled.li`
  display: flex;
  width: 100%; 
  text-align: left;
`

const ListNum = styled.div`
  width: 10%;
  padding: 10px 0;
`

const ListTitle = styled.div`
  width: 90%;
  padding: 10px 0;
`

const MainHeader = styled.div`
  width: 100%;
  display: flex;
  font-weight: bold;
  font-size: 24px;
  text-align: left;
  border-bottom: 1px solid #ccc;
`
const HeaderNum = styled.div`
  width: 10%;
  padding: 10px 0;
`
const HeaderTitle = styled.div`
  width: 90%;
  padding: 10px 0;
  text-align: center;
`

const Main = () => {
  const navigate = useNavigate();

  const handleMoveBannerBtn = () => {
    navigate(`/intrv`);
  };

  return (
    <BodyContent>
      <Banner>
        <Inner>
          <Title>토크메이트</Title>
          <Description>AI 기반 면접 준비 및 직무 커뮤니티</Description>
          <Button onClick={handleMoveBannerBtn}>AI 면접 보기</Button>
        </Inner>
      </Banner>

      <BoardListWrapper>
        <MainHeader>
          <HeaderNum>No</HeaderNum>
          <HeaderTitle>제 목</HeaderTitle>
        </MainHeader>
        <BoardListUl>
          <BoardList>
            <ListNum>1</ListNum>
            <ListTitle>테스트</ListTitle>
          </BoardList>
        </BoardListUl>
      </BoardListWrapper>
    </BodyContent>

  );
};

export default Main;