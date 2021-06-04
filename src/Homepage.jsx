import { useEffect, useRef, useState } from 'react';

const Homepage = () => {
  const [textAreaText, setTextAreaText] = useState(
    'Hey there! Welcome to this text-to-speech converter. Input your text and select language to get started.'
  );
  const [options, setOptions] = useState(false);
  const message = useRef(new SpeechSynthesisUtterance()); //to avoid rerender on every text area change
  const defaultVoice = useRef('Google UK English Female');

  const voices = speechSynthesis.getVoices();

  const setTextMessage = (text) => {
    message.current.text = text;
  };

  useEffect(() => {
    setOptions(true);
  }, []);

  // to get initial voice on page render
  useEffect(() => {
    const defaultVoices = speechSynthesis.getVoices();

    const setVoice = () => {
      message.current.voice = defaultVoices.find(
        (voice) => voice.name === defaultVoice.current
      );
    };

    setVoice();
  }, []);

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
          onChange={({ target }) => {
            message.current.voice = voices.find(
              (voice) => voice.name === target.value
            ); // setting voice
            speechSynthesis.cancel();
            console.log(message.current.rate);
          }}
        >
          <option key="default" value={defaultVoice.current}>
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
          onChange={(e) => {
            e.preventDefault();
            setTextAreaText(e.target.value);
          }}
          value={textAreaText}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            setTextMessage(textAreaText);
            speechSynthesis.speak(message.current);
          }}
        >
          Read Text
        </button>
      </div>
    </div>
  );
};

export default Homepage;
