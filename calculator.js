let screen = document.getElementById("display");
let text = screen.innerText;
const buttons = Array.from(document.querySelectorAll(".operation"));
const operators = Array.from(document.querySelectorAll(".operator"));

display();

// Print digits on the screen
function display(id) {
  let flag = false;
  // Check if operators are repeating (i.e 2++5)
  operators.forEach((operator) => {
    let checkOperator = operators.some((operator) => operator.innerText === id);
    if (
      text.length > 1 &&
      text.charAt(text.length - 1) === operator.innerText &&
      checkOperator
    ) {
      flag = true;
      return false;
    }
  });

  if (flag) {
    return;
  }

  buttons.forEach((button) => {
    //Remove double periods (.)
    if (text.includes(".") && id === ".") {
      return false;
    }
    // Checks which button is clicked
    if (id === button.innerText) {
      text = text + button.innerText;
    }
  });

  // Handles zeros at start
  if (text.length > 1 && text.charAt(0) === "0" && !text.includes(".")) {
    text = text.charAt(1);
  }
  screen.innerText = text;
}

function getId(id) {
  // Clear Everything
  if (id === "CE") {
    text = "0";
  }

  // Clear last digit
  if (id === "C") {
    if (text.length === 1) {
      text = "0";
    }
    if (text.length > 1) {
      text = text.slice(0, -1);
    }
  }

  // Calculate the result
  if (id === "=") {
    text = Function("return " + text)().toString();
  }
  screen.innerText = text;
}
