import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

import sampleimg from "../images/samplebanner.png";
import BodyContent from "../component/BodyContent";
import Button from "../component/Button";

const Title = styled.h1 `
  font-size: 64px;
  margin-bottom: 10px;
`

const Description = styled.p `
  font-size: 24px;
  margin-bottom: 20px;
`

const Inner = styled.div `
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding: 20px;
  color: white;
`

const Banner = styled.div `
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
  top: 10%;
`

const BoardListWrapper = styled.div `
  width: 100%;
  max-width: 1100px;
  margin: auto;
`

const BoardListUl = styled.ul `
  list-style: none;
  margin: 10px;
  padding: 0;
`

const BoardList = styled.li `
  display: flex;
  width: 100%; 
  text-align: left;
`

const ListNum = styled.div `
  width: 10%;
  padding: 10px 0;
`

const ListTitle = styled.div `
  width: 90%;
  padding: 10px 0;
`

const MainHeader = styled.div `
  width: 100%;
  display: flex;
  font-weight: bold;
  font-size: 24px;
  text-align: left;
  border-bottom: 1px solid #ccc;
`
const HeaderNum = styled.div `
  width: 10%;
  padding: 10px 0;
`
const HeaderTitle = styled.div `
  width: 90%;
  padding: 10px 0;
  text-align: center;
`

const Main = () => {
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

    const handleMoveBannerBtn = () => {
      navigate(`/intrv`);
    };

    return (
        <BodyContent>
            <Banner>
                <Inner>
                    <Title>TalkMate</Title>
                    <Description>A.I 기반 면접 준비 서비스</Description>
                    <Button onClick={handleMoveBannerBtn}>AI 면접 보기</Button>
                </Inner>
            </Banner>

            <BoardListWrapper>
                <MainHeader>
                    <HeaderNum>No</HeaderNum>
                    <HeaderTitle>제 목</HeaderTitle>
                </MainHeader>
                <BoardListUl>
                    {data.map((board, index) => (
                        <BoardList key={board.id}>
                            <ListNum>{index + 1}</ListNum>
                            <ListTitle>{board.job + ") " + board.question}</ListTitle>
                        </BoardList>
                    ))}
                </BoardListUl>
            </BoardListWrapper>
        </BodyContent>

    );
};

export default Main;