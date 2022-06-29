import React, {Component} from "react";

import logo from './lido.jpeg';
import './App.css';
import Sheet from "./Sheet";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sheets: [<Sheet />],
      displayedSheet: 0
    }
  }

  addSheet = () => {
    const copy = [...this.state.sheets];
    copy.push(<Sheet />);
    this.setState({sheets: copy});
  }

  handleChangeSheet = e => {
    // debugger
    this.setState({displayedSheet: parseInt(e.target.value)})
  }

  render() {

    const radioButtons = [];

    for (let i = 0; i < this.state.sheets.length; i++) {
      radioButtons.push(<input type="radio" value={i} name="sheet" checked={this.state.displayedSheet === i} onChange={this.handleChangeSheet}/>)
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <button onClick={this.addSheet}>Add Sheet</button>
          <div>
            {radioButtons}
          </div>

          {
            this.state.sheets.map((sheet,i) => <div style={{display: i === this.state.displayedSheet ? "" : "none"}}>{sheet}</div>)
          }
        </header>
      </div>
    );
  }
}

export default App;
