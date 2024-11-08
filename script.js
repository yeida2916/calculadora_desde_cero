let display = document.getElementById("display");
let currentInput = "";
let currentOperation = null;
let previousInput = null;

/* Agrega número al display */
function appendNumber(number) {
  currentInput += number;
  updateDisplay();
}

/* Configura la operación actual */
function setOperation(operation) {
  if (currentInput === "" && previousInput === null) return;
  if (previousInput !== null) calculate();
  currentOperation = operation;
  previousInput = currentInput;
  currentInput = "";
  updateDisplay();
}

/* Calcula el resultado */
function calculate() {
  if (previousInput === null || currentInput === "" || currentOperation === null) return;
  let result;
  const a = parseFloat(previousInput);
  const b = parseFloat(currentInput);
  switch (currentOperation) {
    case "+": result = a + b; break;
    case "-": result = a - b; break;
    case "*": result = a * b; break;
    case "/": result = b !== 0 ? a / b : "Error"; break;
    default: return;
  }
  currentInput = result.toString();
  previousInput = null;
  currentOperation = null;
  updateDisplay();
}

/* Limpia el display */
function clearDisplay() {
  currentInput = "";
  previousInput = null;
  currentOperation = null;
  updateDisplay();
}

/* Actualiza el contenido del display */
function updateDisplay() {
  let displayText = previousInput ? `${previousInput} ${currentOperation || ""} ${currentInput}` : currentInput;
  display.textContent = displayText || "0";
}

/* Captura eventos de teclado */
document.addEventListener("keydown", function (event) {
  if (!isNaN(event.key)) {
    appendNumber(event.key);
  } else if (["+", "-", "*", "/"].includes(event.key)) {
    setOperation(event.key);
  } else if (event.key === "Enter" || event.key === "=") {
    calculate();
  } else if (event.key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
  } else if (event.key.toLowerCase() === "c") {
    clearDisplay();
  }
});
