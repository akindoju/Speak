import React, { useState } from 'react';

const Homepage = () => {
  const [textAreaText, setTextAreaText] = useState('');
  const [message, setMessage] = useState(new SpeechSynthesisUtterance());

  const voices = speechSynthesis.getVoices();

  const setVoice = (event) => {
    message.voice = voices.find((voice) => voice.name === event.target.value);
  };

  const speakText = () => {
    speechSynthesis.speak(message);
  };

  const setTextMessage = (text) => {
    message.text = text;
  };

  return (
    <div>
      <div className="header">
        <h1 className="headerTitle">Speak</h1>
        <h3 className="headerTitleSub">Convert text to speech</h3>
      </div>
      <div className="textbox">
        <h4 className="voiceSelect">Pick a Voice</h4>
        <select
          className="select"
          onChange={(event) => {
            event.preventDefault();
            setVoice(event);
          }}
        >
          {/* <option key="default" value="Google US English en-US">
            Default English
          </option> */}
          {voices.map((voice) => {
            return (
              <option key={voice.name} value={voice.name}>
                {voice.name} {voice.lang}
              </option>
            );
          })}
        </select>
        <textarea
          placeholder="Enter text to read"
          className="textArea"
          onChange={(e) => {
            e.preventDefault();
            setTextAreaText(e.target.value);
          }}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            setTextMessage(textAreaText);
            speakText();
          }}
        >
          Read Text
        </button>
      </div>
    </div>
  );
};

export default Homepage;
