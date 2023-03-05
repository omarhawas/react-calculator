import "./App.css";
import Button from "./components/Button";
import { useState } from "react";

function App() {
  const [result, setResult] = useState(0);
  const [currentEquation, setCurrentEquation] = useState([]);

  const updateEquation = (buttonPressed) => {
    if (buttonPressed === "AC") {
      setResult(0);
      setCurrentEquation([]);
    } else {
      setCurrentEquation([...currentEquation, buttonPressed]);
    }
  };

  const calculateResult = () => {
    // [{type: number, value: 1} , {type: number, value: 0} , {type: operation , value: +} , {type: number, value: 8}]
    // ['10', '+', '8, "+" , '100', "+' , '200']
    // [10 + 8] = 18
    console.log("current equation ", currentEquation);
    const evaluatedEquation = [];
    let currentNumber = "0";
    currentEquation.forEach((numOrOperation, index) => {
      if (numOrOperation.type === "number") {
        currentNumber = currentNumber + numOrOperation.value;
      } else if (
        numOrOperation.type === "operation" &&
        index !== currentEquation.length - 1
      ) {
        evaluatedEquation.push(currentNumber);
        evaluatedEquation.push(numOrOperation.value);
        currentNumber = "";
      }
      if (index === currentEquation.length - 1) {
        evaluatedEquation.push(currentNumber);
      }
    });
    let currentResult = 0;
    for (let i = 0; i < evaluatedEquation.length; i++) {
      if (evaluatedEquation[i] === "+") {
        const num1 = parseInt(evaluatedEquation[i - 1]);
        const num2 = parseInt(evaluatedEquation[i + 1]);
        currentResult = num1 + num2;
        evaluatedEquation[i + 1] = `${currentResult}`;
      } else if (evaluatedEquation[i] === "-") {
        const num1 = parseInt(evaluatedEquation[i - 1]);
        const num2 = parseInt(evaluatedEquation[i + 1]);
        currentResult = num1 - num2;
        evaluatedEquation[i + 1] = `${currentResult}`;
      } else if (evaluatedEquation[i] === "x") {
        const num1 = parseInt(evaluatedEquation[i - 1]);
        const num2 = parseInt(evaluatedEquation[i + 1]);
        currentResult = num1 * num2;
        evaluatedEquation[i + 1] = `${currentResult}`;
      } else if (evaluatedEquation[i] === "/") {
        const num1 = parseInt(evaluatedEquation[i - 1]);
        const num2 = parseInt(evaluatedEquation[i + 1]);
        currentResult = num1 / num2;
        evaluatedEquation[i + 1] = `${currentResult}`;
      }
    }
    setResult(currentResult);
  };

  const showCurrentEquation = () => {
    console.log("current equation ", currentEquation);
    let displayedEquation = "";
    currentEquation.forEach((el) => {
      displayedEquation = displayedEquation + el.value;
    });
    console.log(displayedEquation);
    return displayedEquation;
  };

  return (
    <div className="App">
      <div className="flex-container">
        <section className="display">{result}</section>
        <section>{showCurrentEquation()}</section>
        <div className="row1">
          <Button text={"AC"} onClick={() => updateEquation("AC")} />
          <Button text={"+/-"} onClick={() => updateEquation("+/-")} />
          <Button text={"%"} onClick={() => updateEquation("%")} />
          <Button
            text={"/"}
            onClick={() => updateEquation({ type: "operation", value: "/" })}
          />
        </div>
        <div className="row2">
          <Button
            text={"7"}
            onClick={() => updateEquation({ type: "number", value: "7" })}
          />
          <Button
            text={"8"}
            onClick={() => updateEquation({ type: "number", value: "8" })}
          />
          <Button
            text={"9"}
            onClick={() => updateEquation({ type: "number", value: "9" })}
          />
          <Button
            text={"x"}
            onClick={() => updateEquation({ type: "operation", value: "x" })}
          />
        </div>
        <div className="row3">
          <Button
            text={"4"}
            onClick={() => updateEquation({ type: "number", value: "4" })}
          />
          <Button
            text={"5"}
            onClick={() => updateEquation({ type: "number", value: "5" })}
          />
          <Button
            text={"6"}
            onClick={() => updateEquation({ type: "number", value: "6" })}
          />
          <Button
            text={"-"}
            onClick={() => updateEquation({ type: "operation", value: "-" })}
          />
        </div>
        <div className="row4">
          <Button
            text={"1"}
            onClick={() => updateEquation({ type: "number", value: "1" })}
          />
          <Button
            text={"2"}
            onClick={() => updateEquation({ type: "number", value: "2" })}
          />
          <Button
            text={"3"}
            onClick={() => updateEquation({ type: "number", value: "3" })}
          />
          <Button
            text={"+"}
            onClick={() => updateEquation({ type: "operation", value: "+" })}
          />
        </div>
        <div className="row5">
          <Button
            style={{ width: "900px" }}
            text={"0"}
            onClick={() => updateEquation({ type: "number", value: "0" })}
          />
          <Button text={"."} />
          <Button text={"="} onClick={calculateResult} />
        </div>
      </div>
    </div>
  );
}

export default App;
