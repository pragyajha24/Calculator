const numberKey = document.querySelectorAll(".numberKey");
const operatorkey = document.querySelectorAll(".operatorKey");
const calc = document.getElementById("calc");
const result = document.getElementById("result");
const clearAllKey = document.getElementById("clearAll");
const backSpaceKey = document.getElementById("backSpace");
const equalKey = document.getElementById("equal");

let calcResult = "";
let calcArray = [];

const getNumber = (number) => {
  const lastChar = calcResult[calcResult.length - 1];
  if (lastChar === "." && number === ".") {
    return;
  }
  calcResult += number;
  calcArray.push(number);
  if (calc.innerHTML === "0") {
    calc.innerHTML = "";
  }
  calc.innerHTML += calcArray[calcArray.length - 1];
  setResults();
};

const getOperator = (operator) => {
  const lastChar = calcResult[calcResult.length - 1];
  if (
    lastChar != "%" &&
    lastChar != "/" &&
    lastChar != "*" &&
    lastChar != "+" &&
    lastChar != "-"
  ) {
    calcResult += operator;
    calcArray.push(
      `<span style="color:#FF3E39 ; margin: 0 10px;">${operator}</span>`
    );
    calc.innerHTML += calcArray[calcArray.length - 1];
  }
};

const setResults = () => {
  result.innerHTML = eval(calcResult);
};

const clearAll = () => {
  calcResult = "";
  calcArray = [];
  calc.innerHTML = "0";
  result.innerHTML = "0";
};

const backSpace = () => {
  calcArray.splice(-1, 1);
  calcResult = calcResult.substr(0, calcResult.length - 1);
  calc.innerHTML = calcArray.join("");
  if (calcResult === "") clearAll();
};

const getEqual = () => {
  if (eval(calcResult) !== Infinity) {
    reslutStr = eval(calcResult).toString();
    calcArray = [];
    for (i = 0; i < reslutStr.length; i++) {
      calcArray.push(reslutStr.charAt(i));
      
    }
    calcResult = eval(calcResult);
    calc.innerHTML = eval(calcResult);
  }
};

numberKey.forEach((el) => {
  el.addEventListener("click", (e) => {
    const keyValue = e.target.innerHTML;
    getNumber(keyValue);
  });
});

operatorkey.forEach((el) => {
  el.addEventListener("click", (e) => {
    const keyValue = e.target.innerHTML;
    getOperator(keyValue);
  });
});

clearAllKey.addEventListener("click", clearAll);

backSpaceKey.addEventListener("click", backSpace);

equalKey.addEventListener("click", getEqual);
