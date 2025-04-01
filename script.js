// JavaScript functionality for the calculator
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");

let currentInput = ""; // Holds the current operand input
let calculation = ""; // Holds the full calculation string to display
let operand1 = null; // Stores the first operand
let operator = ""; // Stores the operator

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.hasAttribute("data-digit")) {
      // Append digit to currentInput and update calculation display
      const digit = button.getAttribute("data-digit");
      currentInput += digit;
      calculation += digit;
      display.value = calculation;
    } else if (button.hasAttribute("data-op")) {
      // When operator is pressed, store the first operand and operator,
      // and append the operator to the calculation display.
      if (currentInput !== "") {
        operand1 = parseFloat(currentInput);
        operator = button.getAttribute("data-op");
        calculation += operator;
        display.value = calculation;
        currentInput = ""; // Clear current input to accept the second operand
      }
    } else if (button.id === "equal") {
      // Compute the result only when the equal button is pressed,
      // keeping all previous inputs visible.
      if (operator && currentInput !== "") {
        const operand2 = parseFloat(currentInput);
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
        }
        display.value = calculation + "=" + result;
        // Reset for the next calculation, preserving the result as new input
        currentInput = result.toString();
        calculation = currentInput;
        operator = "";
        operand1 = null;
      }
    } else if (button.id === "clear") {
      // Reset the calculator
      currentInput = "";
      calculation = "";
      operator = "";
      operand1 = null;
      display.value = "";
    }
  });
});
