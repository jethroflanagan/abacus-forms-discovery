import React from "react";
import ReactDOM from "react-dom";
import { FormElements } from './FormElements';
import { SettingsPanel } from './settings/SettingsPanel';
import "./styles.css";

function App() {
  return (
    <div className="App">
      <SettingsPanel />
      <FormElements />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
