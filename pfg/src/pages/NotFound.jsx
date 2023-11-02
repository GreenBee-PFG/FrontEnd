import React from 'react';
import styled from "styled-components";

const Nopage = styled.div`
	display: flex;
	flex-direction: column;
`

const Text = styled.div`
	margin: 10px;
`

const NotFound = (props) => {
	return (
		<>
			<Nopage>
				<h1>404</h1>
				<Text>페이지가 존재하지 않거나, 사용할수없는 페이지입니다.</Text>
			</Nopage>
		</>
	);
};


export default NotFound;