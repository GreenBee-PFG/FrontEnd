import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components"

//Pages
import Main from './pages/Main';
import Board from './pages/Board';
import NotFound from './pages/NotFound';

//board
import BoardDetail from "./pages/Detail";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";

//dev
import AdminPage from "./pages/AdminPage";

//Interview
import Intrv from "./interview/Intrv";
import IntrvContent from "./interview/IntrvContent";
import IntrvFB from "./interview/IntrvFB";
import IntrvTail from "./interview/IntrvTail";

//ComponentS
import Header from './component/Header';
import Footer from './component/Footer';
import config from "./config";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  min-height: 100vh;
`

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  width: 100%;
  max-width: 1100px;
  margin: ${config.HeaderHeight} auto ;
  height: auto;
  min-height: calc(100vh - ${config.HeaderHeight});
`

const AppRoutes = styled.div`
  width: 100%;
  display: flex;
  height: auto;
  justify-content: center;
`

function App() {
  return (
    <Wrapper>
      <BrowserRouter>
        <Header />
        <Content>
          <AppRoutes>
            <Routes>
              <Route path="/" element={<Main />} />

              <Route path="/adminpage" element={<AdminPage />} />

              <Route path="/intrv" element={<Intrv />}/>
              <Route path="/intrvcontent" element={<IntrvContent />}/>
              <Route path="/intrvfeedback" element={<IntrvFB />}/>
              <Route path="/intrvtail" element={<IntrvTail />}/>

              <Route path="/board" element={<Board />}/>       
              <Route path="/detail/:id" element={<BoardDetail />} />
              <Route path="/createpost" element={<CreatePost />} />
              <Route path="/updatepost" element={<UpdatePost />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppRoutes>
        </Content>
        <Footer />
      </BrowserRouter>
    </Wrapper>
  );
}

export default App;