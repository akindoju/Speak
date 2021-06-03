import { useEffect, useState } from 'react';

const Homepage = () => {
  const [textAreaText, setTextAreaText] = useState(
    'Hey there! Welcome to this text-to-speech converter. Input your text and select language to get started.'
  );
  const [defaultVoice, setDefaultVoice] = useState('');
  const [options, setOptions] = useState(false);
  const [message] = useState(new SpeechSynthesisUtterance()); //to avoid rerender on every text area change

  useEffect(() => {
    setOptions(true);
  }, []);

  useEffect(() => {
    setDefaultVoice('Google UK English Female');
  }, []);

  const voices = speechSynthesis.getVoices();

  const setVoice = (event) => {
    message.voice = voices.find((voice) => voice.name === event.target.value);
  };

  useEffect(() => {
    const setVoice = () => {
      message.voice = voices.find((voice) => voice.name === defaultVoice);
    };

    setVoice();
  });

  const speakText = () => {
    speechSynthesis.speak(message);
  };

  const setTextMessage = (text) => {
    message.text = text;
  };

  return (
    <div>
      <div className="header">
        <h1 className="headerTitle">TTS</h1>
        <h3 className="headerTitleSub">Text to Speech Converter</h3>
      </div>
      <div className="textbox">
        <h4 className="voiceSelect">Pick a Voice</h4>
        <select
          className="select"
          onChange={(event) => {
            setVoice(event);
          }}
        >
          <option key="default" value={defaultVoice}>
            Default English
          </option>

          {options &&
            voices.map((voice) => {
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
          onChange={({ target }) => {
            setTextAreaText(target.value);
          }}
          value={textAreaText}
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
