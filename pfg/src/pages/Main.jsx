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
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding: 20px;
  color: white;
`

const Banner = styled.div`
  width: 100%;
  height: auto;
  max-width: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin: auto;
  margin-bottom: 20px;
  background-image: url(${sampleimg});
  display: flex;
  flex-direction: column;
  position: relative;
  
`

const Main = () => {
  const navigate = useNavigate();

  const handleMoveBannerBtn = () => {
    navigate(`/adminpage`);
  };

  return (
    <BodyContent>
      <Banner>
        <Inner>
          <Title>Sample Banner</Title>
          <Description>Sample Text</Description>
          <Button onClick={handleMoveBannerBtn}>관리자 페이지로</Button>
        </Inner>
      </Banner>
    </BodyContent>

  );
};

export default Main;