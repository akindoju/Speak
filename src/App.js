import './App.css';

function App() {
  return (
    <div className="App">
      <div className="header">
        <h1 className="headerTitle">Speak</h1>
        <h3 className="headerTitleSub">Convert text to speech</h3>
      </div>
      <div className="textbox">
        <h4 className="voiceSelect">Choose Voice</h4>
        <select id="voices" className="select"></select>
        <textarea
          placeholder="Enter text to read..."
          className="textArea"
        ></textarea>
        <button>Read Text</button>
      </div>
    </div>
  );
}

export default App;
