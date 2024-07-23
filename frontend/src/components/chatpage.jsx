import React, { useState, useRef, useEffect } from 'react';
import { IoSend } from "react-icons/io5";

const Chatpage = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesContainerRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const sendMessage = () => {
    if (message.trim() !== '') {
        fetch('https://96ae-34-172-253-253.ngrok-free.app/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message }),
          })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
      setMessages([...messages, message]);
      setMessage('');
    }
  };

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div>
      <div className='relative w-12/12 border px-4 py-3 mb-6 overflow-hidden'>

        <div ref={messagesContainerRef} className='h-96 w-12/12 bg-[#242534] relative rounded-lg mb-10 border px-3 py-2 text-white overflow-y-auto hide-scrollbar'>
          {messages.map((message, index) => (
            <div className='flex justify-end rounded-2xl'>
              <div className='bg-black py-1 my-1 px-4 rounded-2xl'>
                <p key={index} className='relative -top-0.5'>{message}</p>
              </div>
            </div>
          ))}
        </div>

        <div className='flex justify-between'>
          <div className='h-12 w-11/12'>
            <form onSubmit={handleSubmit}>
              <textarea
                placeholder="Enter your message"
                required
                type='field'
                className='resize-none border md:w-full rounded-lg md:h-12 bg-[#242534] text-[#EFEFEF] md:px-4 md:pt-2 w-full px-3 h-20'
                cols="30"
                rows="10"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </form>
          </div>
          <a>
            <div
              className='h-12 w-24 bg-white hover:bg-pink-400 rounded-3xl hover:scale-105 duration-300 transition-all flex justify-center'
              onClick={sendMessage}
            >
              <IoSend className='relative top-3' size={22} />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Chatpage;