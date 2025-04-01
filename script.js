// JavaScript functionality for the calculator app

const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");

let currentInput = ""; // Holds the current number input
let calculation = ""; // Holds the full calculation string to display
let operand1 = null; // Stores the first operand
let operator = ""; // Stores the selected operator

// Function to check if a string is a valid number
function isValidNumber(input) {
  return !isNaN(parseFloat(input)) && isFinite(input);
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.hasAttribute("data-digit")) {
      // Append digit to current input and update calculation string
      const digit = button.getAttribute("data-digit");
      currentInput += digit;
      calculation += digit;
      display.value = calculation;
    } else if (button.hasAttribute("data-op")) {
      // When an operator is pressed, store the first operand and operator
      if (currentInput !== "" && isValidNumber(currentInput)) {
        operand1 = parseFloat(currentInput);
        operator = button.getAttribute("data-op");
        calculation += operator;
        display.value = calculation;
        currentInput = ""; // Reset current input for the second operand
      } else {
        display.value = "Error: Invalid operand";
        calculation = "";
        currentInput = "";
        operator = "";
        operand1 = null;
      }
    } else if (button.id === "equal") {
      // Compute result when equal button is pressed
      if (operator && currentInput !== "" && isValidNumber(currentInput)) {
        const operand2 = parseFloat(currentInput);
        // Handle division by zero
        if (operator === "/" && operand2 === 0) {
          display.value = "Error: Division by zero";
          calculation = "";
          currentInput = "";
          operator = "";
          operand1 = null;
          return;
        }
        let result;
        switch (operator) {
          case "+":
            result = operand1 + operand2;
            break;
          case "-":
            result = operand1 - operand2;
            break;
          case "*":
            result = operand1 * operand2;
            break;
          case "/":
            result = operand1 / operand2;
            break;
          default:
            display.value = "Error";
            return;
        }
        display.value = calculation + "=" + result;
        // Reset for next calculation; result becomes new starting input
        currentInput = result.toString();
        calculation = currentInput;
        operator = "";
        operand1 = null;
      } else {
        display.value = "Error: Incomplete input";
        currentInput = "";
        calculation = "";
        operator = "";
        operand1 = null;
      }
    } else if (button.id === "clear") {
      // Reset the calculator completely and set display to "0"
      currentInput = "";
      calculation = "";
      operator = "";
      operand1 = null;
      display.value = "0";
    }
  });
});
