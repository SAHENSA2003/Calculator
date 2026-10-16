/* Boiler plate code  */

const Select = (element) => document.querySelector(element);
const SelectAll = (element) => document.querySelectorAll(element);

function MainApp() {
  const AllNumberDiv = SelectAll(".input-btns .number");
  const AllOperator = SelectAll(".input-btns .operator");
  const Output = Select(".outPut");
  const OperationsArr = ["+", "-", "*", "/", "%"];
  const allNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
  const isEuqal = Select(".input-btns .isEqual");
  const factorial = Select(".input-btns .factorial");
  const Clear = SelectAll(".clear");
  const Persent = Select(".Percent");
  const Point = Select(".point");
  let result;
  let num1;
  let num2;
  let value;
  let Operation;
  let isActive = false;
  let pointCount = 0;
  /* functions  */
  // function check(num1, Operation, num2) {
  //   if (typeof num1 === isNaN) {
  //     alert("first input was not a number!!");
  //     return false;
  //   } else if (typeof num2 === isNaN) {
  //     alert("last input was not a number !!!");
  //     return false;
  //   } else if (OperationsArr.includes(Operation)) {
  //     alert("Invalid Operation");
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

  function Calculate(num1, Operation, num2) {
    if (Operation === "+") {
      result = num1 + num2;
    } else if (Operation === "-") {
      result = num1 - num2;
    } else if (Operation === "X" || Operation === "*") {
      result = num1 * num2;
    } else if (Operation === "/") {
      result = num1 / num2;
    } else if (Operation === "%") {
      result = num1 / 100;
    } else {
      result = NaN;
    }
    console.log(result);
    return result;
  }
  function clearOutput() {
    Output.innerHTML = "";
  };

  function check() {
    if (Output.innerHTML.trim() === "") {
      alert("give a value first !!!");
      return true;
    }
    return false;
  };

  function ClearDefault() {
    num1 = 0;
    num2 = 0;
    value =0;
    result = 0;
  };

  function AC() {
    check();
    clearOutput();
    ClearDefault();
    pointCount = 0;
  };

  function OperationClick(div) {
    if (check()) return;
    if (isActive === false) {
      num1 = Number(Output.innerHTML);
      Operation = (div.innerHTML || div).trim();
      console.log(Operation);
      clearOutput();
      pointCount = 0;
      console.log(Operation);
      console.log(num1);
    }
    isActive = !isActive;
    console.log(isActive);
  }

  function CalculateClick(e) {
    if (isActive === false) return;
    num2 = Number(Output.innerHTML);
    Calculate(num1, Operation, num2);
    Output.innerHTML = result;
    isActive = !isActive;
  };

  function calcFactorial(value) {
    if (check()) return;

    if (Output.innerHTML.trim() === "0") {
      alert("give a value first !!!");
      return;
    }

    if (!Number.isInteger(value) || value < 0) {
      alert("Factorial needs a whole number, 0 or more");
      return;
    }

    if (value > 1000) {
      alert("Number too big, use 1000 or less");
      return;
    }

    let initial = 1n;
    for (let i = 1; i <= value; i++) {
      initial *= BigInt(i);
    }
    console.log(initial)
    result = initial;
    return (Output.innerHTML = result);
  }

  function BackSpace() {
    check();
    Output.innerHTML = Output.innerHTML.slice(0, -1);
    if (Output.innerHTML.includes(".")) {
      pointCount = 1;
    } else {
      pointCount = 0;
    }
  }

  const pointClick = () => {
    if (pointCount === 0) {
      Output.innerHTML += Point.innerHTML;
    }
    pointCount++;
  }

  /* Event Listeners  */
  AllNumberDiv.forEach((div) => {
    div.addEventListener("click", () => {
      Output.innerHTML += div.innerHTML;
    });
  });

  AllOperator.forEach((div) => {
    div.addEventListener("click", () => {
      OperationClick(div);
    });
  });

  isEuqal.addEventListener("click", () => {
    CalculateClick();
  });

  factorial.addEventListener("click", () => {
    value = Number(Output.innerHTML);
    calcFactorial(value);
  });

  Clear.forEach((c) => {
    c.addEventListener("click", () => {
      if (c.innerHTML === "C") {
        BackSpace();
      } else {
        AC();
      }
    });
  });
  Persent.addEventListener("click", () => {
    num1 = Number(Output.innerHTML);
    Operation = Persent.innerHTML;
    Calculate(num1, Operation)
    Output.innerHTML = result;
  });
  Point.addEventListener("click", () => {
    pointClick();
  });

  /* key events */

  document.addEventListener("keydown", (e) => {
    console.log(e.key);
    if (e.key === "Backspace") BackSpace();
    if (e.key === "Delete") AC();
    if (allNumbers.includes(e.key)) Output.innerHTML += e.key;
    if (OperationsArr.includes(e.key)) OperationClick(e.key);
    if(e.key ==="!") {
      value = Number(Output.innerHTML);
      calcFactorial(value);
    }
    if (e.key === "Enter") CalculateClick();
  })
}

MainApp();
