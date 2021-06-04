import { useEffect, useRef, useState } from 'react';

const Homepage = () => {
  const [textAreaText, setTextAreaText] = useState(
    // 'Hey there! Welcome to this text-to-speech converter. Input your text and select language to get started.'
    'hey there'
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
        <h1 className="headerTitle">Speak</h1>
        <h3 className="headerTitleSub">Convert text to speech</h3>
      </div>
      <div className="textbox">
        <h4 className="voiceSelect">Pick a Voice</h4>
        <select
          className="select"
          onChange={({ target }) => {
            message.current.voice = voices.find(
              (voice) => voice.name === target.value
            );
            speechSynthesis.cancel();
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

// import { useEffect, useRef, useState } from 'react';

// const Homepage = () => {
//   const [textAreaText, setTextAreaText] = useState('Hey there!');
//   const defaultVoice = useRef('Google UK English Female');
//   const [options, setOptions] = useState(false);
//   const [message] = useState(new SpeechSynthesisUtterance()); //to avoid rerender on every text area change

//   const voices = speechSynthesis.getVoices();

//   const setVoice = (event) => {
//     message.voice = voices.find((voice) => voice.name === event.target.value);
//   };

//   const speakText = () => speechSynthesis.speak(message);

//   const setTextMessage = (text) => (message.text = text);

//   useEffect(() => {
//     setOptions(true);
//   }, []);

//   useEffect(() => {
//     const setVoice = () => {
//       message.voice = voices.find(
//         (voice) => voice.name === defaultVoice.current
//       );
//     };

//     setVoice();
//   }, [message, voices]);

//   return (
//     <div>
//       <div className="header">
//         <h1 className="headerTitle">TTS</h1>
//         <h3 className="headerTitleSub">Text to Speech Converter</h3>
//       </div>
//       <div className="textbox">
//         <h4 className="voiceSelect">Pick a Voice</h4>
//         <select
//           className="select"
//           onChange={(event) => {
//             setVoice(event);
//             speechSynthesis.cancel();
//             console.log(message);
//           }}
//         >
//           <option key="default" value={defaultVoice}>
//             Default English
//           </option>

//           {options &&
//             voices.map((voice) => {
//               return (
//                 <option key={voice.name} value={voice.name}>
//                   {voice.name} {voice.lang}
//                 </option>
//               );
//             })}
//         </select>
//         <textarea
//           placeholder="Enter text to read"
//           className="textArea"
//           onChange={(event) => {
//             event.preventDefault();
//             setTextAreaText(event.target.value);
//             speechSynthesis.cancel();
//             console.log(message);
//           }}
//           value={textAreaText}
//         />
//         <button
//           onClick={(e) => {
//             e.preventDefault();
//             setTextMessage(textAreaText);
//             speakText();
//           }}
//         >
//           Read Text
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Homepage;
