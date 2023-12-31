// npm i socket.io-client 으로 client용 socket.io 설치 진행
import React, { useEffect, useState } from 'react';
import './app.css';
import socket from './server';
import InputField from './components/inputField/InputField';
import MessageContainer from './components/messageField/MessageContainer';

const App = () => {
    const [message, setMessage] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [messageList, setMessageList] = useState([]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessageList((prev) => prev.concat(message)); // concat 뒤에 이어 붙여주세요
        });
        askUserName();
    }, []);

    // userName확인
    const askUserName = () => {
        const userName = prompt('닉네임을 작성하세요.');
        // user이름 보내기
        socket.emit('login', userName, (res) => {
            if (res?.ok) {
                setUserInfo(res.data);
            } else {
                console.log('데이터가 정상적으로 들어오지 않았습니다.');
            }
        });
    };
    const sendMessage = (e) => {
        e.preventDefault();
        socket.emit('sendMessage', message, (res) => {
            console.log('message전송 res', res);
        });
        setMessage('');
    };

    return (
        <div className="App">
            <div className="message">
                <MessageContainer messageList={messageList} user={userInfo} />
            </div>
            <InputField message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
    );
};

export default App;
