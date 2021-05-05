import { useState } from 'react';
import './App.css';

function App() {
  const [textAreaText, setTextAreaText] = useState('');

  let voices = [];
  voices = speechSynthesis.getVoices();

  const message = new SpeechSynthesisUtterance();

  const speakText = () => {
    speechSynthesis.speak(message);
  };

  const setTextMessage = (text) => {
    message.text = text;
  };

  return (
    <div className="App">
      <div className="header">
        <h1 className="headerTitle">Speak</h1>
        <h3 className="headerTitleSub">Convert text to speech</h3>
      </div>
      <div className="textbox">
        <h4 className="voiceSelect">Pick a Voice</h4>
        <select
          id="voices"
          className="select"
          onChange={(event) => {
            message.voice = voices.find(
              (voice) => voice.name === event.target.value
            );
          }}
        >
          {voices.map((voice) => {
            return (
              <option value={voice.name}>
                {voice.name} &mdash; {voice.lang}
              </option>
            );
          })}
        </select>
        <textarea
          placeholder="Enter text to read..."
          className="textArea"
          onChange={(e) => {
            e.preventDefault();
            setTextAreaText(e.target.value);
          }}
        ></textarea>
        <button
          onClick={() => {
            setTextMessage(textAreaText);
            speakText();
          }}
        >
          Read Text
        </button>
      </div>
    </div>
  );
}

export default App;
