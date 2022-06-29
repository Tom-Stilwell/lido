import React, {Component} from "react";
import Cell from "./Cell";
import Label from "./Label";
import { create, all } from 'mathjs';
const config = {};
const math = create(all, config)


class OldSheet extends Component {

  constructor(props) {
    super(props);

    this.state = {};

    const cols = ["X", "A", "B", "C", "D", "E"];

    cols.forEach(col => {
      for (let i = 0; i < 10; i++) {
        this.state[`${col}${i+1}`] = "";
      }
    });

    console.log(this.state);
  }

  updateCellValue = cell => val => this.setState({ [cell]: val });

  parseFormula = cellName => {
    const formula = this.state[cellName];
    if (formula[0] !== "=") {
      return formula;
    }

    const sliced = formula.slice(1);

    let replaced = sliced;

    for (let cell in this.state) {
      let value = this.state[cell];

      // dont get into self-referential infinite loop
      if (!value || value === "" || cell === cellName) continue;

      if (sliced.match(cell)) {
        replaced = sliced.replace(cell, this.parseFormula(cell));
      }
    }

    try {
      return math.evaluate(replaced);
    } catch {
      return "#NAN";
    }

  }

  render() {
    return (
      <div className="sheet">
          {
            Object.keys(this.state).map(
              cell => {
                return (
                  cell.includes("X") || cell.includes("0") ?
                    <Label key={cell} label={cell} />
                  :
                    <Cell key={cell} formula={this.state[cell]} value={this.parseFormula(cell)} updateValue={this.updateCellValue(cell)} />
                )
              }
            )
        }
      </div>
    );
  }
}


export default OldSheet;
