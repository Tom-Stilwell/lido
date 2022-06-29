import React, {Component} from "react";
import Cell from "./Cell";
import Label from "./Label";
import { HyperFormula } from 'hyperformula';


class Sheet extends Component {

  constructor(props) {
    super(props);

    this.state = {cmdClick: null};

    this.columns = ["A", "B", "C", "D", "E"];
    this.rows = ["1", "2", "3", "4", "5"];

    const cols = [[], [], [], [], []];

    cols.forEach(col => {
      for (let i = 0; i < 5; i++) {
        col.push("");
      }
    });

    this.state["sheet"] = cols;
    console.log(this.state);
  }

  //

  updateCellValue = cell => {
    return (val => {
      const copy = [...this.state.sheet];

      copy[cell[0]][cell[1]] = val;
      this.setState({sheet: copy});
    });

  }

  parseFormula = cellName => {
    // const formula = this.state[cellName];
    // if (formula[0] !== "=") {
    //   return formula;
    // }
    //
    // const sliced = formula.slice(1);
    //
    // let replaced = sliced;
    //
    // for (let cell in this.state) {
    //   let value = this.state[cell];
    //
    //   // dont get into self-referential infinite loop
    //   if (!value || value === "" || cell === cellName) continue;
    //
    //   if (sliced.match(cell)) {
    //     replaced = sliced.replace(cell, this.parseFormula(cell));
    //   }
    // }

    const options = {
      licenseKey: 'gpl-v3',
    };

    // define the data
    const data = this.state.sheet;

    // build an instance with defined options and data
    const hfInstance = HyperFormula.buildFromArray(data, options);

    // call getCellValue to get the calculation results
    const mySum = hfInstance.getCellValue({ col: cellName[0], row: cellName[1], sheet: 0 });

    return mySum;

    try {
      return mySum;
    } catch {
      return "#NAN";
    }

  }

  handleCmdClick = cell => {
    const cellName = `${this.columns[cell[1]]}${this.rows[cell[0]]}`;
    return () => this.setState({cmdClick: cellName});
  }

  render() {
    return (
      <div className="sheet">
        <div className="col-titles">
          {
            this.columns.map(colTitle => <div key={colTitle}>{colTitle}</div>)
          }
        </div>
        <div className="col-rows">
          {
            this.rows.map(colRow => <div key={colRow}>{colRow}</div>)
          }
        </div>
        <div className="sheet-values">
          {
            this.state.sheet.map(
              (col, i) => {
                return (col.map((cell, j) => {
                  return (
                    <Cell
                      formula={cell}
                      value={this.parseFormula([j,i])}
                      updateValue={this.updateCellValue([i,j])}
                      handleCmdClick={this.handleCmdClick([i,j])}
                      cmdClicked={this.state.cmdClick}
                    />
                  );
                }));
              }
            )
          }
        </div>
      </div>
    );
  }
}


export default Sheet;

// import { create, all } from 'mathjs';
// const config = {};
// const math = create(all, config)


// parseFormula = cellName => {
//   const formula = this.state[cellName];
//   if (formula[0] !== "=") {
//     return formula;
//   }
//
//   const sliced = formula.slice(1);
//
//   let replaced = sliced;
//
//   for (let cell in this.state) {
//     let value = this.state[cell];
//
//     // dont get into self-referential infinite loop
//     if (!value || value === "" || cell === cellName) continue;
//
//     if (sliced.match(cell)) {
//       replaced = sliced.replace(cell, this.parseFormula(cell));
//     }
//   }
//
//   try {
//     return math.evaluate(replaced);
//   } catch {
//     return "#NAN";
//   }
//
// }
