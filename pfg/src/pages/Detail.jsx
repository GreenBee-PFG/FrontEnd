import React, {useEffect, useState} from "react";
import axios from 'axios';
import {useNavigate, useParams, Link} from "react-router-dom";
import styled from "styled-components";

const Container = styled.div `
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
`

const ButtonContainer = styled.div `
    margin: auto;
    display: flex;
    justify-content: flex-end;
`

const BoardItem = styled.div `
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    height: fit-content;
    background-color: #f0f0f0;
    border-radius: 5px;
`

const Title = styled.h1 `
    margin-bottom: 10px;
    text-align: left;
    font-size: 24px;
    color: #333;
`

const Content = styled.div `
    display: flex;
    flex-direction: column;
    text-align: left;
    font-size: 18px;
    color: #666;
`

const LinkButton = styled(Link)`
    display: inline-block;
    margin-right: 10px;
    padding: 10px 20px;
    background-color: #f0f0f0;
    color: #333;
    border: none;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    
    &:hover {
        background-color: #ccc;
    }
`

const DeleteButton = styled(Link)`
    display: inline-block;
    margin-right: 10px;
    padding: 10px 20px;
    background-color: #f0f0f0;
    color: #333;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    
    &:hover {
        background-color: #ccc;
    }
`

const AIFeedBack = styled.div`
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #ccc;
    text-align: left;
    color: black;
`

const UserAnswer = styled.div`
    padding: 10px;
    margin: 0 0 30px 0;
    border-radius: 10px;
    border: 1px solid #ccc;
    text-align: left;
    color: black;

`

const Detail = () => {
    const [job, setJob] = useState("");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [feedback, setFeedback] = useState("");
    const navigate = useNavigate();
    const {id} = useParams();

    const handleDeleteBtnClick = async (e) => {
        e.preventDefault();
        if (window.confirm("게시글을 삭제하시겠습니까?")) {
            const request_data = {
                id: id
            };
            let response = await axios({
                method: 'delete',
                url: '/api/delete-board',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(request_data)
            });
            console.log('Detail/handleDeleteBtnClick/response: ', response);
            if (response.status === 204) {
                alert("게시글 삭제 완료!");
                return navigate("/board", {});
            } else {
                return alert("게시글 삭제 실패!");
            }
        } else {
            return;
        }
    };

    useEffect(() => {
        const getDetailBoard = async () => {
            let response = await axios.get(`/api/board-detail/${id}`);
            setJob(response.data.data.job);
            setQuestion(response.data.data.question);
            setAnswer(response.data.data.answer);
            setFeedback(response.data.data.feedback);
        };
        getDetailBoard();
    }, [id]);

    return (
        <Container>
            <ButtonContainer>
                <DeleteButton to="/board" onClick={handleDeleteBtnClick}>삭제</DeleteButton>
                <LinkButton to={"/board"} state={{}}>목록 보기</LinkButton>
            </ButtonContainer>
            <Title>직무: {job}, 질문: {question}</Title>
            <BoardItem>
                <Content>
                    사용자 답변
                    <UserAnswer>{answer}</UserAnswer>
                    AI 피드백
                    <AIFeedBack>{feedback}</AIFeedBack>
                </Content>
            </BoardItem>
        </Container>
    );
};

export default Detail;
