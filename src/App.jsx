import { useState } from "react";
import "./index.css";

function App() {

  const [calc, setCalc] = useState("")
  const [result, setResult] = useState("")

  const ops = ["/","*","+","-","."]

  const update = value => {
    if (
      ops.includes(value) && calc === "" || 
      ops.includes(value) && ops.includes(calc.slice(-1))
    ) {
      return
    }

    setCalc(calc + value)
    if (!ops.includes(value)) {
      setResult(eval(calc + value).toString())
    }
  }

  const createDigits = () => {
    const digits = []
    for (let i = 1; i < 10; i++) {
      digits.push(
        <button key={i} onClick={() => update(i.toString())}>{i}</button>
      )
    }
    return digits
  }

  const calculate = () => {
    setCalc(eval(calc).toString())
  }

  const delLast = () => {
    if (calc == "") {
      return
    }
    
    const value = calc.slice(0, -1)

    setCalc(value)
  }
  return (
    <div className="app">
      <div className="calculator">
        <div className="screen">
        {result ? <span>({result})</span> : "" }&nbsp;&nbsp;{calc || "0"}
        </div>

        <div className="operators">
          <button onClick={() => update("/")}>/</button>
          <button onClick={() => update("+")}>+</button>
          <button onClick={() => update("*")}>*</button>
          <button onClick={() => update("-")}>-</button>
          
          <button onClick={delLast}>DEL</button>
        </div>

        <div className="digits">
          {createDigits()}
          <button onClick={() => update("0")}>0</button>
          <button onClick={() => update(".")}>.</button>
          <button onClick={calculate}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
