import logo from './logo.svg';
import './App.css';
import Login from './login';
import Write from './write';
import List from './List';
import Main from './main';
import Test from './test'
import Article from './article';
import ChatRoom from './ChatRoom';
import Test2 from './test2';
import {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  const [message, setMessage] = useState([]);

  {/*useEffect(() => {
    fetch("/api/hello")
        .then((response) => {
            return response.json();
        })
        .then(function (data) {
            setMessage(data);
        });
  }, []);*/}

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/main" element={<Main/>}></Route>
          <Route path='/write' element={<Write/>}></Route>
          <Route path='/list' element={<List/>}></Route>
          <Route path='/article' element={<Article/>}></Route>
          <Route path='/test' element={<Test/>}></Route>
          <Route path='/test2' element={<Test2/>}></Route>
          <Route path='/test3' element={<ChatRoom/>}></Route>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
